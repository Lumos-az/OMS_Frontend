import React, {Component} from 'react';
import { Descriptions, PageHeader} from "antd";
import  '../../assets/css/Post.css'
import axios from 'axios';

const defaultUrl = 'http://10.112.196.176:5003';

class detailPage extends Component{

    constructor(props) {
        super(props);
        this.state={
            id:this.props.match.params.id,
            author:'',
            date:'',
            content:'',
            type:-1,
            title:'',
        }
    }

    componentDidMount() {
        axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/article/'+this.state.id.toString(),
        }).then(res=>{
            this.setState({
                author:res.data.data.author,
                date:res.data.data.date,
                content:res.data.data.content,
                type:res.data.data.type,
                title:res.data.data.title
            })
        })
    }

    render() {
        return(
            <div style={{minHeight:'100%'}} >
                <div className="site-page-header-ghost-wrapper" style={{backgroundColor:'#f0f2f5'}}>

                    <br/>
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={this.state.title}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item
                                label="作者">{this.state.author}</Descriptions.Item>
                            <Descriptions.Item label="发布时间">{this.state.date}</Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                </div>

                {/* 作者帖子内容 */}
                <div className="comment-list">
                    {this.state.content}
                </div>

                <div><br/></div>
            </div>
        )
    }
}

export default detailPage