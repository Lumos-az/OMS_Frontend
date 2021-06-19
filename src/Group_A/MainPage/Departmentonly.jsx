import React, {Component} from 'react';
import {Col, Layout,Image,Row,Card,Badge,PageHeader,Menu,Divider,Descriptions,Button} from "antd";
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
const defaultUrl = 'http://10.112.196.176:5003';
const {Header, Content} = Layout
var Did;
class Departmentonly extends Component{

    constructor(props) {
        super(props);
        Did=this.props.match.params.Did;
        this.state={
            Did:this.props.match.params.Did,
            // Hid:this.props.match.params.hid,
            name:"",
            pname:"",
            diseases:[
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
            allhospitals:[
                // {
                //     'hid':1,
                //     'name':'浙大一院',
                //     'pname':"浙江大学医学院附属第一医院",
                //     'website':"http://www.zy91.com",
                //     'telephone':"(0571)87236666 87236114",
                //     'address':"浙江省杭州市庆春路79号(310003)",
                   
                // },{
                //     'hid':2,
                //     'name':'浙大一院',
                //     'pname':"浙江大学医学院附属第一医院",
                //     'website':"http://www.zy91.com",
                //     'telephone':"(0571)87236666 87236114",
                //     'address':"浙江省杭州市庆春路79号(310003)",

                // },{
                //     'hid':3,
                //     'name':'浙大一院',
                //     'pname':"浙江大学医学院附属第一医院",
                //     'website':"http://www.zy91.com",
                //     'telephone':"(0571)87236666 87236114",
                //     'address':"浙江省杭州市庆春路79号(310003)",

                // }
            ],
            doctors:[
                {
                    'did':1,
                    'name':'王大鹏',
                    'phone':"012344556",
                    'profession':'主任医师',
                    'atHospital':"浙大一院",
                    'mail':"zy91@zju.edu.com",
                    'atDepartment':"心外科",
                    'address':"浙江省杭州市庆春路79号(310003)",
                    'avatarUrl':'http://img.yunkucn.com/file/image/pic/5a3442064769n3511879254c26.jpg'
                },{
                    'did':1,
                    'name':'齐强',
                    'phone':"012344556",
                    'profession':'主任医师',
                    'atHospital':"浙大二院",
                    'mail':"zy91@zju.edu.com",
                    'atDepartment':"外科",
                    'address':"浙江省杭州市庆春路79号(310003)",
                    'avatarUrl':'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2544008467,3548336506&fm=26&gp=0.jpg'
                },{
                    'did':1,
                    'name':'王大鹏',
                    'phone':"012344556",
                    'profession':'主任医师',
                    'atHospital':"浙大一院",
                    'mail':"zy91@zju.edu.com",
                    'atDepartment':"心外科",
                    'address':"浙江省杭州市庆春路79号(310003)",
                    'avatarUrl':'http://img.yunkucn.com/file/image/pic/5a3442064769n3511879254c26.jpg'
                },{
                    'did':1,
                    'name':'王一',
                    'phone':"012344556",
                    'profession':'主任医师',
                    'atHospital':"浙大五院",
                    'mail':"zy91@zju.edu.com",
                    'atDepartment':"内科",
                    'address':"浙江省杭州市庆春路79号(310003)",
                    'avatarUrl':'http://img.yunkucn.com/file/image/pic/5a3442064769n3511879254c26.jpg'
                }
            ],
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);  // 置顶代码
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/getDepartmentInfo?Did='+this.state.Did.toString(),
        }).then(res=>{
        console.log(res.data)
        this.setState({
            name:res.data.data[0].name,
            desp:res.data.data[0].desp,
            diseases:res.data.data[0].disease,
            })
        // console.log(this.state.departments)
        })
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'getHospitalbyDepartment?Did='+this.state.Did.toString(),
        }).then(res=>{
        console.log(res.data)
        this.setState({
            // name:res.data.data[0].name,
            allhospitals:res.data.data
            })
        // console.log(this.state.departments)
        })
        // axios({
        //     baseURL:defaultUrl,
        //     method:'get',
        //     url:'/getHospitalInfo?hid='+this.state.Hid.toString(),
        // }).then(res=>{
        // console.log(res.data)
        // this.setState({
        //     // name:res.data.data[0].name,
        //     pname:res.data.data[0].name
        //     })
        // })
    }
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content style={{ padding: 50, minHeight: '100vh' }} className='mycontent'>
                    <div className="site-layout-background" style={{ padding: 18, minHeight: '100vh' }}>
                        <PageHeader
                                    className="site-page-header"
                                    title={this.state.name}
                                    style={{margin:40,marginTop:10}}
                                />
                        <Row gutter={16} style={{margin:40,marginTop:-40,marginBottom:0}}>
                            <Card style={{ width: '100vw' }}>
                            <p>{this.state.desp}</p>
                            </Card>
                        </Row>
                        <Divider></Divider>
                        <Row gutter={16} style={{margin:40,marginTop:0}}>
                            <Card title='相关疾病' style={{ width: '100vw' }}>
                                <Row gutter={16} style={{marginLeft:80}}>
                                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',Left:'500px'}}>
                                        {this.state.diseases.map(function(disease){
                                            return <Link key={disease.iid} style={{width:200,marginTop:'10px'}} to={'/Disease/'+disease.iid}>{disease.iname}</Link>
                                        })}
                                    </div>
                                </Row>
                            </Card>
                        </Row>                        
                        <Divider></Divider>
                        <Row gutter={16} style={{margin:40,marginTop:0}}>
                            <Card title='相关医院' style={{ width: '100vw' }}>
                                {this.state.allhospitals.map(function(hospital){
                                    return (
                                    <Row gutter={16} style={{marginLeft:80}}>
                                        <Col span={24} style={{marginLeft:-40}}>
                                            <PageHeader
                                                ghost={false}
                                                title={hospital.name}
                                                subTitle={hospital.pname}
                                                extra={[
                                                    <Button key="3" type="primary"><Link to={"/Department/"+hospital.hid+"/"+Did}>预约</Link></Button>,
                                                    
                                                ]}
                                                >
                                                <Descriptions size="small" column={2}>
                                                    <Descriptions.Item label="官网：">
                                                    <a>{hospital.website}</a>
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="电话："> {hospital.telephone}</Descriptions.Item>
                                                    <Descriptions.Item label="地址：">{hospital.address}</Descriptions.Item>
                                                    <Descriptions.Item label="性质">
                                                    {hospital.qualification}
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            </PageHeader>
                                        </Col>
                                    </Row>
                                    )
                                })}
                            </Card>
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Departmentonly;