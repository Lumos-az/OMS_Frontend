import React, {Component} from 'react';
import {Layout, Button, List, Checkbox, InputNumber, Space} from "antd";
import TopBar from "../../Component/TopBar";
import ProductList from "../Component/ProductList";
import '../assets/css/Hist.css'
import axios from "axios";
import {Link} from "react-router-dom";
const {Header, Content} = Layout
const defaultUrl = 'http://10.185.104.173:5000/';
class Prescription extends Component{
    constructor(props) {
        super(props);
        this.state={
            hlist: [],
        }
    }
    componentDidMount(){
        // axios({
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     transformRequest: [function(data) {
        //         data = JSON.stringify(data)
        //         console.log(data)
        //         return data
        //     }],
        //     baseURL:defaultUrl,
        //     method: 'post',
        //     url: '/api/add-to-prescription',
        //     data: {
        //         "patientUserID":2342,
        //         "itemjson": "{\"18\": 1, \"56\": 4, \"85\": 2}",
        //         "doctorID":12,
        //         "text":"五十天内不能吃饭"
        //     }
        // }).then(res=>{
        //
        // })
        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            transformRequest: [function(data) {
                data = JSON.stringify(data)
                console.log(data)
                return data
            }],
            baseURL:defaultUrl,
            method: 'post',
            url: '/api/display-prescription',
            data: {
                'userID': 2342,
            }
        }).then(res=>{
            console.log(res.data);
            // for(let i=0;i<res.data.length;i++){
            //     axios({
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         transformRequest: [function(data) {
            //             data = JSON.stringify(data)
            //             console.log(data)
            //             return data
            //         }],
            //         baseURL:defaultUrl,
            //         method: 'post',
            //         url: '/api/medicine-images',
            //         data: {
            //             'medicineID': res.data[i].medicineID,
            //         }
            //     }).then(res1=>{
            //         //console.log(res1);
            //         //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });
            //
            //         res.data[i].medicineImages = res1.data;
            //         this.setState({
            //             hlist: res.data,
            //         })
            //
            //         // this.setState({
            //         //     plist: this.props.mlist,
            //         // });
            //
            //     });
            // }
        })
    }

    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='yourcontent'>
                    <div className='hist'>处方记录</div>
                    <div className= 'page'>
                        <div className='cartList'>
                            <List>
                                <List.Item>
                                    <div>
                                        商品图片
                                    </div>
                                    <div>
                                        商品名
                                    </div>
                                    <div>
                                        制造商
                                    </div>
                                    <div>
                                        浏览时间
                                    </div>
                                    <div>操作</div>
                                </List.Item>
                            </List>
                            <List
                                pagination={{
                                    pageSize: 10,
                                }}
                                bordered = "true"
                                split = "true"
                                dataSource={this.state.hlist}
                                renderItem={item=>(
                                    <List.Item>
                                        <div className='pic'>
                                            <img alt="medicine" src={"data:image/png;base64,"+item.medicineImages} width='100px' height='100px'/>
                                        </div>
                                        <div className='productName'>
                                            {item.medicineNameAlias}
                                        </div>
                                        <div>
                                            {item.medicineProducer}
                                        </div>
                                        <div className='productName'>
                                            {item.viewTime}
                                        </div>
                                        <Link to={{pathname:"/detail",state:{info: item}}}>
                                            <Button type='link'>
                                                详情
                                            </Button>
                                        </Link>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Prescription;