import React from 'react';
import {Layout, Menu, Breadcrumb, Form, Input, Cascader, Checkbox, Button, message} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../assets/css/PersonalInfo.css';
import BasicInformation from "../MainPage/BasicInformation";
import axios from "axios";
import UserInfo from "./UserInfo";
import UserAppointment from "./UserAppointment";
import UserCounsel from "./UserCounsel";


let storage = window.localStorage;
const defaultUrl = 'http://127.0.0.1:5003';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// let temp = storage['address']
// let userAddress = ['','','']
// for (let i = 0; i < temp.length; i++) {
//     let count = 0
//     if (temp[i] !== ',') {
//         userAddress[count] = userAddress[count] + temp[i]
//     } else {
//         count++;
//     }
// }

class PersonalCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:storage['user'],
            identity:storage['identity'],
            nickname:storage['nickname'],
            address:'',
            collapsed: false,
            page:'0',
        }
    }

    componentDidMount() {
        console.log(this.state.identity)
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({
            collapsed: collapsed ,
        });
    };

    switchToCommonPage=()=>{
        this.setState({
            page:'0',
        })
    }

    switchToUserPage1=()=>{
        this.setState({
            page:'01',
        })
    }

    switchToUserPage2=()=>{
        this.setState({
            page:'02',
        })
    }

    switchToDocPage1=()=>{
        this.setState({
            page:'11',
        })
    }

    switchToDocPage2=()=>{
        this.setState({
            page:'12',
        })
    }

    switchToAdmPage1=()=>{
        this.setState({
            page:'21',
        })
    }

    switchToAdmPage2=()=>{
        this.setState({
            page:'32',
        })
    }

    commonUser = (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.switchToCommonPage}>
                个人中心
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={this.switchToUserPage1}>
                预约记录
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />} onClick={this.switchToUserPage2}>
                咨询记录
            </Menu.Item>
        </Menu>
    )

    doctorUser = (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.switchToCommonPage}>
                个人中心
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={this.switchToDocPage1}>
                预约记录
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />} onClick={this.switchToDocPage2}>
                咨询记录
            </Menu.Item>
        </Menu>
    )

    adminUser = (
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.switchToCommonPage}>
                个人中心
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} onClick={this.switchToAdmPage1}>
                XX
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />} onClick={this.switchToAdmPage2}>
                XXX
            </Menu.Item>
        </Menu>
    )


    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"><Link to="/">返回</Link></div>
                    {
                        (this.state.identity==='0')?(
                            this.commonUser
                        ):(
                            (this.state.identity==='1')?(
                                this.doctorUser
                            ):(
                                this.adminUser
                            )
                        )
                    }
                </Sider>

                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>用户名</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.nickname}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {
                                (this.state.page==='1')?(
                                    <UserInfo></UserInfo>
                                ):(
                                    (this.state.page==='2')?(
                                        <UserAppointment></UserAppointment>
                                    ):(
                                        <UserCounsel></UserCounsel>
                                    )
                                )
                            }

                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>SE Design ©2021 Created by Online Medical System</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default PersonalCenter;
