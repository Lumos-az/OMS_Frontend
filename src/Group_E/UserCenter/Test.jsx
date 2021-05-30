import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import {Layout, Table } from 'antd';
import { List } from 'antd';
var imgArr = [require('../assets/picture/test1.jpg'), require('../assets/picture/test2.jpg'), require('../assets/picture/test5.jpg')];


const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


class Test extends React.Component{
    render(){
        return (
            <Layout>
                          <Carousel effect="fade">
                              
                            <div>
                                 <h3 style={contentStyle}>1</h3>
                            </div>

                            <div>
                                 <h3 style={contentStyle}>2</h3>
                            </div>

                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>

                            <div>
                            <div style={{position: 'relative', width:' 170px', height: '89px'}}>

<image src={require('../assets/picture/test1.jpg')} >   </image>
<span style={{position: 'absolute', bottom: '0', left:' 0'}}>添加文字...添加文字...添加文字...</span> 
</div>
                                <h3 style={contentStyle}>4</h3>
                            </div>

                           
                        </Carousel>  
                       <hr></hr>
                      
                                            
            </Layout>
        );
    }
}
 
export default Test;