import '../assets/css/BasicInformation.css'
import { Component } from "react";
import { Card, Carousel, Row, Col, Divider } from 'antd';
import { List } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

//由论坛模块提供
var imgArr = [require('../assets/picture/test1.jpg'), require('../assets/picture/test2.jpg'), require('../assets/picture/test5.jpg')];
var imgDescription = ["高血压,高血压（hypertension）是指以体循环动脉血压（收缩压和/或舒张压）增高为主要特征（收缩压≥140毫米汞柱，舒张压≥90毫米汞柱），可伴有心、脑、肾等器官的功能或器质性损害的临床综合征。高血压是最常见的慢性病，也是心脑血管病最主要的危险因素。正常人的血压随内外环境变化在一定范围内波动。在整体人群，血压水平随年龄逐渐升高，以收缩压更为明显，但50岁后舒张压呈现下降趋势，脉压也随之加大。近年来，人们对心血管病多重危险因素的作用以及心、脑、肾靶器官保护的认识不断深入，高血压的诊断标准也在不断调整，目前认为同一血压水平的患者发生心血管病的危险不同，因此有了血压分层的概念，即发生心血管病危险度不同的患者，适宜血压水平应有不同。", "干眼症，常见于xxxxxx", "脱发，已经困扰了xxxxxxx"]
//由预约模块提供
var imgDocs = [require('../assets/picture/doc1.jpg').default, require('../assets/picture/doc2.jpg').default, require('../assets/picture/doc3.jpg').default];
var descriptionDocs = ["林xxx医生，专攻xxx", "赵xxx医生，专攻xxx", "张xxx医生，专攻xxx"]
var nameDocs = ["林xx", "赵xx", "张xx"]
var DocsLink = ["#", "#", "#"]
var doctorsData = [];
for(let i =0; i < 15;i++)
{
    doctorsData.push(
        {
            href:'#',
            title:`张桂平医生 ${i}`,
            description:'xxx医院主任医师，副高',
            content:'长期致力于xxxx',
            doclink: '#',
            docImg:require('../assets/picture/doc2.jpg').default
        }
    );
}
//由药房模块提供
var imgMed = [require('../assets/picture/med1.jpg').default, require('../assets/picture/med2.jpg').default, require('../assets/picture/med3.jpg').default, require('../assets/picture/med4.jpg').default, require('../assets/picture/med5.jpg').default];
var descriptionMed = ["xxxxx, 具有xxxxx功效", "xxxxx, 具有xxxxx功效"];
var medicineData = [];
for(let i =0; i < 20;i++)
{
    medicineData.push(
        {
            href:'#',
            title:`xxx 药品 ${i}`,
            description:'xxxx药厂出品',
            content:'具有xxx的功效',
            medlink: '#',
            medImg:require('../assets/picture/med1.jpg').default
        }
    );
}

