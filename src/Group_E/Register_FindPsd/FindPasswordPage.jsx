import React, { useState, Component } from 'react';
import {Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, message} from 'antd';
import TopBar from "../Component/TopBar";
import '../assets/css/FindPasswordForm.css';
import axios from "axios";
const {Header, Content} = Layout
const { Option } = Select;

var storage=window.localStorage;
const defaultUrl = 'http://127.0.0.1:5003';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class FindPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            email:'',
            uid:'',
        }
    }

    getEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }

    getUid=(e)=>{
        this.setState({
            uid:e.target.value
        })
    }

    findPasswordPost=()=>{
        if (this.state.uid !== '' && this.state.email !== '') {
            this.setState({
                loading:true
            });

            let params = {
                uid:this.state.uid,
                email:this.state.email,
            }

            axios({
                baseURL:defaultUrl,
                method:'post',
                url:'/FindPasswordPage',
                params,
            }).then(res=>{
                console.log(res.data.msg)
                if(!res.data.code) {
                    message.success('发送成功!');
                    this.setState({
                        loading:false,
                    });
                    window.location.href = "http://localhost:3000"
                }
                else{
                    message.error(res.data.data);
                    this.setState({
                        loading:false
                    });
                }
            })
        }

    }

    render() {
        return(
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent' >
                    <div className={"user-register"} style={{border:"solid"}}>
                        <Form
                            className="register-form"
                            style={{width:"100%"}}
                            {...formItemLayout}
                            name="findPassword"
                            initialValues={{
                                residence: ['zhejiang', 'hangzhou', 'xihu'],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="uid"
                                label="身份证号"
                                rules={[{ required: true, message: '请输入身份证号码!', whitespace: true }]}
                            >
                                <Input onChange={(e)=>this.getUid(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="邮箱"
                                rules={[
                                    {
                                    type: 'email',
                                    message: '请输入正确的邮件地址!',
                                    },
                                    {
                                    required: true,
                                    message: '请输入邮件地址!',
                                    },
                                ]}
                            >
                                <Input onChange={(e)=>this.getEmail(e)}/>
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={this.findPasswordPost}
                                    loading={this.state.loading}
                                >
                                    发送邮件
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default FindPasswordPage;
