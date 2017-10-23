import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Landing from './login/Landing';
import Register from './Register';
import Menu from './Menu';


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Route exact path = "/" component={Landing} />
            <Route exact path = "/Menu" component={Menu} />
            <Route exact path = "/Register" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
