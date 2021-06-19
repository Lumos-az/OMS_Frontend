import React from 'react';
import ReactDOM from 'react-dom';
//import {Link} from 'react-router-dom';
//import {Control} from "react-keeper";
import {
    List,
    Typography,
    Divider,
    Avatar,
    Space,
    Checkbox,
    Card,
    Layout,
    Image,
    Descriptions,
    InputNumber,
    Button,
    Select,
    Alert
} from 'antd';
import TopBar from "../../Component/TopBar";
import ProductList from "../Component/ProductList";
import '../assets/css/ProductDetail.css'
import axios from "axios";
const { Option } = Select;
const {Header, Content} = Layout
const defaultUrl = 'http://10.185.104.173:5000/';
let amount=1;
class ProductDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            slist: [],
            chosenSupplier: '',
            price: ''
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
            url: '/api/add-history',
            data: {
                'userID': 2342,
                "medicineID": this.props.location.state.info.medicineID,
            }
        }).then(res=>{
            console.log(res);
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
            url: '/api/find-suppliers-for-medicine',
            data: {
                "medicineID": this.props.location.state.info.medicineID,
            }
        }).then(res=>{
            console.log(res.data);
            this.setState({
                slist: res.data,
            })
        });
    }
    handleClick(){

        if(this.state.chosenSupplier===''){
            alert("请先选择供应商");
        }
        else {
            let item = {};
            let v1 = this.props.location.state.info.medicineID.toString();
            let v2 = this.state.chosenSupplier;
            let id = `('${v1}','${v2}')`;
            console.log(id);
            item[id] = amount;
            console.log(item);
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
                url: '/api/displaycart',
                data: {
                    'userID': 2342,
                }
            }).then(res=>{
                console.log(res);
                if(res.data.items.length >= 20){
                    alert("购物车内药品达上限！")
                }
                else{
                    axios({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        transformRequest: [function (data) {
                            data = JSON.stringify(data)
                            console.log(data)
                            return data
                        }],
                        baseURL: defaultUrl,
                        method: 'post',
                        url: '/api/add-to-cart',
                        data: {
                            'userID': 2342,
                            'items': item,
                        }
                    }).then(res => {
                        console.log(res);
                    });
                    alert("添加成功！");
                }
            })
        }
    }
    handleBuy(){
        if(this.state.chosenSupplier===''){
            alert("请先选择供应商");
        }
        else{
            let item = this.props.location.state.info;

            axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                transformRequest: [function (data) {
                    //console.log(data)
                    data = JSON.stringify(data)
                    console.log(data)
                    return data
                }],
                baseURL: defaultUrl,
                method: 'post',
                url: '/api/submit-order',
                data: {
                    "userID": 2342,
                    "medicineID": this.props.location.state.info.medicineID,
                    "supplierID": this.state.chosenSupplier,
                    "amount": amount,
                },
            }).then(res => {
                console.log(res);
                //this.props.location.go('/order');
                this.props.history.push('/order');
                // this.setState({
                //     cartList: res.data.items,
                //     userID: res.data.userID,
                // })
            })
        }
    }
    handleFavor(){
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
            if(res.data.length >= 20){
                alert("收藏数量达上限!")
            }
            else{
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
                    url: '/api/add-favor',
                    data: {
                        'userID': 2342,
                        "medicineID": this.props.location.state.info.medicineID,

                    }
                }).then(res=>{
                    console.log(res);
                })
                alert("收藏成功!");
            }
        })
    }
    handleChange(val){
        amount = val;
        console.log(amount);
    }
    getid(val,opt){
        console.log(val+" ",opt);
        this.setState({
            chosenSupplier: opt.key,
            price: opt.className
        })
    }
    render() {
        let detail = this.props.location.state.info;
        return(
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='yourcontent'>
                    <Space size={200}>
                        <div>
                            <Image width={400} height={400} src={"data:image/png;base64,"+detail.medicineImages}/>

                        </div>
                        <div>
                            <div className='name'>
                                {detail.medicineNameAlias}
                            </div>
                            <br/>
                            <div>
                                <Space>
                                    <div>价格：</div>
                                    <div className={'price'}>￥{this.state.price}</div>
                                </Space>
                            </div>
                            <br/>
                            <div>
                                供应商：
                                <Select style={{width: 200}}
                                        placeholder={'请选择供应商'}
                                        onChange={(value,option)=>this.getid(value,option)}
                                >
                                    {this.state.slist.map(supplier=> {

                                            return (<Option key={supplier.supplierID}
                                                            className={supplier.price}
                                                     value={supplier.supplierID}>{supplier.supplierName + "  " + supplier.price + "元"}</Option>);
                                        }
                                    )
                                    }
                                </Select>
                            </div>
                            <br/>
                            <div className='amount'>
                                数量：
                                <InputNumber  min={1} defaultValue={1} onChange={value=>this.handleChange(value)}/>
                            </div>
                            <br/>
                            <div>
                                <Space size={10}>
                                <Button type="primary" size={"large"} onClick={()=>this.handleBuy()}>立即购买</Button>
                                <Button type="primary" size={"large"} onClick={(e)=>this.handleClick()}>加入购物车</Button>
                                    <Button type="primary" size={"large"} onClick={(e)=>this.handleFavor()}>加入收藏</Button>
                                </Space>
                            </div>
                        </div>
                    </Space>
                    <Descriptions title="药品详情" bordered>
                        <Descriptions.Item label="药品专业名称">{detail.medicineNameZh}</Descriptions.Item>
                        <Descriptions.Item label="英文名">{detail.medicineNameEn}</Descriptions.Item>
                        <Descriptions.Item label="是否为OTC">{detail.isOTC}</Descriptions.Item>
                        <Descriptions.Item label="制造商">{detail.medicineProducer}</Descriptions.Item>
                        <Descriptions.Item label="药品类型" span={2}>
                            {detail.medicineTypeMajor}
                        </Descriptions.Item>
                        <Descriptions.Item label="药品功能" span={3}>
                            {detail.medicineMainFunction}
                        </Descriptions.Item>
                        <Descriptions.Item label="药品组成" span={3}>
                            {detail.medicineIngre}
                        </Descriptions.Item>
                        <Descriptions.Item label="适宜人群" span={3}>
                            {detail.medicineSuitable}
                        </Descriptions.Item>
                        <Descriptions.Item label="注意事项" span={3}>
                            {detail.medicineDetails}
                        </Descriptions.Item>
                    </Descriptions>
                </Content>

            </Layout>
        )
    }
}

export default ProductDetail;