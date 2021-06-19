import React, { Component } from 'react'
import { Layout, List, Button, Modal, Divider, Form, Input, Radio, message, Popconfirm } from 'antd';
import TopBar from "../../Component/TopBar";
//import IdentityForm from "../Component/IdentityForm";
import '../../assets/css/MainPage.css'
import '../../assets/css/BookingRecord.css'
import axios from 'axios';
let storage = window.localStorage;
const { Header, Content } = Layout
const defaultUrl = 'http://10.112.196.176:5003';

export default class CM extends Component {
    //获取登录的uid
    constructor(props) {
        super(props);
        //uid = this.props.match.params.uid;
        this.state = {
            //uid: this.props.match.params.uid,
            uid: storage['user'],
            records: [],
            ModelVisible: false,
            disabled: true,
            okText: "修改",
            formState: true   // true代表更改状态，false代表新建状态
        }
    }

    //请求数据
    componentDidMount() {
        axios({
            baseURL: defaultUrl,
            method: 'get',
            url: `/getPatientInfo?uid=${this.state.uid}`,
        }).then(res => {
            console.log(res.data)
            this.setState({
                records: res.data.data
            })
        })
    }

    formRef = React.createRef();

    // 点击详情，查看就诊人信息
    reviewForm = (item) => {
        return (event) => {
            this.setState({ ModelVisible: true, disabled: true, formState: true });
            this.formRef.current.setFieldsValue({
                name: item.name,
                pid: item.Pid,
                age: item.Age,
                sex: item.Sex === '男' ? 'man' : 'woman',
                phoneNumber: item.phoneNumber,
                others: item.other
            })
        }

    };

    // 点击新建就诊人，创建空表单
    newForm = () => {
        if (this.state.records.length === 5)
            message.info('单个账号最多可关联五个就诊人，请重新管理就诊人后添加')
        else {
            this.setState({ ModelVisible: true, disabled: false, okText: '提交', formState: false });
            this.formRef.current.resetFields();
        }

    }


    // 删除就诊人
    clearClient(item) {
        return () => {
            axios({
                baseURL: defaultUrl,
                method: 'post',
                url: `/deletePatient?pid=${item.Pid}`,
            }).then(res => {
                res.data.msg !== 'ok' ? message.warn('出错了，请重试') :
                    axios({
                        baseURL: defaultUrl,
                        method: 'get',
                        url: `/getPatientInfo?uid=${this.state.uid}`,
                    }).then(res => {
                        console.log(res.data)
                        this.setState({
                            records: res.data.data
                        })
                        message.success('已删除');
                    })
            })

        }
    }

    // 设置默认就诊人
    setDefaultPatient = (item) => {
        return () => {
            axios({
                baseURL: defaultUrl,
                method: 'post',
                url: `/setDefaultPatient?pid=${item.Pid}&uid=${this.state.uid}`,
            }).then(res => {
                res.data.msg !== 'ok' ? message.warn('出错了，请重试') :
                    axios({
                        baseURL: defaultUrl,
                        method: 'get',
                        url: `/getPatientInfo?uid=${this.state.uid}`,
                    }).then(res => {
                        console.log(res.data)
                        this.setState({
                            records: res.data.data
                        })
                        message.success('已更改');
                    })
            })
        }
    }

