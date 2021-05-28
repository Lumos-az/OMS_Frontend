import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';

import {HomeOutlined} from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';

var storage = window.localStorage;


class TopMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current:storage.getItem("TopBarKey"),
        }
    }

    handleClick = e => {
        this.setState({
            current:e.key,
        });
        storage.setItem("TopBarKey",e.key);
    };

    render() {
        return(
            <div className="TopMenu">
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <MenuItem key = "首页" icon={<HomeOutlined/>}>
                        <Link to = "/"> 首页 </Link>
                    </MenuItem>
                    <MenuItem key = "模块1" icon={<HomeOutlined/>}>
                        <Link to = "/"> 模块1 </Link>
                    </MenuItem>
                    <MenuItem key = "模块2" icon={<HomeOutlined/>}>
                        <Link to = "/"> 模块2 </Link>
                    </MenuItem>
                    <MenuItem key = "模块3" icon={<HomeOutlined/>}>
                        <Link to = "/"> 模块3 </Link>
                    </MenuItem>
                    <MenuItem key = "模块4" icon={<HomeOutlined/>}>
                        <Link to = "/"> 模块4 </Link>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default TopMenu