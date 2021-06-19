import React, { Component } from 'react';
import { Select, Col, Modal, Layout, Image, notification, DatePicker, Row, Card, BDatePicker, PageHeader, Divider, Descriptions, Button, Collapse } from "antd";
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css'
import { Form, Input, Checkbox } from 'antd';
import { Comment, Tooltip, List, Table, Tag, Space } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { Popconfirm, message } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
let storage = window.localStorage;
const { Option } = Select;
const { confirm } = Modal;
const { Column, ColumnGroup } = Table;
const { Header, Content } = Layout
const { Panel } = Collapse;
const defaultUrl = 'http://10.112.196.176:5003';
const pagination = { defaultPageSize: 4 };
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
var allpatients = [];
function callback(key) {
  console.log(key);
}
function showBookingSuccess(date) {
  Modal.success({
    content: '预约成功',
  });
}
function calspare(num){
  return 4-num;
}
function getColor(states){
  // console.log(states)
  if(4-states>0){
    return "green"
  }else{
    return "red"
  }
}
function getStates(states){
  if(4-states>0){
    return "可预约";
  }else{
    return "不可预约"
  }
}

var chosenDate = ""
var allTime=[];
class Doctor extends Component {
  handleOK(param){
    axios({
      baseURL:defaultUrl,
      method:'post',
      url:'/registerBydoctor',
      params:param
    }).then(res=>{
        console.log(res.data)
        if(res.data.Error==="already had record"){
          message.info('请勿重复预约');
        }else if(res.data.Error==="Full"){
          message.info('该时段已满，请刷新后重新预约');
        }else{
          message.success('预约成功');
          this.setState({
            spareTime:res.data.data
          })
        }
      })
  }
  constructor(props) {
    super(props);
    this.handleOK=this.handleOK.bind(this)
    this.columns = [
      {
       title: '日期',
       dataIndex:"Date",
       key: 'Date',
      },
      {
        title: '时段',
        dataIndex:"time",
        key: 'time',
       },
       {
        title: '余量',
        dataIndex:"state",
        key: 'statenum',
        render:(num) => (
          <Tag color="default">
            {calspare(num)}
          </Tag>
          
        )
       },
       {
        title: '状态',
        dataIndex:"state",
        key: 'state',
        render:(states) => (
          <Tag color={getColor(states)} key={states}>
            {getStates(states)}
          </Tag>
        )
       },
      {
        dataIndex:"key",
        title:"",
        key:"key",
        render:(data,record) => (
          <Space size="middle">
              <a onClick={this.submitBooking(data,record)}>预约挂号</a>
          </Space>
        )
     },
    
    ];
    this.state = {
      did: this.props.match.params.did,
      uid:storage['user'],
      patients: [
      ],
      client:-1,
      spareTime: [
      ],
    }
    allpatients = this.state.patients;

  }
  
  submitBooking(item,record) {
    if(record.isFull==="true"){
      return ()=>{message.error('该时段不可预约');}
    }
    return () => {
        // console.log(item,record)
        console.log(this.state.client)
        if(this.state.client===-1){
          message.info('请选择就诊人');
        }else{
          var did=this.state.did;
          var pid=this.state.client;
          var timeid=record.key;
          var time=[];
          var name=this.state.clientName;
          confirm({
            title: '请确认您的预约',
            icon: <ExclamationCircleOutlined />,
            okText: '确认预约',
            cancelText:'取消预约',
            content: 
            <div>
            <p style={{marginTop:'20px'}}>{'您正在为['+name+']预约挂号'}</p>
            <p style={{marginTop:'20px'}}>{'医院：'+this.state.atHospital}</p>
            <p>{'科室：'+this.state.atDepartment}</p>
            <p>{'医生：'+this.state.name}</p>
            <p>{'日期：'+record.Date}</p>
            <p>{'时间：'+record.time}</p>
            </div>,
            onOk:()=>{
              var param={
                doctorid:this.state.did.toString(),
                timeid:timeid.toString(),
                pid:pid.toString()
              };
              axios({
                baseURL:defaultUrl,
                method:'post',
                url:'/registerBydoctor',
                params:param
              }).then(res=>{
                  console.log(res.data)
                  if(res.data.Error==="already had record"){
                    message.info('请勿重复预约');
                  }else if(res.data.Error==="Full"){
                    message.info('该时段已满，请刷新后重新预约');
                  }else{
                    message.success('预约成功');
                    this.setState({
                      spareTime:res.data.data
                    })
                  }
                })
                  // this.setState({
                     
                  //   })
                // console.log(res.data.data[0])
              
            },
            onCancel() {

            },
          });
          
         
        }
        

 
        // this.setState({ records: newRocords })
    }
  }
  
