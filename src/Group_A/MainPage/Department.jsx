import React, { Component } from 'react';
import { Form, Select, Col, Modal, Layout, Image, Row, Card, Badge, PageHeader, Menu, Divider, Descriptions, Button, Table, Tag, Space } from "antd";
import TopBar from "../../Component/TopBar";

import { Popconfirm, message } from 'antd';
import '../../assets/css/MainPage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { Empty } from 'antd'
const { Header, Content } = Layout
const { Option } = Select;
const { confirm } = Modal;

const { TabPane } = Tabs;
const defaultUrl = 'http://10.112.196.176:5003';
let storage = window.localStorage;
function calspare(num) {
  return 4 - num;
}
function getColor(states) {
  // console.log(states)
  if (4 - states > 0) {
    return "green"
  } else {
    return "red"
  }
}
function getStates(states) {
  if (4 - states > 0) {
    return "可预约";
  } else {
    return "不可预约"
  }
}
class Department extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      uid: '330101199901010111',
      Did: this.props.match.params.Did,
      Hid: this.props.match.params.hid,
      name: "",
      pname: "",
      client: -1,
      spareTime: [
        // {
        //   'key':1,
        //   'Date': '2021-05-12',
        //   'time': '8:00-9:00',
        //   'state': 4,
        //   'Dateright': false,
        // },
        // {
        //   'key':2,
        //   'Date': '2021-05-12',
        //   'time': '9:00-10:00',
        //   'state': 2,
        //   'Dateright': true,
        // },
        // {
        //   'key':3,
        //   'Date': '2021-05-12',
        //   'time': '10:00-11:00',
        //   'state': 1,
        //   'Dateright': true,
        // },
        // {
        //   'key':4,
        //   'Date': '2021-05-12',
        //   'time': '11:00-12:00',
        //   'state': 0,
        //   'Dateright': true,
        // },
        // {
        //   'key':5,
        //   'Date': '2021-05-12',
        //   'time': '1:00-2:00',
        //   'state': 0,
        //   'Dateright': true,
        // },
        // {
        //   'Date': '2021-05-12',
        //   'time': '2:00-3:00',
        //   'state': 3,
        //   'Dateright': true,
        // },
        // {
        //   'Date': '2021-05-12',
        //   'time': '3:00-4:00',
        //   'state': 4,
        //   'Dateright': true,
        // },
        // {
        //   'Date': '2021-05-12',
        //   'time': '4:00-5:00',
        //   'state': 5,
        //   'Dateright': true,
        // },

      ],
      diseases: [
        // {
        //     'iid':1,
        //     'iname':'龋病'
        // },{
        //     'iid':2,
        //     'iname':'血管神经性水肿'
        // },{
        //     'iid':3,
        //     'iname':'牙齿发育异常'
        // },{
        //     'iid':4,
        //     'iname':'牙周病'
        // },{
        //     'iid':5,
        //     'iname':'口腔粘膜病'
        // },{
        //     'iid':6,
        //     'iname':'牙龈增生'
        // }
        // ,{
        //     'iid':7,
        //     'iname':'牙髓病'
        // }
        // ,{
        //     'iid':8,
        //     'iname':'牙体损伤'
        // },

      ],
      doctors: [
        // {
        //     'did':1,
        //     'name':'王大鹏',
        //     'phone':"012344556",
        //     'profession':'主任医师',
        //     'atHospital':"浙大一院",
        //     'mail':"zy91@zju.edu.com",
        //     'atDepartment':"心外科",
        //     'address':"浙江省杭州市庆春路79号(310003)",
        //     'avatarUrl':'http://img.yunkucn.com/file/image/pic/5a3442064769n3511879254c26.jpg'
        // },{
        //     'did':1,
        //     'name':'齐强',
        //     'phone':"012344556",
        //     'profession':'主任医师',
        //     'atHospital':"浙大二院",
        //     'mail':"zy91@zju.edu.com",
        //     'atDepartment':"外科",
        //     'address':"浙江省杭州市庆春路79号(310003)",
        //     'avatarUrl':'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544008467,3548336506&fm=26&gp=0.jpg'
        // },{
        //     'did':1,
        //     'name':'王大鹏',
        //     'phone':"012344556",
        //     'profession':'主任医师',
        //     'atHospital':"浙大一院",
        //     'mail':"zy91@zju.edu.com",
        //     'atDepartment':"心外科",
        //     'address':"浙江省杭州市庆春路79号(310003)",
        //     'avatarUrl':'http://img.yunkucn.com/file/image/pic/5a3442064769n3511879254c26.jpg'
        // },{
        //     'did':1,
        //     'name':'王一',
        //     'phone':"012344556",
        //     'profession':'主任医师',
        //     'atHospital':"浙大五院",
        //     'mail':"zy91@zju.edu.com",
        //     'atDepartment':"内科",
        //     'address':"浙江省杭州市庆春路79号(310003)",
        //     'avatarUrl':'http://img.yunkucn.com/file/image/pic/5a3442064769n3511879254c26.jpg'
        // }
      ],

    }
    this.columns = [
      {
        title: '日期',
        dataIndex: "Date",
        key: 'Date',
      },
      {
        title: '时段',
        dataIndex: "time",
        key: 'time',
      }, {
        title: '医生',
        dataIndex: "doctorName",
        key: 'doctorName',
      },
      {
        title: '医生工号',
        dataIndex: "doctorID",
        key: 'doctorID',
      },
      {
        title: '余量',
        dataIndex: "state",
        key: 'statenum',
        render: (num) => (
          <Tag color="default">
            {calspare(num)}
          </Tag>

        )
      },
      {
        title: '状态',
        dataIndex: "state",
        key: 'state',
        render: (states) => (
          <Tag color={getColor(states)} key={states}>
            {getStates(states)}
          </Tag>
        )
      },
      {
        dataIndex: "key",
        title: "",
        key: "key",
        render: (data, record) => (
          <Space size="middle">
            <a onClick={this.submitBooking(data, record).bind(this)}>预约挂号</a>
          </Space>
        )
      },

    ];

  }
  submitBooking(item, record) {
    if (record.isFull == 'true') {
      return () => { message.error('该时段不可预约'); }
    }
    return () => {
      // console.log(item,record)
      var Did = this.state.Did;
      var hid = this.state.Hid;
      var pid = this.state.client;
      var pname = this.state.pname;
      var name = this.state.name;
      if (this.state.client === -1) {
        message.info('请选择就诊人');
      } else {

        var timeid = record.key;
        var cname = this.state.clientName;
        confirm({
          title: '请确认您的预约',
          icon: <ExclamationCircleOutlined />,
          okText: '确认预约',
          cancelText: '取消预约',
          content:
            <div>
              <p style={{ marginTop: '20px' }}>{'您正在为[' + cname + ']预约挂号'}</p>
              <p>{'医院：' + name}</p>
              <p>{'科室：' + pname}</p>
              <p>{'医生：' + record.doctorName}</p>
              <p>{'日期：' + record.Date}</p>
              <p>{'时间：' + record.time}</p>
            </div>,
          onOk: () => {
            var param = {
              doctorid: record.doctorID.toString(),
              timeid: timeid.toString(),
              pid: pid.toString()
            };
            axios({
              baseURL: defaultUrl,
              method: 'post',
              url: '/registerBydoctor',
              params: param
            }).then(res => {
              console.log(res.data)
              if (res.data.Error === "already had record") {
                message.info('请勿重复预约');
              } else if (res.data.Error === "Full") {
                message.info('该时段已满，请刷新后重新预约');
              } else {
                message.success('预约成功');
                axios({
                  baseURL: defaultUrl,
                  method: 'get',
                  url: '/FreeTime?hid=' + this.state.Hid.toString() + '&depid=' + this.state.Did.toString(),
                }).then(res => {
                  // console.log(res.data)
                  if (res.data.code == 4001) {
                    this.setState({
                      spareTime: []
                    })
                  } else {
                    this.setState({
                      spareTime: res.data.data
                    })
                    // console.log(this.state.departments)
                  }
                })
              }
            })
          },
          onCancel() {

          },
        });

      }



      // this.setState({ records: newRocords })
    }
  }

  handleChange(value, record) {
    this.setState({
      client: value,
      clientName: record.title
    })
  }
  componentDidMount() {
    window.scrollTo(0, 0);  // 置顶代码
    axios({
      baseURL: defaultUrl,
      method: 'get',
      url: '/getDepartmentInfo?Did=' + this.state.Did.toString(),
    }).then(res => {
      console.log(res.data)
      this.setState({
        name: res.data.data[0].name,
        desp: res.data.data[0].desp,
        diseases: res.data.data[0].disease,
      })
      // console.log(this.state.departments)
    })
    axios({
      baseURL: defaultUrl,
      method: 'get',
      url: '/getDoctorlistinfo?Did=' + this.state.Did.toString() + '&hid=' + this.state.Hid.toString(),
    }).then(res => {
      console.log(res.data)
      this.setState({
        // name:res.data.data[0].name,
        doctors: res.data.data
      })
      // console.log(this.state.departments)
    })
    axios({
      baseURL: defaultUrl,
      method: 'get',
      url: '/getHospitalInfo?hid=' + this.state.Hid.toString(),
    }).then(res => {
      console.log(res.data)
      this.setState({
        // name:res.data.data[0].name,
        pname: res.data.data[0].name
      })
    })
    axios({
      baseURL: defaultUrl,
      method: 'get',
      url: '/getPatientInfo?uid=' + this.state.uid.toString(),
    }).then(res => {
      // console.log(res.data)
      this.setState({
        patients: res.data.data,
        client: res.data.data[0].Pid,
        clientName: res.data.data[0].name,
      })
    })
    axios({
      baseURL: defaultUrl,
      method: 'get',
      url: '/FreeTime?hid=' + this.state.Hid.toString() + '&depid=' + this.state.Did.toString(),
    }).then(res => {
      console.log(res.data)
      if (res.data.code == 4001) {
        this.setState({
          spareTime: []
        })
      } else {
        this.setState({
          spareTime: res.data.data
        })
        // console.log(this.state.departments)
      }
    })


  }
  render() {
    return (
      <Layout>
        <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <TopBar />
        </Header>
        <Content style={{ padding: 50, minHeight: '100vh' }} className='mycontent'>
          <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
            <PageHeader
              className="site-page-header"
              title={this.state.pname + '：' + this.state.name}
              style={{ margin: 40, marginTop: 10 }}
            />
            <Row gutter={16} style={{ margin: 40, marginTop: -40, marginBottom: 0 }}>
              <Card style={{ width: '100vw' }}>
                <p>{this.state.desp}</p>
              </Card>
            </Row>
            <Divider></Divider>
            <Row gutter={16} style={{ margin: 40, marginTop: 0 }}>
              <Card title='相关疾病' style={{ width: '100vw' }}>
                <Row gutter={16} style={{ marginLeft: 80 }}>
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', Left: '500px' }}>
                    {this.state.diseases.map(function (disease) {
                      return <Link key={disease.iid} style={{ width: 200, marginTop: '10px' }} to={'/Disease/' + disease.iid}>{disease.iname}</Link>
                    })}
                  </div>
                </Row>
              </Card>
            </Row>
            <Divider></Divider>
            <Row gutter={16} style={{ margin: 40, marginTop: 0 }}>
              <Card title='相关医生' style={{ width: '100vw' }}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="专家医师" key="1">
                    {this.state.doctors.map(function (doctor) {
                      if (doctor.did % 4 != 0) return;
                      return (
                        <Row>
                          <Col span={6}>
                            <Image
                              width={160}
                              height={160}
                              preview={false}
                              style={{ marginLeft: 40, marginTop: 40 }}
                              src={doctor.avatarUrl}
                            />
                          </Col>
                          <Col span={18}>
                            <PageHeader
                              ghost={false}
                              title={doctor.name}
                              subTitle={doctor.profession}
                              style={{ marginTop: 40, marginRight: 40 }}
                              extra={[
                                <Link to={'/Doctor/' + doctor.did}>
                                  <Button key="1" type="primary">
                                    预约
                                                </Button>
                                </Link>
                              ]}
                            >
                              <Descriptions size="small" column={3}>
                                <Descriptions.Item label="所在医院">{doctor.atHospital}</Descriptions.Item>
                                <Descriptions.Item label="联系电话">
                                  <a>{doctor.phone}</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="邮箱">{doctor.atHospital}</Descriptions.Item>
                                <Descriptions.Item label="所在科室">{doctor.atDepartment}</Descriptions.Item>
                                <Descriptions.Item label="地址">
                                  {doctor.address}
                                </Descriptions.Item>
                              </Descriptions>
                            </PageHeader>
                          </Col>
                        </Row>
                      )
                    })}
                  </TabPane>
                  <TabPane tab="普通门诊" key="2">
                    {this.state.doctors.map(function (doctor) {
                      if (doctor.did % 4 == 0) return;
                      return (
                        <Row>
                          <Col span={6}>
                            <Image
                              width={160}
                              height={160}
                              preview={false}
                              style={{ marginLeft: 40, marginTop: 40 }}
                              src={doctor.avatarUrl}
                            />
                          </Col>
                          <Col span={18}>
                            <PageHeader
                              ghost={false}
                              title={doctor.name}
                              subTitle={doctor.profession}
                              style={{ marginTop: 40, marginRight: 40 }}
                              extra={[
                                <Link to={'/Doctor/' + doctor.did}>
                                  <Button key="1" type="primary">
                                    预约
                                                </Button>
                                </Link>
                              ]}
                            >
                              <Descriptions size="small" column={3}>
                                <Descriptions.Item label="所在医院">{doctor.atHospital}</Descriptions.Item>
                                <Descriptions.Item label="联系电话">
                                  <a>{doctor.phone}</a>
                                </Descriptions.Item>
                                <Descriptions.Item label="邮箱">{doctor.atHospital}</Descriptions.Item>
                                <Descriptions.Item label="所在科室">{doctor.atDepartment}</Descriptions.Item>
                                <Descriptions.Item label="地址">
                                  {doctor.address}
                                </Descriptions.Item>
                              </Descriptions>
                            </PageHeader>
                          </Col>
                        </Row>
                      )
                    })}
                  </TabPane>
                </Tabs>

              </Card>

            </Row>
            <Row gutter={16} style={{ margin: 40, marginTop: 0 }}>
              <Card title='预约挂号' style={{ width: '100vw' }}>
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
                <Tabs defaultActiveKey="1">
                  <TabPane tab="专家门诊" key="1">
                    <Table dataSource={this.state.spareTime.filter((data) => data.doctorID % 4 == 0)} pagination={{ defaultPageSize: 5 }} columns={this.columns}>     </Table>
                  </TabPane>
                  <TabPane tab="普通门诊" key="2">
                    <Table dataSource={this.state.spareTime.filter((data) => data.doctorID % 4 != 0)} pagination={{ defaultPageSize: 5 }} columns={this.columns}>     </Table>
                  </TabPane>
                </Tabs>
              </Card>
            </Row>
          </div>

        </Content>
      </Layout>
    )
  }
}

export default Department;