import React, { Component } from 'react';
import {Menu} from 'element-react';
import {NavLink} from 'react-router-dom';

export default class NavMenuItem extends Component {
    state = {}

    render(){
        if(!this.props.model) return <div>请设置props.model属性！</div>;
        if(this.props.model.submenu && this.props.model.submenu.length){
            return (
                <Menu.SubMenu title={this.props.model.title} index={this.props.path.join('-')}>
                    {this.props.model.submenu.map((item, i) => {
                        return <NavMenuItem model={item} path={this.props.path.concat([i])} key={this.props.path.concat([i])}></NavMenuItem>
                    })}
                </Menu.SubMenu>
            );
        }
        return (
            <Menu.Item model={this.props.model} index={this.props.path.join('-')}>
                {this.props.model.url
                    ? <NavLink to={this.props.model.url} >{this.props.model.title}</NavLink>
                    : <a href="javascript:void(0);">{this.props.model.title}</a>
                }
            </Menu.Item>
        );
    }
}