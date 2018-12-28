import React, { Component } from 'react'
import {Upload, Button, Icon} from 'element-react'
import config from '../../util/config'
import './uploadPhoto.less'

export default class UploadPhoto extends Component {
    state = {
        form : {
            imageUrl : ''
        }
    }

    constructor(props){
        super(props);
        if(props.imageUrl) this.state.form.imageUrl = props.imageUrl;
    }

    onUploadSuccess(response, file, fileList){
        console.log('uploadSuccess:', response);
        if(!(response && response.success && typeof(response.data) === 'string')){
            if(this.props.onUploadError) this.props.onUploadError(response, file, fileList);
            return;
        }
        if(this.props.onChange) this.props.onChange(response.data, file, fileList);

        this.setState({
            form : {
                imageUrl : response.data
            }
        });
    }

    onFileRemove(){

    }


    render(){
        return (
            <div className="cp-upload_photo">
                {   this.state.form.imageUrl
                    ? 
                        <div className="photo_wrap">
                            <Upload
                                className="upload_box"
                                action={config.path+"/common/2.0.0/upload/file"}
                                showFileList={false}
                                onSuccess={(response, file, fileList) => this.onUploadSuccess(response, file, fileList)}
                            >
                                <img src={this.state.form.imageUrl} />
                            </Upload>
                            <div className="remove_btn" onClick={ e => this.onRemove(e) }>
                                <Icon name="close" />
                            </div>
                        </div>
                    : 
                        <Upload
                            action={config.path+"/common/2.0.0/upload/file"}
                            showFileList={false}
                            onSuccess={(response, file, fileList) => this.onUploadSuccess(response, file, fileList)}
                        >
                            <Button size="small" type="primary">添加图片</Button>
                        </Upload>
                }
            </div>
        )
    }
}
