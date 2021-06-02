import React from 'react';
import {Layout, Menu, Form, Input, Button, message, Table} from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://127.0.0.1:5003';


const dataSource = [{
    key: '1',
    name: '胡歌',
    time: '2020-10-11 14:00:00',
    solution: '多滴眼药水'
}, {
    key: '2',
    name: '杨幂',
    time: '2020-12-12 14:00:00',
    solution: '多喝开水'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '预约时间',
    dataIndex: 'time',
    key: 'time',
}, {
    title: '解决方案',
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
