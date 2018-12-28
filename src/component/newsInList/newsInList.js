import React, { Component } from 'react'
import {Table,Button,Pagination,Message} from 'element-react'
import {Link,withRouter} from 'react-router-dom'
import axios from '../../util/axios'
import './newsInList.less'
import emitter from '../../util/events'
import MenuData from '../navBar/menuData'
import config from '../../util/config'

 class NewsInList extends Component {
    state = {
        page:{
            currentPage: 1,
            pageSize: 9,
            totalSize:100
        },
        name:null,
        columns: [
            {
                type: 'index',
                prop:''
            },
            {
                label: '文章列表',
                prop: "title",
                render: data=>{
                    return (
                        <div className="article_name">
                            <a style={{color:'black'}} target='_blank' href={config.official + '#/InfoDetail/'+data.articleId} title={data.title}>{data.title}</a>
                        </div>
                    )
                }
            },
            {
                label: "日期",
                prop: "deployTime"
            },
            {
                label: "操作",
                prop: "",
                render:data=>{
                    return <div className='button-list'>
                            {this.props.type===4||this.props.type===5||this.props.type===6||this.props.type===7||this.props.type===8?null:<Button type="primary" icon="setting" size='small' onClick={()=>this.setArticalToTop(data.componentId)}>设为头条</Button>}
                            <Link to={'/home/editArticle/'+data.articleId}><Button type="primary" icon="edit" size='small'>编辑</Button></Link>
                            <Button type="primary" icon="delete" size='small' onClick={()=>this.removeArticle(data)}>删除</Button>
                            <Button type="warning"  size='small' onClick={()=>this.changeArticleStatus(data)}>{data.deployStatus!==1?'展示':'隐藏'}</Button>
                    </div>
                }
            }
        ],
        list:[]
    }
    removeArticle=(data)=>{
        axios.post('/component/remove',{
            componentIdList:[data.componentId],
            componentType:data.componentType
        }).then(res=>{
            if(res.code===200){
                Message('删除成功')
                let list = this.state.list.filter(item=>item.articleId!==data.articleId);
                this.setState({
                    list
                })
            }
        })
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
    setArticalToTop(id){
        axios.post('/component/setTop',{
            componentId:id,
            componentType:this.props.type
        }).then(res=>{
            
            if(res.code === 200){
                Message('设置成功');

                if(this.props.type===2||this.props.type===3) emitter.emit('setTopChange');
            }
        })
    }
    getList(){
        axios.post('/component/list',{
            
            "componentType": this.props.type,
            "page":this.state.page
        }).then(res=>{
           
            res.data.map(item=>item.deployTime=this.fmtDate(item.deployTime));
            this.setState({
                list:res.data,
                page:res.page
            })
        })
    }
    componentDidMount(){
        // console.log(this)
        
       this.getList();
       
    }   
    changeArticleStatus=(data)=>{
        axios.post('/component/updateDeployStatus',{
            "componentId": data.componentId,
            "deployStatus": data.deployStatus===1?0:1
        }).then(res=>{
           console.log('success')
           this.getList();
        })
    }
    changePage = (index)=>{
        
        this.setState({
            page:{...this.state.page,currentPage:index}
        });
        setTimeout(()=>this.getList(),0)
        // this.getList();
    } 
    go = (type)=>{
        localStorage.setItem('addArticle',type)
        // console.log(this.props)
        this.props.history.push('/home/editArticle');
    }
    render() {
        const { location } = this.props;
        var path = MenuData.findPath(location.pathname, MenuData.data);
        var columns = this.state.columns;
        columns[1].label = path.length ? path[path.length-1].title : '文章列表';

        return (
            <div className='listwrap'>
                {this.state.list.length?<Table
                style={{width:'100%'}}
                columns={columns}
                data={this.state.list}
                onSelectChange={(selection) => { console.log(selection) }}
                onSelectAll={(selection) => { console.log(selection) }}
                />:'暂无数据'}
                <br/>
                <br/>
                <br/>
                {this.props.type!==8?<Button onClick={()=>{this.go(this.props.type)}} type="primary"> 新增文章</Button>:<Link to={'/home/addHighMake'} ><Button type="primary"> 新增项目</Button></Link> }
                
                <br/>
                <br/>
                <div className="block">
                    {this.state.list.length?<Pagination layout="prev, pager, next, jumper" 
                    onCurrentChange={(index)=>this.changePage(index)}
                    total={this.state.page.totalSize||0} pageSize={this.state.page.pageSize||0} currentPage={this.state.page.currentPage||1}/>:''}
                </div>
            </div>
        )
  }
}
export default withRouter(NewsInList)