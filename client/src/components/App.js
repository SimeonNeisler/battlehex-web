import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './login/Landing';
import Menu from './Menu';
import Navbar from './navbar/Navbar';
import Store from './store/Store';
import NewCard from './store/NewCard';


//<Route exact paht = "/register" component={Register} />
//<Route exact path = "/store" component={Store} />
export default class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" component={Navbar} />
            <div className="custom-container">
              <Route exact path = "/" component={Landing} />
              <Route exact path = "/menu" component={Menu} />
              <Route exact path = "/store" component={Store} />
              <Route exact path = "/newCard" component={NewCard} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
