import React, { Component } from 'react'
import {Menu} from 'element-react'
import {NavLink} from 'react-router-dom'
import './navBar.less'
export default class NavBar extends Component {
  render() {
    return (
      <div className = 'navBar'>
        <Menu  theme="dark" className="navBarContent" style={{"minHeight":(window.innerHeight-70)+'px'}}>
          <Menu.Item index="1"><NavLink to='/home/setting' >网站设定</NavLink></Menu.Item>
          <Menu.SubMenu title='首页' index='2'>
            <Menu.Item index="2-1"><NavLink to='/home/banner' >Banner</NavLink></Menu.Item>
            {/* <Menu.Item index="2"><NavLink to='/home/footer' ><i className="el-icon-picture"></i>页尾</NavLink></Menu.Item> */}
          </Menu.SubMenu>
          <Menu.SubMenu title='丰盛' index='3'>
            <Menu.SubMenu title='关于丰盛' index='3-1'>
              {/* <Menu.Item index="3-1-1"><NavLink to='/home/editFsCulture' >介绍</NavLink></Menu.Item> */}
              <Menu.SubMenu title='业务介绍' index='3-1-2'>
                <Menu.Item index="3-1-2-1"><NavLink to='/home/building' >建设投资</NavLink></Menu.Item>
                <Menu.Item index="3-1-2-2"><NavLink to='/home/health' >健康服务</NavLink></Menu.Item>
                <Menu.Item index="3-1-2-3"><NavLink to='/home/travel' >文化旅游</NavLink></Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.Item index="3-2"><NavLink to='/home/editFsCulture' >丰盛文化</NavLink></Menu.Item>
            <Menu.Item index="3-3"><NavLink to='/home/culture' >文化活动</NavLink></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item index="4"><NavLink to='/home/healthlist' >健康</NavLink></Menu.Item>
          <Menu.Item index="5"><NavLink to='/home/newslist' >资讯</NavLink></Menu.Item>

          {/*
          <Menu.Item index="3"><NavLink to='/home/newslist'><i className="el-icon-information"></i>新闻资讯</NavLink></Menu.Item>
          <Menu.Item index="4"><NavLink to='/home/healthlist'><i className="el-icon-date"></i>健康文摘</NavLink></Menu.Item>
          <Menu.Item index="6"><NavLink to='/home/editFsCulture'><i className="el-icon-date"></i>丰盛文化</NavLink></Menu.Item>
          <Menu.SubMenu title='关于丰盛' index='5'>
            <Menu.Item index="5-1"><NavLink to='/home/building'><i className="el-icon-setting"></i>绿色建筑</NavLink></Menu.Item>
            <Menu.Item index="5-2"><NavLink to='/home/health'><i className="el-icon-setting"></i>健康服务</NavLink></Menu.Item>
            <Menu.Item index="5-3"><NavLink to='/home/travel'><i className="el-icon-setting"></i>文化旅游</NavLink></Menu.Item>
            <Menu.Item index="5-4"><NavLink to='/home/culture'><i className="el-icon-setting"></i>文化活动</NavLink></Menu.Item>
             <Menu.Item index="5-5"><NavLink to='/home/highMake'><i className="el-icon-setting"></i>高端制造</NavLink></Menu.Item> */}
        </Menu>
      </div>
    )
  }
}
