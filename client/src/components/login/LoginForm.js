import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import post from '../../functions/authPost';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const res = post(this.state.email, this.state.password);
    this.setState({res});
    console.log(this.state.res);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="container">
        <div className="row" styles={{width: '30%', margin: '0 auto'}}>
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <input
              type="email"
              name="email"
              placeholder="name@email.com"
              value={this.state.email}
              onChange = {this.handleInputChange}/>
            </div>
            <div className="form-group">
              <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.value}
              onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
              <button
              className="btn btn-lg btn-success"
              onClick={this.handleSubmit}>Login</button>
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

export default connect(null, actions)(LoginForm);
