import im from '../config.js'
import GoEasyIM from 'goeasy-im';
import { Button, Input, Layout, Menu, Breadcrumb, Dropdown, message, Space, Modal } from 'antd'
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import TopBar from '../Component/TopBar.jsx'
import Message from './Message'
import moment from 'moment';
import MessageList from './MessageList'
import ConversationList from './ConversationList'
import '../assets/css/Messenger.css'
import { ChatItem } from 'react-chat-elements'
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import { MessageBox } from 'react-chat-elements';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
import './ConversationList/ConversationList.css';
import { invalid } from 'moment';
import Compose from './Compose'
import axios from 'axios'
import Resizer from "react-image-file-resizer";
import ReactAudioPlayer from 'react-audio-player'
import { ReactMic } from 'react-mic';


import './ToolbarButton/ToolbarButton.css';
import './ChatRoom.css'
import { ConsoleSqlOutlined, ContactsOutlined, RightSquareFilled } from '@ant-design/icons';



const { Search } = Input;
const { TextArea } = Input;
const { Header, Footer, Sider, Content } = Layout;


var storage = window.localStorage
/* the format of the storage
TopBarKey: "/2"
address: "杭州西湖区浙大紫金港"
email: "3170101975@zju.edu.cn"
goEasyNode: "1"
identity: "2"
islogin: "true"
length: 10
nickname: "test3"
phone: "86-18893344532"
token: "eyJleHAiOjE2MjI2NjE3NjYsImFsZyI6IkhTNTEyIiwiaWF0IjoxNjIyNjAxNzY2fQ.eyJ1c2VybmFtZSI6IjMzMDEyMjE5ODcwMTAxMTExWCIsInN0YXR1cyI6ImxvZ2luIn0.0TghXNgpLWBkTh7GaFBK4Q0sF-gk89FYF9tFCH55i1Xp307O64r7O6mfYQLI0U2kqvz9V1nKMousj1HML57qqw"
user: "33012219870101111X"
*/


class ChatRoom extends Component {
    constructor(props) {
        super(props);

        var Link = null
        if (storage.getItem('identity')==="1") {
            Link = "/Prescrib/" 
        } else {
            Link = "/prescriptions/"
        }
        this.state = {
        User: storage.getItem("nickname"),
        Receiver: '',
        ReceiverID: '',
        Conversations: '',
        Messages: '',
        Message: '',
        allMessages: '',
        File: null,
        URL: null,
        Type: null,
        ID: storage.getItem("user"), // user ID
        showPre: storage.getItem("identity") === "1" ? "yes": "none",
        ReceiverDict: null, // to store the receivers and their ids
        isModalVisible: false,
        record: false,
        audioURL: null,
        Link: Link
        }
        this.login()
    };


    // audio recording
    showModal = () =>{
        this.setState({isModalVisible: true})
    }
    
    handleOK = () => {
        this.setState({isModalVisible: false})
        this.sendMessage()
    }
    
    
    handleCancel = () => {
        this.setState({isModalVisible: false})
    }
    
    startRecording = () => {
        this.setState({ record: true });
    }
    
    stopRecording = () => {
        this.setState({ record: false });
    }
    
