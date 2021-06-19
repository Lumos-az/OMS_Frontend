import React, {Component} from 'react';
import { List, InputItem, WhiteSpace,WingBlank,Button,Card,Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import '../../assets/css/Pay.css'
import axios from "axios";
const defaultUrl = 'http://10.185.104.173:5000/';
class Pay extends Component {
    componentDidMount() {
        this.state ={
            pwd: ''
        }
    }
    handleClick = () => {
        this.inputRef.focus();
    }
    payconfirm(){
        if(this.state.pwd==='123456'){
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
                url: '/api/submit-payment-info',
                data: {
                    'orderList': [this.props.match.params.orderid],
                    'platform': "Alipay",
                }
            }).then(res=>{
                    console.log(res);
                    // this.setState({
                    //     cartList: this.state.cartList,
                    // })
                }
            );
            Toast.success('支付成功！', 1);
        }
        else{
            Toast.fail('密码错误', 1);
        }
    }
    getPwd(str){
        this.setState({
            pwd: str,
        })
    }
    render() {
        return (
            <div>
                {/*<Card>*/}
                {/*    <Card.Header*/}
                {/*        title="待支付金额："*/}
                {/*    />*/}
                {/*    <Card.Body>*/}
                {/*        <div>*/}
                {/*            ￥{this.props.match.params.money}*/}
                {/*        </div>*/}
                {/*    </Card.Body>*/}
                {/*    /!*<Card.Footer content="footer content" extra={<div>extra footer content</div>} />*!/*/}
                {/*</Card>*/}
                <div className={"aaa"}>
                    待支付金额：
                </div>
                <div className={"bbb"}>
                    ￥{this.props.match.params.money}
                </div>
                <div className={"ccc"}>
                    <InputItem
                        type="password"
                        placeholder="请输入支付密码"
                        onChange={(str)=>this.getPwd(str)}
                    >密码</InputItem>

                </div>

                    <Button type={"primary"} size={"large"} onClick={()=>this.payconfirm()}>确认支付</Button>
            </div>

        );
    }
}

export default Pay;

