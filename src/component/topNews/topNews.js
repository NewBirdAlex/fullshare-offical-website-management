import React, { Component } from 'react'
import {Table,Button} from 'element-react'

import './topNews.less'
import axios from '../../util/axios'
import emitter from '../../util/events'
import {Link} from 'react-router-dom'
import config from '../../util/config';

export default class ShowNews extends Component {
    state = {
        page:{
            "currentPage": 1,
            "pageSize": 10
        },
        topArtical:[],
        columns: [
            {
              label: this.props.type===2?"新闻资讯头条":'健康文摘头条',
              prop: "title",
              render: data=>{
                  return (
                      <div className="article_name">
                        <a style={{color:'black'}} target='_blank' href={ config.official + '#/InfoDetail/'+data.articleId}>{data.title}</a>
                      </div>
                  )
              }
            },
            {
              label: "日期",
              prop: "createdTime"
            },
            {
              label: "操作",
              prop: "createdTime",
              render:data=>{
                return <Link to={'/home/editArticle/'+data.articleId}><Button type="primary" icon="edit" size='small'>编辑</Button></Link>
                 
              }
            }
        ],
    }
    fmtDate(inputTime){
        
        var date = new Date(inputTime);    
        var y = date.getFullYear();      
        var m = date.getMonth() + 1;      
        m = m < 10 ? ('0' + m) : m;      
        var d = date.getDate();      
        d = d < 10 ? ('0' + d) : d;   
        return y + '-' + m + '-' + d

    }
    componentDidMount() {
        // 组件装载完成以后声明一个自定义事件
        this.eventEmitter = emitter.addListener('setTopChange', (message) => {
            
            this.getTop();
        });
    }
    componentWillUnmount() {
        emitter.removeListener('setTopChange',this.eventEmitter._events['setTopChange']);
    }
    componentWillMount(){
        this.setState({
            type:this.props.type
        })
        this.getTop();
    }
    getTop=()=>{
        axios.post('/component/getTop',{
                "componentType": this.props.type,
                "page": this.state.page
            }
        ).then(res=>{
            res.data.createdTime = this.fmtDate(res.data.createdTime)
            this.setState({
                topArtical:[res.data]
            })
        })
    }
    render() {
        return (
        <div>
            {
                this.state.topArtical?<Table
                style={{width: '100%'}}
                columns={this.state.columns}
                data={this.state.topArtical}
                />:null
            }
        </div>
        )
    }
}
