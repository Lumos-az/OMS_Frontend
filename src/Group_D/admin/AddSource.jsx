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
            searchText: '',
            searchedColumn: '',
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
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
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

    onFinish = (values) => {
        var params = {
			title: values.title,
			author: values.author,
            type:values.type,
			content: values.content
		}
		if(values.title.length > 32){
		    message.error('标题不能超过32个字符长度')
            return
        }
		if(values.author.length > 32){
		    message.error('作者不能超过32个字符长度')
            return
        }

		axios({
			baseURL: defaultUrl,
			method: 'post',
			url: '/articleSource',
			params
		}).then(res=>{
			console.log(res.data.code)
			if(res.data.code===0){
				Modal.success({
		  		content: '发布文章成功！',
				});
			}
			else{
				Modal.error({
				content: '发布文章失败！',
			});
			}
		});
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onChange = e => {
        this.setState({
            value:e.target.value
        })
      };

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

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
          searchText: selectedKeys[0],
          searchedColumn: dataIndex,
        });
      };

      handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
      };

	render() {
	    const columns = [
          {
            title: '文章ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...this.getColumnSearchProps('id'),
          },
          {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            width: '25%',
            ...this.getColumnSearchProps('title'),
          },
          {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            width: '15%',
            ...this.getColumnSearchProps('author'),
          },
          {
            title: '类别',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            render: (text) => {
                text = Number(text)
                console.log(text)
                if(text === 0)
                    return <p>置顶公告</p>;
                else if(text === 1)
                    return <p>科普推荐</p>;
                else if(text === 2)
                    return <p>热门文章</p>;
                else if(text === 3)
                    return <p>权威发布</p>;
                else if(text === 4)
                    return <p>最新公告</p>;
            },

          },
          {
            title: '发布时间',
            dataIndex: 'date',
            key: 'date',
            width: '15%',
            ...this.getColumnSearchProps('date'),
          },
          {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: '20%',
            render: (text, record) => {
              // console.log(record)
                return (
                    <a onClick={()=>this.deleteSource(record.id)}>删除</a>
                )
            }
          },
        ];

		return (
			<div class = "courseInput">
                <h2 style={{marginBottom:30}}>发布文章、公告</h2>
                <Form
                name="addsourse"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                style={{paddingLeft:'10%', paddingRight:'10%'}}>
                    <Form.Item
                        label="文章标题"
                        name="title"
                        rules={[{ required: true, message: '标题不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '作者不能为空' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="资源类别"
                        name="type"
                        rules={[{ required: true, message: '资源类别不能为空' }]}
                    >
                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                          <Radio value={0}>置顶公告</Radio>
                          <Radio value={1}>推荐文章</Radio>
                          <Radio value={2}>热门文章</Radio>
                          <Radio value={3}>权威发布</Radio>
                          <Radio value={4}>公告</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="文章内容"
                        name="content"
                        rules={[{ required: true, message: '文章内容不能为空' }]}
                    >
                        <TextArea style={{marginTop: 10}} autoSize={{minRows: 3}} showCount maxLength={500} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft:'50%'}}>
                        发布
                        </Button>
                    </Form.Item>
                </Form>

                <Divider/>
                <h2>删除文章、公告</h2>
                <Table columns={columns} dataSource={this.state.articleList} />
			</div>
		)
	}
}

export default AddSource