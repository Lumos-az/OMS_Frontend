import React, {Component} from 'react';
import {Layout, Button, List, Form, Input, Modal, Image} from "antd";
import TopBar from "../../Component/TopBar";
import ProductList from "../Component/ProductList";
import '../assets/css/Hist.css'
import axios from "axios";
const {Header, Content} = Layout
const defaultUrl = 'http://10.185.104.173:5000/';
// function paid(props){
//     const ispaid = props.ispaid;
//     if (ispaid) {
//         return <UserGreeting />;
//     }
//     return
// ;
//
// }
class Order extends Component{
    constructor(props) {
        super(props);
        this.state={
            flist: [],
            visible1: false,
            url: ''
        }
    }
    componentDidMount() {
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
            url: '/api/display-order',
            data: {
                'userID': 2342,
            }
        }).then(res=>{
            console.log(res);
            for(let i=0;i<res.data.length;i++){
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
                    url: '/api/medicine-images',
                    data: {
                        'medicineID': res.data[i].medicineID,
                    }
                }).then(res1=>{
                    //console.log(res1);
                    //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });

                    res.data[i].medicineImages = res1.data;
                    this.setState({
                        flist: res.data,
                    })
                    // this.setState({
                    //     plist: this.props.mlist,
                    // });

                });
            }
            // this.setState({
            //     flist: this.state.flist.reverse(),
            // })
        })
    }
    removeFavor(id){
        console.log(id);
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
            url: '/api/remove-favor',
            data: {
                'userID': 2342,
                'medicineID': id,
            }
        }).then(res=>{
                console.log(res);
            }
        )
    }
    showModal=(item1)=>{
        console.log(item1)
        this.setState({
            visible1: true,
            url: "https://api.pwmqr.com/qrcode/create/?url=http://10.185.104.173:3000/pay/"+item1.orderID+"/"+item1.totPrice,
        });
    };
    handleOk=()=>{
        console.log('f2');
        this.setState({
            visible1: false,
        });
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
            url: '/api/display-order',
            data: {
                'userID': 2342,
            }
        }).then(res=>{
            console.log(res);
            for(let i=0;i<res.data.length;i++){
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
                    url: '/api/medicine-images',
                    data: {
                        'medicineID': res.data[i].medicineID,
                    }
                }).then(res1=>{
                    //console.log(res1);
                    //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });

                    res.data[i].medicineImages = res1.data;
                    this.setState({
                        flist: res.data,
                    })
                    // this.setState({
                    //     plist: this.props.mlist,
                    // });

                });
            }
            // this.setState({
            //     flist: this.state.flist.reverse(),
            // })
        })
    };

    handleCancel1=()=>{
        this.setState({
            visible1: false,
        });
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
            url: '/api/display-order',
            data: {
                'userID': 2342,
            }
        }).then(res=>{
            console.log(res);
            for(let i=0;i<res.data.length;i++){
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
                    url: '/api/medicine-images',
                    data: {
                        'medicineID': res.data[i].medicineID,
                    }
                }).then(res1=>{
                    //console.log(res1);
                    //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });

                    res.data[i].medicineImages = res1.data;
                    this.setState({
                        flist: res.data,
                    })
                    // this.setState({
                    //     plist: this.props.mlist,
                    // });

                });
            }
            // this.setState({
            //     flist: this.state.flist.reverse(),
            // })
        })
    }
    render(){
        const renderAuthButton = (item)=>{
            if(item.ispaid){
                return <div>?????????</div>
            } else{
                return <Button type='primary' onClick={this.showModal.bind(this,item)}>??????</Button>
            }
        }
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='yourcontent'>
                    <div className= 'page'>
                        <div className='hist'>????????????</div>
                        <div className='cartList'>
                            <List>
                                <List.Item>
                                    <div>
                                        ????????????
                                    </div>
                                    <div>
                                        ?????????
                                    </div>
                                    <div>
                                        ?????????
                                    </div>
                                    <div>
                                        ??????
                                    </div>
                                    <div>
                                        ??????
                                    </div>
                                    <div>
                                        ??????
                                    </div>
                                    <div>??????</div>
                                </List.Item>
                            </List>
                            <List
                                pagination={{
                                    pageSize: 10,
                                }}
                                bordered = "true"
                                split = "true"
                                // rowKey={item=>item.medicineID}
                                dataSource={this.state.flist}
                                renderItem={item=>(
                                    <List.Item>
                                        <div className='pic'>
                                            <img alt="medicine" src={"data:image/png;base64,"+item.medicineImages} width='100px' height='100px'/>
                                        </div>
                                        <div className='productName'>
                                            {item.medicineNameAlias}
                                        </div>
                                        <div>
                                            {item.supplierName}
                                        </div>
                                        <div>
                                            {item.price}
                                        </div>
                                        <div>
                                            {item.amount}
                                        </div>
                                        <div>
                                            {item.totPrice}
                                        </div>
                                        <div>
                                            {renderAuthButton(item)}
                                        </div>

                                    </List.Item>
                                )}
                            />
                        </div>
                        <Modal
                            visible={this.state.visible1}
                            title="??????"
                            onOk={this.handleOk}
                            onCancel={this.handleCancel1}
                        >
                            <div>
                                <Image width={400} height={400} src={this.state.url}/>
                            </div>
                        </Modal>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Order;