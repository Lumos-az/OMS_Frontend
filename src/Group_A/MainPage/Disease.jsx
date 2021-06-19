import React, {Component} from 'react';
import {Col, Layout,Image,Row,Card,Badge,PageHeader,Menu,Divider,Descriptions,Button} from "antd";
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css'
import { Anchor,Affix} from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
const { Link } = Anchor;
const defaultUrl = 'http://10.112.196.176:5003';
const {Header, Content} = Layout

class Disease extends Component{
    
    constructor(props) {
        super(props);
        this.state={
            iid:this.props.match.params.iid,
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);  // 置顶代码
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/getDiseaseInfo?iid='+this.state.iid.toString(),
    }).then(res=>{
        console.log(res.data)
        this.setState({
            name:res.data.data.iname,
            desp:res.data.data.desp,
            reason:res.data.data.reason,
            symptom:res.data.data.symptom,
            treatment:res.data.data.treatment

        })
    })
    }
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content style={{ padding: 50, minHeight: '100vh' }} className='mycontent'>
                    <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
                        <Row gutter={16}>
                            <Col span={23}>
                                <Row gutter={16}>
                                    <Col span={24} style={{marginLeft:40}}>
                                        <PageHeader
                                            ghost={false}
                                            title={this.state.name}
                                            style={{fontSize:'larger'}}
                                            >
                                        </PageHeader>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{marginLeft:40}}>
                        
                            <Anchor className='ant-affix' offsetTop={80} targetOffset={80}>
                                <Link href="#abstract" title="概述" />
                                <Link href="#reason" title="病因" />
                                <Link href="#symptom" title="症状"></Link>

                                <Link href="#treatment" title="治疗" />
                            </Anchor>
                        
                        </Row>
                        <Row gutter={16}>
                            <Col span={24} style={{marginLeft:100}}>
                                <Card style={{marginRight:80,width:'78vw'}}>
                                    <Row>
                                        <div id='abstract'>
                                            <text style={{fontSize:20}}>
                                                概述
                                            </text>
                                            <br/>
                                            <text>
                                            {this.state.desp}
                                            </text>
                                        </div>
                                    </Row>
                                    <Divider plain></Divider>
                                    <Row>
                                        <div id='reason'>
                                            <text style={{fontSize:20}}>
                                            病因
                                            </text>
                                            <br/>
                                            <text>
                                            {this.state.reason}
                                            </text>
                                        </div>
                                    </Row>
                                    <Divider plain></Divider>
                                    <Row>
                                        <div id='symptom'>
                                            <text style={{fontSize:20}}>
                                            症状
                                            </text>
                                            <br/>
                                            <text>
                                            {this.state.symptom}
                                            </text>
                                            <br/>
                                            <text>
                                           
                                            </text>
                                        </div>
                                    </Row>
                                    <Divider plain></Divider>
                                    <Row>
                                        <div id='treatment'>
                                            <text style={{fontSize:20}}>
                                            治疗
                                            </text>
                                            <br/>
                                            <text>{this.state.treatment}</text>
                                        </div>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Disease;