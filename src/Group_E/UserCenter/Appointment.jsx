
import React from 'react';
import {Layout, Table } from 'antd';
 
const { Header, Content } = Layout;
 
var columns = [
    {
      title: '业务',  //新开，续卡
      dataIndex: 'service',
      width:"80px",
    },
    {
      title: '金额',
      dataIndex: 'money',
      width:"80px",
    },
    {
      title: '卡号',
      dataIndex: 'card_number',
      width:"100px",
    },
    {
        title: '姓名',
        dataIndex: 'name',
        width:"80px",
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        width:"120px",
    },
    {
        title: '项目',
        dataIndex: 'project',
        width:"80px",
    },
    {
        title: '导购员',
        dataIndex: 'shop_guide',
        width:"80px",
    },
    {
        title: '老师',
        dataIndex: 'teacher',
        width:"80px",
    },
    {
        title: '财务情况',
        dataIndex: 'financial',
    },
    {
        title: '备注1',
        dataIndex: 'remarks1',
    },
    {
        title: '收钱吧详情',
        dataIndex: 'collect_money',
    },
    {
        title: '备注2',
        dataIndex: 'remarks2',
    },
];
 
var tmp = {service:'新开', money:'1200', card_number:'1002886', name:'王小二', phone:'18066668888', 
    project:'散打', shop_guide:'江小白', teacher:'王大锤', financial:'图片1', remarks1:'B6A9B5A5BAC5B2E9D1AF',
    collect_money:'图片2', remarks2:'B6A9B5A5BAC5B2E9D1AF'};
 
var data = [];
for(var i=0;i<30;i++){
    data.push(tmp);
}
 
class Appointment extends React.Component{
    render(){
        return (
            <Layout>
                <Header>
                    <div style={{lineHeight:'64px', fontSize:"20px", color:"white",textAlign:"center"}}> 
                        拉布拉卡 - 卡片管理系统
                    </div>
                </Header>
 
                <Content > {/* style={{"border":"solid red"}} */}
                    <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
                        <Table 
                            columns={columns} 
                            dataSource={data} 
                            rowKey={item=>item.id}  //现阶段，写不写效果一样
                            pagination={{ pageSize: 20 }} 
                            scroll={{ y: 340 }} />
                    </div>
                </Content>
            </Layout>
        );
    }
}
 
export default Appointment;