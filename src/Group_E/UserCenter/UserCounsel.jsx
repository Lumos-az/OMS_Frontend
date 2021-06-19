import React from 'react';
import {Layout, Menu, Form, Input, Button, message, Table} from 'antd';
import { Link } from 'react-router-dom';
import '../assets/css/PersonalInfo.css';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';


const dataSource = [{
  key: '1',
  name: '胡彦斌',
  time: '2020-10-11 14:00:00',
  advice: '多用眼药水，多做眼保健操。'
}, {
  key: '2',
  name: '胡彦祖',
  time: '2020-12-12 14:00:00',
  advice: '减少剧烈运动，选择清淡，天然、对咽部刺激小的流食。'
}];

const columns = [{
  title: '医生姓名',
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
