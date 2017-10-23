import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class LoginForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="row" styles={{width: '30%', margin: '0 auto'}}>
          <h3>Login</h3>
          <form onSubmit={this.props.signIn()}>
            <div className="form-group">
              <input type="text" name="email" placeholder="name@email.com"/>
            </div>
            <div className="form-group">
              <input type="text" name="password" placeholder="password"/>
            </div>
            <div className="form-group">
              <button className="btn btn-lg btn-success" type="submit">Login</button>
            </div>
            <div className="form-group">
              <Link className="btn btn-lg btn-default" to="/register">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm);
