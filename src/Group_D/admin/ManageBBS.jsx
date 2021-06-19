import React from 'react'
import { Table, Input, Button, Space, Modal } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import {BulbFilled} from '@ant-design/icons'
import axios from 'axios'

const defaultUrl = 'http://10.112.196.176:5003';
{/*
    ManageBBS.jsx
	作用：
		1. 管理课程论坛的帖子
	功能：
		1. 点击'管理评论'跳转到帖子详情页，帖子详情页中每个评论都要有删除按钮，只有管理员能点击/看到删除按钮
		2. 点击'删除'删除整个帖子
*/}

var storage = window.localStorage

class ManageBBS extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isLoggined:storage.hasOwnProperty("name"),
          token:storage.getItem("token"),
          role:storage.getItem("identity"),
          id:storage.getItem("name"),
          postList:[],
          searchText: '',
          searchedColumn: '',
      };
    }

  componentDidMount(){
      axios.defaults.baseURL = defaultUrl;

      axios.get('/posts').then(     // 总共有几门课
        res=>{
          this.setState({
              postList:res.data.data
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

  delePostSuccess() {
    Modal.success({
      content: '删除帖子成功',
      onOk: ()=>this.postok()
    });
  }

  postok(){
    window.location.href = window.location.href
  }

  delepost = (pID) => {  // 删除帖子
    axios({
			baseURL: defaultUrl,
			method: 'delete',
			url: '/post/'+pID,
    }).then(res=>{
        this.delePostSuccess()
    }).catch(function (error) {
        console.log(error);
    });

  }

  setTop = (id) =>{
      axios({
			baseURL: defaultUrl,
			method: 'put',
			url: '/post/'+id,
        }).then(res=>{
            Modal.success({
              content: '设置成功',
              onOk: ()=>this.postok()
            });
        }).catch(function (error) {
            console.log(error);
        });
  }

  render() {
    const columns = [
      {
        title: '帖子ID',
        dataIndex: 'post_id',
        key: 'post_id',
        width: '10%',
        ...this.getColumnSearchProps('post_id'),
      },
      {
        title: '帖子标题',
        dataIndex: 'title',
        key: 'title',
        width: '25%',
        ...this.getColumnSearchProps('title'),
	  },
	  {
        title: '发帖时间',
        dataIndex: 'time',
        key: 'time',
        width: '15%',
        ...this.getColumnSearchProps('time'),
      },
      {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        width: '20%',
        render: (text, record) => {
          // console.log(record)
            if(Number(record.type) === 0){
                return (
                  <Space size="middle">
                    <a href={"/post/"+record.post_id}>管理评论</a>
                        {/* <a>修改</a> */}
                    <a onClick={()=>this.delepost(record.post_id)}>删除</a>
                    <a onClick={()=>this.setTop(record.post_id)}>设为置顶帖</a>
                </Space>
                )
            }
            else{
                return (
                  <Space size="middle">
                    <a href={"/post/"+record.post_id}>管理评论</a>
                        {/* <a>修改</a> */}
                    <a onClick={()=>this.delepost(record.post_id)}>删除</a>
                    <a onClick={()=>this.setTop(record.post_id)}>取消置顶帖</a>
                </Space>
            )
            }
        }
      },
    ];
    return(
        <div>
            <h2>帖子列表</h2>
            <Table columns={columns} dataSource={this.state.postList} />
        </div>
    )
  }
}

export default ManageBBS

