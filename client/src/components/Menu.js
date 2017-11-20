import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { signOut } from '../actions';

class Menu extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.state);
  }

  render() {
    return(
      <div>
        <h2>Welcome Back, Commander</h2>

        <div className="container">
          <div className="row">
            <Link className="card" to="/profile">Profile</Link>

            <Link className="card" to="/newGame">New Game</Link>

            <Link className="card" to="/activeGames">Load Game</Link>
          </div>
          <div className="row">
            <Link className="card" to="/decks">Decks</Link>

            <Link className="card" to="/store">Store</Link>

            <Link className="card" onClick={() => this.props.signOut(this.props.history)} to="/signout">Logout</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {signOut})(withRouter(Menu));
