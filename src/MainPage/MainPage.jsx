import React, {Component} from 'react';
import {Layout} from "antd";
import TopBar from "../Component/TopBar";
import BasicInformation from '../Part1File/BasicInformation.jsx'
const {Header, Content} = Layout


class MainPage extends Component{
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent' >
                    <BasicInformation></BasicInformation>
                </Content>
            </Layout>
        )
    }
}



export default MainPage;
