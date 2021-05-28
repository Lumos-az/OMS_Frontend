import React, {Component} from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import MainPage from "./MainPage/MainPage";

import './assets/css/MainPage.css'

import "./assets/css/SignInPage.css";

import './assets/css/App.css';

import PersonalInfo from './PersonalInfo/PersonalInfo';

import FindPasswordPage from "./Part1File/FindPasswordPage";

import RegisterPage from "./Part1File/RegisterPage";

import Appointment from './PersonalInfo/Appointment';

import Test from './PersonalInfo/Test';

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
              <Route path="/PersonalInfo" component={PersonalInfo}/>
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
