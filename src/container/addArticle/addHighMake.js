import React, { Component } from 'react'
import {Layout,Form,Input,DatePicker,Button,Message} from 'element-react'
import Editor from 'react-umeditor'
import axios from '../../util/axios';
import './addArticle.less';
import config from '../../util/config'
import UpLoadImg from '../../component/upLoadImg/upLoadImg'

export default class AddArticle extends Component {
    state = {
        articleType:2,
        content: "",
        articleCover:'',
        labelPosition: 'right',
        dialogVisible: false,
        usable:true,
        form: {
          name: '',
          region: '',
          type: '',
          date1:null
        },
        editors:[
            {
                icons:this.getIcons(),
                plugins:this.getPlugins(),
                title:'项目链接填写',
                fontfamily:[{
                    label: '',
                    name: 'yahei',
                    val: '微软雅黑,Microsoft YaHei'
                }],
                content:''
            }]
    }
    componentWillMount(){
        console.log(this)
        this.setState({
            articleType:this.props.match.params.type
        })
    }
    imgChange=(url)=>{
        this.setState({
            articleCover: url
        })
    }
    imgChange=(url)=>{
        // console.log(url)
        this.setState({
            articleCover: url
        })
    }
    onPositionChange(value) {
        this.setState({ labelPosition: value });
    }
    
    onChange(key, value) {
        this.setState({
            form: Object.assign(this.state.form, { [key]: value })
        });
    }
    // 编辑器
    handleChange=(content,index)=>{
        // console.log(content);
        let arr = this.state.editors;
        arr[index].content = content;
		this.setState({
			editors: arr
		})
	}
	getIcons(){
		var icons = [
			"source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
			"paragraph fontfamily fontsize | superscript subscript | ",
			"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
			"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
			"horizontal date time  | image emotion spechars | inserttable"
		]
		return icons;
	}
	getPlugins(){
		return {
			"image": { 
				"uploader": { 
					"name":"file", 
                    "url": config.path+"/common/2.0.0/upload/file" ,
                    filter:(res)=>res.data
				} 
			} 
		}
    }
    subdata=()=>{
        if(!this.state.usable){
            Message('不可重复提交')
        }
        this.setState({usable:false})
        axios.post('/article/createArticle',{
            "articleContentCn": this.state.editors[0].content,
            "articleContentEn": '',
            "articleCover": this.state.articleCover,
            "articleTime": this.state.form.date1,
            "articleTitleCn": this.state.form.region,
            "articleTitleEn": this.state.form.type,
            "articleType": 8
        }).then(res=>{
            // console.log(res)
            if(res.code===200){
                Message('创建文章成功')
                this.props.history.go(-1)
            }
        })
    }
    render() {
        // const { dialogImageUrl, dialogVisible } = this.state;
        // var icons = this.getIcons();
        // var plugins = this.getPlugins();
        // let editors = [{icons,plugins,title:'中文内容'},{icons,plugins,title:'英文内容'}];
        let _this = this;
        return (
        <div>
            <h2>新增高端制造</h2>
            <Layout.Row>
                <Layout.Col span="18" offset = "1">
                    <Form labelPosition={this.state.labelPosition} labelWidth="100" model={this.state.form} className="demo-form-stacked">
                        <Form.Item label="日期">
                            <DatePicker
                            value={this.state.form.date1}
                            placeholder="选择日期"
                            onChange={this.onChange.bind(this, 'date1')}
                            />
                        </Form.Item>
                        <Form.Item label="中文标题">
                        <Input value={this.state.form.region} onChange={this.onChange.bind(this, 'region')}></Input>
                        </Form.Item>
                        <Form.Item label="英文标题">
                        <Input value={this.state.form.type} onChange={this.onChange.bind(this, 'type')}></Input>
                        </Form.Item>
                        <Form.Item label="文章封面图">
                            
                        <UpLoadImg onChange={this.imgChange} defaultImg={this.state.articleCover}></UpLoadImg>
                        </Form.Item>
                        <Form.Item label="">
                        <div>{this.props.match.params.type==='2'||this.props.match.params.type==='3'?'建议尺寸：528*320':'建议尺寸：360*220'}</div>
                        </Form.Item>
                        
                    </Form>
                </Layout.Col>
            </Layout.Row>
            {
                this.state.editors.map(function(ele,pos){
                    return (
                        <Layout.Row key={pos}>
                            <Layout.Col span='18' offset='1'>
                                <h2 className='cfbtn'>{ele.title}</h2> <br/><br/>
                                <Editor ref="editor" 
                                    icons={ele.icons} 
                                    value={ele['content']} 
                                    defaultValue="" 
                                    onChange={function(e){
                                        _this.handleChange(e,pos)
                                    }} 
                                    plugins={ele.plugins} />
                            </Layout.Col>
                        </Layout.Row>
                    )
                })
            }
            
            <Layout.Row>
                <Layout.Col span="2" offset='6'>
                    
                    <Button type="primary" className='cfbtn' onClick={()=>{this.subdata()}}>保存</Button>
                </Layout.Col>
            </Layout.Row>
        </div>
        )
    }
}
