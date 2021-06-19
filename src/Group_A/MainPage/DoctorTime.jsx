import React, { Component } from 'react'
import { Layout, List, Select, DatePicker, Space, Button, message } from 'antd';
import TopBar from "../../Component/TopBar";
import moment from 'moment';
import '../../assets/css/MainPage.css'
import '../../assets/css/BookingRecord.css'
import axios from 'axios';

const { Header, Content } = Layout
const { Option } = Select
let storage = window.localStorage;
const defaultUrl = 'http://10.112.196.176:5003';

export default class DoctorTime extends Component {
    //获取登录的did
    constructor(props) {
        super(props);
        //did = this.props.match.params.did;
        this.state = {
            //did: this.props.match.params.did,
            did: '6',
            records: [],
            selectedDate: moment().add(1, 'days'),
            selectedTime: '',
        }
    }

    // //请求数据
    componentDidMount() {
        axios({
            baseURL: defaultUrl,
            method: 'get',
            url: `/getDoctorInfo?did=${this.state.did}`,
        }).then(res => {
            console.log(res.data)
            this.setState({
                records: res.data.data[0].time,
                selectedDate: moment().add(1, 'days').format("YYYY-MM-DD"),
            })
        })
    }


    DatePickeronChange = (value) => {
        if (value != null)
            this.setState({ selectedDate: value.format("YYYY-MM-DD") });
    }

    // 医生选择排班时间
    SelectTime = (value) => {
        this.setState({ selectedTime: value })
    }
    // 医生增加排班时间
    addWorkingTime = () => {
        //针对空白选择
        if (this.state.selectedTime === '') {
            message.warn('请选择时间段！')
            return
        }
        //向后端传递数据
        axios({
            baseURL: defaultUrl,
            method: 'post',
            url: `/newBooking?did=${this.state.did}&Date=${this.state.selectedDate}&time=${this.state.selectedTime}`,
        }).then(res => {
            console.log(res.data)
            if (res.data.Error === "Already has booking") message.warn('该时间已排班！');
            else if (res.data.msg === 'ok')
                axios({
                    baseURL: defaultUrl,
                    method: 'get',
                    url: `/getDoctorInfo?did=${this.state.did}`,
                }).then(res => {
                    console.log(res.data)
                    if (res.data.msg === 'ok') {
                        this.setState({
                            records: res.data.data[0].time
                        })
                        message.success('已添加排班')
                    }
                    else {
                        message.warn('出错了，请重试')
                    }
                })
            else message.warn('出错了，请重试')
        })
    }

    // 只能选择7天
    disabledDate(current) {
        return current && current < moment().endOf('day') || current > moment().add(7, 'days');
    }

    render() {
        const { records, timeType, selectedDate } = this.state
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar />
                </Header>
                <Layout className='mylayout' >
                    <Layout style={{
                        padding: '0 24px',
                        margin: '24px 0 0 0',
                        minHeight: 700,
                        marginTop:'64px'
                    }}>
                        <Content style={{ margin: '12px 12px 0' }}>
                            <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
                                <Space>
                                    <DatePicker defaultValue={selectedDate} picker={timeType} disabledDate={this.disabledDate} onChange={this.DatePickeronChange} />
                                </Space>
                                <List
                                    bordered
                                    dataSource={records.filter(BookingObj => {
                                        return BookingObj.Date === selectedDate
                                    }
                                    )}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`${item.Date} | ${item.time}`}
                                                description={`当前预约人数：${item.state}  |  当前预约情况：${item.isFull === 'false' ? '未满' : '已满'}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                                <Select style={{ width: 200 }} placeholder="选择排班时间" onSelect={this.SelectTime}>
                                    <Option value="9:00-10:00">9:00-10:00</Option>
                                    <Option value="10:00-11:00">10:00-11:00</Option>
                                    <Option value="11:00-12:00">11:00-12:00</Option>
                                    <Option value="12:00-13:00">12:00-13:00</Option>
                                    <Option value="13:00-14:00">13:00-14:00</Option>
                                    <Option value="14:00-15:00">14:00-15:00</Option>
                                    <Option value="15:00-16:00">15:00-16:00</Option>
                                    <Option value="16:00-17:00">16:00-17:00</Option>
                                </Select>
                                <Button type="dashed" style={{ margin: 0 + ' auto' }} onClick={this.addWorkingTime}>添加排班</Button>




                            </div>

                        </Content>

                    </Layout>
                </Layout>
            </Layout>

        )
    }
}
