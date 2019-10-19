import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { signOut } from '../../actions';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
        <Link className="navbar-brand" to="/">BattleHex</Link>
        </div>
        <div className="collapse navbar-collapse">
            {(localStorage.getItem("AuthToken") == (null || undefined)) ?
              <ul className="nav navbar-nav navbar-right">
                <li> 
                  <Link to="/">Login</Link> 
                </li>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
              </ul>
            :
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link onClick={() => props.signOut(props.history)} to="/signout">Logout</Link>
                </li>
              </ul>
            }
        </div>
      </div>
    </nav>
  );
}

export default connect(null, {signOut})(withRouter(Navbar));
