import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import config from '../../util/config';
import './editor.less';

export default class Editor extends Component {
    state = {
        content : ''
    };

    
    editorCreate() {
        let content = this.props.value || '';
        // const el = findDOMNode(this);
        this.ed = new window.wangEditor(this.refs.editorMenu, this.refs.editorArea);
        this.ed.customConfig.uploadImgServer = config.path+"/common/2.0.0/upload/file";
        this.ed.customConfig.uploadFileName = 'file';
        this.ed.customConfig.uploadImgHooks = this.ed.customConfig.uploadImgHooks || {};
        this.ed.customConfig.uploadImgHooks.error = function (xhr, editor) {
            alert('图片上传出错！');
            throw(new Error('图片上传出错！ -- ' + JSON.stringify(xhr)));
        };
        this.ed.customConfig.uploadImgHooks.customInsert = function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
    
            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            if(result && result.success){
                insertImg(result.data);
            }else{
                alert('图片上传出错！' + (result ? ' -- ' + result.msg : ''));
                throw(new Error('图片上传出错！ -- ' + JSON.stringify(result)));
            }
        }
        this.ed.customConfig.onchange = (html) => {
            // html 即变化之后的内容
            // console.log('内容变更：', html);
            this.props.onChange(html);
        };
        this.ed.create();
        this.ed.txt.html(content);

        this.bindEditorUiClear();

    }
    
    destroyEditor(){
        // console.log('destroy');
        this.unbindEditorClear();
        this.refs.editorWrap.parentNode.removeChild(this.refs.editorWrap);
    }

    bindEditorUiClear(){
        this._clearBtn = document.createElement('div');
        this._clearBtn.className = 'w-e-menu';
        this._clearBtn.innerHTML = '<i style="font-style:normal;">清空内容</i>';

        this.ed.$toolbarElem[0].appendChild(this._clearBtn);

        this._uiClearClick = e => {
            this.ed.txt.html('');
        };

        this._clearBtn.addEventListener('click', this._uiClearClick);
    }

    unbindEditorClear(){
        if(this._clearBtn && this._uiClearClick){
            this._clearBtn.removeEventListener('click', this._uiClearClick);
            this._clearBtn = null;
        }
    }

    componentDidMount() {
        this.editorCreate();
    }

    componentWillUnmount(){
        this.destroyEditor();
    }

    render(){
        return (
            <div className="editor">
                <h4>编辑器</h4>
                <div className="editor_box" ref="editorWrap" >
                    <div className="editor_menu_block" ref="editorMenu" ></div>
                    <div className="editor_area_block" ref="editorArea" ></div>
                </div>
            </div>
        );
    }
}
