import React from 'react'
import {Form, Table, Input, Button, Space, Row, Col, Checkbox, Divider, Upload, Modal, Radio, message} from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios';
import '../../assets/css/TopBar.css';

const defaultUrl = 'http://10.112.196.176:5003';
var storage = window.localStorage

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedUser:'',
        visible:false,
        userList:[],
        searchText: '',
        searchedColumn: '',
        value1:0,
        value2:0,
        value3:0
    };
  }

  componentDidMount(){
    axios.defaults.baseURL = defaultUrl;
    axios.get('/getUsers').then(
      res=>{
          this.setState({
            userList:res.data.data,
          });
          console.log(res.data.data);
      }
    );
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`搜索 ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex,clearFilters)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex,clearFilters)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
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

  handleSearch = (selectedKeys, confirm, dataIndex,clearFilters) => {
    confirm();
    if(selectedKeys[0].length>32){
        message.error("搜索关键词的长度应小于32个字符")
        this.handleReset(clearFilters)
        return
    }
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  changeInfo=(name)=>{
      this.setState({
          selectedUser:name,
          visible:true
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

    onChange1 = e => {
        this.setState({
            value:e.target.value1
        })
      };

    onChange2 = e => {
        this.setState({
            value:e.target.value2
        })
      };

    onChange3 = e => {
        this.setState({
            value:e.target.value3
        })
      };

    onFinish = (values) => {
        var params = {
            user: this.state.selectedUser,
			identity: values.identity,
			can_post: values.can_post,
            can_reply: values.can_reply
		}
		axios({
			baseURL: defaultUrl,
			method: 'put',
			url: '/changeRepoInfo',
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
    const columns = [
      {
        title: '用户名',
        dataIndex: 'uid',
        key: 'uid',
        width: '15%',
        ...this.getColumnSearchProps('uid'),
      },
        {
        title: '昵称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '身份',
        dataIndex: 'identity',
        key: 'identity',
        width: '15%',
        render: (text) => {
            text = Number(text)
            if(text===0)
                return <p>普通用户</p>
            else if(text===1)
                return <p>医生</p>
            else if(text===2)
                return <p>管理员</p>
        }
      },
      {
        title: '可以发帖',
        dataIndex: 'can_post',
        key: 'can_post',
        width: '20%',
        render: (text) => {
          text = Number(text)
            console.log(text)
          if (text===1) return <p>√</p>
          else return <p>X</p>
        }
        // ...this.getColumnSearchProps('is_teacher'),
      },
      {
        title: '可以回复',
        dataIndex: 'can_reply',
        key: 'can_reply',
        width: '20%',
        render: (text) => {

            console.log(text)
          if (text===1) return <p>√</p>
          else return <p>X</p>
        }
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        // width: '15%',
        render: (text, record) => (
            <Space size="middle">
              <a onClick={()=>this.changeInfo(record.uid)}>修改</a>
            </Space>
        )
      },
    ];
    return(
        <div>
            <h2 >用户列表</h2>
            <Divider />
            <Table columns={columns} dataSource={this.state.userList} />
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
                                    label="身份"
                                    name="identity"
                                    rules={[{ required: true, message: '身份不能为空' }]}
                                >
                                    <Radio.Group onChange={this.onChange1} value={this.state.value1}>
                                      <Radio value={0}>普通用户</Radio>
                                      <Radio value={1}>医生</Radio>
                                      <Radio value={2}>管理员</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label="可发帖"
                                    name="can_post"
                                    rules={[{ required: true, message: '不能为空' }]}
                                >
                                    <Radio.Group onChange={this.onChange2} value={this.state.value2}>
                                      <Radio value={1}>是</Radio>
                                      <Radio value={0}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label="可回复"
                                    name="can_reply"
                                    rules={[{ required: true, message: '不能为空' }]}
                                >
                                    <Radio.Group onChange={this.onChange3} value={this.state.value3}>
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

export default ManageUser

