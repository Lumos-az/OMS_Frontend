import '../assets/css/BasicInformation.css'
import { Select, Modal, Layout, Image, notification, DatePicker, Row, BDatePicker, PageHeader, Divider, Descriptions, Button, Collapse } from 'antd';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import axios from 'axios';
import { Comment, Tooltip, Table, Tag, Space, Col } from 'antd';

const defaultUrl = 'http://10.112.196.176:5003';

var doctorsData = [];

doctorsData.push({
    did:3,
    name: '陈临',
    profession: '主任医师',
    introduction: '陈临，主任医师、教授、硕士生导师，2014年至2020年连续7年被评为中国好大夫。上海医科大学医学系毕业后，一直供职于复旦大学附属华山医院感染病科。',
    skilledField: '感染科',
    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2512848809,1752479422&fm=26&gp=0.jpg',
    href: '#',

})
doctorsData.push({
    did:4,
    name: '徐粟',
    profession: '副主任医师',
    introduction: '徐粟,副主任医师，擅长哮喘，支气管扩张等呼吸系统疾病及肺部感染的防治，脑外伤后昏迷促醒及肢体语言功能的中西医康复治疗，在业内为人熟知。',
    skilledField: '中医科',
    avatarUrl: 'http://www.z2hospital.com/upfile/OA_RY/201103/20110325111043732.jpg',
    href: '#',

})

doctorsData.push({
    did:5,
    name: '冯建华',
    profession: '主任医师',
    introduction: '冯建华，主任医师。擅长于小儿神经系统疾病特别是小儿癫痫，抽动症和多动症的诊治，发表相关论文数十篇，并有多篇被核心期刊收录。',
    skilledField: '小儿神经',
    avatarUrl: 'http://www.z2hospital.com/upfile/OA_RY/201408/20140814023802296.jpg',
    href: '#',

})
doctorsData.push({

    name: '叶俊',
    profession: '副主任医师',
    introduction: '叶俊，副主任医师，擅长小探头超声内镜、消化道肿瘤的早期内镜诊断治疗、消化道狭窄扩张等；以及慢性乙型病毒性肝炎、脂肪肝、难治性幽门螺杆菌感染、炎症性肠病等诊治。',
    skilledField: '消化内科',
    avatarUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1905036584,1713380915&fm=26&gp=0.jpg',
    href: '#',

})
doctorsData.push({

    name: '胡新央',
    profession: '主任医师',
    introduction: '胡新央，主任医师。长期致力于冠心病介入治疗，干细胞移植治疗心血管疾病等领域，并获浙江省科技进步奖自然科学奖一等奖、浙江省医药卫生科技进步奖一等奖各1项',
    skilledField: '心血管内科',
    avatarUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2138580040,3288173484&fm=11&gp=0.jpg',
    href: '#',

})

doctorsData.push({

    name: '李谨予',
    profession: '副主任医师',
    introduction: '李谨予,副主任医师，博士毕业于浙江大学。长期从事眼科临床、科研、教学工作，对屈光不正、白内障、眼底病等常见病有丰富的诊疗经验。',
    skilledField: '眼科',
    avatarUrl: 'http://www.z2hospital.com/upload/images/2021/2/t_982041539.jpg',
    href: '#',

})



class DoctorDisplay extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            dataSource:[],
        }
    }

    componentDidMount() {
       
        window.scrollTo(0, 0);  // 置顶代码
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/get6doctor',
        }).then(res=>{
        //console.log(res.data.data)
            this.setState({
                dataSource:res.data.data
            })
       // console.log(this.state.dataSource)
        const dataSource = this.state.dataSource;
        //console.log(dataSource)
        let i=0
       
        let wdnmd=dataSource.length
        for ( i; i < wdnmd; i++)
        {
                  dataSource[i]["introduction"]=doctorsData[i].introduction
        }

        this.setState({
            dataSource:dataSource
        })
        //console.log(dataSource)
    })
       
        
        // console.log(dataSource)
        // console.log(doctorsData.introduction)


    }
   

    render(){
        return (
            <Col span={10}>
                <div class="leftPart">
                    <div className="leftPartTitle" align="center">
                        当下热门医生
                    </div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 5,
                        }}
                        // dataSource={this.state.dataSource}
                        dataSource={this.state.dataSource}
                        renderItem=
                        {
                            
                            item => (<List.Item
                                
                                extra={
                                   
                                    <Link to={'/Doctor/'+item.did}>
                                        <img
                                            width={120}
                                            height={150}
                                            alt="医生头像"
                                            src={item.avatarUrl}
                                        />
                                    </Link>

                                }
                            >
                               
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.atDepartment}
                                ></List.Item.Meta>
                                {item.introduction}
                            </List.Item>)
                        }>

                    </List>

                </div>
         </Col>
        )
    }
}
export default DoctorDisplay;