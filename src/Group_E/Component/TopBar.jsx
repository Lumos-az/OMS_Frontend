import React from 'react';
import { Button, Menu, Dropdown, message, Modal, Form, Input, Checkbox } from 'antd';
import TopMenu from './TopMenu';
import '../assets/css/TopBar.css';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from "axios";

var storage=window.localStorage;
const defaultUrl = 'http://127.0.0.1:5003';



class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            getMenu:true,
            loading:false,
            username:null,
            userPassword:null,
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
        window.location.href = window.location.href// 注销则跳转到首页
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
            <Menu.Item key='logout' ><div onClick={this.logout} >退出登录</div></Menu.Item>
        </Menu>
    );

    render() {
        return(
            <div className="TopBar">
                <img className='logo' src={require('../assets/picture/logo.jpg').default} alt='logo'/>
                <div className='title'>
                    智慧医疗
                </div>
                <div style={{alignSelf: 'flex-end'}} className='Menu'><TopMenu/></div>
                <div className='username'>
                    {
                        (this.state.getMenu===true)?(
                            ''
                        ):(
                            storage['nickname']+',欢迎使用！'
                        )
                    }
                </div>

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
                                    placeholder="用户名或手机号"
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

export default TopBar
