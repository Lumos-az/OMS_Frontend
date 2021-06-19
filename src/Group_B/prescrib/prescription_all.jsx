import React, { Component, useState, useContext, useEffect, useRef } from 'react';
import { Breadcrumb, Radio, Divider, Button, Input, Select, Layout, Table, InputNumber, Form, Tabs,Skeleton, Modal, Drawer, Space, Popconfirm, Menu,List, message, Avatar, Spin } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moment from 'moment';

import { Link } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css';
import '../../assets/css/Prescribe.css';

const count = 3;
const EditableContext = React.createContext(null);
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

var storage = window.localStorage;
const { TextArea } = Input;
const defaultUrl =  'http://10.112.196.176:5003';

// 定义了首行列标题
const columns = [
	{
	  title: '标题',
	  dataIndex: 'pres_id',
	  key: 'pres_id',
	  width: '70%',
	  render: (text, record) => {
		  return (
			<Link to={{pathname:"/prescription/"+record.pres_id}}>处方单{text}</Link>
		  );
	  }
	},
	{
		title: '时间',
		dataIndex: 'time',
		key: 'time',
		width: '30%',
		render: text => text,
		defaultSortOrder: 'ascend',
		sorter: (a, b) => a<b? 1:-1,
		sortDirections: ['ascend'],
	},
  ];
class Prescription_all extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: storage.getItem('user'),
			//pres_id:this.props.match.params.id,
            list: [],
			//list: ori_data,
		};
	}
	
    componentDidMount(){
        axios.defaults.baseURL = defaultUrl;
        axios.get('/prescriptions').then(
            res=>{
		console.log(res.data.data)
		var temp = []
		var length = res.data.data.length
		var i = 0
		while (i < length) {
			if (res.data.data[i].user_id===this.state.id) {
				temp.push(res.data.data[i])
			}
			i+=1;
		}
		console.log(temp)
		this.setState({list: temp})
            }
		)
		.catch(error => {
            console.log(error)
        });
    }
	
	render() {
		return (
			<Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<TopBar />
				</Header>
				<Content className='mycontent'>
					<div className="post-back-ground">
						
						{/* <TopBar/> */}
						<div style={{ marginLeft: '15%', marginRight: '15%' }}>
							<div>
								<h1 className='PostBig'>处方显示</h1>
							</div>
							<Content style = {{marginTop: 20, backgroundColor: '#ffffff'}}>
								<Table columns={columns} dataSource={this.state.list} />
							</Content>
						</div>
					</div>
				</Content>
			</Layout>
		)
	}
}

export default Prescription_all;

