import React, {Component} from 'react';
import {Breadcrumb, PageHeader, Button, Descriptions, Comment, Input, Form, Row, Modal, Layout, Radio, Col, Checkbox,message} from 'antd';
import  '../../assets/css/Post.css'
import '../../assets/css/MainPage.css'
import { List, Divider } from 'antd';
import qiushi from "../../assets/picture/qiushi.png"
import axios from 'axios';
import TopBar from "../../Component/TopBar";

const { TextArea } = Input;
const {Header, Content} = Layout
const defaultUrl = 'http://10.112.196.176:5003';


var storage = window.localStorage

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        islogin:false,
        postID:this.props.match.params.id,
        postInfo:[],
        commentList:[],
        candeletepost:false,
        canReply:false,
        selectedReply:'',
        visible1:false,
        visible2:false,
        report1:'',
        reprot2:'',
    };
  }

  componentDidMount(){
    axios.defaults.baseURL = defaultUrl;

    axios.get('/post/'+this.state.postID.toString()).then(
        res=>{
            this.setState({
                postInfo:res.data.data,
            });
            var candeletepost = this.CanDeletePost();
            console.log(res.data.data)
            this.setState({
                candeletepost:candeletepost
            })
        }
    );

    if(storage['token']!==undefined){
        	var params = {
        		user: storage['user']
			}
			axios({
                baseURL:defaultUrl,
                method:'get',
                url:'/CanReply',
                params
            }).then(res=>{
            	if(res.data.data===1){
            		this.setState({
						canReply:true
					})
				}
            	else{
            		this.setState({
						canReply:false
					})
				}
			})
		}

    axios.get('/replies/'+this.state.postID.toString()).then(
      res=>{
          this.setState({
              commentList:res.data.data,
          });
      }
    );

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
                    this.setState({
                        islogin:false
                    })
                }
                else{
                    this.setState({
                        islogin:true
                    })
                }
            })
        }
  }

  jumpbottom = () => {
		window.scroll(0,document.body.scrollHeight);
  }

  deletepost = () => {  // ????????????

    axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/post/'+this.state.postID,
		}).then(res=>{
		    this.delePostSuccess()
        }).catch(function (error) {
			console.log(error);
        });

  }

  delePostSuccess() {
    Modal.success({
      content: '??????????????????',
      onOk: ()=>this.postOK()
    });
  }

  postOK(){
    window.history.back()
  }

  deleComSuccess() {
    Modal.success({
      content: '??????????????????',
      onOk: ()=>window.location.href = window.location.href
    });
  }

  delecomment = (item) =>{    // ????????????
    console.log("delete reply:",item.reply_id)

    axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/reply/'+item.reply_id,
		}).then(res=>{
		    this.deleComSuccess()
        }).catch(function (error) {
			console.log(error);
      });
  }



  // ????????????
  onFinish = (values) => {
		var params = {
			user_id: storage['user'],
			content: values.newcomment
		}

		let inputElement = document.getElementById("inputElement")
      	let file = inputElement.files[0];
		var data = new FormData();
		data.append("file", file)
		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/replies/'+this.state.postID,
            data: data,
			params
		}).then(res=>{
		    Modal.success({
		  		content: '???????????????',
		  		onOk: ()=>window.location.href = window.location.href
			});
        }).catch(function (error) {
			console.log(error);
      });

  };


	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	CanDeletePost=()=>{
	    console.log(storage['user'], this.state.postInfo.user)
	    if(storage['user']===this.state.postInfo.user){
	        return true;
        }
	    else{
	        if(storage['identity']==='2')
	            return true;
	        else
	            return false;
        }
    }


    show1=()=>{
	    if(this.state.islogin===false)
	        return('');
	    else {
            if(this.state.candeletepost===false&&this.state.canReply===true) {
                return(
                    <Row>
                        <Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>????????????</Button>
                        <Button style = {{ width: 90, height: 32, fontSize:14, marginLeft:20}} onClick = { this.showmodel1 }>????????????</Button>
                    </Row>
                )
            }
            else if(this.state.candeletepost===true&&this.state.canReply===true){
                return(
                    <Row>
                        <Button style = {{ width: 90, height: 32, fontSize:14}} type="primary" onClick = { this.jumpbottom }>????????????</Button>
                        <Button style = {{ width: 90, height: 32, fontSize:14, marginLeft:20}} onClick = { this.deletepost }>????????????</Button>
                    </Row>
                )
            }
            else if(this.state.candeletepost===false&&this.state.canReply===false){
                return(
                    ''
                )
            }
            else{
                return(
                    <Button style = {{ width: 90, height: 32, fontSize:14, marginLeft:20}} onClick = { this.deletepost }>????????????</Button>
                )
            }
        }
    }

    show2=(item)=>{
	    if(item.user_id===storage['user']){
	        return(
	            <Button key="comment-delete" style = {{ marginLeft:20}} onClick = {()=>this.delecomment(item)}>????????????</Button>
            )
        }
	    else{
	        if(storage['identity']==='2'){
	            return(
	                <Button key="comment-delete" style = {{ marginLeft:20}} onClick = {()=>this.delecomment(item)}>????????????</Button>
                )
	        }
	        else{
	            return(
	                <Button key="comment-delete" style = {{ marginLeft:20}} onClick = {()=>this.showmodel2(item)}>????????????</Button>
                )
            }
        }
    }

    showmodel1=()=>{
	    this.setState({
            visible1: true,
        });
    }

    showmodel2=(item)=>{
	    this.setState({
            visible2:true,
            selectedReply:item.reply_id
        })
    }

    handleOk1=()=>{
        this.setState({
            visible1: false,
        });
    };

    handleCancel1=()=>{
        this.setState({
            visible1: false,
        });
    }

    onFinish1 = (values) => {
        var str = ''
        var i = 0;
        if(values.reason===undefined&&values.other===undefined){
            message.error('????????????????????????');
            return
        }
        if(values.reason!==undefined){
            for(i=0;i<values.reason.length;i++){
                str = str + values.reason[i] +';'
            }
        }
        if(values.other!==undefined){
            str = str + values.other + ';'
        }
        var params = {
            post_id: Number(this.state.postID),
            reporter_id:storage['user'],
            content:str
		}
		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/post_report',
			params
		}).then(res=>{
			if(res.data.code===0){
				Modal.success({
		  		content: '???????????????',

				});
				this.setState({
                    visible1:false
                })
			}
			else{
				Modal.error({
				content: '???????????????',
			});
				this.setState({
                    visible1:false
                })
			}
		});
    };

    onFinishFailed1 = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    handleOk2=()=>{
        this.setState({
            visible2: false,
        });
    };

    handleCancel2=()=>{
        this.setState({
            visible2: false,
        });
    }

    onFinish2 = (values) => {
        var str = ''
        var i = 0;
        if(values.reason===undefined&&values.other===undefined){
            message.error('????????????????????????');
            return
        }
        if(values.reason!==undefined){
            for(i=0;i<values.reason.length;i++){
                str = str + values.reason[i] +';'
            }
        }
        if(values.other!==undefined){
            str = str + values.other + ';'
        }
        var params = {
            reply_id: Number(this.state.selectedReply),
            reporter_id:storage['user'],
            content:str
		}
		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/reply_report',
			params
		}).then(res=>{
			if(res.data.code===0){
				Modal.success({
		  		content: '???????????????',

				});
				this.setState({
                    visible2:false
                })
			}
			else{
				Modal.error({
				content: '???????????????',
			});
				this.setState({
                    visible2:false
                })
			}
		});
    };

    onFinishFailed2 = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    getIdentity=(num)=>{
	    if(num===0)
	        return ''
        else if(num===1)
            return '(??????)'
        else
            return '(?????????)'
    }

	render() {
		return(
		    <Layout>
				<Header className='myhead' style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <TopBar/>
                </Header>
                <Content className='mycontent'>
			        <div className = "comment-back-ground">
                        <div className="site-page-header-ghost-wrapper">

                        <br/>
                          <PageHeader
                            ghost={false}
                            onBack={() => window.history.back()}
                            title={this.state.postInfo.title}
                          >
                            <Descriptions size="small" column={3}>
                              <Descriptions.Item label="??????">{this.state.postInfo.user_id+this.getIdentity(this.state.postInfo.user_identity)}</Descriptions.Item>
                              <Descriptions.Item label="????????????">{this.state.postInfo.time}</Descriptions.Item>
                            </Descriptions>
                          </PageHeader>
                        </div>

                        {/* ?????????????????? */}
                        <div class="comment-list">
                          <Comment
                              author={this.state.postInfo.user_id+this.getIdentity(this.state.postInfo.user_identity)}
                              avatar={qiushi}
                              content={
                                  <div>
                                      <p>{this.state.postInfo.content}</p>
                                      {
                                          this.state.postInfo.has_file===true?(
                                              <img src={defaultUrl+'/'+this.state.postInfo.file} alt={"??????"} style={{width:'50%'}}/>
                                          ):(
                                              ""
                                          )
                                      }
                                  </div>
                              }
                              datetime={this.state.postInfo.time}
                            />
                        {
                          this.show1()
                        }

                        </div>

                        <div><br/></div>

                        {/* ???????????? */}
                        <div className="comment-list">
                          {/* <Comments /> */}
                          <List

                              // header={`${this.state.ComList.length}?????????`}
                              itemLayout="horizontal"
                              dataSource={this.state.commentList}
                              pagination={{
                                  pageSize: 10,
                              }}
                              renderItem={item => (
                              <li>
                                <Comment
                                      // actions={ [<p>{item.index}???</p>]}
                                      author={item.user_id+this.getIdentity(item.user_identity)}
                                      avatar={qiushi}
                                      content={
                                          <div>
                                              <p>{item.content}</p>
                                              {
                                                  item.has_file===true?(
                                                      <img src={defaultUrl+'/'+item.file} alt={"??????"} style={{width:'30%'}}/>
                                                  ):(
                                                      ""
                                                  )
                                              }
                                          </div>
                                      }
                                      datetime={item.time}
                                />
                                <div>{
                                    this.show2(item)
                                }

                                </div>


                                  <Divider />
                              </li>
                              )}
                            />
                        </div>


                        {/* ????????? */}
                        {
                            (this.state.islogin===true&&this.state.canReply===true)?(
                                <div className="comment-box">
                                    <p>????????????</p>


                                    <Form
                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}
                                    >

                                        <Form.Item
                                            // label="????????????"
                                            name="newcomment"
                                            rules={[{required: true, message: '?????????????????????!'}]}
                                        >
                                            <TextArea showCount maxLength={500}/>
                                        </Form.Item>
                                        <Form.Item
											label="??????"
											name="pic"
										>
											<input id="inputElement" type="file" name="img"  accept="image/png, image/gif, image/jpeg"/>
										</Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                ??????
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ):('')
                        }

                        <div><br/></div>
                        <Modal
                        visible={this.state.visible1}
                        title="????????????"
                        onOk={this.handleOk1}
                        onCancel={this.handleCancel1}
                        footer={null}>
                        <div className='myregister'>
                            <Form
                                name="report_post"
                                initialValues={{ remember: false }}
                                onFinish={this.onFinish1}
                                onFinishFailed={this.onFinishFailed1}>
                                    <Form.Item
                                        label="????????????"
                                        name="reason"
                                    >
                                        <Checkbox.Group>
                                            <Row>
                                                <Col span={12}>
                                                    <Checkbox value={'????????????'}>????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'??????????????????????????????'}>??????????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'???????????????????????????'}>???????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'?????????????????????????????????'}>?????????????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'???????????????????????????'}>???????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'?????????????????????????????????'}>?????????????????????????????????</Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>

                                    <Form.Item label="????????????" name="other">
                                        <TextArea style={{marginTop: 10}} autoSize={{minRows: 3}} showCount maxLength={150} />
                                    </Form.Item>

                                    <Form.Item>
                                        <div style={{display:"flex",justifyContent:'center'}}>
                                            <Button type="primary" tyle={{width:"80%"}}htmlType="submit">
                                                ??????
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                        </div>
                    </Modal>
                        <Modal
                        visible={this.state.visible2}
                        title="????????????"
                        onOk={this.handleOk2}
                        onCancel={this.handleCancel2}
                        footer={null}>
                        <div className='myregister'>
                            <Form
                                name="report_post"
                                initialValues={{ remember: false }}
                                onFinish={this.onFinish2}
                                onFinishFailed={this.onFinishFailed2}>
                                    <Form.Item
                                        label="????????????"
                                        name="reason"
                                        rules={[{ required: true, message: '????????????' }]}
                                    >
                                        <Checkbox.Group>
                                            <Row>
                                                <Col span={12}>
                                                    <Checkbox value={'????????????'}>????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'??????????????????????????????'}>??????????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'???????????????????????????'}>???????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'?????????????????????????????????'}>?????????????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'???????????????????????????'}>???????????????????????????</Checkbox>
                                                </Col>
                                                <Col span={12}>
                                                    <Checkbox value={'?????????????????????????????????'}>?????????????????????????????????</Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>

                                    <Form.Item label="????????????" name="other">
                                        <TextArea style={{marginTop: 10}} autoSize={{minRows: 3}} showCount maxLength={150} />
                                    </Form.Item>

                                    <Form.Item>
                                        <div style={{display:"flex",justifyContent:'center'}}>
                                            <Button type="primary" tyle={{width:"80%"}}htmlType="submit">
                                                ??????
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                        </div>
                    </Modal>
			</div>
                </Content>
            </Layout>
		)
	}
}

export default PostDetail;