import React, { Component } from 'react'
import {Layout,Form,Input,Button, Message} from 'element-react'
import axios from 'axios'
import UpLoadImg from '../../component/upLoadImg/upLoadImg'
export default class MoudleBanner extends Component {
    state = {
        labelPosition: 'right',
        form: {
            title: '',
            descript: ''
        },
        page:{
            "currentPage": 1,
            "pageSize": 10
        },
        BannerUrl:null,
        topArticle:null
    }
    onChange(key, value) {
        this.setState({
            form: Object.assign(this.state.form, { [key]: value })
        });
    }
    save=()=>{
        axios.post('/component/updateBanner',{
            "componentId": this.state.topArticle?this.state.topArticle.componentId:null,
            "mediumUrl": this.state.BannerUrl,
            "subtitle": this.state.form.descript,
            'bannerType':this.props.type,
            "title": this.state.form.title
        }).then(res=>{
            if(res.code===200){
                Message('保存成功,smile')
            }
        })
    }
    getBanner(){
        axios.post('/component/getTop',{
            "componentType": this.props.type,
            "page": this.state.page
            }
        ).then(res=>{
            if(res.code !== 200 || !res.data) return
            this.setState({
                topArticle:res.data,
                form:{
                    title: res.data.title,
                    descript: res.data.subtitle
                },
                BannerUrl:res.data.mediumUrl
            })
        })
    }
    onSuccess=(response, file, fileList)=>{
        console.log(response)
        this.setState({
            BannerUrl:response.data
        })
    }
    handleRemove=(file, fileList)=>{
        console.log(file)
        this.setState({
            BannerUrl:null
        })
    }
    onProgressIng=()=>{

    }
    componentWillMount(){
        this.getBanner()
    }
    handleChange=(url)=>{
        this.setState({
            BannerUrl:url
        })
    }
    render() {
        return (
            <div>
                <Layout.Row>
                    <Layout.Col span="18" offset = "">
                        <br/>
                        <Form labelPosition={this.state.labelPosition} labelWidth="100" model={this.state.form} className="demo-form-stacked">
                            
                            <Form.Item label="标题">
                            
                            <Input value={this.state.form.title} placeholder='中文标题' onChange={this.onChange.bind(this, 'title')}></Input>
                            </Form.Item>
                            <Form.Item label="描述标题">
                            <Input value={this.state.form.descript} placeholder='描述标题' onChange={this.onChange.bind(this, 'descript')}></Input>
                            </Form.Item>
                            <Form.Item label="Banner">
                                <UpLoadImg onChange={this.handleChange} defaultImg={this.state.BannerUrl}></UpLoadImg>
                                
                            </Form.Item>
                            <Form.Item label="">
                                <div>建议尺寸：1320*320</div>
                                <Button onClick={()=>this.save() }type='primary'>保存</Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}
