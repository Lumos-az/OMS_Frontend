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
  time: '2020-10-11 14:00:00',
  department: '眼科'
}, {
  key: '2',
  name: '胡彦祖',
  time: '2020-12-12 14:00:00',
  department: '内科'
}];

const columns = [{
  title: '医生姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '预约时间',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '科室',
  dataIndex: 'department',
  key: 'department',
}];



class UserAppointment extends React.Component{
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

export default UserAppointment;
