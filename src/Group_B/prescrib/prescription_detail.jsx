import React, { Component, useState, useContext, useEffect, useRef } from 'react';
import { Breadcrumb, Radio, Divider, Button, Input, Select, Layout, Table, InputNumber, Form, Tabs,Skeleton, Modal, Drawer, Space, Popconfirm, Menu,List, message, Avatar, Spin } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moment from 'moment';

import { Link } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../../Component/TopBar";
import '../../assets/css/Post.css';
import '../../assets/css/MainPage.css';
import '../../assets/css/Prescribe.css';

//import reqwest from 'reqwest';
const count = 3;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

const EditableContext = React.createContext(null);
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

var storage = window.localStorage;
const { TextArea } = Input;
const defaultUrl = 'http://10.112.196.176:5003';

const columns = [
	{
		title: '名称',
		dataIndex: 'medNameZh',
		key: 'medNameZh',
		width: '35%',		
	},
	{
		title: '规格',
		dataIndex: 'medIcon',
		key: 'medIcon',
		width: '15%',
	},
	{
		title: '数量',
		dataIndex: 'mednumber',
		key: 'mednumber',
		width: '10%',
	},
	{
		title: '用法',
		dataIndex: 'medusage',
		key: 'medusage',
		width: '40%',	
	},
];

class Prescription_detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
            postID: this.props.match.params.id,
            user_id: 'yu',
            doctor_id: '',
            information: '',
            time: '',
		    usage: '',
		}
	  }
	
	  componentDidMount() {
		  const id=this.props.match.params.id;
          axios.defaults.baseURL = defaultUrl;
          axios.get('/prescription/' + id).then(
                res=>{
                    this.setState({
                        usage: res.data.data.prescription,
                        user_id: res.data.data.user_id,
				        doctor_id: res.data.data.doctor_id,
				        information:res.data.data.information,
				        time: res.data.data.time.substr(0,10),
                    });
                    console.log('成功！' + JSON.stringify(res.data.data))
                }
            )
            .catch(error => {
                console.log(error)
            });

            axios.defaults.baseURL = defaultUrl;
            axios.get('/usage/' + id).then(
                res=>{
                    this.setState({
                        list:res.data.data
                    });
                    console.log('成功2！' + JSON.stringify(res.data.data))
                }
            )
            .catch(error => {
                console.log(error)
            });
	  }
			
	render() {
		const { initLoading, loading, list } = this.state;
   
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
							{/* 处方内容 */}
							<div class="prescribbox">
								<div class="presentbox">
									<h1 class="prescribetitle">处方笺</h1>
									<div class="basicbox1">
										<div class="labeltext">
											姓名：
						        		</div>
										<label class="underline1" >{this.state.user_id}</label>


										<div class="labeltext_6">
											年龄：
						        		</div>
										<label class="underline3" >22</label>
									</div>

									<div class="basicbox1">
										<div class="labeltext">
											医生：
						         		</div>
										<label class="underline1" >{this.state.doctor_id}</label>
										
										<div class="labeltext_6">
											日期：
						         		</div>
										<label class="underline3" >{this.state.time}</label>
									</div>

									<Divider orientation="left" style={{ marginLeft: 0 }}>诊断结果</Divider>

									<div class="basicbox2">
										<label  className="describeshow" >{this.state.information}</label>
									</div>

									<Divider orientation="left">药品</Divider>

									<div class="basicbox3">
										{/* 药品 */}
										<Content style={{ marginTop: 20, backgroundColor: '#ffffff' }}>
											{/*dataSource是返回的数据 */}
											<div>
												<Table
													bordered
													dataSource={list}
													columns={columns}
													pagination={{ pageSize: 5 }}
												/>
											</div>
										</Content>
									</div>

								</div>
							</div>
						</div>
					</div>
				</Content>
			</Layout>
		)
	}
}

export default Prescription_detail;