class BasicInformation extends Component {
    render() {
        return (

            <div>

                <div class="pic_choose">
                    <div class="list_0">
                        <div class="list_conts_0_0">
                            今日预约用户：
                            今日就诊用户：
                            今年累计预约：
                        </div>
                        <div class="list_conts_0_1">

   						 	<span style={ {width:'75%', height:'20px', backgroundColor: 'red',float: 'left',
                                background: '#FA7E5C', color: '#F4F9FC' }} >
   						 		&nbsp;&nbsp;<span id="bookCount">0000000</span>&nbsp;
   						 	</span>&nbsp;人
                            <br />
                            <span style={ {width:'75%', height:'20px', backgroundColor: 'red',float: 'left',
                                background: '#FA7E5C', color: '#F4F9FC' }}>
	    						&nbsp;&nbsp;<span id="bookCountSum">0000000</span>&nbsp;
	    					</span>&nbsp;人
                            <br />
                            <span style={ {width:'75%', height:'20px', backgroundColor: 'red',float: 'left',
                                background: '#FA7E5C', color: '#F4F9FC' }}>
	    						&nbsp;&nbsp;<span id="bookCountSumNian">0000000</span>&nbsp;
	    					</span>&nbsp;人
                        </div>
                    </div>

                    <div class="line_img">
                        <img src={require('../assets/picture/cho.jpg').default}  width="1" height="105" alt=""/>
                    </div>
                    <div class="list_01">
                        <div class="left_img">
                            <img src={require('../assets/picture/choose_01.png').default} alt="#" />
                        </div>
                        <div class="list_conts">
                            选择
                            <br/>医院、科室
                        </div>
                    </div>
                    <div class="line_img">
                        <img src={require('../assets/picture/cho.jpg').default}  width="1" height="105" alt=""/>
                    </div>
                    <div class="list_02">
                        <div class="left_img"><img  src={require('../assets/picture/choose_02.png').default}   alt="#" /></div>
                        <div class="list_conts_02">
                            选择医生 &nbsp;<br></br>就诊时间
                            <br/>填写预约挂号单
                        </div>
                    </div>
                    <div class="line_img">
                        <img src={require('../assets/picture/cho.jpg').default}  width="1" height="105" alt=""/>
                    </div>
                    <div class="list_03">
                        <div class="left_img">
                            <img  src={require('../assets/picture/choose_03.jpg').default}  alt="#" />
                        </div>
                        <div class="list_conts_03">
                            <center>
                                预约成功
                                <br />凭有效证件取号就诊
                            </center>
                        </div>
                    </div>
                    <div class="line_img">
                        <img src={require('../assets/picture/cho.jpg').default}  width="1" height="105" alt=""/>
                    </div>
                    <div class="list_04">
                        <div class="left_img">
                            <img  src={require('../assets/picture/medic_test.png').default} style={{width:'118px',height:'66px'}} alt="#" />
                        </div>
                        <div class="list_conts_04">
                            <center>
                                欢迎来到
                                &nbsp;<br></br>智慧医疗平台@ZJU
                            </center>
                        </div>
                    </div>
                </div>





                <div className="basicPage">
                    <Row gutter={[16, 12]}>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <div className="topPartTitle" align="center">时下论坛热帖</div>
                            <div className="topPartMain" align="center">
                                <Carousel  autoplay >
                                    <div className="TopPartPost">
                                        <Row>
                                            <Col span={2}>
                                            </Col>
                                            <Col span={14}>
                                                <img className = "postIMG" src={imgArr[0].default} alt="IMG1"></img>
                                            </Col>
                                            <Col span = {6}>
                                                <div className = "postText">{imgDescription[0]}</div>
                                            </Col>
                                            <Col span = {2}> </Col>
                                        </Row>
                                    </div>
                                    <div className="TopPartPost">
                                        <Row>
                                            <Col span={2}>
                                            </Col>
                                            <Col span={14}>
                                                <img className = "postIMG" src={imgArr[1].default} alt="IMG2"></img>
                                            </Col>
                                            <Col span = {6}>
                                                <div className = "postText">{imgDescription[1]}</div>
                                            </Col>
                                            <Col span = {2}> </Col>
                                        </Row>
                                    </div>
                                    <div className="TopPartPost">
                                        <Row>
                                            <Col span={2}>
                                            </Col>
                                            <Col span={14}>
                                                <img className = "postIMG" src={imgArr[2].default} alt="IMG3"></img>
                                            </Col>
                                            <Col span = {6}>
                                                <div className = "postText">{imgDescription[2]}</div>
                                            </Col>
                                            <Col span = {2}> </Col>
                                        </Row>
                                    </div>
                                </Carousel>
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    <Divider orientation="left"></Divider>
                    <Row gutter={16}>
                        <Col span={2}></Col>
                        <Col span={10}>
                            <div class="leftPart">
                                <div className = "leftPartTitle" align= "center">
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
                                    renderItem =
                                        {
                                            item=>(<List.Item
                                                key = {item.title}
                                                extra = {

                                                    <Link to='#'>
                                                        <img
                                                            width={150}
                                                            height = {150}
                                                            alt="医生头像"
                                                            src={item.docImg}
                                                        />
                                                    </Link>

                                                }
                                            >
                                                <List.Item.Meta
                                                    title = {<a href ={item.href}>{item.title}</a>}
                                                    description={item.description}
                                                ></List.Item.Meta>
                                                {item.content}
                                            </List.Item>)
                                        }>

                                </List>

                            </div>
                        </Col>
                        <Col span={10}>
                            <div className = "rightPart" align = "center">
                                <div className = "rightPartTitle">药房速览</div>
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
                                    renderItem =
                                        {
                                            item=>(<List.Item
                                                key = {item.title}
                                                extra = {
                                                    <Link to='#'>
                                                        <img
                                                            width={150}
                                                            height = {150}
                                                            alt="药品图像"
                                                            src={item.medImg}
                                                        />
                                                    </Link>
                                                }
                                            >
                                                <List.Item.Meta
                                                    title = {<a href ={item.href}>{item.title}</a>}
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