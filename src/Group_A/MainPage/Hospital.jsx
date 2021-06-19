import React, { Component } from 'react';
import { Col, Layout, Image, Row, Card, Badge, PageHeader, Menu, Divider, Descriptions, Button, List } from "antd";
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Header, Content } = Layout
const defaultUrl = 'http://10.112.196.176:5003';
var hid;
class Hospital extends Component {

    constructor(props) {
        super(props);
        hid = this.props.match.params.hid;
        this.state = {
            hid: this.props.match.params.hid,
        }
    }
    //         name:'浙大一院',
    //         pname:"浙江大学医学院附属第一医院",
    //         website:"http://www.zy91.com",
    //         telephone:"(0571)87236666 87236114",
    //         address:"浙江省杭州市庆春路79号(310003)",
    //         qualification:"三级甲等公立医院",
    //         departments:[

    //             {
    //                 'name':'外科',
    //                 'rooms':
    //                 [
    //                     {
    //                         'id':7,
    //                         'rname':'骨科'
    //                     },
    //                     {
    //                         'id':8,
    //                         'rname':'普通外科'
    //                     },
    //                     {
    //                         'id':9,
    //                         'rname':'泌尿外科'
    //                     },
    //                     {
    //                         'id':10,
    //                         'rname':'心胸外科'
    //                     },
    //                     {
    //                         'id':11,
    //                         'rname':'显微外科'
    //                     },
    //                     {
    //                         'id':12,
    //                         'rname':'营养减肥专科'
    //                     },
    //                     {
    //                         'id':13,
    //                         'rname':'肛肠外科'
    //                     },
    //                     {
    //                         'id':14,
    //                         'rname':'外伤科'
    //                     }

    //                 ]
    //             },
    //             {
    //                 'name':'内科',
    //                 'rooms':
    //                 [
    //                     {
    //                         'id':15,
    //                         'rname':' 哮喘和慢阻肺专科'
    //                     },
    //                     {
    //                         'id':16,
    //                         'rname':'呼吸内科呼吸内科门诊(普通)'
    //                     },
    //                     {
    //                         'id':17,
    //                         'rname':'营养专科'
    //                     },
    //                     {
    //                         'id':18,
    //                         'rname':'门诊慢性腹泻专科'
    //                     },
    //                     {
    //                         'id':19,
    //                         'rname':'睡眠性呼吸障碍'
    //                     },
    //                     {
    //                         'id':20,
    //                         'rname':'哮喘诊治专科'
    //                     },
    //                     {
    //                         'id':21,
    //                         'rname':'胃食管反流病专科'
    //                     },
    //                     {
    //                         'id':22,
    //                         'rname':'营养减肥专科'
    //                     }

    //                 ]
    //             },
    //             {
    //                 'name':'内科',
    //                 'rooms':
    //                 [
    //                     {
    //                         'id':15,
    //                         'rname':' 哮喘和慢阻肺专科'
    //                     },
    //                     {
    //                         'id':16,
    //                         'rname':'呼吸内科呼吸内科门诊(普通)'
    //                     },
    //                     {
    //                         'id':17,
    //                         'rname':'营养专科'
    //                     },
    //                     {
    //                         'id':18,
    //                         'rname':'门诊慢性腹泻专科'
    //                     },
    //                     {
    //                         'id':19,
    //                         'rname':'睡眠性呼吸障碍'
    //                     },
    //                     {
    //                         'id':20,
    //                         'rname':'哮喘诊治专科'
    //                     },
    //                     {
    //                         'id':21,
    //                         'rname':'胃食管反流病专科'
    //                     },
    //                     {
    //                         'id':22,
    //                         'rname':'营养减肥专科'
    //                     }

    //                 ]
    //             },
    //         ],
    //     }
    // }

    componentDidMount() {
        window.scrollTo(0, 0);  // 置顶代码
        axios({
            baseURL: defaultUrl,
            method: 'get',
            url: '/getHospitalInfo?hid=' + this.state.hid.toString(),
        }).then(res => {
            // console.log(res.data.data[0].departments)
            this.setState({
                name: res.data.data[0].name,
                pname: res.data.data[0].pname,
                website: res.data.data[0].website,
                telephone: res.data.data[0].telephone,
                address: res.data.data[0].address,
                qualification: res.data.data[0].qualification,
                departments: res.data.data[0].departments,

            })
            // console.log(this.state.departments)
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
                                            style={{ marginLeft: 40, marginTop: 40, height: 150 }}
                                            src="https://stc-new.8531.cn/assets/20200517/1589683060357_5ec0a374159bb87079170083.jpeg"
                                        />
                                    </Col>
                                    <Col span={18} style={{ marginLeft: -10, marginTop: 50 }}>
                                        <PageHeader
                                            ghost={false}
                                            title={this.state.name}
                                            subTitle={this.state.pname}

                                        >
                                            <Descriptions size="small" column={2}>
                                                <Descriptions.Item label="官网：">
                                                    <a>{this.state.website}</a>
                                                </Descriptions.Item>
                                                <Descriptions.Item label="电话："> {this.state.telephone}</Descriptions.Item>
                                                <Descriptions.Item label="地址：">{this.state.address}</Descriptions.Item>
                                                <Descriptions.Item label="性质">
                                                    {this.state.qualification}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        </PageHeader>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Divider plain></Divider>
                        <Row gutter={16} style={{ margin: 40, marginTop: 20 }}>
                            <Card title="预约须知" extra={<a href="#">More</a>} style={{ width: '100vw' }}>
                                <p>1.身份信息必须与就诊者保持一致</p>
                                <p>2.取消预约截止时间为就诊前一日24点</p>
                                <p>3.请比号源时间提前15分钟取号</p>
                                <p>4.上午预约号取号截止时间为上午10时，下午预约号取号截止时间为下午3时</p>
                            </Card>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24} style={{ margin: 40, marginTop: 20 }}>
                                <Menu selectedKeys='hospital' mode="horizontal" style={{ width: 400 }}>
                                    <Menu.Item key='hospital'>
                                        全部科室
                                </Menu.Item>
                                </Menu>
                                <Card style={{ marginRight: 80 }}>
                                    <List
                                        // style={{ display: 'flex', flexDirection: 'column' }}
                                        dataSource={this.state.departments}
                                        renderItem={item => (
                                            <List.Item>
                                                <div style={{ width: '150px' }}>{item.name}</div>
                                                <div
                                                    className="box"
                                                    style={{ width: '70vw', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'flex-start' }}
                                                >
                                                    {item.room.map(function (room) {
                                                        return <Link className="child" key={room.id} style={{ width: '200px', marginTop: '5px' }} to={'/Department/' + hid + '/' + room.id}>{room.rname}</Link>
                                                    })}
                                                </div>

                                            </List.Item>
                                        )}
                                    />

                                </Card>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Hospital;