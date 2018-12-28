import React, { Component } from 'react'
import {Upload,Dialog,Button,Icon,Loading,Message} from 'element-react'
import config from '../../util/config'
import axios from '../../util/axios'
import './banner.less'
export default class Banner extends Component {
    state = {
        dialogImageUrl: '',
        imgList:[],
        showLoading:false,
        dialogVisible: false,
    }
    uploadBtn = React.createRef();
    handleRemove=(index)=>{
        let arr = this.state.imgList;
        this.showLoading();
        axios.post('/component/updateBanner',{
            "componentId": arr[index].componentId,
            "mediumUrl": ""
        }).then(res=>{
            this.hideLoading();
            arr[index].mediumUrl='';
            this.setState({
                imgList:arr
            })
        })
        
        
    }
    removeBanner(){

    }
    onSuccess=(response, file, fileList)=>{
        
        this.hideLoading();
        this.addBanner(response.data)
        
    }
    addBanner(url){

        if(localStorage.getItem('updateIndex')){
            let index = localStorage.getItem('updateIndex');
            this.showLoading();
            let arr = this.state.imgList;
            axios.post('/component/updateBanner',{
                "componentId": arr[index].componentId,
                "mediumUrl": url
            }).then(res=>{
                this.hideLoading();
                arr[index].mediumUrl=url;
                this.setState({
                    imgList:arr
                })
            })
            localStorage.removeItem('updateIndex')
        }else{
            axios.post('/component/addBanner',{
                bannerType:1,
                "mediumUrl": url,
                "sortNum": this.state.imgList.length+1,
                "subtitle": "banner",
                "title": "首页banner"
            }).then(res=>{
                Message('hi,上传成功！');
                let arr = this.state.imgList;
                arr.push(res.data)
                this.setState({
                    imgList:arr
                })
            })
        }
        
    }
    onProgressIng = ()=>{
        this.showLoading();
        
    }
    showLoading(){
        this.setState({
            showLoading:true
        })
    }
    hideLoading(){
        this.setState({
            showLoading:false
        })
    }
    componentDidMount=()=>{
        axios.post('/component/list',{ 
        "componentType": 1,
        "page": {
          "currentPage": 1,
          "pageSize": 100,
          "startIndex": 1,
          "totalPage": 1,
          "totalSize": 1
        }}).then(res=>{
            console.log(res)
            this.setState({
                imgList:res.data
            })
        })
    }
    submit=()=>{

        axios.post('/component/list',{ 
            "componentType": 1,
            "page":this.state.imgList}).then(res=>{
            })
    }
    replaceImg=(index)=>{
        document.querySelector('.uploadBtn').click();
        localStorage.setItem('updateIndex',index)
    }
    render() {
        const { dialogImageUrl, dialogVisible } = this.state;
        return (
        <div className='mybanner'>
            <h3>首页Banner图片 （建议尺寸1920*590）</h3> 
            <br/>
            {
                this.state.imgList.map((item,index)=>{
                    return item.mediumUrl?<div key={index} className="bannerList" >
                        {item.mediumUrl?<img src={item.mediumUrl} alt = "" onClick={()=>this.replaceImg(index)} />:''}
                        <span onClick={()=>this.handleRemove(index)}>
                            <Icon name="close" />

                        </span>
                    </div>:null
                })
            }
            <p>点击上方图片更换</p>
            <br/>
            {this.state.showLoading?<Loading text="拼命加载中"></Loading>:''}
            <Upload
                action={config.path+"/common/2.0.0/upload/file"}
                // listType="picture"
                
                onSuccess={(response, file, fileList) => this.onSuccess(response, file, fileList)}
                onProgress = {()=>this.onProgressIng()}
                onRemove={(file, fileList) => this.handleRemove(file, fileList)}
            >
                <Button size="small" className='uploadBtn' type="primary" ref={this.uploadBtn} >添加banner</Button>
            </Upload>
            <Dialog
                visible={dialogVisible}
                size="tiny"
                onCancel={() => this.setState({ dialogVisible: false })}
            >
                <img width="100%" src={dialogImageUrl} alt="" />
            </Dialog>
            {/* <Button style={{'margin':'50px'}} onClick={this.submit}>保存</Button> */}
        </div>
        )
    }
}
