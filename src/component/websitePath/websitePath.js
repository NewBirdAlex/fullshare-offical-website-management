import React, { Component } from 'react';
import {Breadcrumb} from 'element-react';
import { withRouter } from 'react-router';
import './websitePath.less';
import MenuData from '../../component/navBar/menuData';


class WebsitePath extends Component {
    state = {}

    render(){
        const { location } = this.props;
        // console.log('location:', location);
        var path = MenuData.findPath(location.pathname, MenuData.data);
        return (
            <div className="website_path">
                <Breadcrumb separator="/">
                    {path.map((item, i) => {
                        return <Breadcrumb.Item key={i}>{item.title}</Breadcrumb.Item>
                    })}
                </Breadcrumb>
            </div>
        );
    }
};

export default withRouter(WebsitePath);