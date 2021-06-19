import React, {Component} from 'react';
import axios from 'axios';
import {Button, Input, List, Empty} from "antd";
import {Link} from "react-router-dom";
import {NotificationFilled, SearchOutlined} from "@ant-design/icons";
import '../../assets/css/listPage.css'

const defaultUrl = 'http://10.112.196.176:5003';

class searchPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            isEmpty:true,
            keyWord:"",
            keyword:this.props.match.params.key,
            showList:[]
        }
    }

    componentDidMount() {
        axios.defaults.baseURL = defaultUrl;
        axios.get('articleList/search/'+this.state.keyword
            ).then(res=>{
                this.setState({
                    showList:res.data.data
                })
        })
    }

    componentDidUpdate (prevProps){
        let oldId = prevProps.match.params.key
        let newId = this.props.match.params.key
        console.log(oldId,newId)
        if (newId !== oldId){
            axios.defaults.baseURL = defaultUrl;
            axios.get('articleList/search/'+newId
                ).then(res=>{
                    this.setState({
                        showList:res.data.data,
                        keyword:newId
                    })
            })
        }
    }

    onChange = (e) => {
        if(e.target.value === "" ){
            this.setState({
                isEmpty: true,
            })
        }
        else{
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
                                <div style={{marginLeft:'0.5rem'}}>搜索结果</div>
                            </div>
                        </div>
                        <div className='topNoticeContent'>
                            {
                                this.state.showList.length===0?(
                                    <div style={{width:'100%'}} class='myempty'>
                                        <Empty description={
                                            <span>
                                                没有搜索到相关文章
                                            </span>
                                        }/>
                                    </div>
                                ):(
                                    <List
                                        style={{width:'100%'}}
                                        dataSource={this.state.showList}
                                        renderItem={item=>(
                                            <List.Item>
                                                <div  style={{fontWeight:'600'}}>
                                                    <Link className='detailtitle' to={'/artical/detail/'+item.id}>{'['+item.date+'] '+item.title}</Link>
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default searchPage