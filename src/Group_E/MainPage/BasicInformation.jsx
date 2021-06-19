import '../assets/css/BasicInformation.css'
import  DoctorDisplay from './DoctorDisplay.jsx'
import { Component } from "react";
import { Card, Carousel, Row, Col, Divider } from 'antd';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MedicineDisplay from './MedicineDisplay.jsx'
const { Meta } = Card;






const defaultUrl = 'http://10.112.196.176:5003';

//由论坛模块提供
var imgArr = [require('../assets/picture/test1.jpg'), require('../assets/picture/test2.jpg'), require('../assets/picture/test5.jpg')];
var imgDescription = ["高血压,高血压（hypertension）是指以体循环动脉血压（收缩压和/或舒张压）增高为主要特征（收缩压≥140毫米汞柱，舒张压≥90毫米汞柱），可伴有心、脑、肾等器官的功能或器质性损害的临床综合征。高血压是最常见的慢性病，也是心脑血管病最主要的危险因素。正常人的血压随内外环境变化在一定范围内波动。在整体人群，血压水平随年龄逐渐升高，以收缩压更为明显，但50岁后舒张压呈现下降趋势，脉压也随之加大。近年来，人们对心血管病多重危险因素的作用以及心、脑、肾靶器官保护的认识不断深入，高血压的诊断标准也在不断调整，目前认为同一血压水平的患者发生心血管病的危险不同，因此有了血压分层的概念，即发生心血管病危险度不同的患者，适宜血压水平应有不同。", "干眼症，常见于xxxxxx", "脱发，已经困扰了xxxxxxx"]
//由预约模块提供
var imgDocs = [require('../assets/picture/doc1.jpg').default, require('../assets/picture/doc2.jpg').default, require('../assets/picture/doc3.jpg').default];
var descriptionDocs = ["林xxx医生，专攻xxx", "赵xxx医生，专攻xxx", "张xxx医生，专攻xxx"]
var nameDocs = ["林xx", "赵xx", "张xx"]
var DocsLink = ["#", "#", "#"]
var doctorsData = [];
// for(let i =0; i < 15;i++)
// {
//     doctorsData.push(
//         {
//             href:'#',
//             title:`张桂平医生 ${i}`,
//             description:'xxx医院主任医师，副高',
//             content:'长期致力于xxxx',
//             doclink: '#',
//             docImg:require('../assets/picture/doc2.jpg').default
//         }
//     );
// }


//由药房模块提供
var imgMed = [require('../assets/picture/med1.jpg').default, require('../assets/picture/med2.jpg').default, require('../assets/picture/med3.jpg').default, require('../assets/picture/med4.jpg').default, require('../assets/picture/med5.jpg').default];
var descriptionMed = ["xxxxx, 具有xxxxx功效", "xxxxx, 具有xxxxx功效"];
var medicineData = [];
// for(let i =0; i < 20;i++)
// {
//     medicineData.push(
//         {
//             href:'#',
//             title:`xxx 药品 ${i}`,
//             description:'xxxx药厂出品',
//             content:'具有xxx的功效',
//             medlink: '#',
//             medImg:require('../assets/picture/med1.jpg').default
//         }
//     );
// }

// var xsw = shit;
// var names = 1;
class BasicInformation extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state={
    //         name:'',
    //         profession:'',
    //         introduction:'',
    //         skilledField:'',
    //         avatarUrl:'',
           
    //     }
    // }
    
    // componentDidMount() {
        
    //     axios({
    //         baseURL:defaultUrl,
    //         method:'get',
    //         url:'/getAllDoctor/'

    //     }).then(res=>{
    //         console.log(res.data.data)
    //         this.setState({
    //             name:res.data.data.name,
    //             profession:res.data.data.profession,
    //             introduction:res.data.data.introduction,
    //             skilledField:res.data.data.skilledField,
    //             avatarUrl:res.data.data.avatarUrl, 
    //         })
    //      })
    // }
    constructor(props) {
        super(props);

        this.state={
            dataSource:[],
        }
    }
    componentDidMount() {
       
        axios({
            baseURL:defaultUrl,
            method:'get',
            url:'/getAllDoctor',
        }).then(res=>{
            console.log(res.data.data)
            this.setState({
                dataSource:res.data.data,
            })
        })
    }
    

