import React from 'react';
import {Layout, Menu, Form, Input, Button, message} from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';
const { TextArea } = Input;

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


class UserIdentifyToDoc extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:storage['user'],
            identity:storage['identity'],
            docIdentifyLoading:false,
            psdModLoading:false,
            proField:'',
            hospital:'',
            room:'',
            introduction:'',
        }
    }

    componentDidMount() {

    }

    getProField=(e)=> {
        this.setState({
            proField:e.target.value
        })
    }

    getHospital=(e)=> {
        this.setState({
            hospital:e.target.value
        })
    }

    getSection=(e)=> {
        this.setState({
            room:e.target.value
        })
    }

    getIntroduction=(e)=> {
        this.setState({
            introduction:e.target.value
        })
    }

    docIdentify=()=>{
        this.setState({
            docIdentifyLoading:true
        });
        let params={
            uid:this.state.username,
            proField:this.state.proField,
            hospital:this.state.hospital,
            room:this.state.room,
            introduction: this.state.introduction,
        };
        console.log(params)
        axios({
            baseURL:defaultUrl,
            method:'post',
            url:'/DocIdentify',
            params,
        }).then(res=>{
            console.log(res.data.msg)
            if(!res.data.code) {
                message.success('???????????????????????????????????????!');
                this.setState({
                    docIdentifyLoading:false,
                });

                // window.location.href = "http://localhost:3000"
            }
            else{
                message.error('????????????????????????');
                this.setState({
                    docIdentifyLoading:false,
                });
            }
        })
    }


    render() {
        return (
            <Form
                className="doctor-identification"
                style={{width:"50%"}}
                {...formItemLayout}
                name="docIdentify"
                scrollToFirstError
            >
                <Form.Item
                    name="uid"
                    label="????????????"
                >
                    {this.state.username}
                </Form.Item>

                <Form.Item
                    name="proField"
                    label="????????????"
                    rules={[
                        {required: true, message: '?????????????????????!'},
                    ]}
                >
                    <Input onChange={(e) => this.getProField(e)}/>
                </Form.Item>

                <Form.Item
                    name="hospital"
                    label="????????????"
                    rules={[
                        {required: true, message: '?????????????????????!'},
                    ]}
                >
                    <Input onChange={(e) => this.getHospital(e)}/>
                </Form.Item>

                <Form.Item
                    name="section"
                    label="????????????"
                    rules={[
                        {required: true, message: '?????????????????????!'},
                    ]}
                >
                    <Input onChange={(e) => this.getSection(e)}/>
                </Form.Item>

                <Form.Item
                    name="introduction"
                    label="????????????"
                    rules={[
                        {required: true, message: '?????????????????????!'},
                    ]}
                >
                    <TextArea
                        onChange={(e) => this.getIntroduction(e)}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.docIdentify}
                        loading={this.state.docIdentifyLoading}
                    >
                        ????????????
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default UserIdentifyToDoc;
