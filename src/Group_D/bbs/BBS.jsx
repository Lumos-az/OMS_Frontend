import React, {Component} from 'react';
import {Breadcrumb, Divider, Button, Input, Layout, Table, Form, Modal, message,Empty} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import TopBar from "../../Component/TopBar";
import '../../assets/css/Post.css'
import '../../assets/css/MainPage.css'
import {BulbFilled,SearchOutlined} from '@ant-design/icons'
const {Header, Content} = Layout

var storage=window.localStorage;
const { TextArea } = Input;
const defaultUrl = 'http://10.112.196.176:5003';

// 定义了首行列标题
const columns = [
	{
	  title: '标题',
	  dataIndex: 'title',
	  key: 'title',
	  width: '40%',
	//   render: text => <Link to={{pathname:"/study/post/"}}>{text}</Link>,
	  render: (text, record) => {
	  	if(Number(record.type)===0){
	  		return (
				<Link to={{pathname:"/post/"+record.post_id}}>{text}</Link>
			  );
		}
	  	else{
	  		return (
	  			<div class='posttitle'>
					<BulbFilled style={{color:'orange', marginRight:'1px'}}/>
					{"[置顶]"}
					<Link to={{pathname:"/post/"+record.post_id}} style={{marginLeft:'4px'}}>{text}</Link>
	  			</div>
			  );
		}
	  }
	},
	{
		title: '帖主',
		dataIndex: 'user_id',
		key: 'user_id',
		width: '30%',
		render : text => text,
	},
	{
		title: '时间',
		dataIndex: 'time',
		key: 'time',
		width: '30%',

	},
  ];

/**
 * 论坛首页
 */

var storage = window.localStorage