    onData = (recordedBlob) => {
        //console.log('chunk of real-time data is: ', recordedBlob);
        console.log('shit')
    }
    
    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        var url = URL.createObjectURL(recordedBlob.blob)
        this.setState({audioURL: url})
        var file = new File([recordedBlob.blob], "test.mp3", {type: "audio/mpeg"});
        console.log(file)
        this.setState({File: file})
        this.setState({URL: url})
        this.setState({Type: "audio"})
    
    }




    // on file select (from the pop up window)
    onImageChange = (e) => {
        //this.setState({URL: URL.createObjectURL(e.target.files[0])})
        console.log(e.target.files[0].type)
        /*
        if (e.target.files[0].type!=='image/png'&&e.target.files[0].type!=='image/jpg') {
            message.info('请上传图片格式的文件')
            return;
        }
        */
        this.setState({File: e.target.files[0]})
        this.setState({Type: 'image'})
        console.log(e.target.files[0])
        
        message.info('图片上传成功')


        // try to get the width and height of the img
        try {
            Resizer.imageFileResizer(
                e.target.files[0],
                600,
                800,
                "PNG",
                100,
                0,
                (url) => {
                    //console.log("The new URL is: "+url)
                    // update the new URL
                    this.setState({URL: url})
                }

            )
        } catch (error) {
            console.log("The error is: "+error)
        }
    }


    onAudioChange = (e) => {
        if (e.target.files[0].type!=='audio/mpeg') {
            message.info("请上传音频格式的文件")
            return ;
        }
        this.setState({File: e.target.files[0]})
        this.setState({Type: 'audio'})
        this.setState({URL: URL.createObjectURL(e.target.files[0])})

        
        message.info('上传成功')

    }


    // choose the receiver using the menu
    chooseReceiver = ({key}) => {
        switch(key) {
            case "1":
                this.setState({Receiver: "专业医师"})
                this.setState({Messages: ""})
                break;
            case "2":
                this.setState({Receiver: "在线客服"})
                this.setState({Messages: ""})
                break;
            case "3":
                this.setState({Receiver: "问诊机器人"})
                this.setState({Messages: ""})
        }
    }
    // the menu for choosing the doctor/bot
    menu = (
    <Menu onClick={this.chooseReceiver}>
        <Menu.Item key="1">专业医师</Menu.Item>
        <Menu.Item key="2">在线客服</Menu.Item>
        <Menu.Item key="3">问诊机器人</Menu.Item>
    </Menu>
    )


    
    login = () =>  {
        // construct the user info
        if (!this.state.User) {
            message.error('请登录后再进行在线诊疗')
        } else {
            var user = {
                id: this.state.User,  //当前用户的唯一标识符
                data: {"id": this.state.ID} //当前用户的扩展数据, 任意格式的字符串或者对象，用于会话列表conversation.data和群消息的senderData
            }
            // connect to Goeasy
            var promise =  im.connect(user);

            promise.then(function() {
                console.log("Connection successful. And the userID is: "+this.state.User);
            }).then(
                this.getConversations()
            ).then(
                this.watchConversations()
            ).catch(function(error) {
                console.log("Failed to connect GoEasy, code:"+error.code+ ",error:"+error.content);
            });

        }
    };

    // set the receiver
    setSender = (value) => {
        console.log("the receiver is: " + value);
        this.setState({Receiver: value});
    };

    // textArea onChange
    // about the message to send
    onChange = (e) => {
        this.setState({Message: e.target.value});
    }

    // to send the message
    // onClick on Button
    sendMessage = (value) => {
        //value.preventDefault()
        if (this.state.Receiver==='') {
            alert('请选择发送对象')

        } else if (this.state.File){
            // construct the Message
            let file = this.state.File
            this.setState({File: null})

            let Mess= this.state.Messages
            var newMessage = {
                timestamp: Date.now(),
                senderId: this.state.User,
                type: this.state.Type,
                payload: {url: this.state.URL}
            }
            if (!Mess) Mess=[]
            Mess.push(newMessage)
            this.setState({Messages: Mess})


            var message
            if (this.state.Type==='image') {
                message = im.createImageMessage({
                    file: file, //H5获得的图片file对象，Uniapp和小程序调用chooseImage，success时得到的res对象
                    to : {
                        type : GoEasyIM.SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
                        id : this.state.Receiver,
                        data:{"id": this.state.ID} //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
                    },
                    onProgress: (event) => { console.log('file uploading:', event) } //获取上传进度
                });
            } else { // audio file
                message = im.createAudioMessage({
                    file: file, //H5获得的图片file对象，Uniapp和小程序调用chooseImage，success时得到的res对象
                    to : {
                        type : GoEasyIM.SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasy.IM_SCENE.GROUP
                        id : this.state.Receiver,
                        data:{"id": this.state.ID} //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
                    },
                    onProgress: (event) => { console.log('file uploading:', event) } //获取上传进度
                });
            }

            
            console.log('upload is OK')
            // send the message
            //发送单聊消息
            var promise = im.sendMessage(message)
            promise.then(()=>{
                message.info('发送成功')
            }).catch((error) => {
                console.log('The error is: ' + error.content)
            })

        } else if (this.state.Message) {
            var content = this.state.Message
            this.setState({Message: ''})
            
            let Mess= this.state.Messages;
            let newMessage = {
                timestamp: Date.now(),
                senderId: this.state.User,
                type: 'text',
                payload: {text: content}
            }
            if (!Mess) Mess = [];
            Mess.push(newMessage);
            this.setState({Messages: Mess});
        
        
        
            if (this.state.Receiver==="问诊机器人") {
                const url = "http://10.112.196.28:5000"
                const data = {
                    sender: this.state.User,
                    question: content
                }
                axios.post(url, data).then((res) => {
                    console.log('robot sent succeeded.')
                })
            } 
            //创建消息, 内容最长不超过3K，可以发送字符串，对象和json格式字符串
        
            let textMessage = im.createTextMessage({
                text: content, //消息内容
                to : {
                    type : GoEasyIM.SCENE.PRIVATE,   //私聊还是群聊，群聊为GoEasyIM.SCENE.GROUP
                    id : this.state.Receiver,
                    data: {"id": this.state.ID} //好友扩展数据, 任意格式的字符串或者对象，用于更新会话列表conversation.data
                }
            });
        
            //发送消息
            var promise = im.sendMessage(textMessage);
        
            promise.then((message) => {
               console.log("Private message sent successfully.", message);
               //this.getMessages();
            }).catch((error) => {
                console.log("Failed to send private message，code:" + error.code +",error"+error.content);
            });
        } else {
            message.info('不能发送空内容')
        }
    }

    // 選擇聊天對象
    chooseConversation = (e) => {
        this.setState({Receiver: e.currentTarget.id});
        //console.log(this.state.ReceiverDict)
        //message.info(this.state.ReceiverDict[e.currentTarget.id])
        this.setState({ReceiverID: this.state.ReceiverDict[e.currentTarget.id]})
        console.log(this.state.ReceiverDict[e.currentTarget.id])
        // 標記為已讀

        //this.getMessages();
        var promise = im.markPrivateMessageAsRead(e.currentTarget.id);
        promise.then(function(result) {
            //会话列表结果
            // {
            //     code: 200,
            //     content: 'OK'
            // };
        }).then( () => {
            // get the messages after the receiver is chosen
            this.getMessages();
        }
        ).catch(function(error) {
            console.log("Failed to mark as read, code:" + error.code + " content:" + error.content);
        });

    };

    // 获取对话列表
    getConversations = () => {
        var promise = im.latestConversations();
        promise.then((result) => {
            //console.log(result)
            this.setState({Conversations: result.content.conversations});
            console.log(this.state.Conversations)
            if (this.state.ReceiverDict) {
                console.log('ReceiverDict is full!')
            } else {         
                var i = 0
                var count = this.state.Conversations.length
                var dic = []
                while (i < count) {
                    dic[this.state.Conversations[i].userId] = this.state.Conversations[i].data.id
                    i += 1
                }
                this.setState({ReceiverDict: dic})
                console.log(this.state.ReceiverDict)
            }

        }).catch(function(error) {
            console.log("Failed to get the latest conversations, code:" + error.code + " content:" + error.content);
        });
    }

    watchConversations = () => {
        var onConversationsUpdated = (conversations) => { 
            let Mess = this.state.Messages;
            console.log(conversations);
            let count = conversations.conversations.length;
            let i = 0;
            while (i < count) {
                if (conversations.conversations[i].userId===this.state.Receiver && conversations.conversations[i].unread!==0) {
                    if (conversations.conversations[i].lastMessage.type!=="text") {
                        message.info('received an file...')
                        let newMessage = {
                           timestamp: conversations.conversations[i].lastMessage.timestamp,
                           senderId: this.state.Receiver,
                           type: conversations.conversations[i].lastMessage.type,
                           payload: {url: conversations.conversations[i].lastMessage.payload.url}
                       }
                       Mess.push(newMessage);

    
                    } else {
                        let newMessage = {
                           timestamp: conversations.conversations[i].lastMessage.timestamp,
                           senderId: this.state.Receiver,
                           type: 'text',
                           payload: {text: conversations.conversations[i].lastMessage.payload.text}
                       }
                       Mess.push(newMessage);
                    }
                }
                i += 1;
            }
            this.setState({Messages: Mess})
            this.getConversations(); 
        };

    //监听会话列表更新
        im.on(GoEasyIM.EVENT.CONVERSATIONS_UPDATED, onConversationsUpdated);
    }


    // 渲染对话列表
    renderConversations = () => {
        let i = 0;
        let temp = [];
        let count = this.state.Conversations.length
        var payload;
        while (i < count) {
            if (this.state.Conversations[i].lastMessage.type==='image') {
                payload = "[图片]"
            } else if (this.state.Conversations[i].lastMessage.type==='audio') {
                payload = "[音频]"
            } else {
                payload = this.state.Conversations[i].lastMessage.payload.text
            }
            temp.push(
                <div id={this.state.Conversations[i].userId} onClick={this.chooseConversation}>
                <ChatItem 
                avatar="https://www.logosvgpng.com/wp-content/uploads/2021/05/proginov-logo-vector.png" 
                title={this.state.Conversations[i].userId} 
                subtitle={payload}
                unread={this.state.Conversations[i].unread}
                date={this.state.Conversations[i].lastMessage.timestamp}
                />
                </div>
            )
            i+=1;
        }
        return temp;
    }



    // not going to use for now
    // 獲取歷史紀錄
    getMessages = () => {



        var option = {
            friendId: this.state.Receiver,  //对方userId
            lastTimestamp: Date.now(), //查询发送时间小于（不包含）该时间的历史消息，可用于分页和分批拉取聊天记录，默认为当前时间
            limit: 30 //可选项，返回的消息条数，默认为10条，最多30条
        }
    
        //查询
        var promise = im.history(option);
    
        promise.then((result) => {
            //console.log("Query history successfully, result:\n " + JSON.stringify(result));
            //console.log(result.content)
            this.setState({Messages: result.content});
        }).catch((error) => {
            console.log("Failed to query private message, code:" + error.code + " content:" + error.content);
        });
    
    }


    // 渲染消息
    renderMessages = () => {
        if (!this.state.Messages) return;
        let i = 0;
        let messageCount = this.state.Messages.length;
        let tempMessages = [];
        
        
        while (i < messageCount) {
          let previous = this.state.Messages[i - 1];
          let current = this.state.Messages[i];
          let next = this.state.Messages[i + 1];
          let isMine = current.senderId === this.state.User;
          let currentMoment = moment(current.timestamp);
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          let showTimestamp = true;
        
          if (previous) {
            let previousMoment = moment(previous.timestamp);
            let previousDuration = moment.duration(currentMoment.diff(previousMoment));
            prevBySameAuthor = previous.senderId === current.senderId;
            
            if (prevBySameAuthor && previousDuration.as('minutes') < 5) {
              startsSequence = false;
            }
        
            if (previousDuration.as('minutes') < 5) {
              showTimestamp = false;
            }
          }
      
          if (next) {
            let nextMoment = moment(next.timestamp);
            let nextDuration = moment.duration(nextMoment.diff(currentMoment));
            nextBySameAuthor = next.senderId === current.senderId;
        
            if (nextBySameAuthor && nextDuration.as('hours') < 1) {
              endsSequence = false;
            }
          }
      
          tempMessages.push(
            <Message
              key={i}
              isMine={isMine}
              startsSequence={startsSequence}
              endsSequence={endsSequence}
              showTimestamp={showTimestamp}
              data={current}
            />
          );
        
          // Proceed to the next message.
          i += 1;
        }
    
        return tempMessages;
    }


    // render the whole page
    render() {
        return (
            <Layout>
                <TopBar />
                <Content>


                    <div className="messenger">
                        <div className="scrollable sidebar">
                        <Toolbar
                        title="消息列表"
                        leftItems={[
                          <Link to={this.state.Link+this.state.ReceiverID+"/"+this.state.Receiver}>
                          <ToolbarButton key="cog" icon="ion-ios-clipboard" />
                          </Link>
                        ]}
                        rightItems={[
                          <Dropdown overlay={this.menu}>
                          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />                               
                          </a>
                        </Dropdown>
                        ]}
                        />


                        {this.renderConversations()}
                        </div>

                        <div className="scrollable content">
                            <div className="message-list">
                        
                                <Toolbar
                                title={this.state.Receiver}
                                rightItems={[
                                <Space>
                                <div class='image-upload'>
                                    <label for="image-input">
                                        <i className="toolbar-button ion-ios-image" />
                                    </label>
                                    <input id="image-input" type="file" onChange={this.onImageChange} />
                                </div>
                                    <i className="toolbar-button ion-ios-call" onClick={this.showModal} />

                                </Space>

                                ]}
                                />
                            <div className="message-list-container">{this.renderMessages()}</div>
                            </div>


                        <div style={{margin: "20px"}}>
                        <TextArea showCount maxLength={100} onPressEnter={this.sendMessage} onChange={this.onChange} value={this.state.Message}/>
                        <Modal title="音频录制" visible={this.state.isModalVisible} onCancel={this.handleCancel} onOk={this.handleOK} width={800}
                        okText="发送" cancelText="取消" 
                        >

                        <ReactMic
                          record={this.state.record}
                          className="sound-wave"
                          onStop={this.onStop}
                          onData={this.onData}
                          strokeColor="#000000"
                          backgroundColor="#FFFFFF" 
                          mimeType="audio/mp3"
                          />
                        <button onClick={this.startRecording} type="button">开始</button>
                        <button onClick={this.stopRecording} type="button">结束</button>
                        <ReactAudioPlayer src={this.state.audioURL} controls />
                                            
                        </Modal>

                        </div>
                        </div>
                    </div>
                    
                </Content>
        </Layout>

        )
    }
}

export default ChatRoom;

