import '../assets/css/BasicInformation.css'
import { Component } from "react";
import { Card, Carousel, Row, Col, Divider } from 'antd';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { Meta } = Card;





const defaultUrl = 'http://127.0.0.1:5003';

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
doctorsData.push({

    name: '尹有宽',
    profession: '主任医师',
    introduction: '尹有宽，主任医师、教授、硕士生导师，2014年至2020年连续7年被评为中国好大夫。上海医科大学医学系毕业后，一直供职于复旦大学附属华山医院感染病科。',
    skilledField: '感染科',
    avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2512848809,1752479422&fm=26&gp=0.jpg',
    href: '#',

})
doctorsData.push({

    name: '徐粟',
    profession: '副主任医师',
    introduction: '徐粟,副主任医师，擅长哮喘，支气管扩张等呼吸系统疾病及肺部感染的防治，脑外伤后昏迷促醒及肢体语言功能的中西医康复治疗，在业内为人熟知。',
    skilledField: '中医科',
    avatarUrl: 'http://www.z2hospital.com/upfile/OA_RY/201103/20110325111043732.jpg',
    href: '#',

})

doctorsData.push({

    name: '冯建华',
    profession: '主任医师',
    introduction: '冯建华，主任医师。擅长于小儿神经系统疾病特别是小儿癫痫，抽动症和多动症的诊治，发表相关论文数十篇，并有多篇被核心期刊收录。',
    skilledField: '小儿神经',
    avatarUrl: 'http://www.z2hospital.com/upfile/OA_RY/201408/20140814023802296.jpg',
    href: '#',

})
doctorsData.push({

    name: '李谨予',
    profession: '副主任医师',
    introduction: '李谨予,副主任医师，博士毕业于浙江大学。长期从事眼科临床、科研、教学工作，对屈光不正、白内障、眼底病等常见病有丰富的诊疗经验。擅长黄斑及玻璃体视网膜疾病诊治，开展视网膜激光光凝、玻璃体腔注药等手术治疗。',
    skilledField: '眼科',
    avatarUrl: 'http://www.z2hospital.com/upload/images/2021/2/t_982041539.jpg',
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

    name: '胡新央',
    profession: '主任医师',
    introduction: '胡新央，主任医师。长期致力于冠心病介入治疗，干细胞移植治疗心血管疾病等领域，并获浙江省科技进步奖自然科学奖一等奖、浙江省医药卫生科技进步奖一等奖各1项',
    skilledField: '心血管内科',
    avatarUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2138580040,3288173484&fm=11&gp=0.jpg',
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

    name: '胡新央',
    profession: '主任医师',
    introduction: '胡新央，主任医师。长期致力于冠心病介入治疗，干细胞移植治疗心血管疾病等领域，并获浙江省科技进步奖自然科学奖一等奖、浙江省医药卫生科技进步奖一等奖各1项',
    skilledField: '心血管内科',
    avatarUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2138580040,3288173484&fm=11&gp=0.jpg',
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
medicineData.push({

    href: '#',
    title: `通脉片`,
    description: '四川省通园制药有限公司',
    content: '通脉片，具有活血通脉的功能。用于缺血性心脑疾病,动脉硬化,脑血栓，脑缺血,冠心病,心绞痛。',
    medlink: 'data:image/jpeg;base64,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',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `藿香正气口服液`,
    description: '太极集团重庆涪陵制药厂有限公司',
    content: '藿香正气口服液，主要功效为治疗一些外感风寒以及夏天中暑所导致的一些感冒，表现为患者会出现一些头晕、头疼以及胸闷、呕吐的情况。',
    medlink: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4193664057,4089429213&fm=224&gp=0.jpg',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `元胡止痛片`,
    description: '广西天天乐药业股份有限公司',
    content: '元胡止痛片，功能主治为理气,活血，止痛。用于气滞血瘀所致的胃痛,胁痛,头痛及痛经。',
    medlink: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1120831767,1633370287&fm=26&gp=0.jpg',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `沙参止咳糖浆`,
    description: '京都念慈莓羹麽股伤份有限公司',
    content: '沙参止咳糖浆，主治肺热燥咳、潮热久咳、干咳、咳血、咳痰困难等气阴两虚之症。',
    medlink: 'http://5b0988e595225.cdn.sohucs.com/images/20190110/1eb800af83e34549a34395efb90b8f17.jpeg',
    medImg: require('../assets/picture/med1.jpg').default

})
medicineData.push({

    href: '#',
    title: `999感冒灵胶囊`,
    description: '三九医药',
    content: '用于感冒引起的头痛,发热,鼻塞,流涕,咽痛。',
    medlink: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=646111438,2664596244&fm=224&gp=0.jpg',
    medImg: require('../assets/picture/med1.jpg').default

})
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
    //         aw: '',
    //         doc:'',
    //     }
    // }

    componentDidMount() {
        // this.setState({
        //     aw = xsw,
        //     name = names,
        //     doc = medicineData,
        // })
        // axios({
        //     baseURL:defaultUrl,
        //     method:'get',
        //     url:'/getAllDoctor/'

        // }).then(res=>{
        //     this.setState({
        //         name:res.data.data.name,
        //         profession:res.data.data.profession,
        //         introduction:res.data.data.introduction,
        //         skilledField:res.data.data.skilledField,
        //         avatarUrl:res.data.data.avatarUrl, 
        //     })
        //  })
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
                        <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div>
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
                        <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div>
                    </Col>
                    <Col span={4}>
                        <div class="list_02">
                            <div class="left_img"><img src={require('../assets/picture/choose_02.png').default} alt="#" /></div>
                            <div class="list_conts_02">
                                选择医生 &nbsp;<br></br>就诊时间
                        <br />填写预约挂号单
                    </div>
                        </div>
                        <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div>
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
                        <div class="line_img">
                            <img src={require('../assets/picture/cho.jpg').default} width="1" height="105" alt="" />
                        </div>
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
                                                <Link to='#' class="contentStyle" >
                                                    体检发现血糖高，是糖尿病吗？平时要怎么吃？
                                 </Link>
                                                <span className="uuu"><br></br>很多人发现体重突然减轻后，一检查血糖高，担心是糖尿病，那血糖偏高是不是就是糖尿病呢?从理论上来说......</span>
                                            </h3>

                                        </div>
                                        <div>
                                            <h3 class="contentStyle">
                                                <Link to='#' class="contentStyle" >
                                                    头痛反复发作？如影随形的偏头痛，该如何治疗、管理？
                                 </Link>
                                                <span className="uuu"><br></br>有人在学生时代会在考试、生理期等特殊时间点出现头痛，痛起来会可能会恶心，难受.......</span>
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 class="contentStyle">
                                                <Link to='#' class="contentStyle" >
                                                    孩子一直咳咳咳怎么办？专科医生来解答
                                 </Link>
                                                <span className="uuu"><br></br>夏天一开空调，孩子就开始咳嗽；走进公园里或者靠近小狗，孩子也会咳嗽......</span>
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 class="contentStyle">
                                                <Link to='#' class="contentStyle" >
                                                    牙龈肿痛？做对这件事，比吃药更有效
                                 </Link>
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
                                    dataSource={doctorsData}
                                    renderItem=
                                    {
                                        item => (<List.Item

                                            extra={

                                                <Link to='#'>
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
                                                title={<a href={item.href}>{item.name}</a>}
                                                description={item.skilledField}
                                            ></List.Item.Meta>
                                            {item.introduction}
                                        </List.Item>)
                                    }>

                                </List>

                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="rightPart" align="left">
                                <div className="rightPartTitle" align="center">药房速览</div>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        onChange: page => {
                                            console.log(page);
                                        },
                                        pageSize: 5,
                                    }}
                                    dataSource={medicineData}
                                    renderItem=
                                    {
                                        item => (<List.Item
                                            key={item.title}
                                            extra={
                                                <Link to='#'>
                                                    <img
                                                        width={150}
                                                        height={150}
                                                        alt="药品图像"
                                                        src={item.medlink}
                                                    />
                                                </Link>
                                            }
                                        >
                                            <List.Item.Meta
                                                title={<a href={item.href}>{item.title}</a>}
                                                description={item.description}
                                            ></List.Item.Meta>
                                            {item.content}
                                        </List.Item>)
                                    }>

                                </List>
                            </div>

                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
            </div>

        )
    }
}
export default BasicInformation;