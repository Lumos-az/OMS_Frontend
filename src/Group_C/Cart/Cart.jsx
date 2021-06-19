import React, {Component} from 'react';
import {Button, Layout,List,InputNumber,Checkbox,Space} from "antd";
import TopBar from "../../Component/TopBar";
import ProductList from "../Component/ProductList";
import '../assets/css/Cart.css'
import axios from "axios";
// import {CacheLink,Link} from "react-keeper";
import {Link} from "react-router-dom";
const {Header, Content} = Layout
const defaultUrl = 'http://10.185.104.173:5000/';
// const testList = [
//     {productName: "burger",price: 40, amount: 1,url: "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2928278102/O1CN01HVZh7t29ilb85MGA2_!!2928278102-0-sm.jpg_580x580Q90.jpg_.webp"},
//     {productName: "ham",price: 30, amount: 2, url: "http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2928278102/O1CN01HVZh7t29ilb85MGA2_!!2928278102-0-sm.jpg_580x580Q90.jpg_.webp"},
// ]
// const [check, setcheck] = React.useState(false);
//
// const change=e=>{
//     setcheck(e.target.checked);
//     if(check){
//
//     }
// }
const columns = [
    {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
    },
    {
        title: '药品名',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: '供应商',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: '单价',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
    },

    {
        title: '金额',
        dataIndex: 'name',
        key: 'name',
    },

    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
    },
];
let sum=0;
class Cart extends Component{
    constructor(props) {
        super(props);
        this.state={
            cartList: [],
            sumValue: sum,
            payList: [],
            userID: ''
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
            url: '/api/displaycart',
            data: {
                'userID': 2342,
            }
        }).then(res=>{
            console.log(res);
            for(let i=0;i<res.data.items.length;i++){
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
                        'medicineID': res.data.items[i].medicine.medicineID,
                    }
                }).then(res1=>{
                    console.log(res1);
                    //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });

                    res.data.items[i].medicine.medicineImages = res1.data;
                    //this.props.medicine(res.data);
                    // this.setState({
                    //     plist: this.props.mlist,
                    // });
                    this.setState({
                        cartList: res.data.items,
                        userID: res.data.userID,
                    })
                });
            }

        })
    }

    // handleClick(){
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
    //         url: '/api/add-to-cart',
    //         data: {
    //             'userID': 2342,
    //             'items': {
    //                 '18': 1,
    //                 '85': 2,
    //                 '56': 4,
    //             },
    //         }
    //     }).then(res=>{
    //         console.log(res);
    //     })
    // }
    handleClick(){
        if(this.state.payList.length === 0){
            alert("请勾选至少一件药品");
        }
        else {
            //console.log(JSON.parse(this.state.payList[0]).medicineID);
            let arr = {};
            for(let i=0;i<this.state.cartList.length;i++){
                for(let j=0;j<this.state.payList.length;j++) {
                    if (this.state.cartList[i].medicine.medicineID ===JSON.parse(this.state.payList[j]).medicineID && this.state.cartList[i].supplier.supplierID ===JSON.parse(this.state.payList[j]).supplierID) {
                        console.log("fxxk");
                        this.state.cartList.splice(i, 1);
                    }
                }
            }
            for (let i = 0; i < this.state.payList.length; i++) {
                axios({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    transformRequest: [function (data) {
                        console.log(data)
                        // data = JSON.stringify(data)
                        // console.log(data)
                        return data
                    }],
                    baseURL: defaultUrl,
                    method: 'post',
                    url: '/api/submit-order',
                    data: this.state.payList[i],
                }).then(res => {
                    console.log(res);
                    this.props.history.push('/order');
                    // this.setState({
                    //     cartList: res.data.items,
                    //     userID: res.data.userID,
                    // })
                })
            }
            alert("订单提交成功")
            sum = 0;
            for(let i=0;i<this.state.cartList.length;i++){
                let v1 = this.state.cartList[i].medicine.medicineID;
                let v2 = this.state.cartList[i].supplier.supplierID;
                let pair = `('${v1}','${v2}')`;
                arr[pair] = this.state.cartList[i].amount;
            }
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
                url: '/api/editcart',
                data: {
                    'userID': 2342,
                    'cart': arr,
                }
            }).then(res=>{
                    console.log(res);
                    this.setState({
                        cartList: this.state.cartList,
                    })
                }
            );
        }
    }
    removeProduct(mid,sid){
        let arr = {};
        for(let i=0;i<this.state.cartList.length;i++){
            if(this.state.cartList[i].medicine.medicineID === mid && this.state.cartList[i].supplier.supplierID === sid){
                this.state.cartList.splice(i,1);
            }
        }
        for(let i=0;i<this.state.cartList.length;i++){
            let v1 = this.state.cartList[i].medicine.medicineID;
            let v2 = this.state.cartList[i].supplier.supplierID;
            let pair = `('${v1}','${v2}')`;
            arr[pair] = this.state.cartList[i].amount;
        }
        console.log(arr);
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
            url: '/api/editcart',
            data: {
                'userID': 2342,
                'cart': arr,
            }
        }).then(res=>{
                console.log(res);
                this.setState({
                    cartList: this.state.cartList,
                })
            }
        );
    }
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='yourcontent'>

                    <div className= 'page'>
                        <div className='cartList'>
                            <List>
                                <List.Item>
                                    <div>
                                        选择
                                    </div>
                                    <div>
                                        商品图片
                                    </div>
                                    <div>
                                        商品名
                                    </div>
                                    <div>供应商</div>
                                    <div>单价</div>
                                    <div>数量</div>
                                    <div>金额</div>
                                    <div className={'act'}>操作</div>
                                </List.Item>
                            </List>
                            <List

                                bordered = "true"
                                split = "true"
                                dataSource={this.state.cartList}
                                renderItem={item=>(
                                    <List.Item>
                                        {/*<Link to={'/detail'} state={{info: item}}>*/}
                                        <div className='sel'>
                                            <Checkbox onChange={(e)=>{
                                                //console.log(`checked = ${e.target.checked}`);
                                                if(e.target.checked){
                                                    this.setState({
                                                        payList: [...this.state.payList,`{"userID": ${this.state.userID},"medicineID": ${item.medicine.medicineID},"supplierID": ${item.supplier.supplierID},"amount": ${item.amount}}`]
                                                    })
                                                    //sum += Math.round(item.supplier.price*item.amount*100)/100
                                                    sum += item.supplier.price*item.amount
                                                    this.setState({sumValue: sum.toFixed(2)})
                                                }
                                                else{
                                                    for(let i=0;i<this.state.payList.length;i++){
                                                        let ts = eval("("+this.state.payList[i]+")");
                                                        if(ts.medicineID === item.medicine.medicineID && ts.supplierID === item.supplier.supplierID){
                                                            this.state.payList.splice(i,1);
                                                        }

                                                    }
                                                    // this.setState({
                                                    //     payList: ToDoList1.filter()
                                                    // })
                                                    //sum -= Math.round(item.supplier.price*item.amount*100)/100
                                                    sum -= item.supplier.price*item.amount
                                                    this.setState({sumValue: sum.toFixed(2)})
                                                    //console.log(sum)
                                                }
                                            }}/>
                                        </div>
                                        <div className='pic'>
                                            <img alt="medicine" src={"data:image/png;base64,"+item.medicine.medicineImages} width='100px' height='100px'/>
                                        </div>
                                        <div className='productName' >
                                            {item.medicine.medicineNameAlias}
                                        </div>
                                        <div>
                                            {item.supplier.supplierName}
                                        </div>
                                        <div className='unitPrice' style={{width: 60}}>
                                            {item.supplier.price}
                                        </div>
                                        <div className='amount'>
                                            {/*<InputNumber min={1} defaultValue={item.amount} />*/}
                                            {item.amount}
                                        </div>
                                        <div className='sumPrice'>
                                            {Math.round(item.supplier.price*item.amount*100)/100}
                                        </div>
                                        <div>
                                        <Button type='link' onClick={this.removeProduct.bind(this,item.medicine.medicineID,item.supplier.supplierID)}>
                                            删除
                                        </Button>
                                            |
                                            <Link to={{pathname:"/detail",state:{info: item.medicine}}}>
                                            <Button type='link' >
                                                详情
                                            </Button>
                                            </Link>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>

                        <div className='operatePart'>
                            <Space>
                            <div>合计：{this.state.sumValue}元</div>

                            <Button size='large' type="primary" onClick={()=>this.handleClick()}>
                                结算
                            </Button>
                            </Space>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default Cart;