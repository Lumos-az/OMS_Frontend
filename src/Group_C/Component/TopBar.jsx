import React from 'react';
import {Button, Menu, Dropdown, message, Modal, Form, Input, Checkbox, Space} from 'antd';
import TopMenu from './TopMenu';
import '../assets/css/TopBar.css';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link ,withRouter} from 'react-router-dom';
import axios from "axios";
const { Search } = Input;
var storage=window.localStorage;
// const defaultUrl = 'http://10.112.196.176:5003';
const defaultUrl = 'http://10.185.121.66:5003';


class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            getMenu:true,
            loading:false,
            username:null,
            userPassword:null,

            visible1: false,
            producer: '-',
            mainFunc: '-',
            suit: '',
            typeMajor: '-',
            isOTC: '',
        }
    };

    componentDidMount() {
        if(storage['token']===undefined){
            this.setState({
                getMenu:true
            })
            storage['islogin']=false
        }
        else{
            axios({
                baseURL:defaultUrl,
                method:'post',
                url:'/islogin',
                headers:{
                    'Token':storage['token']
                }
            }).then(res=>{
                if(res.data.code!==0){
                    storage['islogin']=false
                }
                else{
                    storage['islogin']=true
                    this.setState({
                        getMenu:false,
                    })
                }
                console.log(storage['islogin'])
            })
        }
        console.log(this.state.getMenu, this.state.visible)
        console.log(storage['token'], storage['identity'])
    };

    login=()=> {
        this.setState({
            visible:true,
        })
    };

    handleCancel=()=> {
        this.setState({
            visible: false,
        });
    }

    getUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    };

    getPassword=(e)=>{
        this.setState({
            userPassword:e.target.value
        })
    };

    loginPost=()=> {
        if(this.state.username !== null && this.state.userPassword !== null) {
            this.setState({
                loading:true
            });

            let params={
                username:this.state.username,
                password:this.state.userPassword,
            };
            console.log(params)
            axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/login',
                params,
            }).then(res=>{
                console.log(res)
                if(res.data.data!==null) {
                    console.log(res)
                    storage['token']=res.data.data.token;
                    storage['user']=this.state.username;
                    storage['identity']=res.data.data.identity;
                    storage['nickname'] = res.data.data.nickname;
                    storage['phone'] = res.data.data.phone;
                    storage['email'] = res.data.data.email;
                    storage['address'] = res.data.data.address;
                    message.success('登录成功!');
                    this.setState({
                        visible:false,
                        loading:false,
                        getMenu:false,
                    });
                    window.location.href = window.location.href
                }
                else{
                    message.error('用户名或密码错误！');
                    this.setState({
                        loading:false
                    });
                }
            })
        }
    };

    register=()=> {

    };

    logout=()=> {
        storage.removeItem("user");
        storage.removeItem("token");
        storage.removeItem('identity')
        storage.removeItem('nickname')
        storage.removeItem('phone')
        storage.removeItem('email')
        storage.removeItem('nickname')
        message.success('address')
        // window.location.reload();
        window.location.pathname = '/'// 注销则跳转到首页
    };

    loginMenu=(
        <Menu>
            <Menu.Item key='login'> <div onClick={this.login}>登录</div> </Menu.Item>
            <Menu.Item key='register'> <Link to="/RegisterPage/">注册</Link> </Menu.Item>
        </Menu>
    );

    logoutMenu=(
        <Menu>
            <Menu.Item key='logout'><Link to="/PersonalInfo/">用户中心</Link></Menu.Item>
            <Menu.Item key='BookingRecord'><Link to="/BookingRecord">预约记录</Link></Menu.Item>
            <Menu.Item key="CM" ><Link to="/CM">就诊人管理</Link></Menu.Item>
            <Menu.Item key="DoctorTime">
                <Link to="/DoctorTime">出诊时间管理</Link>
            </Menu.Item>
            <Menu.Item key='logout' ><div onClick={this.logout} >退出登录</div></Menu.Item>
        </Menu>
    );

    showModal=()=>{
        this.setState({
            visible1: true,
        });
    };
    handleOk=()=>{
        console.log('f2');
        this.setState({
            visible1: false,
        });
    };

    handleCancel1=()=>{
        this.setState({
            visible1: false,
        });
    }
    test1(val){
        console.log(val)
        this.props.history.push('/list'+'/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor)
    }
    onSearch = (val,e)=>{
        if(val=== ""){
            alert("请输入药品名")
        }
        else {
            // axios({
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     transformRequest: [function (data) {
            //         data = JSON.stringify(data)
            //         console.log(data)
            //         return data
            //     }],
            //     baseURL: defaultUrl,
            //     method: 'post',
            //     url: '/api/search-by-name-fuzzy',
            //     data: {
            //         'text': val,
            //         'filters': {
            //             'medicineProducer': [this.state.producer==='-'?'':this.state.producer, 'fuzzy'],
            //             'medicineMainFunction': [this.state.mainFunc==='-'?'':this.state.mainFunc, ''],
            //             'medicineSuitable': [this.state.suit, ''],
            //             'medicineTypeMajor': [this.state.typeMajor==='-'?'':this.state.typeMajor, ''],
            //             'medicineTypeMinor': ['', ''],
            //             'isOTC': ['否', ''],
            //         },
            //     }
            // }).then(res => {
            //     console.log(res.data);
            //     //this.props.medicine(res.data);
            //     // for(let i=0;i<res.data.length;i++){
            //     //     axios({
            //     //         headers: {
            //     //             'Content-Type': 'application/json'
            //     //         },
            //     //         transformRequest: [function(data) {
            //     //             data = JSON.stringify(data)
            //     //             console.log(data)
            //     //             return data
            //     //         }],
            //     //         baseURL:defaultUrl,
            //     //         method: 'post',
            //     //         url: '/api/medicine-images',
            //     //         data: {
            //     //             'medicineID': res.data[i].medicineID,
            //     //         }
            //     //     }).then(res1=>{
            //     //         console.log(res1);
            //     //         //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });
            //     //
            //     //         res.data[i].medicineImages = res1.data;
            //     //
            //     //         //this.props.medicine(res.data);
            //     //         // this.setState({
            //     //         //     plist: this.props.mlist,
            //     //         // });
            //     //
            //     //     });
            //     // }
            //
            //     this.props.history.push({pathname: '/list'+'/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor,state: {plist: res.data}})
            //     //     this.setState({
            //     //         producer: (this.state.producer===''||this.state.producer==='-')?'-':this.state.producer,
            //     //         mainFunc: (this.state.producer===''||this.state.producer==='-')?'-':this.state.mainFunc,
            //     //         typeMajor: (this.state.producer===''||this.state.producer==='-')?'-':this.state.typeMajor,
            //     //     })
            //     //     this.props.history.push('/list'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor)
            //     // Control.go('/list/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor,{plist: res.data})
            //     //this.props.history.push(`/`)
            // })
            this.props.history.push('/list'+'/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor)
            //this.props.history.push({pathname: '/list'+'/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor,state: {plist: res.data}})
            //this.props.history.push('/list'+'/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor)

            // this.props.history.push({pathname: '/list',query:{name: val,producer: this.state.producer, mainFunc:this.state.producer, typeMajor:this.state.producer}});
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
                <img className='logo' src={require('../Group_C/assets/picture/logo.jpg').default} alt='logo'/>
                <div className='title'>
                    智慧医疗
                </div>
                <div style={{alignSelf: 'flex-end'}} className='Menu'><TopMenu/></div>
                <div>
                    <Button type={'link'} onClick={()=>this.showModal()}>筛选条件</Button>
                </div>

                <div className='Search'>
                    <Search placeholder="搜索想要的药品" onSearch={(val,e)=>this.onSearch(val,e)}  style={{ width: 200}} enterButton />
                </div>
                <div className='username'>
                    {
                        (this.state.getMenu===true)?(
                            ''
                        ):(
                            storage['nickname']+',欢迎使用！'
                        )
                    }
                </div>
                {
                    (this.state.getMenu===false&&storage['identity']==='2')?(
                        <div style={{marginLeft:'1px', marginRight:'5px'}}>
                            <Button type='primary'>
                                <Link to={'/admin'}>管理员中心</Link>
                            </Button>
                        </div>
                    ):('')
                }
                <div className='User'>
                    {
                        (this.state.getMenu===true)?(
                            <Dropdown overlay={this.loginMenu} trigger={['click']}>
                                <Button size='large' shape="circle" icon={<UserOutlined/>}/>
                            </Dropdown>
                        ):(
                            <Dropdown overlay={this.logoutMenu} trigger={['click']}>
                                <Button size='large' shape="circle" icon={<UserOutlined/>}/>
                            </Dropdown>
                        )
                    }
                </div>
                <Modal
                    visible={this.state.visible1}
                    title="筛选条件："
                    onOk={this.handleOk}
                    onCancel={this.handleCancel1}
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
                <Modal
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}

                >
                    <div className="user-login">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{remember: true,}}
                            style={{width:"100%"}}
                            preserve={false}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="用户名"
                                    type="username"
                                    onChange={(e)=>this.getUsername(e)}/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                    onChange={(e)=>this.getPassword(e)}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

                                />
                            </Form.Item>

                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="" style={{color:'blue'}}>
                                    <Link to="/FindPasswordPage/">忘记密码</Link>
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        onClick={this.loginPost}
                                        loading={this.state.loading}
                                >
                                    登录
                                </Button>
                                或者 <a href="" style={{color:'blue'}}>
                                <Link to="/RegisterPage/">现在注册！</Link>
                            </a>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(TopBar)
