import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import 'bootstrap-arrow-buttons/dist/css/bootstrap-arrow-buttons.css';

import Card from '../Card';
import { getAllCards, getUserCards } from '../../../actions';
import '../../../css/decks.css';

class Decks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCards: {},
      userCards: {}
    };
    this.toggleCards = this.toggleCards.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  async componentDidMount() {
    let cardValues = await Promise.all([this.props.getAllCards(), this.props.getUserCards()]);
    this.setState({
      storeCards: cardValues[0],
      userCards: cardValues[1]
    });
  }

  toggleCards() {
    this.cardsDiv.classList.toggle('closed');
  }

  renderPlayerCards() {
    const userCards = this.state.userCards;
    const storeCards = this.state.storeCards;
    return Object.keys(userCards).map((userCardTypes) => {
      return Object.keys(userCards[userCardTypes]).map((userCard) => {
        return this.renderCard(storeCards[userCardTypes][userCard], userCards[userCardTypes][userCard]);
      });
    });
  }

  renderCard(card, quantity) {
    return (
      <div
        className="card-container">
        <Card
          card={card.card}
        />
        <div>x{quantity}</div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="header-left">
            <Link className="btn btn-default btn-arrow-left" to="/app">
              Back To Menu
            </Link>
          </div>
          <h1 className="header-mid">Deck Page</h1>
          <div className="header-right">
            <Link className="btn btn-default btn-arrow-right" to="/app/decks/newDeck">
              Create A Deck
            </Link>
          </div>
        </div>
        <div id="secondRow">
          <button id="cardsButton" onClick={this.toggleCards} className="left dropbtn">
            Owned Cards
            <span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span>
          </button>

          <div className="row text-center dropdown">
            <div ref={(div) => {this.cardsDiv = div}} className="drop-content closed">
              {this.renderPlayerCards()}
            </div>
          </div>
          <button id="decksButton" onClick={this.toggleDecks} className="left dropbtn">
            Current decks
            <span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { getAllCards, getUserCards })(Decks);
