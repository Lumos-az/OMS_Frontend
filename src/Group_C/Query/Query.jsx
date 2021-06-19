import React, {Component} from 'react';
import {Layout} from "antd";
import TopBar2 from "./TopBar2";
import TopBar from "../../Component/TopBar";
import ProductList from "../Component/ProductList";
import '../assets/css/MainPage.css'
import {Control} from 'react-keeper'
import axios from "axios";
const defaultUrl = 'http://10.185.104.173:5000/';
const {Header, Content} = Layout

class Query extends Component{
    constructor(props) {
        super(props);
        this.state={
            medicineList: ''
        }
    }
    // componentDidMount() {
    //     console.log(Control.state.plist);
    //     for(let i=0;i<Control.state.plist.length;i++){
    //         axios({
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             transformRequest: [function(data) {
    //                 data = JSON.stringify(data)
    //                 console.log(data)
    //                 return data
    //             }],
    //             baseURL:defaultUrl,
    //             method: 'post',
    //             url: '/api/medicine-images',
    //             data: {
    //                 'medicineID': Control.state.plist[i].medicineID,
    //             }
    //         }).then(res=>{
    //             console.log(res);
    //             //this.props.mlist[i].medicineImages = res.data;
    //         })
    //     }
    // }
    // componentDidMount() {
    //     axios({
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         transformRequest: [function (data) {
    //             data = JSON.stringify(data)
    //             console.log(data)
    //             return data
    //         }],
    //         baseURL: defaultUrl,
    //         method: 'post',
    //         url: '/api/search-by-name-fuzzy',
    //         data: {
    //             'text': this.props.location.query.name,
    //             'filters': {
    //                 'medicineProducer': [this.props.location.query.producer, 'fuzzy'],
    //                 'medicineMainFunction': [this.props.location.query.mainFunc, ''],
    //                 'medicineSuitable': ['', ''],
    //                 'medicineTypeMajor': [this.props.location.query.typeMajor, ''],
    //                 'medicineTypeMinor': ['', ''],
    //                 'isOTC': ['否', ''],
    //             },
    //         }
    //     }).then(res => {
    //         console.log(res.data);
    //         //this.props.medicine(res.data);
    //         for(let i=0;i<res.data.length;i++){
    //             axios({
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 transformRequest: [function(data) {
    //                     data = JSON.stringify(data)
    //                     console.log(data)
    //                     return data
    //                 }],
    //                 baseURL:defaultUrl,
    //                 method: 'post',
    //                 url: '/api/medicine-images',
    //                 data: {
    //                     'medicineID': res.data[i].medicineID,
    //                 }
    //             }).then(res1=>{
    //                 console.log(res1);
    //                 //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });
    //
    //                 res.data[i].medicineImages = res1.data;
    //                 this.setState({
    //                     medicineList: res.data
    //                 })
    //                 //this.props.medicine(res.data);
    //                 // this.setState({
    //                 //     plist: this.props.mlist,
    //                 // });
    //
    //             });
    //         }
    //
    //
    //         //     this.setState({
    //         //         producer: (this.state.producer===''||this.state.producer==='-')?'-':this.state.producer,
    //         //         mainFunc: (this.state.producer===''||this.state.producer==='-')?'-':this.state.mainFunc,
    //         //         typeMajor: (this.state.producer===''||this.state.producer==='-')?'-':this.state.typeMajor,
    //         //     })
    //         //     this.props.history.push('/list'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor)
    //         // Control.go('/list/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor,{plist: res.data})
    //         //this.props.history.push(`/`)
    //     })
    // }

    // getData(msg){
    //     this.setState({
    //         medicineList: msg
    //     })
    //     console.log(msg);
    // }

    render(){
        //console.log(Control.state);
        //console.log(this.props.location.query);
        return (
            <Layout>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar history={this.props.history}/>
                </Header>
                <Content className='yourcontent'>
                    {/*<ProductList mlist={this.props.location.state.plist}/>*/}
                    <ProductList name={this.props.match.params.name} producer={this.props.match.params.producer} func={this.props.match.params.func} class={this.props.match.params.class1} suit={this.props.match.params.suit}/>
                </Content>
            </Layout>
        )
    }
}

export default Query;