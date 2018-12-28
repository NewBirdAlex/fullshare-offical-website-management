import React, { Component } from 'react'
import {Layout,Form,Input,Button,Notification} from 'element-react'
import UpLoadImg from '../../component/upLoadImg/upLoadImg'
import axios from '../../util/axios'

export default class EditFsCulture extends Component {
    state = {
        articleCover:null,
        form:{
            title1:'title 1',
            title2:'title 2',
            title3:'title 3',
            desc1:'desc1',
            desc2:'desc2',
            desc3:'desc3',
            desc4:'desc4',
            desc5:'desc5',
            desc6:'desc6',
            val1:'val1',
            val2:'val2',
            val3:'val3',
            val4:'val4',
        }
    }
    imgChange=(url)=>{
        // console.log(url)
        this.setState({
            articleCover: url
        })
    }
    handleSubmit=()=>{
        axios.post('/culture/updateCulture',{
            "bannerUrl": this.state.articleCover,
            "fence1": {
              "fenceDesc": this.state.form.desc1,
              "fenceTitle": this.state.form.title1,
              "keyCode": this.state.form.keyCode1
            },
            "fence2": {
              "columnList": [
                {
                  "columnDesc": this.state.form.desc2,
                  "columnTitle": this.state.form.val1
                },
                {
                    "columnDesc": this.state.form.desc3,
                    "columnTitle": this.state.form.val2
                },
                {
                    "columnDesc": this.state.form.desc4,
                    "columnTitle": this.state.form.val3
                },
                {
                    "columnDesc":this.state.form.desc5,
                    "columnTitle": this.state.form.val4
                },
              ],
              "fenceDesc": "",
              "fenceTitle": this.state.form.title2,
              "keyCode": this.state.form.keyCode2
              
            },
            "fence3": {
              "fenceDesc": this.state.form.desc6,
              "fenceTitle": this.state.form.title3,
              "keyCode": this.state.form.keyCode3
            },
            "language": "zh_CN",
            "qrCodeUrl": this.state.articleCover
        }).then(res=>{
            if(res.code===200){
                Notification({
                    title: '更新',
                    message: '成功'
                  });

            }
        },err=>{

        })
    }
    getCulture = ()=>{
        axios.post('/culture/getCulture',{
            'language':'zh_CN'
        }).then(res=>{
            console.log(res)
            if(res.code !== 200) return
            this.setState({
                form:{
                    title1:res.data.fence1.fenceTitle,
                    title2: res.data.fence2.fenceTitle,
                    title3:res.data.fence3.fenceTitle,
                    desc1:res.data.fence1.fenceDesc,
                    desc2:res.data.fence2.columnList[0].columnDesc,
                    desc3:res.data.fence2.columnList[1].columnDesc,
                    desc4:res.data.fence2.columnList[2].columnDesc,
                    desc5:res.data.fence2.columnList[3].columnDesc,
                    desc6:res.data.fence3.fenceDesc,
                    val1:res.data.fence2.columnList[0].columnTitle,
                    val2:res.data.fence2.columnList[1].columnTitle,
                    val3:res.data.fence2.columnList[2].columnTitle,
                    val4:res.data.fence2.columnList[3].columnTitle,
                    keyCode1:res.data.fence1.keyCode,
                    keyCode2:res.data.fence2.keyCode,
                    keyCode3:res.data.fence3.keyCode
                },
                articleCover:res.data.bannerUrl
            })
        })
    }
    onChange=(key, value)=>{
        this.state.form[key] = value;
        this.forceUpdate();
    }
    componentWillMount(){
        this.getCulture();
    }
    render() {
        return (
            <div style={{margin:'20px'}}>
                <Layout.Row>
                    
                    <Layout.Col span="24"> <h1> 栏目一</h1></Layout.Col>
                    <Layout.Col span="16"> 
                        <Form  labelWidth="100" >
                            <Form.Item label="标题" >
                                <Input type="text"  value={this.state.form.title1} onChange={this.onChange.bind(this, 'title1')}  autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="描述" >
                                <Input type="textarea" value={this.state.form.desc1} onChange={this.onChange.bind(this, 'desc1')} autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="二维码" >
                                <UpLoadImg onChange={this.imgChange} defaultImg={this.state.articleCover}></UpLoadImg>
                                <p className='grayColor'>建议尺寸：100x100</p>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                    
                </Layout.Row>
                <hr/>
                <Layout.Row gutter="10">
                    
                    <Layout.Col span="24"> 
                        <h1> 栏目二</h1>
                        <Layout.Col span="16"> 
                            <Form  labelWidth="100" >
                                <Form.Item label="标题二" >
                                    <Input type="text"  value={this.state.form.title2} onChange={this.onChange.bind(this, 'title2')}  autoComplete="off" />
                                </Form.Item>
                            </Form>
                        </Layout.Col>
                    </Layout.Col>
                    
                    <Layout.Col span="8"> 
                        <Form  labelWidth="100" >
                            <Form.Item label="价值观1" >
                                <Input type="text" value={this.state.form.val1} onChange={this.onChange.bind(this, 'val1')}  autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="描述" >
                                <Input type="textarea" value={this.state.form.desc2} onChange={this.onChange.bind(this, 'desc2')}  autoComplete="off" />
                                <p className='grayColor'>字数限制：32个字符以内</p>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                    <Layout.Col span="8"> 
                        <Form  labelWidth="100" >
                            <Form.Item label="价值观2" >
                                <Input type="text" value={this.state.form.val2} onChange={this.onChange.bind(this, 'val1')} autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="描述" >
                                <Input type="textarea" value={this.state.form.desc3} onChange={this.onChange.bind(this, 'desc3')}   autoComplete="off" />
                                <p className='grayColor'>字数限制：32个字符以内</p>
                                
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                    <Layout.Col span="8"> 
                        <Form  labelWidth="100" >
                            <Form.Item label="价值观3" >
                                <Input type="text" value={this.state.form.val3} onChange={this.onChange.bind(this, 'val1')}  autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="描述" >
                                <Input type="textarea" value={this.state.form.desc4} onChange={this.onChange.bind(this, 'desc4')}  autoComplete="off" />
                                <p className='grayColor'>字数限制：32个字符以内</p>
                                
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                    <Layout.Col span="8"> 
                        <Form  labelWidth="100" >
                            <Form.Item label="价值观4" >
                                <Input type="text" value={this.state.form.val4} onChange={this.onChange.bind(this, 'val1')} autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="描述" >
                                <Input type="textarea" value={this.state.form.desc5} onChange={this.onChange.bind(this, 'desc5')}  autoComplete="off" />
                                <p className='grayColor'>字数限制：32个字符以内</p>
                                
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                </Layout.Row>
                <hr/>
                <Layout.Row>
                    
                    <Layout.Col span="24"> <h1> 栏目三</h1></Layout.Col>
                    <Layout.Col span="16"> 
                        <Form  labelWidth="100" >
                            <Form.Item label="标题" >
                                <Input type="text" value={this.state.form.title3} onChange={this.onChange.bind(this, 'title3')} autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="描述" >
                                <Input type="textarea" value={this.state.form.desc6} onChange={this.onChange.bind(this, 'desc6')}  autoComplete="off" />
                            </Form.Item>
                            <Form.Item label="" >
                                <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                            </Form.Item>
                        </Form>
                    </Layout.Col>
                    
                </Layout.Row>
            </div>
        )
    }
}
