import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Booking from "./Group_A/MainPage/Booking"
import BookingRecord from "./Group_A/MainPage/BookingRecord"
import CM from "./Group_A/MainPage/CM"
import Hospital from "./Group_A/MainPage/Hospital"
import Department from "./Group_A/MainPage/Department"
import DoctorTime from "./Group_A/MainPage/DoctorTime"
import Departmentonly from "./Group_A/MainPage/Departmentonly"
import Doctor from "./Group_A/MainPage/Doctor"
import Disease from "./Group_A/MainPage/Disease"

import BBS from './Group_D/bbs/BBS'
import PostDetail from "./Group_D/bbs/PostDetail";
import Artical from "./Group_D/Artical/index";
import AdminContent from "./Group_D/admin/AdminContent";

import MainPage from "./Group_E/MainPage/MainPage";
import './assets/css/MainPage.css'
import "./assets/css/SignInPage.css";
import './assets/css/App.css';
import PersonalCenter from './Group_E/UserCenter/PersonalCenter';
import FindPasswordPage from "./Group_E/Register_FindPsd/FindPasswordPage";
import RegisterPage from "./Group_E/Register_FindPsd/RegisterPage";
import Appointment from './Group_E/UserCenter/Appointment';
import ChatRoom from './Group_B/ChatRoom';
//import Prescrib from './Group_B/Prescrib'
import Prescription from './Group_B/prescrib/Prescrib'
import Prescription_all from './Group_B/prescrib/prescription_all';
import Prescription_detail from './Group_B/prescrib/prescription_detail';



import Test from './Group_E/UserCenter/Test';

import Msearch from "./Group_C/MainPage/Msearch";
import Cart from "./Group_C/Cart/Cart";
import Center from "./Group_C/Center/Center"
import ProductDetail from "./Group_C/MainPage/ProductDetail";
import Query from "./Group_C/Query/Query";
import Hist from "./Group_C/Center/Hist";
import Favor from "./Group_C/Center/Favor";
import Order from "./Group_C/Center/Order"
import Pay from "./Group_C/Pay/Pay"

import './assets/css/MainPage.css'

var storage = window.localStorage;

class App extends Component{
  render() {
    storage.setItem("TopBarKey","首页");
    return(
        <div className='App'>
          <BrowserRouter>
				<Switch>
					<Route exact path = "/" component = {MainPage}/>
                    <Route path="/FindPasswordPage" component={FindPasswordPage}/>
                    <Route path="/PersonalInfo" component={PersonalCenter}/>
                    <Route path="/RegisterPage" component={RegisterPage}/>
                    <Route path="/Appointment" component={Appointment}/>
                    <Route path="/Test" component={Test}/>
					<Route exact path = '/bbs' component={BBS}/>
					<Route exact path = '/post/:id' component={PostDetail}/>
					<Route path = '/artical' component={Artical}/>
                    <Route path = "/admin" component={AdminContent}/>
                    <Route exact path="/Booking" component={Booking} />
                    <Route exact path="/Hospital/:hid" component={Hospital} />
                    <Route exact path="/Department/:hid/:Did" component={Department} />
                    <Route exact path="/Department/:Did" component={Departmentonly} />
                    <Route exact path="/BookingRecord" component={BookingRecord} />
                    <Route exact path="/CM" component={CM} />
                    <Route exact path="/DoctorTime" component={DoctorTime} />
                    <Route exact path="/Doctor/:did" component={Doctor} />
                    <Route exact path="/Disease/:iid" component={Disease} />
          <Route path= '/ChatRoom'component={ChatRoom} />
          <Route path= '/Prescrib/:id/:name'component={Prescription} />
          <Route path= '/Prescriptions'component={Prescription_all} />
          <Route path= '/Prescription/:id' component={Prescription_detail} />

                    <Route path = "/search" component={Msearch}/>
                    <Route path = "/cart" component={Cart}/>
                    <Route path="/list/:name/:producer/:func/:class1/:suit" component={Query}/>
                    <Route path ="/center" component={Center}/>
                    <Route path="/detail" component={ProductDetail}/>
                    <Route path="/history" component={Hist}/>
                    <Route path="/favor" component={Favor}/>
                    <Route path="/order" component={Order}/>

                    <Route path="/pay/:orderid/:money" component={Pay}/>
				</Switch>
          </BrowserRouter>
        </div>
    )
  }
}
export default App;
