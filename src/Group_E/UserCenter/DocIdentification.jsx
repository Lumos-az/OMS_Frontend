import React from 'react';
import {Layout, Menu, Form, Input, Button, message, Table, Popconfirm, ConfigProvider, DatePicker} from 'antd';
import { Link } from 'react-router-dom';
import '../assets/css/PersonalInfo.css';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';

moment.locale('zh-cn');
const dataSource = [
    {
        uid: '1',
        name: 'xsw',
        proField: '眼科',
        hospital: '浙一',
        room: '405',
        identification: '未认证',
    },
    {
        uid: '2',
        name: 'aw',
        proField: '内科',
        hospital: '浙二',
        room: '203',
        identification: '未认证',
    },
];




class DocIdentification extends React.Component{
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '身份证号',
                dataIndex: 'uid',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '擅长领域',
                dataIndex: 'proField',
            },
            {
                title: '所在医院',
                dataIndex: 'hospital',
            },
            {
                title: '所在科室',
                dataIndex: 'room',
            },
            {
                title: '认证状态',
                dataIndex: 'identification',
            },
            {
                title: '认证',
                dataIndex: 'identify',
                render: (_, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="是否认证其为医生?"
                            onConfirm={() => this.handleUpdate(record.uid)}
                            okText = "确认"
                            cancelText = "取消"
                        >
                            <a>认证</a>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: '删除',
                dataIndex: 'identify',
                render: (_, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm
                            title="是否删除这条信息?"
                            onConfirm={() => this.handleDelete(record.uid)}
                            okText = "确认"
                            cancelText = "取消"
                        >
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ]
        this.state={
            dataSource:[],
        }
    }
    componentDidMount() {
        // this.setState({
        //     dataSource:dataSource,
        // })
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/DocIdeData',
        }).then(res=>{
            console.log(res.data.data)
            this.setState({
                dataSource:res.data.data,
            })
        })
    }

    handleUpdate = (uid) => {
        const dataSource = [...this.state.dataSource];
        let i = 0;
        let repetition = false;
        for (i; i < dataSource.length; i++) {
            if (dataSource[i].uid === uid) {
                if (dataSource[i].identification === "已认证") {
                    message.warn("请勿重复认证！");
                    repetition = true;
                }
                else {
                    dataSource[i].identification = "已认证";
                }
                break
            }
        }
        if (repetition === false) {
            let params = {
                uid:dataSource[i].uid,
            }
            console.log(params)

            axios({
                baseURL:defaultUrl,
                method:'post',
                url:'/DocIdeUpdate',
                params,
            }).then(res=>{
                console.log(res.data.msg)
                if(!res.data.code) {
                    message.success('认证成功!');
                    this.setState({
                        dataSource: dataSource,
                    });
                }
                else{
                    message.error(res.data.data);
                }
            })
        }

    };

    handleDelete = (uid) => {
        const dataSource = [...this.state.dataSource];
        let params = {
            uid:uid,
        }
        console.log(params)
        axios({
            baseURL:defaultUrl,
            method:'delete',
            url:'/DocIdeUpdate',
            params,
        }).then(res=>{
            console.log(res.data.msg)
            if(!res.data.code) {
                message.success('删除成功!');
                this.setState({ dataSource: dataSource.filter(item => item.uid !== uid) });
            }
            else{
                message.error(res.data.data);
            }
        })

    };

    render() {
        return (
            <Table dataSource={this.state.dataSource} columns={this.columns} />
        )
    }
}

export default DocIdentification;
