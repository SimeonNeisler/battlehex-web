import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from  './app/Menu';
import { Store, NewCard, Purchase } from './app/store';
import LoginForm from './login/LoginForm';
import Navbar from './navbar/Navbar';


export default class App extends Component {

  constructor(props) {
    super(props);
  }

  /*Successfully changed application level state. Reset on refresh, need to decide between persisting application level state on refresh or taking another approach to access control.*/
  checkAuth() {

  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route path="/" component={Navbar} />
            <div className="custom-container">
              <Route exact path = "/" component={LoginForm} />
              <Route exact path = "/app" component={Menu} />
              <Route exact path = "/app/store" component={Store} />
              <Route exact path = "/app/store/newCard" component={NewCard} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
