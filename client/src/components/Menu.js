import React, { Component } from 'react';

export default class Menu extends Component {
  render() {
    return(
      <div>
        <h2>Welcome Back, Commander</h2>

        <div className="container">
          <div className="row">
            <a className="card" href="/profile"><p className="text">Profile</p></a>

            <a className="card" href="/newGame"><p className="text">New Game</p></a>

            <a className="card" href="/activeGames"><p className="text">Active Games</p></a>
          </div>
          <div className="row">
              <a className="card" href="/decks"><p className="text">Decks</p></a>

              <a className="card" href="/store"><p className="text">Store</p></a>
              <a className="card" href="/signout"><button type="button" name="button">Logout</button></a>
          </div>
        </div>
      </div>
    );
  }
}
