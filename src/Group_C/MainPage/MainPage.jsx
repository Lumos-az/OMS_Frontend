import React, {Component} from 'react';
import {Layout} from "antd";
import TopBar1 from "../../Component/TopBar1";
import ProductList from "../Component/ProductList";
import '../assets/css/MainPage.css'
const {Header, Content} = Layout

class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            medicineList: ''
        }
    }

    getData(msg){
        this.setState({
            medicineList: msg
        })
        console.log(msg);
    }
    render(){
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar1 history={this.props.history} medicine={this.getData.bind(this)}/>
                </Header>
                <Content className='yourcontent'>
                    <ProductList mlist={this.state.medicineList}/>
                </Content>
            </Layout>
        )
    }
}

export default MainPage;