import React from 'react';
import {Layout, Menu, Form, Input, Button, message} from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';

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

let newNickname = '';
let newEmail = '';
let newPhone = '';
let newAddress = '';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:storage['user'],
            identity:storage['identity'],
            nickname:storage['nickname'],
            email:storage['email'],
            phone:storage['phone'],
            address:storage['address'],
            collapsed: false,
            infoModLoading:false,
            psdModLoading:false,
            oldPassword:'',
            newPassword:'',
        }
    }

    componentDidMount() {
        newNickname = this.state.nickname
        newPhone = this.state.phone
        newEmail = this.state.email
        newAddress = this.state.address
        console.log(newPhone, newAddress)
    }
    getAddress=(e)=> {
        newAddress = e.target.value
    }

    getNickname=(e)=>{
        newNickname = e.target.value
    }

    getEmail=(e)=>{
        newEmail = e.target.value
    }

    getPhone=(e)=>{
        newPhone = e.target.value
    }

    infoModPost=()=>{
        if (newNickname !== this.state.nickname || newEmail !== this.state.email || newPhone !== this.state.phone || newAddress !== this.state.address) {
            this.setState({
                infoModLoading:true
            });
            let params={
                uid:this.state.username,
                email:newEmail,
                nickname:newNickname,
                phone:newPhone,
                address:newAddress
            };
            console.log(params)
            axios({
                baseURL:defaultUrl,
                method:'put',
                url:'/changeInfo',
                params,
            }).then(res=>{
                console.log(res.data.msg)
                if(!res.data.code) {
                    message.success('个人信息修改成功!');
                    this.setState({
                        infoModLoading:false,
                        nickname:newNickname,
                        email:newEmail,
                        phone:newPhone,
                        address:newAddress,
                    });
                    
                    // window.location.href = "http://localhost:3000"
                }
                else{
                    message.error('修改失败请重试！');
                    this.setState({
                        infoModLoading:false,
                    });
                }
            })
        } else {
            message.error('至少提供一项修改！')
        }
    }

    getOldPassword=(e)=>{
        this.setState({
            oldPassword:e.target.value
        })
    }

    getNewPassword=(e)=>{
        this.setState({
            newPassword:e.target.value
        })
    }

    psdModPost=()=>{
        if (this.state.newPassword !== '' && this.state.oldPassword !== '') {
            this.setState({
            psdModLoading:true
            });
            let params={
                uid:this.state.username,
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
            };
            console.log(params)
            axios({
                baseURL:defaultUrl,
                method:'post',
                url:'/psdModPage',
                params,
            }).then(res=>{
                console.log(res.data.msg)
                if(!res.data.code) {
                    message.success('密码修改成功，请重新登录!');
                    this.setState({
                        psdModLoading:false,
                    });
                    storage.removeItem("user");
                    storage.removeItem("token");
                    storage.removeItem('identity')
                    storage.removeItem("nickname");
                    storage.removeItem("email");
                    storage.removeItem('phone');
                    storage.removeItem('address');
                    window.location.href = "http://localhost:3000"
                }
                else{
                    message.error(res.data.data);
                    this.setState({
                        psdModLoading:false,
                    });
                }
            })
        } else {
            message.error('请输入完整信息！');
        }
    }

    render() {
        return (
            <Form
                className="personalInfo-form"
                style={{width:"50%"}}
                {...formItemLayout}
                name="personalInfo"
                scrollToFirstError
            >
                <Form.Item
                    name="uid"
                    label="身份证号"
                >
                    {this.state.username}
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label="用户昵称"
                >
                    <Input
                        placeholder={this.state.nickname}
                        onChange={(e)=>this.getNickname(e)}
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="注册邮箱"
                    rules={[
                        {
                            type: 'email',
                            message: '请输入正确的邮件地址!',
                        }
                    ]}
                >
                    <Input
                        placeholder={this.state.email}
                        onChange={(e)=>this.getEmail(e)}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="联系电话"
                >
                    <Input
                        placeholder={this.state.phone}
                        onChange={(e)=>this.getPhone(e)}
                    />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="居住地址"
                >
                    <Input
                        placeholder={this.state.address}
                        onChange={(e)=>this.getAddress(e)}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.infoModPost}
                        loading={this.state.infoModLoading}
                    >
                        修改资料
                    </Button>
                </Form.Item>

                <Form.Item
                    name="oldPassword"
                    label="输入旧密码"
                    hasFeedback
                >
                    <Input.Password onChange={(e)=>this.getOldPassword(e)}/>
                </Form.Item>

                <Form.Item
                    name="newPassword"
                    label="输入新密码"
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="确认新密码"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        ({ getFieldValue }) => ({validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次密码不一致!'));
                        },}),
                    ]}
                >
                    <Input.Password onChange={(e)=>this.getNewPassword(e)}/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.psdModPost}
                        loading={this.state.psdModLoading}
                    >
                        修改密码
                    </Button>
                </Form.Item>
            </Form>
      )
    }
}

export default UserInfo;