  handleChange(value,record) {
    this.setState({
      client:value,
      clientName:record.title
    })
  }
  componentDidMount() {
    window.scrollTo(0, 0);  // 置顶代码
    axios({
        baseURL:defaultUrl,
        method:'get',
        url:'/getDoctorInfo?did='+this.state.did.toString(),
}).then(res=>{
    console.log(res.data)
    this.setState({
        name:res.data.data[0].name,
        avatarUrl: res.data.data[0].avatarUrl,
        profession: res.data.data[0].profession,
        phone:res.data.data[0].phone,
        mail: res.data.data[0].mail,
        address:res.data.data[0].address,
        atDepartment: res.data.data[0].atDepartment,
        atHospital: res.data.data[0].atHospital,
        introduction: res.data.data[0].introduction,
        skilledarea: res.data.data[0].skilledArea ,
        spareTime:res.data.data[0].time,
        patients:this.state.patients
    })
})
    axios({
      baseURL:defaultUrl,
      method:'get',
      url:'/getPatientInfo?uid='+this.state.uid.toString(),
    }).then(res=>{
        console.log(res.data.data)
    if(res.data.data.length !== 0){
        this.setState({
          patients:res.data.data,
          client:res.data.data[0].Pid,
          clientName:res.data.data[0].name,
        })
        console.log(this.state.clientName)
    }

    })
    window.scrollTo(0, 0);  // 置顶代码
}
  render() {
    return (
      <Layout>
        <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <TopBar />
        </Header>
        <Content style={{ padding: 50, minHeight: '100vh' }} className='mycontent'>
          <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
            <Row gutter={16}>
              <Col span={23}>
                <Row gutter={16}>
                  <Col span={6}>
                    <Image
                      width={200}
                      preview={false}
                      style={{ marginLeft: 40, marginTop: 40 }}
                      src={this.state.avatarUrl}
                    />
                  </Col>
                  <Col span={18} style={{ marginLeft: -10, marginTop: 50 }}>
                    <PageHeader
                      ghost={false}
                      title={this.state.name}
                      subTitle={this.state.profession}

                    >
                      <Descriptions size="small" column={3}>
                        <Descriptions.Item label="所在医院">{this.state.atHospital}</Descriptions.Item>
                        <Descriptions.Item label="联系电话">
                          <a>{this.state.phone}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="邮箱">{this.state.mail}</Descriptions.Item>
                        <Descriptions.Item label="所在科室">心外科</Descriptions.Item>
                        <Descriptions.Item label="地址">
                          浙江省杭州市西湖区余杭塘路866号
                                                </Descriptions.Item>
                      </Descriptions>
                    </PageHeader>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Divider plain></Divider>
            <Row gutter={16} style={{ margin: 40, marginTop: 20 }}>
              <Collapse accordion style={{ width: '100vw' }}>
                <Panel header="个人简介" key="1">
                  <p>{this.state.introduction}</p>
                </Panel>
                <Panel header="擅长领域" key="2">
                  <p>{this.state.skilledarea}</p>
                </Panel>
              </Collapse>
            </Row>
            <Divider plain></Divider>
            <Row gutter={16}>
              <Col span={24} style={{ margin: 40, marginTop: 20 }}>
                <Card title='预约挂号' style={{marginRight: 80, justifyContent: 'center' }} bordered={true}>
                  {/* <Form

                    name="basic"
                    initialValues={{ remember: true }}
                  >
                    <Form.Item
                      label="就诊人"
                      name="就诊人"
                      rules={[{ required: true, message: '请选择就诊人' }]}
                      style={{ width: 230 }}
                    >
                      <Select
                        style={{ width: 163 }}
                        placeholder="请选择就诊人"
                      >
                        {this.state.patients.map(function (item) {
                          return <Option value={item.id}>{item.name}</Option>
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="就诊日期"
                      name="日期"
                      rules={[{ required: true, message: '请选择就诊日期' }]}
                    >
                      <DatePicker className="datepicker" format="YYYY-MM-DD" style={{ width: 151 }} placeholder="请选择就诊日期" />
                    </Form.Item>
                    <Form.Item
                      label="就诊时段"
                      name="time"
                      rules={[{ required: true, message: '请选择就诊时段' }]}
                    >

                      <Select

                        style={{ width: 151 }}
                        placeholder="请选择时段"
                        className="timepicker">
                        {allTime.map(function (item) {
                          if (!item.status || !item.isFull) {
                            return;
                          }
                          else {
                            return <Option value={item.time}>{item.time}</Option>
                          }

                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item >
                      <Space>
                        <Button onClick={showBookingSuccess} type="primary" htmlType="submit">
                          提交
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form> */}
                  <Form>
                  <Form.Item
                      label="就诊人"
                      name="就诊人"
                      rules={[{ required: true, message: '请选择就诊人' }]}
                      style={{ width: 230 }}
                    >
                      <Select defaultValue="默认就诊人" onChange={this.handleChange.bind(this)}
                        style={{ width: 163 }}
                        placeholder="请选择就诊人"
                      >
                        {this.state.patients.map(function (item) {
                          return <Option value={item.Pid} title={item.name}>{item.name}</Option>
                        })}
                      </Select>
                    </Form.Item>
                    </Form>
                   <Table dataSource={this.state.spareTime} locale={{emptyText:"暂无排班"}}pagination={{ defaultPageSize: 5 }} columns={this.columns}>
                  {/* <Column title="日期" dataIndex="Date" key="Date" />
                  <Column title="时段" dataIndex="time" key="time" />
                  <Column title="状态" dataIndex="state" key="state"
                    render={states => (

                      <Tag color={getColor(states)} key={states}>
                        {getStates(states)}
                      </Tag>
                    )}
                  />
                  <Column
                    dataIndex="key"
                    title=""
                    key=""
                    render={(data) => (
                      <Space size="middle">
                        <a className={data.key} onClick={this.handleBooking}>预约挂号</a>
                      </Space>
                    )}
                  /> */}

                </Table>
                </Card>
              </Col>
              <Col >
               
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default Doctor;