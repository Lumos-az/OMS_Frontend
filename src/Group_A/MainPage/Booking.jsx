import React, {Component} from 'react';
import TopBar from "../../Component/TopBar";
import '../../assets/css/Booking.css'
import {Link} from 'react-router-dom';
import { Layout,List,Typography, Menu,Avatar,Divider, PageHeader,Card, Col, Row} from 'antd';
import { PlusOutlined,EyeOutlined,HeartOutlined,UserOutlined,ForkOutlined} from '@ant-design/icons';
import axios from 'axios';
import { Carousel } from 'antd';
import { Form, Table,Input, Button, Select } from 'antd';
import { Tabs } from 'antd';
const { Search } = Input;
const { TabPane } = Tabs;

function callback(key) {
//   console.log(key);
}
const hospitalColumns=[
    {
        title: '名称',
        dataIndex:"name",
        key: 'name',
        width:'200px'
    },
    {
         title: '类型',
         dataIndex:"pname",
         key: 'pname',
         width:'200px'
    },
    {
        title: '地址',
        dataIndex:"address",
        key: 'address',
        width:'200px'
   },

]
const doctorColumns=[
    {
        title: '姓名',
        dataIndex:"name",
        key: 'name',
        width:'200px'
    },
    {
         title: '科室',
         dataIndex:"atDe",
         key: 'atDe',
         width:'200px'
    },
    {
        title: '医院',
        dataIndex:"atHos",
        key: 'atHos',
        width:'200px'
   },

]

const departmentColumns=[
    {
        title: '名称',
        dataIndex:"name",
        key: 'name',
        width:'150px'
    },
    {
         title: '类别',
         dataIndex:"catalog",
         key: 'catalog',
         width:'150px'
    },
    {
        title: '简介',
        dataIndex:"desp",
        key: 'desp',
        width:'500px',
        ellipsis:true
   },

]
const defaultUrl = 'http://10.185.121.66:5003';
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol1: { offset: 8, span: 16 },
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const { Meta } = Card;
function onChange(a, b, c) {
//   console.log(a, b, c);
}


const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const { SubMenu } = Menu;

function handleClick(e) {
    window.open('/Department/'+e.key);
}

const data = [
    '艺高人胆大，妙手溶栓打破常规',
    '江南梅雨季：今年夏天需防风邪和暑湿',
    '颈椎病或纳入法定职业病？上班族：靠人不如靠自己',
    '志愿者日省级专家赴西南义诊',
    '第33个世界艾滋病日，浙江举办“艾梅乙”母婴传播宣传活动',
];
const { Header, Content, Sider } = Layout

