import React from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';

import {HomeOutlined, ShoppingCartOutlined} from '@ant-design/icons';
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
                <Menu onClick={this.handleClick} selectedKeys={[window.location.pathname]}  mode="horizontal">
                    <MenuItem key = "/" icon={<HomeOutlined/>}>
                        <Link to = "/"> 首页 </Link>
                    </MenuItem>
                    <MenuItem key = "/Booking" icon={<HomeOutlined/>}>
                        <Link to = "/Booking"> 预约挂号</Link>
                    </MenuItem>
                    <MenuItem key = "/ChatRoom" icon={<HomeOutlined/>}>
                        <Link to = "/ChatRoom"> 在线诊疗 </Link>
                    </MenuItem>
                    <MenuItem key = "/bbs" icon={<HomeOutlined/>}>
                        <Link to = "/bbs"> 交流论坛 </Link>
                    </MenuItem>
                    <MenuItem key = "/artical/all" icon={<HomeOutlined/>}>
                        <Link to = "/artical/all"> 医疗资讯 </Link>
                    </MenuItem>
                    <MenuItem key = "/cart'" icon={<ShoppingCartOutlined />}>
                        <Link to='/cart'> 购物车 </Link>
                    </MenuItem>
                    <MenuItem key = "/center" icon={<HomeOutlined/>}>
                        <Link to='/center'> 药房中心 </Link>
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default TopMenu