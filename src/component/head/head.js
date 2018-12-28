import React, { Component } from 'react';
// import {Menu} from 'element-react';
import logImg from '../../images/logo_home_b.png';
import './head.less'
import {withRouter} from 'react-router-dom'
import config from '../../util/config'

class Head extends Component {
    state = {
        user:null
    }
    componentWillMount(){
        let user = JSON.parse(localStorage.getItem('user'))
        user?this.setState({
            user
        }):'';
    }
    onSelect = ()=>{

    }
    logout=()=>{
        console.log(111)
        console.log(this.props)
        this.props.history.push('/login')
    }
    render() {
        return (
            this.state.user?<div className='header'>
                <img src={logImg} alt=""/>
                <span className="name">网站管理系统</span>
                <div className="sign">
                    <a href={config.official} rel="noopener noreferrer" target="_blank">网站首页</a> | 账号：{this.state.user.userName}
                    <span className="exit_btn" onClick={()=>this.logout()}>退出</span>
                </div>
            </div>:null
        )
    }
}

export default withRouter(Head)
