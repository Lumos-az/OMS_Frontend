import React, { Component } from 'react'
import { Layout, List, Menu, Select, Button, Modal, Row, Col, Divider } from 'antd';
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css'
import '../../assets/css/BookingRecord.css'
import { Popconfirm, message } from 'antd';
import axios from 'axios';

const { Header, Sider, Content } = Layout
const { Option } = Select
let storage = window.localStorage;
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
const defaultUrl = 'http://10.112.196.176:5003';

export default class BookingRecord extends Component {

    //获取登录的uid
    constructor(props) {
        super(props);
        //uid = this.props.match.params.uid;
        this.state = {
            //uid: this.props.match.params.uid,
            uid: storage['user'],
            records: [],
            selectedMenu: 1,
            detailItem: [],
            ModelVisible: false,
            patients: [],
            currentPatient: '0'
        }
    }

    //请求记录数据
    componentDidMount() {
        axios({
            baseURL: defaultUrl,
            method: 'get',
            url: `/getBookingRecord?uid=${this.state.uid}`,
        }).then(res => {
            console.log(res.data)
            this.setState({
                records: res.data.data
            })
        })
        axios({
            baseURL: defaultUrl,
            method: 'get',
            url: `/getPatientInfo?uid=${this.state.uid}`,
        }).then(res => {
            console.log('patient', res.data)
            this.setState({
                patients: res.data.data,
            })
        })
    }

    // 删除待就诊的预约
    clearBooking = (item) => {
        return () => {
            axios({
                baseURL: defaultUrl,
                method: 'post',
                url: `/updateBooking?rid=${item.rid}`,
            }).then(res => {
                res.data.msg !== 'ok' ? message.warn('出错了，请重试') :
                    axios({
                        baseURL: defaultUrl,
                        method: 'get',
                        url: `/getBookingRecord?uid=${this.state.uid}`,
                    }).then(res => {
                        console.log(res.data)
                        this.setState({
                            records: res.data.data
                        })
                        message.success('已取消');
                    })
            })

        }
    }

    // 选择菜单
    handleMenuClick = (e) => {
        this.setState({ selectedMenu: Number(e.key) });
        console.log(e)
    }
    showModal = (item) => {
        return (event) => {
            this.setState({ ModelVisible: true, detailItem: item });
        }

    };

    handleOnOk = () => {
        this.setState({ ModelVisible: false });
    };


    //选择就诊人
    SelectPatient = (value) => {
        console.log(value)
        this.setState({ currentPatient: value })
    }