class BBS extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	isEmpty:true,
            keyWord:"",
			postList:[],
			showList:[],
			islogin:false,
			canPost:false
        };
    }


	jumpbottom = () => {
		window.scroll(0,document.body.scrollHeight);
	};


	componentDidMount(){
        axios.defaults.baseURL = defaultUrl;
        axios.get('/posts').then(
            res=>{
                this.setState({
                    postList:res.data.data,
					showList:res.data.data
                });
            }
		);
        if(storage['token']!==undefined){
        	var params = {
        		user: storage['user']
			}
			axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/CanPost',
                params
            }).then(res=>{
            	if(res.data.data===1){
            		this.setState({
						canPost:true
					})
				}
            	else{
            		this.setState({
						canPost:false
					})
				}
			})
		}
        if(storage['token']===undefined){
            this.setState({
                islogin:false
            })
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
                    console.log('true')
                    this.setState({
                        islogin:false
                    })
                }
                else{
                    console.log('false')
                    this.setState({
                        islogin:true
                    })
                }
            })
        }

	}

	// 发表帖子
	onFinish = (values) => {
		var params = {
			title: values.newtitle,
			user_id: storage['user'],
			content: values.newpost
		}
		let inputElement = document.getElementById("inputElement")
      	let file = inputElement.files[0];

		if(values.newtitle.length>50){
			message.error('标题不能超过50个字符长度')
			return
		}
		var data = new FormData();
		data.append("file", file)
		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/posts',
			data: data,
			params
		}).then(res=>{
			console.log(res.data.code)
			if(res.data.code===0){
				Modal.success({
		  		content: '发表帖子成功！',
		  		onOk: ()=>{
		  			window.location.href = window.location.href
				}
				});
			}
			else{
				Modal.error({
				content: '发表帖子失败！',
				onOk: ()=>window.location.href = window.location.href
			});
			}
		});

	};


	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	onChange = (e) => {
        if(e.target.value === "" ){
            this.setState({
                isEmpty: true,
				showList:this.state.postList
            })
        }
        else{
            this.setState({
                keyWord: e.target.value,
                isEmpty: false
            })
        }
    };

	search = () =>{
		var nowList=[]
		var i = 0
		var keyword = this.state.keyWord
		if(keyword.length > 32){
			message.error('搜索关键词长度应小于32个字符')
			return
		}
		var keywords = []
		var j = 0
		for(i=0;i<keyword.length;i++){
			if(keyword[i] === ' '&&keyword[i-1]!==' '){
				keywords.push(keyword.slice(j,i))
				j=i+1
			}
			else if(keyword[i] === ' '){
				j=i+1
			}
		}
		keywords.push(keyword.slice(j))
		for(i=0;i<this.state.postList.length;i++){
			var searched = true
			for(j=0;j<keywords.length;j++){
				if(this.state.postList[i].title.search(keywords[j])===-1){
					searched = false
					break
				}
			}
			if(searched)
				nowList.push(this.state.postList[i])
			else{
				var puzzle = true
				for(j=0;j<keywords.length;j++){
					var k =0
					for(k=0;k<keywords[j].length;k++){
						if(this.state.postList[i].title.search(keywords[j][k])===-1){
							puzzle = false
							break
						}
					}
					if(puzzle===false)
						break;
				}
				if(puzzle)
					nowList.push(this.state.postList[i])
			}
		}
		this.setState({
			showList:nowList
		})
	}

	render() {
		return(
			<Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
				<Content className='mycontent'>
					<div className = "post-back-ground">
				{/* <TopBar/> */}
				<div style = {{marginLeft: 200,  marginRight:200}}>

					<div className='Search'>
						<h1 className='PostBigPost' >交流论坛</h1>
						<Input  onPressEnter={this.search} placeholder="请输入帖子标题" allowClear  size="large"  onChange= {(e)=>this.onChange(e)} style={{width:'50%',marginLeft:'30%'}}/>

						<Button icon={<SearchOutlined/>} disabled={this.state.isEmpty} type="primary" size='large' onClick={this.search}/>

					</div>

					<Divider />
					{
						(this.state.islogin===true&&this.state.canPost===true)?(
							<Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>发帖</Button>
						):('')
					}
					{/* <Search placeholder="搜索帖子内容" style={{marginLeft: 10, width:"30%"}} onSearch={this.onSearch} enterButton /> */}

					{/* 帖子列表 */}
					<Content style = {{marginTop: 20, backgroundColor: '#ffffff'}}>
						{
							this.state.showList.length===0?(
								<Empty description={
									<span>
										没有搜索到相关帖子
									</span>
								}/>
							):(
								<Table columns={columns} dataSource={this.state.showList} />
							)
						}
					</Content>

					<br/>
					{
						(this.state.islogin===true&&this.state.canPost===true)?(
							<div style={{backgroundColor:'#ffffff'}}>
								<div style={{marginLeft:20, marginRight:20}}>
									<br/>
									<p>发表新帖</p>
									{/* <Upload {...props}>
										<Button style={{marginBottom: 20}} icon={<UploadOutlined />}>上传附件</Button>
									</Upload> */}

									<Form
										onFinish={this.onFinish}
										onFinishFailed={this.onFinishFailed}
									>
										<Form.Item
											label="帖子标题"
											name="newtitle"
											rules={[{ required: true, message: '请输入帖子标题!' }]}
										>
											<Input/>
										</Form.Item>

										<Form.Item
											label="帖子内容"
											name="newpost"
											rules={[{ required: true, message: '请输入帖子内容!' }]}
										>
											<TextArea style={{marginTop: 10}} showCount maxLength={500} />
										</Form.Item>
										<Form.Item
											label="图片"
											name="pic"
										>
											<input id="inputElement" type="file" name="img"  accept="image/png, image/gif, image/jpeg"/>
										</Form.Item>
										<Form.Item>
											<Button type="primary" htmlType="submit" >
											发表
											</Button>
										</Form.Item>

									</Form>
								</div>
								<br/>
							</div>
						):('')
					}
					{/* 发帖 */}

					<br/>

				</div>
			</div>
				</Content>
			</Layout>
		)
	}
}

export default BBS;

