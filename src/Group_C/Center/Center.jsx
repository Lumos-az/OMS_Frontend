import React, {Component} from 'react';
import {Layout, Button, Space} from "antd";
import TopBar from "../../Component/TopBar";
import { Link } from 'react-router-dom';
import ProductList from "../Component/ProductList";
import '../assets/css/MainPage.css'
const {Header, Content} = Layout

class Center extends Component{
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='yourcontent'>
                    <Space size={200}>
                    <Button type={"primary"}>
                        <Link to={'/history'}>
                            浏览记录
                        </Link>
                    </Button>
                    <Button type={'primary'}>
                        <Link to={'/favor'}>
                            我的收藏
                        </Link>
                    </Button>
                    <Button type={'primary'}>
                        <Link to={'/order'} >
                            订单
                        </Link>
                    </Button>
                        {/*<Button type={'primary'}>*/}
                        {/*    <Link to={'/prescription'} >*/}
                        {/*        处方*/}
                        {/*    </Link>*/}
                        {/*</Button>*/}
                    </Space>
                </Content>
            </Layout>
        )
    }
}

export default Center;