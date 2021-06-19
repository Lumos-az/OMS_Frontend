import React from 'react';
import {Button,  Menu,Dropdown} from 'antd';
import TopMenu from '../Component/TopMenu';
import '../assets/css/TopBar.css';
import {UserOutlined} from '@ant-design/icons';
import { Input, Space,Modal,Form,Select } from 'antd';
import {Control} from 'react-keeper'
import axios from "axios";
import {Link} from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
const { Search } = Input;
//const onSearch = value => console.log(value);
const { SubMenu } = Menu;
const { Option } = Select;
const defaultUrl = 'http://10.186.61.25:5000/';
const loginMenu=(
    <Menu>
        <Menu.Item key='login'>登录</Menu.Item>
        <Menu.Item key='register'>注册</Menu.Item>
    </Menu>
);
// const menu = (
//     <Menu>
//         <Menu.Item>
//                 制造商：
//         </Menu.Item>
//         <Menu.Item>
//                 药品功能：
//         </Menu.Item>
//         <Menu.Item>
//                 适宜人群：
//         </Menu.Item>
//         <Menu.Item>
//                 药品类型：
//         </Menu.Item>
//         <SubMenu title="OTC类别">
//             <Menu.Item>甲类OTC</Menu.Item>
//             <Menu.Item>乙类OTC</Menu.Item>
//             <Menu.Item>OTC</Menu.Item>
//             <Menu.Item>否</Menu.Item>
//         </SubMenu>
//     </Menu>
// );
class TopBar2 extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            visible: false,
            producer: '',
            mainFunc: '',
            suit: '',
            typeMajor: '',
            isOTC: '',
        }
    }

    showModal=()=>{
        this.setState({
            visible: true,
        });
    };

    handleOk=()=>{
        console.log('f2');
        this.setState({
            visible: false,
        });
    };

    handleCancel=()=>{
        this.setState({
            visible: false,
        });
    }
    onSearch = (val,e)=>{
        if(val=== ""){
            alert("请输入药品名")
        }
        else {
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
                url: '/api/search-by-name-fuzzy',
                data: {
                    'text': val,
                    'filters': {
                        'medicineProducer': [this.state.producer, 'fuzzy'],
                        'medicineMainFunction': [this.state.mainFunc, ''],
                        'medicineSuitable': [this.state.suit, ''],
                        'medicineTypeMajor': [this.state.typeMajor, ''],
                        'medicineTypeMinor': ['', ''],
                        'isOTC': ['否', ''],
                    },
                }
            }).then(res => {
                console.log(res.data);
                this.props.medicine(res.data);
                //this.props.history.push({pathname: '/list',query:{plist: res.data}});
                //Control.go('/list',{plist: res.data})
            })
        }
    }
    getProducer(e){
        this.setState({
            producer: e.target.value
        })
    }
    getFunc(e){
        this.setState({
            mainFunc: e.target.value
        })
    }
    getSuit(e){
        this.setState({
            suit: e.target.value
        })
    }
    getType(e){
        this.setState({
            typeMajor: e.target.value
        })
    }
    getOTC(value){
        this.setState({
            isOTC: value
        })
    }
    render() {
        return(
            <div className="TopBar">
                <img className='logo' src={require('../assets/picture/logo.jpg').default} alt='logo'/>
                <div className='title'>
                    智慧医疗
                </div>
                <div style={{alignSelf: 'flex-end'}} className='Menu'><TopMenu/></div>
                <div>
                    <Button type={'link'} onClick={()=>this.showModal()}>筛选条件</Button>
                </div>
                <div className='Search'>
                    <Search placeholder="搜索想要的药品" onSearch={(val,e)=>this.onSearch(val,e)}  style={{ width: 400}} enterButton />
                </div>
                <div className='User'>
                    <Dropdown overlay={loginMenu} trigger={['click']}>
                        <Button size='large' shape="circle" icon={<UserOutlined/>}/>
                    </Dropdown>
                </div>
                <Modal
                    visible={this.state.visible}
                    title="筛选条件："
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Form>
                            <Form.Item name="username" label="制造商" >
                                <Input placeholder="请输入制造商" onChange={(e)=>this.getProducer(e)}/>
                            </Form.Item>
                            <Form.Item name="pwd1" label="药品功能" >
                                <Input placeholder="请输入药品功能" onChange={(e)=>this.getFunc(e)}/>
                            </Form.Item>
                            {/*<Form.Item name="pwd2" label="适宜人群" >*/}
                            {/*    <Input placeholder="请输入适宜人群" onChange={(e)=>this.getSuit(e)}/>*/}
                            {/*</Form.Item>*/}
                            <Form.Item name="pwd3" label="药品类别" >
                                <Input placeholder="请输入药品类别" onChange={(e)=>this.getType(e)}/>
                            </Form.Item>
                            {/*<Form.Item name="pwd4" label="OTC类别">*/}
                            {/*    <Select*/}
                            {/*        placeholder="请输入OTC类别"*/}
                            {/*        onChange={(value)=>this.getOTC(value)}*/}
                            {/*        allowClear*/}
                            {/*    >*/}
                            {/*        <Option value="甲类OTC">甲类OTC</Option>*/}
                            {/*        <Option value="乙类OTC">乙类OTC</Option>*/}
                            {/*        <Option value="OTC">OTC</Option>*/}
                            {/*        <Option value="否">否</Option>*/}
                            {/*    </Select>*/}
                            {/*</Form.Item>*/}
                        </Form>
                    </div>
                    {/*<div className='myregister'>*/}
                    {/*    <img className='Logo' src={require('../assets/picture/logo.jpg').default} alt='logo' style={{marginBottom:10}}/>*/}
                    {/*    <div className='registitle' style={{width:"80%",display:"flex",justifyContent:'center'}}>登录</div>*/}
                    {/*    <Form style={{width:"90%"}}>*/}
                    {/*        <Form.Item name="username" label="用户名" >*/}
                    {/*            <Input placeholder="请输入用户名" onChange = {(e)=>this.GetLoginMailbox(e)}/>*/}
                    {/*        </Form.Item>*/}
                    {/*        <Form.Item name="pwd" label="密码" >*/}
                    {/*            <Input.Password placeholder="请输入密码" onChange = {(e)=>this.GetLoginpwd(e)}/>*/}
                    {/*        </Form.Item>*/}
                    {/*    </Form>*/}
                    {/*    <Button type={"primary"} style={{width:"80%"}} loading={this.state.loginloading} onClick={this.login}>登录</Button>*/}
                    {/*</div>*/}
                </Modal>
            </div>

        )
    }
}

export default TopBar2