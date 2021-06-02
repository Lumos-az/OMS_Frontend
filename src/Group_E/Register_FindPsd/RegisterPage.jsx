import React, { useState, Component } from 'react';
import {Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Layout, message} from 'antd';
import TopBar from "../Component/TopBar";
import '../assets/css/RegisterPage.css';
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

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{width: 70}}>
            <Option value="86">+86</Option>
            <Option value="81">+81</Option>
            <Option value="1">+1</Option>
            <Option value="44">+44</Option>
        </Select>
    </Form.Item>
);


class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            uid:'',
            email:'',
            password:'',
            nickname:'',
            realName:'',
            address:'',
            phone:'',
            age:'',
            sex:'',
            other:'无',
            loading:false,
        }
    }

    componentDidMount() {
    }


    getUid=e=>{
        this.setState({
            uid:e.target.value
        })

    }

    getEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }

    getPassword=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

    getNickname=(e)=>{
        this.setState({
            nickname:e.target.value
        })
    }

    getRealName=(e)=>{
        this.setState({
            realName:e.target.value
        })
    }

    getAddress=(e)=>{
        this.setState({
            address:e.target.value
        })
    }

    getPhone=(e)=>{
        this.setState({
            phone:e.target.value
        })
        console.log(this.state.phone)
    }

    getSex=(e)=>{
        this.setState({
            sex:e.target.value
        })
        console.log(this.state.sex)
    }

    getAge=(e)=>{
        this.setState({
            age:e.target.value
        })
        console.log(this.state.age)
    }

    getOther=(e)=>{
        this.setState({
            other:e.target.value
        })
        console.log(this.state.other)
    }

    registerPost=()=>{
        this.setState({
            loading:true
        });

        let params={
            uid:this.state.uid,
            email:this.state.email,
            password:this.state.password,
            nickname:this.state.nickname,
            realName:this.state.realName,
            address:this.state.address,
            phone:this.state.phone,
            age:this.state.age,
            sex:this.state.sex,
            other:this.state.other,
        };
        console.log(params)
        axios({
            baseURL:defaultUrl,
            method:'post',
            url:'/registerPage',
            params,
        }).then(res=>{
            console.log(res.data.msg)
            if(!res.data.code) {
                message.success('注册成功!');
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


    render() {
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent' >
                    <div className={"user-register"}>
                        <Form
                            className="register-form"
                            style={{width:"100%"}}
                            {...formItemLayout}
                            name="register"
                            initialValues={{
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

                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {
                                    required: true,
                                    message: '请输入密码!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="确认密码"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请在输入一遍密码!',
                                    },
                                    ({ getFieldValue }) => ({validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不一致!'));
                                    },}),
                                ]}
                            >
                                <Input.Password onChange={(e)=>this.getPassword(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="nickname"
                                label="昵称"
                                tooltip="你希望别人怎么称呼你?"
                                rules={[{ required: true, message: '请输入昵称!', whitespace: true }]}
                            >
                                <Input onChange={(e)=>this.getNickname(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="realName"
                                label="真实姓名"
                                rules={[{ required: true, message: '请输入真实姓名!', whitespace: true }]}
                            >
                                <Input onChange={(e)=>this.getRealName(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="age"
                                label="年龄"
                                rules={[{ required: true, message: '请输入年龄!', whitespace: true }]}
                            >
                                <Input onChange={(e)=>this.getAge(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="sex"
                                label="性别"
                                rules={[{ required: true, message: '请输入性别!', whitespace: true }]}
                            >
                                <Input onChange={(e)=>this.getSex(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="手机号"
                                rules={[{ required: true, message: '请输入手机号!' }]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{ width: '100%' }}
                                    onChange={(e)=>this.getPhone(e)}
                                />
                            </Form.Item>


                            <Form.Item
                                name="residence"
                                label="居住地"
                                rules={[
                                  {  required: true, message: '请输入居住地!' },
                                ]}
                            >
                                <Input onChange={(e)=>this.getAddress(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="other"
                                label="不良习惯或疾病史"
                                rules={[{ message: '请输入不良习惯或疾病史!', whitespace: true }]}
                            >
                                <Input onChange={(e)=>this.getOther(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                    validator: (_, value) =>
                                      value ? Promise.resolve() : Promise.reject(new Error('请同意协议！')),
                                    },
                                ]}
                                {...tailFormItemLayout}
                            >
                                <Checkbox>
                                    我已阅读并同意 <a href="">《医疗预约平台用户注册协议》</a>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item {...tailFormItemLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={this.registerPost}
                                    loading={this.state.loading}
                                >
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default RegisterPage;
