import React, { Component } from 'react'
import {Upload,Button} from 'element-react'
import config from '../../util/config'

export default class AddCover extends Component {
  state = {
    showButton:true,
    articleCover:''
  }
  handleRemove(file, fileList) {
    console.log(file, fileList);
    this.props.onchange('');
    this.setState({
        articleCover: '',
        showButton:true
    })
   }
     
  handlePictureCardPreview(file) {
      console.log(this.props)
      this.props.onchange(file.data);
      this.setState({
          articleCover: file.data,
          showButton:false
      })
  }
  render() {
    return (
      <div>
          <Upload
              action={config.path+"/common/2.0.0/upload/file"}
              listType="picture"
              onSuccess={file => this.handlePictureCardPreview(file)}
              onRemove={(file, fileList) => this.handleRemove(file, fileList)}
          >
              {this.state.showButton?<Button type = 'primary'>上传图片</Button>:''}
          </Upload>
      </div>
    )
  }
}





