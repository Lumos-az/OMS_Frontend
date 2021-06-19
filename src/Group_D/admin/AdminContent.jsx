import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { ReadOutlined, IdcardOutlined, TeamOutlined, HomeOutlined} from '@ant-design/icons';
import '../../assets/css/Admin.css'
import BackLogo from '../../assets/picture/back.png'
import ManageUser from './ManageUser'
import ManageBBS from './ManageBBS'
import AddSource from "./AddSource";
import AdminNotice from './AdminNotice'
const { Header, Content, Sider } = Layout;


class AdminContent extends Component {
	render() {
		return(
            <Layout >
                <Sider>
                <img class = "back-logo" src = {BackLogo} alt="管理员中心" />
                <Menu theme="dark" mode="inline" selectedKeys={[window.location.pathname]}>
                    <Menu.Item key = "/admin" icon={<HomeOutlined />}><Link to = "/admin"> 举报受理 </Link></Menu.Item>
                    <Menu.Item key="/admin/article/add" icon={<ReadOutlined />}><Link to = "/admin/article/add"> 管理文章、公告 </Link></Menu.Item>
                    <Menu.Item key="/admin/user" icon={<IdcardOutlined />}>
                    <Link to = "/admin/user"> 用户管理 </Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/bbs" icon={<TeamOutlined />}>
                    <Link to = "/admin/bbs"> 论坛管理 </Link>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                <Header className="site-layout-sub-header" style={{ padding: 0}}> 
                    <p class="headline">管理员，欢迎您！</p>  {/*改成具体的姓名 */}
                    <Button class="headline"><Link to = "/"> 返回首页 </Link></Button>
                    <p class="headline"> </p>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 800 }}>
                        <Switch>
                            <Route exact path = "/admin" component = {AdminNotice}/>
                            <Route exact path = "/admin/article/add" component = {AddSource}/>
                            <Route exact path = "/admin/user" component = {ManageUser}/>
                            <Route exact path = "/admin/bbs" component = {ManageBBS}/>
                        </Switch>
                    </div>
                </Content>
                </Layout>
        </Layout>
		)
	}
}

export default AdminContent