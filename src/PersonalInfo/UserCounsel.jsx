import React from 'react';
import {Layout, Menu, Form, Input, Button, message, Table} from 'antd';
import { Link } from 'react-router-dom';
import '../assets/css/PersonalInfo.css';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://127.0.0.1:5003';


const dataSource = [{
  key: '1',
  name: '胡彦斌',
  time: '2020-10-11 15:00:00',
  advice: '多用眼药水，多做眼保健操。'
}, {
  key: '2',
  name: '胡彦祖',
  time: '2020-12-12 14:00:00',
  advice: '命不久矣，回家去吧～'
}];

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '诊疗时间',
  dataIndex: 'time',
}, {
  title: '诊断结果',
  dataIndex: 'advice',
  key: 'advice',
}];



class UserCounsel extends React.Component{
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

export default UserCounsel;
