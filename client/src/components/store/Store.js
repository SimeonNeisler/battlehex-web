import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'bootstrap-arrow-buttons/dist/css/bootstrap-arrow-buttons.css';

import '../../css/store.css';
import Card from './Card';
import { DoublyLinkedList } from '../../data_structures';
import { addToCart, getCards } from '../../actions';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: {}, page: 'store' };
    this.toggleCards = this.toggleCards.bind(this);
    this.toggleInstants = this.toggleInstants.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  async componentDidMount() {
    const res = await this.props.getCards();
    const cards = res.data;
    //console.log(cards);
    this.setState({cards});
  }

  toggleCards() {
    this.cardsDiv.classList.toggle('closed');
  }

  toggleInstants() {
    this.instantsDiv.classList.toggle('closed');
  }

  addToCart(card) {
      //iterate through list on Checkout
      //Tally cost of all cards
      //send Cards to server
      //process payment
      //add cards to user's deck
      if(!this.state.cart) {
        const cart = new DoublyLinkedList(card);
        const latest = cart;
        this.setState({cart, latest})
      } else {
        const newLink = new DoublyLinkedList(card);
        const updatedList = this.state.latest;
        updatedList.setNext(newLink);
        this.setState({latest: newLink}, () => this.iterateList(this.state.cart, (value) => {
          console.log(value.card);
        }));
      }

  }

  iterateList(node, callback) {
    if(node.next) {
      this.iterateList(node.next);
    }
    if(callback) {
      callback(node.val);
    }
    return node.val;
  }

  /*renderCart() {
    return ()
  }*/

  renderCard(card, location) {
    switch (card.type) {
      case 'unit':
        return <Card
          key={card}
          name={card.name}
          unitClass={card.unitClass}
          strength={card.strength}
          hitpoints={card.hitpoints}
          range={card.range}
          moves={card.moves}
          abilities={card.abilities}
          cost={card.deployCost}
          price={card.storePrice}
          purchaseEvent={
            (location == 'store')
            ? () => { this.addToCart(card) }
            : null
          }
        />
        break;
      case 'instant':
        return <Card
          key={card}
          name={card.name}
          strength={card.strength}
          area={card.area}
          cost={card.deployCost}
          price={card.storePrice}
          purchaseEvent={
            (location == 'store')
            ? () => { this.addToCart(card) }
            : null
          }
        />
        break;
      case 'upgrade':
        break;
      case 'ability':
        break;
      default:

    }
  }

  renderUnits() {
    if(this.state.cards.unit) {
      var units = this.state.cards.unit;
      return Object.keys(units).map((unit) => {
        const card = units[unit].card;
        console.log(card);
        return this.renderCard(card, 'store');
      });
    } else {
      return <div>Nothing to Show</div>
    }
  }

  renderInstants() {
    if(this.state.cards.instant) {
        var instants = this.state.cards.instant;
        return Object.keys(instants).map((instant) => {
          return this.renderCard(instant, 'store');
        });
      } else {
          return <div>Nothing to Show</div>
      }
  }



  renderStore() {
    return (
      <div className="container">
        <div>
          <h3>Store</h3>
          <Link className="btn btn-default btn-arrow-left left" to="/menu">Back to Menu</Link>
          <button className="btn btn-sm btn-success">Shopping Cart</button>
          <Link className="btn btn-default btn-arrow-right right" to="/newCard">Create New Card</Link>
        </div>
        <div id="secondRow">
          <button id="unitButton" onClick={this.toggleCards} className="left dropbtn">Units<span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span></button>
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
        </div>
      </div>
    );
  }

  renderCart() {
    return (
      <div className="container">
        <div>
          <h3>Shopping Cart</h3>
          <button className="btn btn-default btn-arrow-left left">To store</button>
        </div>
        <div id="secondRow">
          <div className="row text-center">

          </div>
        </div>
      </div>
    );
  }


  render() {
    let page = '';
    if(this.state.page == 'store') {
      page = this.renderStore();
    } else if (this.state.page == 'cart') {
      page = this.renderCart();
    } else {
      page = <div>Nothing to show</div>;
    }
    return page;
  }
}

/*function mapStateToProps(state) {
  console.log(state);
}*/

export default connect(null, {getCards, addToCart})(Store);