    render() {
        return (

            <div>
                <Row gutter={[16, 12]}>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <div class="list_0">
                            <div class="list_conts_0_0">
                                今日预约用户：
                                今日就诊用户：
                                今年累计预约：
                            </div>
                            <div class="list_conts_0_1">
                                <span style={{
                                    width: '75%', height: '20px', backgroundColor: 'red', float: 'left',
                                    background: '#FA7E5C', color: '#F4F9FC'
                                }} >
                                    &nbsp;&nbsp;<span id="bookCount">0000000</span>&nbsp;
                                </span>&nbsp;人
                                <br />
                                <span style={{
                                    width: '75%', height: '20px', backgroundColor: 'red', float: 'left',
                                    background: '#FA7E5C', color: '#F4F9FC'
                                }}>
                                    &nbsp;&nbsp;<span id="bookCountSum">0000000</span>&nbsp;
                        </span>&nbsp;人
                                <br />
                                <span style={{
                                    width: '75%', height: '20px', backgroundColor: 'red', float: 'left',
                                    background: '#FA7E5C', color: '#F4F9FC'
                                }}>
                                    &nbsp;&nbsp;<span id="bookCountSumNian">0000000</span>&nbsp;
                        </span>&nbsp;人
                            </div>
                        </div>
                        {/* <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div> */}
                    </Col>
                    <Col span={4}>
                        <div class="list_01">
                            <div class="left_img">
                                <img src={require('../assets/picture/choose_01.png').default} alt="#" />
                            </div>
                            <div class="list_conts">
                                选择
                        <br />医院、科室
                    </div>
                        </div>
                        {/* <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div> */}
                    </Col>
                    <Col span={4}>
                        <div class="list_02">
                            <div class="left_img"><img src={require('../assets/picture/choose_02.png').default} alt="#" /></div>
                            <div class="list_conts_02">
                                选择医生 &nbsp;<br></br>就诊时间
                        <br />填写预约挂号单
                    </div>
                        </div>
                        {/* <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div> */}
                    </Col>
                    <Col span={4}>
                        <div class="list_03">
                            <div class="left_img">
                                <img src={require('../assets/picture/choose_03.jpg').default} alt="#" />
                            </div>
                            <div class="list_conts_03">
                                <center>
                                    预约成功
                            <br />凭有效证件取号就诊
                        </center>
                            </div>
                        </div>
                        {/* <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div> */}
                    </Col>
                    <Col span={4}>
                        <div class="list_04">
                            <div class="left_img">
                                <img src={require('../assets/picture/medic_test.png').default} style={{ width: '118px', height: '66px' }} alt="#" />
                            </div>
                            <div class="list_conts_04">
                                <center>
                                    欢迎来到
                                &nbsp;<br></br>智慧医疗平台@ZJU
                            </center>
                            </div>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>


                <div class="da">
                    <div class="test" ><img src={require('../assets/picture/listen.png').default} style={{ width: '88px', height: '88px' }} /> 推荐阅读</div>
                </div>

                <div className="basicPage">
                    <Row gutter={[16, 12]}>
                        <Col span={2}></Col>
                        <Col span={20}>

                            <div className="topPartMain" align="center">    <div>
                                <div className="ttt">
                                    <Carousel autoplay>
                                        <div >
                                            <h3 class="contentStyle" >
                                                <a href="https://mp.weixin.qq.com/s?__biz=MzIwMzM3NjI5OQ%3D%3D&mid=2247493640&idx=3&sn=af6c40788d8eef8535134844e447ec87&scene=45#wechat_redirect" class="contentStyle" target="_blank" >
                                                    体检发现血糖高，是糖尿病吗？平时要怎么吃？
                                 </a>
                                                <span className="uuu"><br></br>很多人发现体重突然减轻后，一检查血糖高，担心是糖尿病，那血糖偏高是不是就是糖尿病呢?从理论上来说......</span>
                                            </h3>

                                        </div>
                                        <div>
                                            <h3 class="contentStyle">
                                            <a href="https://mp.weixin.qq.com/s?src=11&timestamp=1623944178&ver=3136&signature=dxvKOMfEylIe-5xMe7CoMA2PDXm3zC1tnlKB065D8KgIg*2jNqZvc-2JnteG*Y6wkudKN96UqUOR4DAizu-sKYoJIIdQNSHeJn7W0QxjoHvsB2lIlD4DxWUYz1RxzNtS&new=1" class="contentStyle" target="_blank" >
                                            头痛反复发作？如影随形的偏头痛，该如何治疗、管理？
                                 </a>
                                                    
                                                <span className="uuu"><br></br>有人在学生时代会在考试、生理期等特殊时间点出现头痛，痛起来会可能会恶心，难受.......</span>
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 class="contentStyle">
                                            <a href="https://mp.weixin.qq.com/s?src=11&timestamp=1623944234&ver=3136&signature=dxvKOMfEylIe-5xMe7CoMA2PDXm3zC1tnlKB065D8Kg*JoMNeRHFb6RQOyOKHnUOvgm*Oyxw2eArsNwz43uLdYN6zeK-cMUJE9EbT1FllyUXiQs-Tk0aHhZ3YMRfvWJx&new=1" class="contentStyle" target="_blank" >
                                            孩子一直咳咳咳怎么办？专科医生来解答
                                 </a>
                                           
                                                    
                                                <span className="uuu"><br></br>夏天一开空调，孩子就开始咳嗽；走进公园里或者靠近小狗，孩子也会咳嗽......</span>
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 class="contentStyle">
                                            <a href="https://mp.weixin.qq.com/s?src=11&timestamp=1623944299&ver=3136&signature=nAM1wng2Ma1JMTHIAp0xbnxsm6k-Y7jEDAlbVk4Pb7Gz7wz2fEXoUlgdFXOTymak1IEckGIPjoURQC0Q-WdhjLz51ZcnNJGIGZUdWFOyF4-17OPFxGwF6OAv5-9UWG4S&new=1" class="contentStyle" target="_blank" >
                                            牙龈肿痛？做对这件事，比吃药更有效
                                 </a>
                                           
                                                <span className="uuu"><br></br>有人曾被牙龈肿痛困扰过，觉得可能是"上火"了，于是想吃点"清热解毒"的要。但......</span>
                                            </h3>

                                        </div>
                                    </Carousel>
                                </div>
                            </div>
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    <Divider orientation="left"></Divider>
                    <Row gutter={16}>
                        <Col span={2}></Col>
                        <DoctorDisplay></DoctorDisplay>
                        <MedicineDisplay></MedicineDisplay>
                        <Col span={2}></Col>
                    </Row>
                </div>
            </div>

        )
    }
}
export default BasicInformation;