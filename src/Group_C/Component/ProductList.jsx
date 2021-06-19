import React from 'react';
import ReactDOM from 'react-dom';
// import {CacheLink,Link} from 'react-keeper';
import {Link} from 'react-router-dom'
import {List, Typography, Divider, Avatar, Space, Checkbox, Card} from 'antd';
import {MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import '../assets/css/ProductList.css'
import axios from "axios";
const defaultUrl = 'http://10.185.104.173:5000/';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            plist: [],
        }
    }
    componentDidMount() {
        //console.log(this.props.mlist);

        axios({
            headers: {
                'Content-Type': 'application/json'
            },
            transformRequest: [function (data) {
                data = JSON.stringify(data)
                console.log(data)
                return data
            }],
            baseURL: defaultUrl,
            method: 'post',
            url: '/api/search-by-name-fuzzy',
            data: {
                'text': this.props.name,
                'filters': {
                    'medicineProducer': [this.props.producer==='-'?'':this.props.producer, 'fuzzy'],
                    'medicineMainFunction': [this.props.func==='-'?'':this.props.func, ''],
                    'medicineSuitable': [this.props.suit==='-'?'':this.props.suit, ''],
                    'medicineTypeMajor': [this.props.class==='-'?'':this.props.class, ''],
                    'medicineTypeMinor': ['', ''],
                    'isOTC': ['否', ''],
                },
            }
        }).then(res => {
            console.log(res.data);
            if(res.data.length===0) {
                alert("找不到你搜索的药品！")
            }
            //this.props.medicine(res.data);
            for(let i=0;i<res.data.length;i++){
                axios({
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    transformRequest: [function(data) {
                        data = JSON.stringify(data)
                        console.log(data)
                        return data
                    }],
                    baseURL:defaultUrl,
                    method: 'post',
                    url: '/api/medicine-images',
                    data: {
                        'medicineID': res.data[i].medicineID,
                    }
                }).then(res1=>{
                    console.log(res1);
                    //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });

                    res.data[i].medicineImages = res1.data;

                    //this.props.medicine(res.data);
                    this.setState({
                        plist: res.data,
                    });

                });
            }

            //this.props.history.push({pathname: '/list'+'/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor,state: {plist: res.data}})
            //     this.setState({
            //         producer: (this.state.producer===''||this.state.producer==='-')?'-':this.state.producer,
            //         mainFunc: (this.state.producer===''||this.state.producer==='-')?'-':this.state.mainFunc,
            //         typeMajor: (this.state.producer===''||this.state.producer==='-')?'-':this.state.typeMajor,
            //     })
            //     this.props.history.push('/list'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor)
            // Control.go('/list/'+val+'/'+this.state.producer+'/'+this.state.mainFunc+'/'+this.state.typeMajor,{plist: res.data})
            //this.props.history.push(`/`)
        })

        // for(let i=0;i<this.props.mlist.length;i++){
        //     axios({
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         transformRequest: [function(data) {
        //             data = JSON.stringify(data)
        //             console.log(data)
        //             return data
        //         }],
        //         baseURL:defaultUrl,
        //         method: 'post',
        //         url: '/api/medicine-images',
        //         data: {
        //             'medicineID': this.props.mlist[i].medicineID,
        //         }
        //     }).then(res=>{
        //         //console.log(res);
        //         //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });
        //
        //         this.props.mlist[i].medicineImages = res.data;
        //         this.setState({
        //             plist: this.props.mlist,
        //         });
        //     });
        // }

        //console.log(this.props.mlist);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let oldName = prevProps.name
        let newName = this.props.name
        let oldProducer = prevProps.producer
        let newProducer = this.props.producer
        let oldFunc = prevProps.func
        let newFunc = this.props.func
        let oldSuit = prevProps.suit
        let newSuit = this.props.suit
        let oldClass = prevProps.class
        let newClass = this.props.class
        // let oldId = prevProps.match.params.key
        // let newId = this.props.match.params.key
        if(oldName !== newName||oldProducer!==newProducer||oldFunc!==newFunc||oldSuit!==newSuit||oldClass!==newClass){
            axios({
                headers: {
                    'Content-Type': 'application/json'
                },
                transformRequest: [function (data) {
                    data = JSON.stringify(data)
                    console.log(data)
                    return data
                }],
                baseURL: defaultUrl,
                method: 'post',
                url: '/api/search-by-name-fuzzy',
                data: {
                    'text': this.props.name,
                    'filters': {
                        'medicineProducer': [this.props.producer==='-'?'':this.props.producer, 'fuzzy'],
                        'medicineMainFunction': [this.props.func==='-'?'':this.props.func, ''],
                        'medicineSuitable': ['', ''],
                        'medicineTypeMajor': [this.props.class==='-'?'':this.props.class, ''],
                        'medicineTypeMinor': ['', ''],
                        'isOTC': ['否', ''],
                    },
                }
            }).then(res => {
                console.log(res.data);
                if(res.data.length===0) {
                    alert("找不到你搜索的药品！")
                }
                //this.props.medicine(res.data);
                for(let i=0;i<res.data.length;i++){
                    axios({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        transformRequest: [function(data) {
                            data = JSON.stringify(data)
                            console.log(data)
                            return data
                        }],
                        baseURL:defaultUrl,
                        method: 'post',
                        url: '/api/medicine-images',
                        data: {
                            'medicineID': res.data[i].medicineID,
                        }
                    }).then(res1=>{
                        console.log(res1);
                        //let data = Object.assign({}, this.props.mlist[i], { medicineImages : res.data });

                        res.data[i].medicineImages = res1.data;

                        //this.props.medicine(res.data);
                        this.setState({
                            plist: res.data,
                        });

                    });
                }
        })
        console.log('fxxk');
    }
    }
    render() {
        // const listData = [];
        // //console.log(this.props.mlist.length);
        //
        // for (let i = 0; i < 23; i++) {
        //     listData.push({
        //         href: 'https://ant.design',
        //         title: `999 GAN MAO LING KE LI ${i}`,
        //         avatar: '../assets/picture/otc.png',
        //         description:
        //             'zhong yao hao, xi yao kuai. zhong xi jie he, you kuai you hao.',
        //         content:
        //             'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        //     });
        // }
        // const IconText = ({icon, text}) => (
        //     <Space>
        //         {React.createElement(icon)}
        //         {text}
        //     </Space>
        // );
        return (
            <List
                itemLayout="vertical"
                size="large"
                grid={{gutter: 16, column: 3}}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 9,
                }}
                dataSource={this.state.plist}
                renderItem={item => (
                    <List.Item
                        //   className="test"
                        // key={item.title}
                        // actions={[
                        //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        // ]}
                        // extra={
                        //   <img
                        //       className="demo"
                        //     width={272}
                        //     alt="logo"
                        //     src="http://g-search3.alicdn.com/img/bao/uploaded/i4/i3/2928278102/O1CN01HVZh7t29ilb85MGA2_!!2928278102-0-sm.jpg_580x580Q90.jpg_.webp"
                        //   />
                        // }
                    >
                        {/*<List.Item.Meta*/}
                        {/*  avatar={<Avatar src={item.avatar} />}*/}
                        {/*  title={<a href={item.href}>{item.title}</a>}*/}
                        {/*  description={item.description}*/}
                        {/*/>*/}
                        {/*{item.content}*/}
                        <Link to={{pathname: '/detail',state: {info: item}}}>
                            <Card hoverable
                                  cover={<img alt="medicine"
                                              src={"data:image/png;base64,"+item.medicineImages}/>}
                            >
                                <Card.Meta
                                    title={item.medicineNameAlias}
                                    description={item.medicineNameZh}/>
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        )
    }
}

export default ProductList;