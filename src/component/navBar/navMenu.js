import React, { Component } from 'react';
import {Menu} from 'element-react';
import NavMenuItem from './navMenuItem';
import MenuData from './menuData';
import './navBar.less';

export default class NavMenu extends Component {
    state = {
        menu : MenuData.data
    }

    render(){
        return (
            <div className = 'navBar'>
                <Menu 
                    theme="dark" 
                    className="navBarContent" 
                    style={{"minHeight":(window.innerHeight-70)+'px'}}
                >
                    {this.state.menu.map((item, i) => {
                        return <NavMenuItem model={item} path={[i]} key={i}></NavMenuItem>
                    })}
                </Menu>
            </div>
        )
    }
}