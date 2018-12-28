import React, { Component } from 'react';
import Login from './login/login';
import Home from './home/home';

import {HashRouter,Route,Switch} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="">
        <HashRouter>
          <div>
            <Switch>
              <Route path = "/" exact component = {Home}/>
              <Route path = "/home"  component={Home}/>

              <Route path = "/login"  component = {Login}/>
            
            </Switch>    
          </div>
          
        </HashRouter>
      </div>
        
      
    )
  }
}