    render() {
        const { records, selectedMenu, detailItem, ModelVisible, currentPatient, patients } = this.state
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar />
                </Header>
                <Layout className='mylayout' style={{ marginTop: '64px' }}>
                    <Sider width={256} style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }} className="site-layout-background">
                        <Menu onClick={this.handleMenuClick} defaultSelectedKeys="1" style={{ width: 275, padding: 18, paddingBottom: 0 }} mode="vertical">
                            <Menu.Item key="1">所有</Menu.Item>
                            <Menu.Item key="2">待就诊</Menu.Item>
                            <Menu.Item key="3">已取消</Menu.Item>
                            <Menu.Item key="4">已就诊</Menu.Item>
                            <Menu.Item key="5">未就诊</Menu.Item>
                        </Menu>
                        <Divider></Divider>
                        <Select
                            style={{ margin: '5px 25px', width: 150 }}
                            defaultValue="0"
                            placeholder="筛选就诊人"
                            onSelect={this.SelectPatient}
                        >
                            <Option value='0'>全部</Option>
                            {patients.map(function (item) {
                                return <Option value={item.Pid} title={item.name}>{item.name}</Option>
                            })}
                        </Select>
                    </Sider>
                </Layout>
                <Layout style={{
                    padding: '0 24px',
                    margin: '24px 0 0 250px',
                    minHeight: 700,

                }}>
                    <Content style={{ margin: '12px 12px 0' }}>
                        <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
                            {selectedMenu === 1 ?
                                <List
                                    bordered
                                    dataSource={currentPatient === '0' ? records : records.filter(recordsObj => {
                                        return recordsObj.identifyNumber === currentPatient
                                    })}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta title={<a>{`${item.date} | 就诊人：${item.name} | 状态：${item.others}`}</a>} description={`预约单号：${item.rid}  |  医院：${item.hospital}  |  科室：${item.department}  |  医生：${item.doctor}  |  时间段：${item.time}  |  就诊预约号：${item.reservationNumber}`}
                                            />
                                            {item.others === "待就诊" ?
                                                <Popconfirm
                                                    title="您确定要取消本次预约吗？（提醒：取消后无法撤回）"
                                                    onConfirm={this.clearBooking(item)}
                                                    okText="取消预约"
                                                    cancelText="我再想想"
                                                >
                                                    <Button>取消</Button>
                                                </Popconfirm> : null}
                                            <Button onClick={this.showModal(item)}>详情</Button>

                                        </List.Item>
                                    )}
                                /> :
                                selectedMenu === 2 ?
                                    <List
                                        bordered
                                        dataSource={currentPatient === '0' ? records.filter(recordsObj => {
                                            return recordsObj.others === '待就诊'
                                        }) :
                                            records.filter(recordsObj => {
                                                return recordsObj.others === '待就诊' && recordsObj.identifyNumber === currentPatient
                                            })
                                        }
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta title={<a>{`${item.date} | 就诊人：${item.name} | 状态：${item.others}`}</a>} description={`预约单号：${item.rid}  |  医院：${item.hospital}  |  科室：${item.department}  |  医生：${item.doctor}  |  时间段：${item.time}  |  就诊预约号：${item.reservationNumber}`}
                                                />
                                                <Popconfirm
                                                    title="您确定要取消本次预约吗？（提醒：取消后无法撤回）"
                                                    onConfirm={this.clearBooking(item)}
                                                    okText="取消预约"
                                                    cancelText="我再想想"
                                                >
                                                    <Button>取消</Button>
                                                </Popconfirm>
                                                <Button onClick={this.showModal(item)}>详情</Button>
                                            </List.Item>
                                        )}
                                    /> :
                                    selectedMenu === 3 ? <List
                                        bordered
                                        dataSource={currentPatient === '0' ? records.filter(recordsObj => {
                                            return recordsObj.others === '已取消'
                                        }) :
                                            records.filter(recordsObj => {
                                                return recordsObj.others === '已取消' && recordsObj.identifyNumber === currentPatient
                                            })
                                        }
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta title={<a>{`${item.date} | 就诊人：${item.name} | 状态：${item.others}`}</a>} description={`预约单号：${item.rid}  |  医院：${item.hospital}  |  科室：${item.department}  |  医生：${item.doctor}  |  时间段：${item.time}  |  就诊预约号：${item.reservationNumber}`}
                                                />
                                                <Button onClick={this.showModal(item)}>详情</Button>
                                            </List.Item>
                                        )}
                                    /> :
                                        selectedMenu === 4 ?
                                            <List
                                                bordered
                                                dataSource={currentPatient === '0' ? records.filter(recordsObj => {
                                                    return recordsObj.others === '已就诊'
                                                }) :
                                                    records.filter(recordsObj => {
                                                        return recordsObj.others === '已就诊' && recordsObj.identifyNumber === currentPatient
                                                    })
                                                }
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta title={<a>{`${item.date} | 就诊人：${item.name} | 状态：${item.others}`}</a>} description={`预约单号：${item.rid}  |  医院：${item.hospital}  |  科室：${item.department}  |  医生：${item.doctor}  |  时间段：${item.time}  |  就诊预约号：${item.reservationNumber}`}
                                                        />
                                                        <Button onClick={this.showModal(item)}>详情</Button>
                                                    </List.Item>
                                                )}
                                            /> :
                                            //selectedMenu == 5
                                            <List
                                                bordered
                                                dataSource={currentPatient === '0' ? records.filter(recordsObj => {
                                                    return recordsObj.others === '未就诊'
                                                }) :
                                                    records.filter(recordsObj => {
                                                        return recordsObj.others === '未就诊' && recordsObj.identifyNumber === currentPatient
                                                    })
                                                }
                                                renderItem={item => (
                                                    <List.Item>
                                                        <List.Item.Meta title={<a>{`${item.date} | 就诊人：${item.name} | 状态：${item.others}`}</a>} description={`预约单号：${item.rid}  |  医院：${item.hospital}  |  科室：${item.department}  |  医生：${item.doctor}  |  时间段：${item.time}  |  就诊预约号：${item.reservationNumber}`}
                                                        />
                                                        <Button onClick={this.showModal(item)}>详情</Button>
                                                    </List.Item>
                                                )}
                                            />
                            }
                        </div>
                    </Content>
                    <Modal title="预约信息" visible={ModelVisible} onOk={this.handleOnOk} onCancel={this.handleOnOk}>
                        <p className="site-description-item-profile-p">个人信息</p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="姓名" content={detailItem.name} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="身份证号" content={detailItem.identifyNumber} />
                            </Col>
                        </Row>
                        <Divider />
                        <p className="site-description-item-profile-p">预约内容</p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="医院" content={detailItem.hospital} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="科室" content={detailItem.department} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="医生" content={detailItem.doctor} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="日期" content={detailItem.date} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="时段" content={detailItem.time} />
                            </Col>
                            <Col span={12}>
                                <DescriptionItem title="就诊号" content={detailItem.reservationNumber} />
                            </Col>
                        </Row>
                        <Divider />
                        <p className="site-description-item-profile-p">其他信息</p>
                        <Row>
                            <Col span={12}>
                                <DescriptionItem title="状态" content={detailItem.others} />
                            </Col>
                        </Row>
                    </Modal>
                </Layout>
            </Layout>

        )
    }
}

