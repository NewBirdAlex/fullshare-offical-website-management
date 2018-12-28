import React, { Component } from 'react'
import {Upload,Button} from 'element-react'
import config from '../../util/config'
import './upLoadImg.less'
export default class UpLoadImg extends Component {
    state={
        url:this.props.defaultImg||null
    }
    onSuccess=(response, file, fileList)=>{
        this.setState({
            url:response.data
        })
        this.props.onChange(response.data)
    }
    handleRemove=()=>{
        this.props.onChange(null)
        this.setState({
            url:null
        })
    }
    componentWillMount(){
        // console.log(this.props)
    }
    componentWillReceiveProps(){
        // console.log(this.props.defaultImg)
    }
    render() {
        return (
            <div>
                {
                    (this.state.url || this.props.defaultImg)
                    ?
                        <div className='uploadimg_wrap'>
                            <img src={this.state.url||this.props.defaultImg}  alt=''/>
                            <i className='el-icon-circle-cross' onClick={()=>this.handleRemove()}></i>
                        </div>
                    :
                        <Upload
                            action={config.path+"/common/2.0.0/upload/file"}
                            // listType="picture"
                            onSuccess={(response, file, fileList) => this.onSuccess(response, file, fileList)}
                            onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                        >
                            {this.state.BannerUrl?null:<Button size="small" type="primary">添加图片</Button>}
                        </Upload>
                }
                
            </div>
            
        )
    }
}
