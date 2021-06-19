import React from 'react';
import {Layout, Menu, Form, Input, Button, message, Table} from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';


const dataSource = [{
    key: '1',
    name: '许高高',
    time: '2021-6-9 14:00:00',
    solution: '眼睛酸痛'
}, {
    key: '2',
    name: '唐大大',
    time: '2021-6-10 14:00:00',
    solution: '肚子经常疼'
}];

const columns = [{
    title: '患者姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '预约时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '主要症状',
    dataIndex: 'solution',
    key: 'solution',
}];



class DocAppointment extends React.Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <Table dataSource={dataSource} columns={columns} />
        )
    }
}

export default DocAppointment;
