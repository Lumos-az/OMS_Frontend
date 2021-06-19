import React, {Component} from 'react';
import {Layout, Button, List} from "antd";
import TopBar from "../../Component/TopBar";
import ProductList from "../Component/ProductList";
import '../assets/css/Hist.css'
import axios from "axios";
import {Link} from "react-router-dom";
const {Header, Content} = Layout
const defaultUrl = 'http://10.185.104.173:5000/';
class Favor extends Component{
    constructor(props) {
        super(props);
        this.state={
            flist: [],
            test: 0,
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
            url: '/api/display-favor',
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
                    console.log(res1);
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

        })
    }
    removeFavor(id){
        for(let i=0;i<this.state.flist.length;i++){
            console.log(this.state.flist[i]);
            if(this.state.flist[i].medicineID === id){
                this.state.flist.splice(i,1);
            }
        }
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
            this.setState({
                flist: this.state.flist,
            })
            }
        )
    }
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='yourcontent'>
                    <div className= 'page'>
                        <div className='hist'>我的收藏</div>
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
                                    <div style={{width:100}}>操作</div>
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
                                            {item.medicineProducer}
                                        </div>
                                        <div>
                                        <Button type='link' onClick={this.removeFavor.bind(this,item.medicineID)}>
                                            删除
                                        </Button>
                                            |
                                        <Link to={{pathname:"/detail",state:{info: item}}}>
                                        <Button type='link'>
                                            详情
                                        </Button>
                                            </Link>
                                        </div>
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

export default Favor;