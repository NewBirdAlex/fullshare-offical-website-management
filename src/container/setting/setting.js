import React, { Component } from 'react'

import {Form,Input,Layout,Button, Message} from 'element-react'
import axios from '../../util/axios';

export default class Setting extends Component {
    state = {
        form:{
            name:'',
            englishname:'',
            keywords:'',
            description:''
        },
        content:null
    }
    onSubmit(e) {
        axios.post('system/setDict',{
            parentCode:'SETTING',
            key:'SETTING',
            sortNo:0,
            description:this.state.form.description,
            keyValue:this.state.form.name,
            value1:this.state.form.englishname,
            value2:this.state.form.keywords
        }).then(res=>{
            if(res.code===200) Message('设置成功')
        })
    }
      
    onChange(key, value) {
        this.setState({
            form: Object.assign(this.state.form, { [key]: value })
        });
    }
    getData(){
        axios.post('/system/getDict',{
            key:'SETTING',
            parentCode:'SETTING'
        }).then(res=>{
            this.setState({
                form:{
                    name:res.data.keyValue,
                    englishname:res.data.value1,
                    keywords:res.data.value2,
                    description:res.data.description
                },
                content:res.data
            })
        })
    }
    componentWillMount(){
        this.getData();
    }
    render() {
        return (
        <div>
            <br/>
            <Layout.Row gutter="20">
                <Layout.Col span="18" offset="1">
                    <Form model={this.state.form} labelWidth="200" onSubmit={this.onSubmit.bind(this)}>
                        <Form.Item label="网站抬头（中）">
                            <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                        </Form.Item>
                        <Form.Item label="网站抬头（英）">
                            <Input value={this.state.form.englishname} onChange={this.onChange.bind(this, 'englishname')}></Input>
                        </Form.Item>
                        <Form.Item label="Keywords">
                            <Input value={this.state.form.keywords} rows={7} type="textarea" autosize={true}  onChange={this.onChange.bind(this, 'keywords')}></Input>
                        </Form.Item>
                        <Form.Item label="description">
                            <Input value={this.state.form.description} rows={7} type="textarea" autosize={true} onChange={this.onChange.bind(this, 'description')}></Input>
                        </Form.Item>
                        <Form.Item label="">
                            <Button type="primary" onClick={()=>this.onSubmit()}>保存</Button>
                        </Form.Item>
                    </Form>
                    
                </Layout.Col>
                
            </Layout.Row>
        </div>
        )
    }
}
