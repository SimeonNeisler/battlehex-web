import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Menu from  './app/Menu';
import { Store, NewCard } from './app/store';
import { Decks, NewDeck } from './app/decks';
import LoginForm from './login/LoginForm';
import Navbar from './navbar/Navbar';

const PrivateRoute = ({component: Component}) => {
  <Route render={(props) => {
    checkAuth === true
    ? <Component {...props} />
    : <Redirect to = {{
        pathname: '/login',
        state: {from: props.location}
    }}/>
  }}/>
}

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  /*Successfully changed application level state. Reset on refresh, need to decide between persisting application level state on refresh or taking another approach to access control.*/


  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Route path="/" component={Navbar} />
            <div className="custom-container">
              <Route exact path = "/" component={LoginForm} />
              <PrivateRoute exact path = "/app" component={Menu} />
              <PrivateRoute exact path = "/app/decks" component={Decks} />
              <PrivateRoute exact path = "/app/decks/newDeck" component={NewDeck} />
              <PrivateRoute exact path = "/app/store" component={Store} />
              <PrivateRoute exact path = "/app/store/newCard" component={NewCard} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
