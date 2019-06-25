

/*Render shopping cart at bottom of page,
Click on payment tab at the top to bring up stripe
Send shopping cart in post request*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import 'bootstrap-arrow-buttons/dist/css/bootstrap-arrow-buttons.css';

import '../../../css/store.css';
import Card from '../Card';
import { getAllCards } from '../../../actions';
import { purchase } from '../../../functions';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      cart: {
        unit: {},
        instant: {},
      },
      price: 0
    };
    this.toggleCards = this.toggleCards.bind(this);
    this.toggleInstants = this.toggleInstants.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.adjustcart = this.adjustCart.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  async componentDidMount() {
    const cards = await this.props.getAllCards();
    console.log(cards.data);
    this.setState({cards, price: 0});
    console.log(this.state);
  }

  toggleCards() {
    this.cardsDiv.classList.toggle('closed');
  }

  toggleInstants() {
    this.instantsDiv.classList.toggle('closed');
  }

  toggleCart() {
    this.cartDiv.classList.toggle('closed');
  }

  clearState() {
    this.setState(prevState => ({
      ...prevState,
      cart: {
        unit: {},
        instant: {}
      },
      price: 0
    }));
  }

  //Find way to store card information on keys in user basket

  adjustCart(key, type, cost, amount) {
    let newAmount;
    this.state.cart[type][key] == undefined
    ? newAmount = amount
    : newAmount = this.state.cart[type][key] + amount;
    if(newAmount < 0) {
      newAmount = 0;
      amount = 0;
    }
    let newPrice = this.state.price += cost * amount;
    let keyObj = {
      quantity: newAmount
    }
    this.setState((prevState) => {
      return {
        cart: {
          ...prevState.cart,
          [type]: {
            ...prevState.cart[type],
            [key]: newAmount
          }
        },
        price: newPrice
      }
    });
  }

  renderCard(type, key, card, location) {
    let cardSub;
    if(location == 'store') {
      cardSub = (
        <div className="optionsContainer">
          <div className="options">
            <button className="btn btn-info btn-sm info" type="button">Info</button>
            <div className="quantityButtons">
              <button className="btn btn-danger btn-sm amountInput"
                onClick={() => {
                  this.adjustCart(key, type, card.storePrice, -1);
                }}>-</button>
              <div className="cardcount amountInput">{this.state.cart[type][key]}</div>
              <button className="btn btn-success btn-sm amountInput"
                onClick={() => {this.adjustcart(key, type, card.storePrice, 1)}}>
                +
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      cardSub = (
        <div>Qty: {this.state.cart[type][key]}</div>
      );
    }
    return (
      <div key={key} className="card-container">
        <Card
          card={card}
        />
        {cardSub}
      </div>
    );
  }

  renderUnits() {
    if(this.state.cards.unit) {
      let units = this.state.cards.unit;
      return Object.keys(units).map((unitKey) => {
        const card = units[unitKey].card;
        return this.renderCard(card.type, unitKey, card, 'store');
      });
    } else {
      return <div>Nothing to Show</div>
    }
  }

  renderInstants() {
    if(this.state.cards.instant) {
        var instants = this.state.cards.instant;
        return Object.keys(instants).map((instantKey) => {
          const card = instants[instantKey].card;
          return this.renderCard(card.type, instantKey, card, 'store');
        });
      } else {
          return (
            <div>Nothing to Show</div>
          );
      }
  }

  /*renderCart() {
    if(this.state.cart) {
      let cart = this.state.cart;
      let cards = this.state.cards;
      return Object.keys(cart).map((cardType) => {
        return Object.keys(cart[cardType]).map((cardKey) => {
          return this.renderCard(cardType, cardKey, cart[cardType][cardKey], 'cart');
        });
      });
    } else {
      return <div>Empty Shopping Cart</div>;
    }
  }*/

  render() {
    return (
      <div className="container">
        <div>
          <h3>Store</h3>

          <div id="top-row">
            <Link className="btn btn-default btn-arrow-left left" to="/app">Back to Menu</Link>

            <div id="purchase-block">
              <StripeCheckout
                name="Battle-Hex"
                description={"$" + this.state.price + " for your shopping cart"}
                amount={this.state.price * 10000/100}
                token={(token) => {
                  purchase(token, this.state.cart)
                }}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                closed={() => {
                  this.clearState();
                }}
              >
                <button className="stripe-btn">Purchase Cart</button>
              </StripeCheckout>
              {/*The *100/100 below is for formatting purposes.*/}
              <div id="cartPrice">${Math.round(this.state.price * 100)/100}</div>
            </div>

            <Link className="btn btn-default btn-arrow-right right" to="/app/store/newCard">Create New Card</Link>
          </div>
        </div>

        <div id="secondRow">
          <button id="unitButton" onClick={this.toggleCards} className="left dropbtn">
            Units
            <span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span>
          </button>

          <div className="row text-center dropdown">
            <div ref={(div) => {this.cardsDiv = div}} className="drop-content closed">
              {this.renderUnits()}
            </div>
          </div>
          <button id="instantButton" className="left dropbtn" onClick={this.toggleInstants}>Instant Damage<span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span></button>
          <div className="row text-center dropdown">
            <div ref={(div) => {this.instantsDiv = div}} className="drop-content closed">
              {this.renderInstants()}
            </div>
          </div>
          {/*<button id="cartDisplay" className="left dropbtn" onClick={this.toggleCart}>Shopping Cart<span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span></button>
          <div className="row text-center dropdown">
            <div ref={(div) => {this.cartDiv = div}} className="drop-content closed">
              {this.renderCart()}
            </div>
          </div>*/}
        </div>
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  console.log(state);
}*/

export default connect(null, {getAllCards})(Store);
