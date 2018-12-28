import React, { Component } from 'react'
import {Upload,Form,Button} from 'element-react'
// import axios from '../../util/axios';
import config from '../../util/config'
import UploadPhoto from '../../component/uploadPhoto/uploadPhoto'

export default class AboutBanner extends Component {
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

    onSubmit(){

    }

    render(){
        return (
            <Form model={this.state.form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                <Form.Item label="Banner">
                    <UploadPhoto imageUrl={this.state.form.imageUrl}></UploadPhoto>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" nativeType="submit">保存</Button>
                </Form.Item>
            </Form>
        )
    }
}
