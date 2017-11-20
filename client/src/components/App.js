import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {fetchUser} from '../actions';
import Landing from './login/Landing';
import Menu from './Menu';
import Navbar from './navbar/Navbar';
import Store from './store/Store';


//<Route exact paht = "/register" component={Register} />
//<Route exact path = "/store" component={Store} />
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();

  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" component={Navbar} />
            <div className="container">
              <Route exact path = "/" component={Landing} />
              <Route exact path = "/menu" component={Menu} />
              <Route exact path = "/store" component={Store} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {fetchUser})(App);
