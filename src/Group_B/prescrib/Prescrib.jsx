import React, { Component, useState, useContext, useEffect, useRef, Empty } from 'react';
import { Breadcrumb, Radio, Divider, Button, Input, Select, Layout, Table, InputNumber, Form, Tabs, Modal, Drawer, Space, Popconfirm, Menu } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import moment from 'moment';


import { Link } from 'react-router-dom';
import axios from 'axios';
import TopBar from "../../Component/TopBar";
import '../../assets/css/Post.css'
import '../../assets/css/MainPage.css'
import '../../assets/css/Prescribe.css'



import {
	AppstoreOutlined, RightCircleFilled, AudioOutlined, MailOutlined, LaptopOutlined, NotificationOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UserOutlined,
	UploadOutlined,
	VideoCameraOutlined, SettingOutlined
} from '@ant-design/icons';




var storage = window.localStorage
const EditableContext = React.createContext(null);
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

var storage = window.localStorage;
const { TextArea } = Input;
const defaultUrl = 'http://10.112.196.176:5003';

var rand_id = (Math.floor(Math.random()*1e8)).toString();  //可均衡获取0到99 999 999的随机整数


// 药品显示
const columns1 = [
	{
		title: '名称',
		dataIndex: 'medNameZh',
		key: 'medNameZh',
		ellipsis: true,
		//   render: text => <Link to={{pathname:"/study/post/"}}>{text}</Link>,

		sorter: (a, b) => a.medNameZh.length - b.medNameZh.length,
		sortDirections: ['ascend'],
	},
	{
		title: '规格',
		dataIndex: 'other',
		key: 'other',
		ellipsis: true,
	},
];

const { Search } = Input;

const suffix = (
	<AudioOutlined
		style={{
			fontSize: 16,
			color: '#1890ff',
		}}
	/>
);

// 测试数据
const data = [
	{
		key: '1',
		medNameZh: '硫酸沙丁胺醇片',
		other: '2.4mg*100片',
		type:'呼吸系统'
	},
	{
		key: '2',
		medNameZh: '磷酸苯丙哌林片',
		other: '20mg*24片',
		type:'呼吸系统'
	},
	{
		key: '3',
		medNameZh: '盐酸氨溴索片（兰苏）',
		other: '30mg*20片',
		type:'呼吸系统'
	},
	{
		key: '4',
		medNameZh: '硫酸沙丁胺醇吸入气雾剂',
		other: '100ug*200揿',
		type:'呼吸系统'
	},
	{
		key: '5',
		medNameZh: '复方氨酚烷胺胶囊（仁和可立克）',
		other: '0.25g*10粒',
		type:'解热镇痛'
	},
	{
		key: '6',
		medNameZh: '速效牙痛宁酊',
		other: '8ml*1支	',
		type:'解热镇痛'
	},
	{
		key: '7',
		medNameZh: '退热贴',
		other: '4贴装',
		type:'解热镇痛'
	},
	{
		key: '8',
		medNameZh: '去痛片',
		other: '复方*10片',
		type:'解热镇痛'
	},	
	{
		key: '9',
		medNameZh: '四季感冒胶囊',
		other: '12粒*2板',
		type: '解热镇痛'
	}
];

// 查询
const onSearch = value => console.log(value);

// 排序
function textonChange(pagination, filters, sorter, extra) {
	console.log('params', pagination, filters, sorter, extra);
}


