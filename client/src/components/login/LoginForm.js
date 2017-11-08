import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { signIn } from '../../actions';
import formFields from './formFields';
import login from '../../css/login.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  renderFields() {
    return _.map(formFields, ({type, name, placeholder}) => {
      return (
        <div key={name}>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        </div>
      )
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }


  render() {
    return (
      <div className="row" styles={{width: '30%', margin: '0 auto'}}>
        <h3>Login</h3>
          {this.renderFields()}
          <div>
            <button
            className="btn btn-lg btn-success"
            type="submit"
            onClick={() => this.props.signIn(this.state.email, this.state.password, this.props.history)}>
              Login
            </button>
          </div>
          <Link className="btn btn-lg btn-default" to="/register">Sign Up</Link>
      </div>
    );
  }
}

export default connect(null, {signIn})(withRouter(LoginForm));
