import React from 'react';
import {CacheLink, Link,Route} from 'react-keeper';
import { Menu } from 'antd';

import {HomeOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';
import MainPage from "../MainPage/MainPage";
import Cart from "../Cart/Cart";
import Center from "../Center/Center";

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
                    <MenuItem key = "在线药房" icon={<HomeOutlined/>}>
                        <Link to='/'> 在线药房 </Link>
                    </MenuItem>
                    <MenuItem key = "购物车" icon={<ShoppingCartOutlined />}>
                        <Link to='/cart'> 购物车 </Link>
                    </MenuItem>
                    <MenuItem key = "个人中心" icon={<HomeOutlined/>}>
                        <Link to='/center'> 个人中心 </Link>
                    </MenuItem>
                    {/*<MenuItem key = "模块3" icon={<HomeOutlined/>}>*/}
                    {/*    <Link to = "./drugstore.html"> Online Drugstore </Link>*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem key = "模块4" icon={<HomeOutlined/>}>*/}
                    {/*    <Link to = "/"> 模块4 </Link>*/}
                    {/*</MenuItem>*/}
                </Menu>
            </div>
        )
    }
}

export default TopMenu