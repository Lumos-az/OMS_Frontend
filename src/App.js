import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import MainPage from "./Group_E/MainPage/MainPage";

import './Group_E/assets/css/MainPage.css'

import "./Group_E/assets/css/SignInPage.css";

import './Group_E/assets/css/App.css';

import PersonalCenter from './Group_E/UserCenter/PersonalCenter';

import FindPasswordPage from "./Group_E/Register_FindPsd/FindPasswordPage";

import RegisterPage from "./Group_E/Register_FindPsd/RegisterPage";

import Appointment from './Group_E/UserCenter/Appointment';

import Test from './Group_E/UserCenter/Test';

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
            </Switch>
          </BrowserRouter>
        </div>
    )
  }
}
export default App;
