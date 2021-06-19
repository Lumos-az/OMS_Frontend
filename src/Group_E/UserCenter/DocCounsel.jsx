import React from 'react';
import {Layout, Menu, Form, Input, Button, message, Table} from 'antd';
import { Link } from 'react-router-dom';
import '../assets/css/PersonalInfo.css';
import axios from "axios";

let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';


const dataSource = [{
  key: '1',
  name: '许高高',
  time: '2020-6-9 14:00:00',
  advice: '多用眼药水，多做眼保健操'
}, {
  key: '2',
  name: '唐大大',
  time: '2020-6-10 14:00:00',
  advice: '少吃辛辣、刺激性强的食物，可以适当服用胃舒颗粒等药物'
}];

const columns = [{
  title: '患者姓名',
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



class DocCounsel extends React.Component{
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

export default DocCounsel;
