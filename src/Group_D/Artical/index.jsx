import React, {Component} from 'react';
import {Layout} from "antd";
import TopBar from "../../Component/TopBar";
import '../../assets/css/MainPage.css'
import {Route, Switch} from 'react-router-dom'
import listPage from "./listPage";
import detailPage from "./detailPage";
import searchPage from "./searchPage";
const {Header, Content} = Layout

class Artical extends Component{
    render(){
        return (
            <Layout style={{minHeight:'100%'}}>
                <Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent'>
                    <Switch>
                        <Route exact path = '/artical/all' component={listPage}/>
                        <Route exact path = '/artical/detail/:id' component={detailPage}/>
                        <Route exact path = '/artical/search/:key' component={searchPage}/>
                    </Switch>
                </Content>
            </Layout>
        )
    }
}

export default Artical;