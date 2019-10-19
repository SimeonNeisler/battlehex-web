import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '../Card';
import { getAllCards, getUserCards } from '../../../actions';
import '../../../css/newDeck.css';

/*Scrap deck array and replace with object that has the same structure as available cards. Iterate card value in deck and decrement it in available cards.*/

class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeCards: {},
      userCards: {},
      deck: {}
    };
    this.renderCard = this.renderCard.bind(this);
    this.renderPlayerCards = this.renderPlayerCards.bind(this);
    this.togglePlayerCards = this.togglePlayerCards.bind(this);
  }

  async componentDidMount() {
    let cardValues = await Promise.all([this.props.getAllCards(), this.props.getUserCards()]);
    console.log(cardValues);
    this.setState({
      storeCards: cardValues[0],
      userCards: cardValues[1]
    });
    console.log(this.state);
  }

  addCard(card) {
    let deck = this.state.deck;
    deck.push(card);
    this.setState((prevState) => {
      return {
        ...prevState,
        deck
      }
    });
    console.log(this.state);
  }

  removeCard() {
    
  }

  renderPlayerCards() {
    const storeCards = this.state.storeCards;
    const userCards = this.state.userCards;
    return Object.keys(userCards).map((userCardTypes) => {
      return Object.keys(userCards[userCardTypes]).map((userCard) => {
        return this.renderCard(storeCards[userCardTypes][userCard], userCards[userCardTypes][userCard].owned,
        userCards[userCardTypes][userCard].inDeck);
      });
    });
  }

  togglePlayerCards() {

  }

  renderCard(card, owned, inDeck) {
    return (
      <div
        className="card-container">
        <Card
          card={card.card}
        />
        <span className="add-remove">
          <button className="remove btn btn-danger">
            -
          </button>
          <div className="quantity">{inDeck || 0}/{owned}</div>
          <button className="add btn btn-success" onClick={() => this.addCard(card)}>
            +
          </button>
        </span>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          Create a New Deck
        </div>
        <div className="player-cards">
          <button id="userCardsButton" className="dropbtn" onClick={this.togglePlayerCards}>
            <span>Owned Cards</span>
          </button>
          <div className="drop-content">
            {this.renderPlayerCards()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { getAllCards, getUserCards })(NewDeck);
