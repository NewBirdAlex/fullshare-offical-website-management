import React, { Component } from 'react'
import './login.less'
import logImg from '../../images/logo_home_b.png';

import {Input,Layout,Button} from 'element-react';
import axios from '../../util/axios'
export default class Login extends Component {
    
    username = React.createRef();
    password = React.createRef();
    signIn =()=>{
      
        // console.log(this.username.current.refs.input.value)
        // this.props.history.push('/home');
        let username = this.username.current.refs.input.value;
        let password = this.password.current.refs.input.value;
        axios.post('system/login',{
            account:username,
            password
        }).then(res=>{
            console.log(res)
            if(res.code === 200){
                localStorage.setItem('user',JSON.stringify(res.data))
                axios.defaults.headers.common['Authorization'] =res.data.accessToken;
                this.props.history.push('/home');
            } else{
                alert(res.data.msg)
            }
            
        })
    }     
    render() {
        return (
            <div className = "login">
                <div className="top">
                    <img src={logImg} alt=""/> 网站管理后台
                </div>
                <Layout.Row gutter="20">
                    <Layout.Col span="3" offset="6" className='tr'> 
                    用户名 ：
                    </Layout.Col>
                    <Layout.Col span="6" ><Input placeholder="请输入用户名" defaultValue='' type='text'  ref={this.username} /></Layout.Col>
                </Layout.Row>
                <Layout.Row gutter="20">
                    <Layout.Col span="3" offset="6" className='tr'>
                    密码 ：
                    </Layout.Col>
                    <Layout.Col span="6" ><Input placeholder="请输入密码" type='password'  ref={this.password} /></Layout.Col>
                </Layout.Row>
                <Button type="primary" size="large" onClick={this.signIn}>登录</Button>
            </div>
        )
    }
}