class Booking extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);  // 置顶代码
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/get6doctor',
        }).then(res=>{
        // console.log(res.data)
        this.setState({
            doctors:res.data.data
            })
        // console.log(this.state.departments)
        })
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/getAllDoctor',
        }).then(res=>{
        console.log(res.data)
        this.setState({
            allDoctordata:res.data.data,
            doctorData:res.data.data,
            })
        // console.log(this.state.departments)
        })
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/getAllHospital',
        }).then(res=>{
        console.log(res.data)
        this.setState({
            allHospitaldata:res.data.data,
            hospitalData:res.data.data,
            })
        // console.log(this.state.departments)
        })
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/getAllDepartment',
        }).then(res=>{
        console.log(res.data)
        this.setState({
            allDepartmentdata:res.data.data,
            departmentData:res.data.data,
            })
        // console.log(this.state.departments)
        })
    }
    
    searchDepartment= (e) =>{
        // console.log(e)
        var search=e
        // console.log(search)
        if(search!=null&&this.state.allDepartmentdata){
            var newdata=this.state.allDepartmentdata.filter((data)=> data.name.toLowerCase().includes(search.toLowerCase()));
            console.log(newdata)
            this.setState({
                departmentData:newdata
            })
        }else{//清空搜索
            var all=this.state.allDepartmentdata;
            this.setState({
                departmentData:all
            })
        }
    }
    searchHospital= (e) =>{
        // console.log(e)
        var search=e
        // console.log(search)
        if(search!=null&&this.state.allHospitaldata){
            var newdata=this.state.allHospitaldata.filter((data)=> data.name.toLowerCase().includes(search.toLowerCase()));
            console.log(newdata)
            this.setState({
                hospitalData:newdata
            })
        }else{//清空搜索
            var all=this.state.allHospitaldata;
            this.setState({
                hospitalData:all
            })
        }
    }
    searchDoctor= (e) =>{
        // console.log(e)
        var search=e
        // console.log(search)
        if(search!=null&&this.state.allDoctordata){
            var newdata=this.state.allDoctordata.filter((data)=> data.name.toLowerCase().includes(search.toLowerCase()));
            console.log(newdata)
            this.setState({
                doctorData:newdata
            })
        }else{//清空搜索
            var all=this.state.allDoctordata;
            this.setState({
                doctorData:all
            })
        }
    }
    constructor(props) {
        super(props);
        this.state={
            search:'',
            allHospitaldata:[],
            allDoctordata:[],
            allDepartmentdata:[],
            hospitalData:[],
            doctordata:[],
            departmentdata:[],
            alldata:[
              
              ],
              
              columns:[
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },
              ],
            doctors:[
               
            ],
        }

    }
    render() {
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar />
                </Header>
                <Layout className='mylayout' style={{marginTop:'64px'}}>
                    <Sider width={256} style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }} className="site-layout-background">
                        <Menu onClick={handleClick} style={{ width: 275, padding: 18, paddingBottom: 0 }} mode="vertical">
                            <SubMenu key="sub1" icon={<HeartOutlined />} title="内科">
                                <Menu.Item key="18">普内科</Menu.Item>
                                <Menu.Item key="7">呼吸内科</Menu.Item>
                                <Menu.Item key="1">心内科</Menu.Item>
                                <Menu.Item key="4">消化内科</Menu.Item>
                                <Menu.Item key="19">神经内科/头痛门诊</Menu.Item>
                                <Menu.Item key="20">神经内科/睡眠门诊</Menu.Item>
                                <Menu.Item key="21">血液内科</Menu.Item>
                                <Menu.Item key="22">肾内科</Menu.Item>
                                <Menu.Item key="9">内分泌科</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<UserOutlined />} title="外科">
                                <Menu.Item key="10">普外科</Menu.Item>
                                <Menu.Item key="11">显微外科</Menu.Item>
                                <Menu.Item key="12">泌尿科</Menu.Item>
                                <Menu.Item key="13">心脏外科</Menu.Item>
                                <Menu.Item key="14">胸外科</Menu.Item>
                                <Menu.Item key="15">头颈外科</Menu.Item>
                                <Menu.Item key="16">肛肠外科</Menu.Item>
                                <Menu.Item key="17">神经外科</Menu.Item>
                                <Menu.Item key="2">骨科</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<EyeOutlined />} title="眼科">
                            <Menu.Item key="5">眼科</Menu.Item>
                            <Menu.Item key="30">近视激光</Menu.Item>
                            <Menu.Item key="31">神经眼科</Menu.Item>
                            <Menu.Item key="32">白内障</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" icon={<ForkOutlined />} title="耳鼻咽喉科">
                            <Menu.Item key="23">中耳炎</Menu.Item>
                            <Menu.Item key="24">耳鸣</Menu.Item>
                            <Menu.Item key="25">鼻炎及鼻功能</Menu.Item>
                            <Menu.Item key="26">耳聋门诊</Menu.Item>
                            <Menu.Item key="27">耳科</Menu.Item>
                            <Menu.Item key="28">眩晕专科</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="29" icon={<PlusOutlined />}>其他科室</Menu.Item>
                        </Menu>
                        {/* <Card style={{ width: 256 , justifyContent: 'center'}}  bordered={true}>
                            <Meta
                            title="快速预约" style={{ marginTop: -10,marginBottom:15,textAlign: 'center',fontWeight:'bolder'}}
                            />
                            <Form {...layout}  name="control-hooks" >
                            <Form.Item name="就诊人" label="就诊人" >
                                <Input />
                            </Form.Item>
                            <Form.Item name="医院" label="医院" >
                                <Input />
                            </Form.Item>
                            <Form.Item name="科室" label="科室" >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                预约挂号
                                </Button>
                            </Form.Item>
                            </Form>
                        </Card> */}
                    </Sider>
                    <Layout style={{
                            padding: '0 24px',
                            margin: '24px 0 0 250px',
                            minHeight: 600,
                        }}>
                        {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
                        <Content style={{ margin: '12px 12px 0' }}>
                            <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
                                <Carousel autoplay afterChange={onChange}>
                                    <div>
                                        <h3 style={contentStyle}>1</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>2</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>3</h3>
                                    </div>
                                    <div>
                                        <h3 style={contentStyle}>4</h3>
                                    </div>
                                </Carousel>
                                <Tabs defaultActiveKey="1" type="card" size='large' style={{marginTop:'20px'}}>
                                    <TabPane tab="医院" key="1">
                                        <Card>
                                            <Search
                                                placeholder="请输入医院名称"
                                                allowClear
                                                enterButton="搜索"
                                                size="large"
                                                onSearch={this.searchHospital}
                                                />
                                            {/* <Input placeholder="输入医院名称" onChange={this.searchContent} /> */}
                                            <Table onRow={record => {
                                                        return {
                                                            onClick: event => {
                                                                window.open('/Hospital/'+record.hid);
                                                            }, // 点击行
                                                        };}}
                                                        pagination={{ defaultPageSize: 5 }}
                                                    style={{marginTop:'10px'}} dataSource={this.state.hospitalData} columns={hospitalColumns} />
                                            </Card>
                                    </TabPane>
                                    <TabPane tab="医生" key="2">
                                        <Card>
                                            <Search
                                                placeholder="请输入医生名称"
                                                allowClear
                                                enterButton="搜索"
                                                size="large"
                                                onSearch={this.searchDoctor}
                                                />
                                            {/* <Input placeholder="输入医院名称" onChange={this.searchContent} /> */}
                                            <Table onRow={record => {
                                                        return {
                                                            onClick: event => {window.open('/Doctor/'+record.did);}, // 点击行
                                                        };}}
                                                    pagination={{ defaultPageSize: 5 }}
                                                    style={{marginTop:'10px'}} dataSource={this.state.doctorData} columns={doctorColumns} />
                                        </Card>
                                    </TabPane>
                                    <TabPane tab="科室" key="3">
                                    <Card>
                                            <Search
                                                placeholder="请输入科室名称"
                                                allowClear
                                                enterButton="搜索"
                                                size="large"
                                                onSearch={this.searchDepartment}
                                                />
                                            {/* <Input placeholder="输入医院名称" onChange={this.searchContent} /> */}
                                            <Table onRow={record => {
                                                        return {
                                                            onClick: event => {window.open('/Department/'+record.Did);}, // 点击行
                                                        };}}
                                                    pagination={{ defaultPageSize: 5 }}
                                                    style={{marginTop:'10px'}} dataSource={this.state.departmentData} columns={departmentColumns} />
                                        </Card>
                                    </TabPane>
                                </Tabs>
                                <Row gutter={16}>
                                    <Col span={16}>
                                    <PageHeader
                                    className="site-page-header"
                                    title="热门医院"
                                    subTitle="这些医院预约的人最多"
                                    />
                                        <div className="site-card-wrapper">
                                            <Row gutter={16}>
                                                
                                                <Col span={8}>
                                                    <Link to = "/Hospital/6">
                                                    <Card
                                                        hoverable
                                                        // style={{ height:100}}
                                                        cover={<img alt="example" style={{width:'100%',height:180}} src="http://himg2.huanqiu.com/attachment2010/2013/0806/20130806083650471.jpg" />}
                                                    >
                                                        <Meta title="浙大校医院" description="二级甲等公立医院" />
                                                    </Card>
                                                    </Link>
                                                </Col>
                                                <Col span={8}>
                                                    <Link to = "/Hospital/4">
                                                    <Card
                                                        hoverable

                                                        cover={<img alt="example" style={{width:'100%',height:180}} src="http://file.fh21.com.cn/fhfile1/M00/07/9E/ooYBAGCBO7iAef4MAACRduuwQcY05.jpeg" />}
                                                    >
                                                        <Meta title="浙江省人民医院" description="三级甲等综合性医院" />
                                                    </Card>
                                                    </Link>
                                                </Col>
                                                <Col span={8}>
                                                     <Link to = "/Hospital/3">
                                                    <Card
                                                        hoverable
                                                        // style={{ height:100}}
                                                        cover={<img alt="example" style={{width:'100%',height:180}} src="http://file.fh21.com.cn/fhfile1/M00/07/9D/ooYBAGCBHfuAGA8FAACmtXslj7s01.jpeg" />}
                                                    >
                                                        <Meta title="浙大二院" description="三级甲等综合性医院" />
                                                    </Card>
                                                    </Link>
                                                   
                                                </Col>
                                                
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <PageHeader
                                            className="site-page-header"
                                            title="健康头条"
                                            subTitle="你的健康小贴士"
                                        />
                                        <List
                                            bordered
                                            dataSource={data}
                                            renderItem={item => (
                                                <List.Item>
                                                    {item}
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                </Row>
                                <Divider plain></Divider>
                                <Row >
                                    <PageHeader
                                        className="site-page-header"
                                        title="名医推荐"
                                        subTitle="大家都在约这些名医"
                                    />
                                </Row>
                                <Row gutter={16} >
                                    {this.state.doctors.map(function(doctor){
                                        return(
                                            <Col span={8}>
                                                <Link to={'/Doctor/'+doctor.did}>
                                                <Card style={{marginTop:'10px'}}>
                                                <Meta
                                                    avatar={
                                                    <Avatar src={doctor.avatarUrl} />
                                                    }
                                                    title={doctor.name}
                                                    description={doctor.profession}
                                                />
                                                </Card>
                                                </Link>
                                            </Col>   
                                        )
                                    })}
                                </Row> 
                                                       
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Booking;