/*表格*/
const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell = ({
	title,
	editable,
	children,
	dataIndex,
	record,
	handleSave,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef(null);
	const form = useContext(EditableContext);
	useEffect(() => {
		if (editing) {
			inputRef.current.focus();
		}
	}, [editing]);

	const toggleEdit = () => {
		setEditing(!editing);
		form.setFieldsValue({
			[dataIndex]: record[dataIndex],
		});
	};

	const save = async () => {
		try {
			const values = await form.validateFields();
			toggleEdit();
			handleSave({ ...record, ...values });
		} catch (errInfo) {
			console.log('Save failed:', errInfo);
		}
	};

	let childNode = children;

	if (editable) {
		childNode = editing ? (
			<Form.Item
				style={{
					margin: 0,
				}}
				name={dataIndex}
				rules={[
					{
						required: true,
						message: `${title} is required.`,
					},
				]}
			>
			<Input ref={inputRef} onPressEnter={save} onBlur={save} />
			</Form.Item>
		) : (
			<div
				className="editable-cell-value-wrap"
				style={{
					paddingRight: 24,
				}}
				onClick={toggleEdit}
			>
				{children}
			</div>
		);
	}

	return <td {...restProps}> {childNode} </td>;
};

function onChange(value) {
	console.log('changed', value);
}

// 将药品列表转换为string
function alterToStr(dataSource){
	var str = '';
	for (var i = 0; i < dataSource.length; i++){
		str += (dataSource[i].medNameZh + ' ');
		str += (dataSource[i].medIcon + ' ');
		str += (dataSource[i].mednumber + ' ');
		str += (dataSource[i].medusage);
		if( i != dataSource.length - 1 )
			str += ';';
	}

	return str;
}
/**
 * 药品首页
 */

var storage = window.localStorage//客户端临时存放信息，不知道在哪写的token字段

class Prescription extends Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				title: '名称',
				dataIndex: 'medNameZh',
				key: 'medNameZh',
				width: '23%',				
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
				width: '22%',	
			},
			{
				title: '时间',
				dataIndex: 'time',
				key: 'time',
				width: '15%',
			},
			{
				title: '删除',
				dataIndex: 'operation',
				width: '10%',
				render: (_, record) =>
					this.state.dataSource.length >= 1 ? (
						<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
							<a>Delete</a>
						</Popconfirm>
					) : null,
			},
		];
		this.state = {
			dataSource: [],
			medList: [],
			selectedRowKeys: [],
			choicelist:[],
			count: 0,
			choicekey:"1",
			otherinformation:'无',

			medNameZh:'硫酸沙丁胺醇片',
			medIcon:'2.4mg*100片',
			mednumber:1,
			us1:1,
			us2:'片',
			us3:1,
			us4:'外用',
			searchtext:'',

			user_id: this.props.match.params.id,
			user_name: this.props.match.params.name,
			doctor_id: storage.getItem('user'),
			user_gender:'男',
			user_age:22,
			doctor_name: storage.getItem('nickname'),
			
			loading: false,
			islogin: false,
			isDoctor: false
		};
	}

	//加载数据,可能不必要
	start = () => {
		this.setState({ loading: true });
		// ajax request after empty completing
		setTimeout(() => {
			this.setState({
				selectedRowKeys: [],
				loading: false,
			});
		}, 1000);
	};

	onSelectChange = selectedRowKeys => {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ selectedRowKeys });
	};

	// 表格删除
	handleDelete = (key) => {
		console.log(key)
		const dataSource = [...this.state.dataSource];
		this.setState({
			dataSource: dataSource.filter((item) => item !== key),
		});
	};


	// 添加药品
	handleAdd = () => {
		const { count, dataSource,medNameZh,choicelist,
			medIcon,
			mednumber,
			choicekey,
			otherinformation,
			us1,
			us2,
			us3,
			us4
			} = this.state;
		let medusage;
		if(choicekey=="1")
		{
			medusage=`${us1}${us2}/次，${us3}次/日，${us4}`;
		}
		else
		{
			medusage=otherinformation;
		}

		const newData = {
			medNameZh: medNameZh,
			medIcon: medIcon,
			mednumber: mednumber,
			time:moment().format("YYYY-MM-DD HH:mm:ss"),
			medusage: medusage,
		};
			
		this.setState({
			dataSource: [...dataSource, newData],
			count: count + 1,
		});
	};

	//保存
	handleSave = (row) => {
		const newData = [...this.state.dataSource];
		const index = newData.findIndex((item) => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		this.setState({
			dataSource: newData,
		});
	};


	// 确认提交
	// dataSource 最后的格式: 退烧贴 4贴装 1 1片/次，2次/日，外用;去痛片 4贴装 1 1片/次，2次/日，外用;
	handlePost = () =>{
		var params = {
			pres_id: rand_id,  
			user_id: this.state.user_id,
			doctor_id: this.state.doctor_id,
			information: this.state.otherinformation,
			time: moment().format("YYYY-MM-DD HH:mm:ss"), 
			prescription: alterToStr(this.state.dataSource),   
		}
		console.log(params);

		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/prescriptions',
			params
		}).then(res=>{
			console.log(res.data.code)
			if(res.data.code===0){
				Modal.success({
		  		content: '提交成功！',
		  		onOk: ()=>{
		  			window.location.href = window.location.href
				}
				});
			}
			else{
				Modal.error({
				content: '提交失败！',
				onOk: ()=>window.location.href = window.location.href
			});
			}
		});
	}


	handleClick = e => {
		console.log('click ', e);
	};


	Seachmed=e=>{
		console.log(e);
		let { medList} = this.state;
		
		medList = data.filter(function (obj) {
			return obj.medNameZh.indexOf(e) !== -1;
		});
		this.setState(
			{
				medList:[...medList]
			}
		)
	}

	selecttypemed(key){
		console.log(key);
		let { medList} = this.state;
		
		medList = data.filter(function (obj) {
			return obj.type.indexOf(key) !== -1;
		});
		this.setState(
			{
				medList:[...medList]
			}
		)
	}

	handleTableChange = (pagination, filters, sorter) => {
		this.fetch({
			sortField: sorter.field,
			sortOrder: sorter.order,
			pagination,
			...filters,
		});
	};

	/*侧边栏：选择药品*/
	state = { visible: false };

	showDrawer = () => {
		this.setState({
			visible: true,
			medList:[...data]
		});
	};

	postmedicine = ()=> {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		const { dataSource, loading, selectedRowKeys,medList ,choicelist,medIcon,medNameZh,otherinformation,doctor_id,doctor_name,user_age,user_gender,user_id, user_name} = this.state;
		const rowSelection = {
			type: 'radio',
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;
		const components = {
			body: {
				row: EditableRow,
				cell: EditableCell,
			},
		};
		const columns = this.columns.map((col) => {
			if (!col.editable) {
				return col;
			}

			return {
				...col,
				onCell: (record) => ({
					record,
					editable: col.editable,
					dataIndex: col.dataIndex,
					title: col.title,
					handleSave: this.handleSave,
				}),
			};
		});

		//表格
		return (
			<Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<TopBar />
				</Header>
				<Content className='mycontent'>

					<div className="post-back-ground">

						{/* <TopBar/> */}
						<div style={{ marginLeft: '10%', marginRight: '10%' }}>
							<div>
								<h1 className='PostBig'>开具处方</h1>
							</div>

							{/* 处方内容 */}
							<div class="prescribbox">
								<div class="presentbox">
									<h1 class="prescribetitle">处方笺</h1>
									<div class="basicbox1">
										<div class="labeltext">
											姓名：
						        		</div>
										<label class="underline1" >{user_name}</label>

										<div class="labeltext_5">
											账号：
						         		</div>
										<label class="underline2" >{user_id}</label>

										<div class="labeltext_6">
											年龄：
						        		</div>
										<label class="underline3" >{user_age}</label>
									</div>

									<div class="basicbox1">
										<div class="labeltext">
											医师：
						        		</div>
										<label class="underline1" >{doctor_name}</label>

										<div class="labeltext_7">
											工号：
						         		</div>
										<label class="underline2" >{doctor_id}</label>

										<div class="labeltext_6">
											日期：
						         		</div>
										<label class="underline3" >{moment().format("YYYY-MM-DD")}</label>

										<Drawer
											title="搜索药品"
											width={570}
											closable={false}
											onClose={this.onClose}
											visible={this.state.visible}
										>
											<Layout className="teststyle">
												<Content >
													<div class="HeadSearch">

														<Space direction="vertical">
															<Search placeholder="输入药品名称" onSearch={this.Seachmed}  enterButton />
														</Space>

													</div>
													<div class="specification">
														<div class="labeltext_9">
															名称
								 						</div>
														<div class="informationtext_1" id="medSpecification" >{medNameZh}</div>
													</div>

													<div class="mednumberbox">
														<div class="labeltext_1">数量</div>
														<InputNumber ref='medicinenumber' size="small" min={1} defaultValue={1}   className="mednumber_1" precision={0} onChange={(e)=>{this.setState({mednumber:e})}} />
														<div class="labeltext_0">规格</div>
														<label class="informationtext_2" id="medOther" >{medIcon}</label>
													</div>
													<div>
														<Tabs defaultActiveKey="1" style={{ top: -30, left: 0 }} onTabClick={(key,e)=>{this.setState({choicekey:key})}}>
															<TabPane tab="常规类用量" key="1" >
																<div class="usageinformation">
																	<InputNumber size="small" min={1} defaultValue={1}  step='1' className="mednumber_2" precision={0} onChange={(e)=>{this.setState({us1:e})}}/>

																	<select class="mednumber_type" onChange={(e)=>{this.setState({us2:e.target.value})}}>

																		<option >片</option>
																		<option >粒</option>
																		<option >支</option>
																		<option >袋</option>
																		<option >瓶</option>

																	</select>
																	<div class="labeltext_2">/次，</div>
																	<InputNumber size="small" min={1} defaultValue={1}  className="mednumber_3" precision={0} onChange={(e)=>{this.setState({us3:e})}}/>

																	<div class="labeltext_3">次/日，</div>
																	<select class="mednumber_using" onChange={(e)=>{this.setState({us4:e.target.value})}}>

																		<option>外用</option>
																		<option>口服</option>

																	</select>
																</div>
															</TabPane>
															<TabPane tab="特殊类用量" key="2" style={{ width: 300 }}>
																<Input placeholder="Basic usage" onChange={(e)=>{this.setState({otherinformation:e.target.value})}}/>

															</TabPane>

															<TabPane tab="注射类用量" disabled key="3">
																Tab </TabPane>
														</Tabs>
													</div>
													<Button type="primary" danger  style={{ top: 5, left: 270 }} onClick={this.handleAdd}>确认提交</Button>

													<div style={{ marginLeft: '2%', width: 350 }}>
														<Content style={{ marginTop: 20, backgroundColor: '#ffffff' }}>
															{/*dataSource是返回的数据，到时候把data改成medList */}

															<Table
																columns={columns1} dataSource={medList} pagination={{ pageSize: 4 }} onChange={textonChange} 
																onRow = {(record) => {
																	return {
																	  onClick: () => {
																			console.log(record);
																			this.setState({ choicelist:record,
																			medNameZh:record['medNameZh'],
																		    medIcon:record['other']});
																		}
																	  }
																	}
																  }
															/>
														</Content>
													</div>

												</Content>
												<Divider type="vertical" style={{ height: 890 }} />
												<Sider width='110px' theme='light'>
													<Menu
														mode="inline"
														style={{ height: '100%', borderRight: 0 }}
													>
														<Menu.Item key="解热镇痛" onClick={(e)=>this.selecttypemed(e.key)}>解热镇痛</Menu.Item>
														<Menu.Item key="呼吸系统" onClick={(e)=>this.selecttypemed(e.key)}>呼吸系统</Menu.Item>
														<Menu.Item key="消化系统" onClick={(e)=>this.selecttypemed(e.key)}>消化系统</Menu.Item>
														<Menu.Item key="心脑血管" onClick={(e)=>this.selecttypemed(e.key)}>心脑血管</Menu.Item>
														<Menu.Item key="血液系统" onClick={(e)=>this.selecttypemed(e.key)}>血液系统</Menu.Item>
														<Menu.Item key="五官科" onClick={(e)=>this.selecttypemed(e.key)}>五官科</Menu.Item>
														<Menu.Item key="抗风湿类" onClick={(e)=>this.selecttypemed(e.key)}>抗风湿类</Menu.Item>
														<Menu.Item key="注射剂类" onClick={(e)=>this.selecttypemed(e.key)}>注射剂类</Menu.Item>
														<Menu.Item key="糖尿病" onClick={(e)=>this.selecttypemed(e.key)}>糖尿病</Menu.Item>
														<Menu.Item key="激素类" onClick={(e)=>this.selecttypemed(e.key)}>激素类</Menu.Item>
														<Menu.Item key="皮肤科" onClick={(e)=>this.selecttypemed(e.key)}>皮肤科</Menu.Item>
														<Menu.Item key="妇科" onClick={(e)=>this.selecttypemed(e.key)}>妇科</Menu.Item>
														<Menu.Item key="抗肿瘤" onClick={(e)=>this.selecttypemed(e.key)}>抗肿瘤</Menu.Item>
														<Menu.Item key="抗精神病" onClick={(e)=>this.selecttypemed(e.key)}>抗精神病</Menu.Item>
														<Menu.Item key="抗生素类" onClick={(e)=>this.selecttypemed(e.key)}>抗生素类</Menu.Item>
														<Menu.Item key="抗过敏" onClick={(e)=>this.selecttypemed(e.key)}>抗过敏</Menu.Item>
														<Menu.Item key="滋补类" onClick={(e)=>this.selecttypemed(e.key)}>滋补类</Menu.Item>
														<Menu.Item key="维生素药品" onClick={(e)=>this.selecttypemed(e.key)}>维生素药品</Menu.Item>
														<Menu.Item key="泌尿系统" onClick={(e)=>this.selecttypemed(e.key)}>泌尿系统</Menu.Item>
													</Menu>
												</Sider>
											</Layout>

										</Drawer>
									</div>
									<Divider orientation="left" style={{ marginLeft: 0 }}>诊断结果</Divider>

									<div class="basicbox2">

										<TextArea rows={4} className="describe" onChange={(e)=>{this.setState({otherinformation:e.target.value})}}/>

									</div>
									<Divider orientation="left">药品</Divider>

									<div class="basicbox3">
										{/* 药品 */}
										<Content style={{ marginTop: 20, backgroundColor: '#ffffff' }}>
											{/*dataSource是返回的数据 */}
											<div>
												<Button
													onClick={this.showDrawer}
													type="primary"
													style={{
														marginBottom: 16,
													}}
												>
													添加药物
                                                </Button>
												<Table
													components={components}
													rowClassName={() => 'editable-row'}
													bordered
													dataSource={dataSource}
													columns={columns}
													pagination={{ pageSize: 5 }}

												/>
											</div>

										</Content>
										<Button type="primary" danger   style={{ top: 15, left: 650 }}  onClick={this.handlePost} >确认提交</Button>

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

export default Prescription;

