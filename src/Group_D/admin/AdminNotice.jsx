import React from 'react'
import {Form, Input, Button, Radio, Modal, Divider, Table, Space, message} from 'antd';
import {MinusCircleOutlined, PlusOutlined, SearchOutlined, UploadOutlined} from '@ant-design/icons';
import  '../../assets/css/Admin.css'
import axios from "axios";
import Highlighter from "react-highlight-words";

const { TextArea } = Input;

const defaultUrl = 'http://10.112.196.176:5003';


class AddSource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            articleList:[],
            searchText1: '',
            searchedColumn1: '',
            searchText2: '',
            searchedColumn2: '',
            postList:[],
            replyList:[],
            visible:false,
            selectedUser:''
        }
    }

    componentDidMount(){
      axios.defaults.baseURL = defaultUrl;

      axios.get('/articleList').then(
        res=>{
          this.setState({
              articleList:res.data.data
          })
        }
      );

      axios.get('/post_report').then(
        res=>{
          this.setState({
              postList:res.data.data
          })
        }
      );

      axios.get('/reply_report').then(
        res=>{
          this.setState({
              replyList:res.data.data
          })
        }
      );

    }

    getColumnSearchProps1 = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`搜索 ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch1(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch1(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                搜索
              </Button>
              <Button onClick={() => this.handleReset1(clearFilters)} size="small" style={{ width: 90 }}>
                清空
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
  });

    getColumnSearchProps2 = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`搜索 ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch2(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch2(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                搜索
              </Button>
              <Button onClick={() => this.handleReset2(clearFilters)} size="small" style={{ width: 90 }}>
                清空
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select(), 100);
          }
        },
        render: text =>
          this.state.searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[this.state.searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
  });


    deleteSource = id =>{
        axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/article/'+id,
        }).then(res=>{
            Modal.success({
              content: '删除文章成功',
              onOk: ()=>this.postok()
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    postok(){
        window.location.href = window.location.href
      }

    handleSearch1 = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText1: selectedKeys[0],
          searchedColumn1: dataIndex,
        });
      };

      handleReset1 = clearFilters => {
        clearFilters();
        this.setState({ searchText2: '' });
      };

      handleSearch2 = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText2: selectedKeys[0],
          searchedColumn2: dataIndex,
        });
      };

      handleReset2 = clearFilters => {
        clearFilters();
        this.setState({ searchText2: '' });
      };

      deletePost=(id)=>{
          axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/post/'+id.toString(),
            }).then(res=>{
                Modal.success({
                  content: '删除帖子成功',
                  onOk: ()=>this.postok()
                });
            }).catch(function (error) {
                console.log(error);
            });
      }

      deleteReply=(id)=>{
            axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/reply/'+id.toString(),
            }).then(res=>{
                Modal.success({
                  content: '删除回复成功',
                  onOk: ()=>this.postok()
                });
            }).catch(function (error) {
                console.log(error);
            });
      }

      deletereportpost=(id)=>{
          var params = {
              report_id:Number(id)
          }
          axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/post_report',
            params
            }).then(res=>{
                Modal.success({
                  content: '删除举报成功',
                  onOk: ()=>this.postok()
                });
            }).catch(function (error) {
                console.log(error);
            });
      }

      deletereportreply=(id)=>{
          var params = {
              report_id:Number(id)
          }
          axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/reply_report',
            params
            }).then(res=>{
                Modal.success({
                  content: '删除举报成功',
                  onOk: ()=>this.postok()
                });
            }).catch(function (error) {
                console.log(error);
            });
      }

      showmodel=(id)=>{
          this.setState({
              visible:true,
              selectedUser:id
          })
      }

      handleOk=()=>{
        this.setState({
            visible: false,
        });
    };

    handleCancel=()=>{
        this.setState({
            visible: false,
        });
    }

    onFinish = (values) => {
        var params = {
            user: this.state.selectedUser,
			identity: 5,
			can_post: values.can_post,
            can_reply: values.can_reply
		}
		axios({
			baseURL: defaultUrl,
			method: 'put',
			url: '/changeInfo',
			params
		}).then(res=>{
			if(res.data.code===0){
				Modal.success({
		  		content: '修改成功！',
                    onOk: ()=>{
		  			    window.location.href = window.location.href
				    }
				});
				this.setState({
                    visible:false
                })
			}
			else{
				Modal.error({
				content: '修改失败！',
			});
				this.setState({
                    visible:false
                })
			}
		});
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

	render() {
	    const columns1 = [
          {
            title: '举报ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',

          },
          {
            title: '帖子内容',
            dataIndex: 'post_content',
            key: 'post_content',
            width: '15%',

          },
          {
            title: '被举报者',
            dataIndex: 'author_id',
            key: 'author_id',
            width: '15%',
            ...this.getColumnSearchProps1('author_id'),
          },
          {
            title: '举报者',
            dataIndex: 'reporter_id',
            key: 'reporter_id',
            width: '15%',
            ...this.getColumnSearchProps1('reporter_id'),
          },
          {
            title: '举报理由',
            dataIndex: 'content',
            key: 'content',
            width: '15%',

          },
          {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: '25%',
            render: (text, record) => {
              // console.log(record)
                return (
                    <Space size="middle">
                        <a onClick={()=>this.deletePost(record.post_id)}>删帖</a>
                         <a onClick={()=>this.showmodel(record.author_id)}>修改被举报者权限</a>
                         <a onClick={()=>this.deletereportpost(record.id)}>删除举报</a>
                    </Space>
                )
            }
          },
        ];

	    const columns2 = [
          {
            title: '举报ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',

          },
          {
            title: '帖子内容',
            dataIndex: 'reply_content',
            key: 'reply_content',
            width: '15%',

          },
          {
            title: '被举报者',
            dataIndex: 'author_id',
            key: 'author_id',
            width: '15%',
            ...this.getColumnSearchProps2('author_id'),
          },
          {
            title: '举报者',
            dataIndex: 'reporter_id',
            key: 'reporter_id',
            width: '15%',
            ...this.getColumnSearchProps2('reporter_id'),
          },
          {
            title: '举报理由',
            dataIndex: 'content',
            key: 'content',
            width: '15%',

          },
          {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: '25%',
            render: (text, record) => {
              // console.log(record)
                return (
                    <Space size="middle">
                        <a onClick={()=>this.deleteReply(record.reply_id)}>删回复</a>
                         <a onClick={()=>this.showmodel(record.author_id)}>修改被举报者权限</a>
                         <a onClick={()=>this.deletereportreply(record.id)}>删除举报</a>
                    </Space>
                )
            }
          },
        ];

		return (
			<div class = "courseInput">
                <h2 style={{marginBottom:30}}>帖子举报受理</h2>
                <Table columns={columns1} dataSource={this.state.postList} />

                <Divider/>
                <h2>回复举报受理</h2>
                <Table columns={columns2} dataSource={this.state.replyList} />

                <Modal
                    visible={this.state.visible}
                    title=" "
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}>
                    <div className='myregister'>
                        <div className='registitle' style={{width:"100%",display:"flex",justifyContent:'center'}}>{"修改用户:"+this.state.selectedUser+"的权限"}</div>
                        <Form
                            name="changeIdentity"
                            initialValues={{ remember: false }}
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}>


                                <Form.Item
                                    label="可发帖"
                                    name="can_post"
                                    rules={[{ required: true, message: '不能为空' }]}
                                >
                                    <Radio.Group >
                                      <Radio value={1}>是</Radio>
                                      <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label="可回复"
                                    name="can_reply"
                                    rules={[{ required: true, message: '不能为空' }]}
                                >
                                    <Radio.Group >
                                      <Radio value={1}>是</Radio>
                                      <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item>
                                    <div style={{display:"flex",justifyContent:'center'}}>
                                        <Button type="primary" tyle={{width:"80%"}}htmlType="submit">
                                            提交
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                    </div>
                </Modal>
			</div>
		)
	}
}

export default AddSource