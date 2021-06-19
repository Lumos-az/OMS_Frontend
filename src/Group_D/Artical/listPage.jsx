import React, {Component} from 'react';
import '../../assets/css/listPage.css'
import {List, Input, Button, message} from "antd";
import {NotificationFilled,SearchOutlined} from "@ant-design/icons";
import axios from 'axios';
import {Link} from 'react-router-dom';

const defaultUrl = 'http://10.112.196.176:5003';

class listPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            isEmpty:true,
            keyWord:"",
            topNoticeList:[],
            recommendRead:{},
            hotArticle:[],
            authorityPost:[],
            allNotice:[],
        }
    }

    componentDidMount() {
        axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/articleSource',
        }).then(res=>{
            this.setState({
                topNoticeList:res.data.data.topNoticeList,
                recommendRead:res.data.data.recommendRead,
                hotArticle:res.data.data.hotArticle,
                authorityPost:res.data.data.authorityPost,
                allNotice:res.data.data.allNotice,
            })
        })
    }

    onChange = (e) => {
        if(e.target.value === "" ){
            this.setState({
                isEmpty: true,
            })
        }
        else{
            if(e.target.value.length > 32){
                message.error('搜索关键词长度应小于32个字符')
                return
		    }
            this.setState({
                keyWord: e.target.value,
                isEmpty: false
            })
        }
    };

    render() {
        return(
            <div className='mainPage'>

                <div className='articleleftPart'>
                    <div className='Search'>
                        <Input  placeholder="搜索文章、公告" allowClear  size="large"  onChange= {(e)=>this.onChange(e)} />
                        <Link to={"/artical/search/"+this.state.keyWord}>
                            <Button icon={<SearchOutlined/>} disabled={this.state.isEmpty} type="primary" size='large'/>
                        </Link>
                    </div>
                    <div className='topNotice'>
                        <div className='mainPageTitle1'>
                            <div className='mainPageTitleRow' style={{width:'100%'}}>
                                <NotificationFilled color={'green'}/>
                                <div style={{marginLeft:'0.5rem'}}>置顶公告</div>
                            </div>
                        </div>
                        <div className='topNoticeContent'>
                            <List
                                style={{width:'100%'}}
                                dataSource={this.state.topNoticeList}
                                renderItem={item=>(
                                    <List.Item>
                                        <div  style={{fontWeight:'600'}}>
                                            <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div className='recommendedReading'>
                        <div className='mainPageTitle2'>
                            <div className='mainPageTitleRow' style={{width:'100%'}}>
                                <NotificationFilled />
                                <div style={{marginLeft:'0.5rem'}}>科普推荐</div>
                            </div>
                        </div>
                        <div className='recommendedReadingContent'>
                            <div className='recommendedReadingImage'>
                                <img src={require('../../assets/picture/文学交流.png').default}/>
                            </div>
                            <div className='recommendTitle'>
                                <Link className='detailtitle' to={'/artical/detail/'+this.state.recommendRead.id}>{this.state.recommendRead.title}</Link>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='mainPageList'>
                            <div className='mainPageTitle1'>
                                <div className='mainPageTitleRow' style={{width:'100%'}}>
                                    <NotificationFilled />
                                    <div style={{marginLeft:'0.5rem'}}>热门文章</div>
                                </div>
                            </div>
                            <div className='mainPageListContent1'>
                                <List
                                    style={{width:'100%'}}
                                    dataSource={this.state.hotArticle}
                                    renderItem={item=>(
                                        <List.Item>
                                            <div  style={{fontWeight:'600'}}>
                                                <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='mainPageList'>
                            <div className='mainPageTitle1'>
                                <div className='mainPageTitleRow' style={{width:'100%'}}>
                                    <NotificationFilled />
                                    <div style={{marginLeft:'0.5rem'}}>权威发布</div>
                                </div>
                            </div>
                            <div className='mainPageListContent1'>
                                <List
                                    style={{width:'100%'}}
                                    dataSource={this.state.authorityPost}
                                    renderItem={item=>(
                                        <List.Item>
                                            <div  style={{fontWeight:'600'}}>
                                                <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='articlerightPart'>
                    <div className='allNotice'>
                        <div className='mainPageTitle2'>
                            <div className='mainPageTitleRow' style={{width:'100%'}}>
                                <NotificationFilled />
                                <div style={{marginLeft:'0.5rem'}}>最新公告</div>
                            </div>
                        </div>
                        <div className='schoolNewsContent'>
                            <List
                                style={{width:'100%'}}
                                pagination={{
                                    pageSize:4
                                }}
                                dataSource={this.state.allNotice}
                                renderItem={item=>(
                                    <List.Item>
                                        <div  style={{fontWeight:'600'}}>
                                            <Link className='noticetitle' to={'/artical/detail/'+item.id}>{'['+item.date+']\n'+item.title}</Link>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default listPage