    render() {
        const { records, okText, disabled, ModelVisible, formState } = this.state

        // 提交就诊人表单
        const onCreate = () => {
            this.formRef.current.validateFields()
                .then(formValue => {
                    this.setState({ disabled: true, okText: "修改" });
                    this.state.formState ?
                        // 更新表单内容
                        axios({
                            baseURL: defaultUrl,
                            method: 'post',
                            url: `/updatePatientInfo?&pid=${formValue.pid}&name=${formValue.name}&age=${formValue.age}&sex=${formValue.sex === "man" ? '男' : '女'}&phoneNumber=${formValue.phoneNumber}&other=${formValue.others}`,
                        }).then(res => {
                            console.log(res.data.msg)
                            res.data.msg !== 'ok' ? message.warn('出错了，请重试') :
                                axios({
                                    baseURL: defaultUrl,
                                    method: 'get',
                                    url: `/getPatientInfo?uid=${this.state.uid}`,
                                }).then(res => {
                                    console.log(res.data)
                                    this.setState({
                                        records: res.data.data,
                                        ModelVisible: false
                                    })
                                    message.success('已修改');
                                })
                        })
                        :
                        // 新建就诊人
                        axios({
                            baseURL: defaultUrl,
                            method: 'post',
                            // eslint-disable-next-line eqeqeq
                            url: `/newPatientInfo?uid=${this.state.uid}&pid=${formValue.pid}&name=${formValue.name}&age=${formValue.age}&sex=${formValue.sex === "man" ? '男' : '女'}&phoneNumber=${formValue.phoneNumber}&other=${formValue.others}&isDefault=${0}`,
                        }).then(res => {
                            console.log(res.data.msg)
                            res.data.msg !== 'ok' ? message.warn('出错了，请重试') :
                                axios({
                                    baseURL: defaultUrl,
                                    method: 'get',
                                    url: `/getPatientInfo?uid=${this.state.uid}`,
                                }).then(res => {
                                    console.log(res.data)
                                    this.setState({
                                        records: res.data.data,
                                        ModelVisible: false
                                    })
                                    message.success('已提交');
                                })

                        })
                })
                .catch(errorInfo => {
                    console.log(errorInfo)
                });
        };
        const onCancel = () => {
            this.setState({ ModelVisible: false, okText: "修改" });
        }

        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar />
                </Header>
                <Layout className='mylayout' >
                    <Layout style={{
                        padding: '0 24px',
                        margin: '24px 0 0 0',
                        minHeight: 700,
                        marginTop:'64px'
                    }}>
                        <Content style={{ margin: '12px 12px 0' }}>
                            <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
                                <List
                                    bordered
                                    dataSource={records}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={item.name}
                                                description={`年龄：${item.Age}  |  性别：${item.Sex} | 身份证号：${item.Pid} `}
                                            />
                                            {item.isDefault ?
                                                null :
                                                < Popconfirm
                                                    title="您确定删除该就诊人信息吗？"
                                                    onConfirm={this.clearClient(item)}
                                                    okText="确定"
                                                    cancelText="取消"
                                                >
                                                    <Button type='text'>删除</Button>
                                                </Popconfirm>}
                                            {
                                                item.isDefault ?
                                                    <Button type='text' style={{ color: 'red' }}>默认就诊人</Button> :
                                                    <Button onClick={this.setDefaultPatient(item)}>设为默认就诊人</Button>
                                            }
                                            <Divider type="vertical" />
                                            <Button type='text' onClick={this.reviewForm(item)}>详情</Button>



                                        </List.Item>
                                    )}
                                />

                                <Button type="dashed" style={{ margin: 0 + ' auto' }} onClick={this.newForm}>+添加就诊人</Button>
                            </div>
                        </Content>
                        <Modal title="就诊人信息" visible={ModelVisible}
                            okText={okText}
                            cancelText="取消"
                            //防止数据回填时通过ref方式第一次打开页面时current是null
                            forceRender={true}
                            onOk={() => {
                                if (okText === "修改") {
                                    this.setState({ disabled: false, okText: "提交" });
                                } else {
                                    onCreate();
                                }
                            }}
                            onCancel={onCancel}>
                            <Form
                                name="form_in_modal"
                                ref={this.formRef}
                            >
                                <Form.Item rules={[{ required: true }]} name='name' label="姓名">
                                    <Input disabled={disabled} />
                                </Form.Item>
                                <Form.Item rules={[{
                                    required: true,
                                    pattern: /^[0-9]+$/,
                                    type: 'string',
                                    len: 18,
                                    message: '身份证号不符合规定'
                                }]} name='pid' label="身份证号">
                                    <Input disabled={disabled} />
                                </Form.Item>
                                <Form.Item rules={[{
                                    required: true,
                                    type: 'number',
                                    min: 0,
                                    max: 150,
                                    transform: (value) => { return Number(value) },
                                    message: '只能输入0-150的数字'
                                }]} name='age' label="年龄">
                                    <Input disabled={disabled} />
                                </Form.Item>
                                <Form.Item rules={[{ required: true }]} name='sex' label="性别">
                                    <Radio.Group disabled={disabled}>
                                        <Radio value="man">男</Radio>
                                        <Radio value="woman" >女</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item rules={[{
                                    required: true,
                                    pattern: /^[0-9]+$/,
                                    type: 'string',
                                    len: 11,
                                    message: '手机号码不符合规定'
                                }]} name='phoneNumber' label="手机号">
                                    <Input disabled={disabled} />
                                </Form.Item>
                                <Form.Item name='others' label="其他信息">
                                    <Input disabled={disabled} />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Layout>
                </Layout>
            </Layout >

        )
    }
}
