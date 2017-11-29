import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'bootstrap-arrow-buttons/dist/css/bootstrap-arrow-buttons.css';

import '../../css/store.css';
import { getCards, addToCart } from '../../actions';
import Card from './Card';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: {}};
    this.toggleCards = this.toggleCards.bind(this);
    this.toggleInstants = this.toggleInstants.bind(this);
  }

  async componentDidMount() {
    const res = await this.props.getCards();
    const cards = res.data;
    this.setState({cards});
  }

  toggleCards() {
    this.cardsDiv.classList.toggle('closed');
  }

  toggleInstants() {
    this.instantsDiv.classList.toggle('closed');
  }

  renderUnits() {
    if(this.state.cards.unit) {
      var units = this.state.cards.unit;
      var unitsArr = [];
      for(var key in units) {
        if(!units.hasOwnProperty(key)) continue;
        var stats = units[key];
        var unitCard =
            <Card
              key={key}
              name={stats.name}
              unitClass={stats.unitClass}
              strength={stats.strength}
              hitpoints={stats.hitpoints}
              range={stats.range}
              moves={stats.moves}
              abilities={stats.abilities}
              cost={stats.cost}
              price={stats.price}
              purchaseEvent={addToCart(key, stats)}
            />
          unitsArr.push(unitCard);
      }
      return unitsArr;
    } else {
      return <div>Nothing to Show</div>
    }
  }

  renderInstants() {
    if(this.state.cards.instant) {
      var instants = this.state.cards.instant;
      var instantsArr = [];
      for(var key in instants) {
        if(!instants.hasOwnProperty(key)) continue;
        var stats = instants[key];
        var instantCard =
          <Card
            key={key}
            name={stats.name}
            strength={stats.strength}
            area={stats.area}
            cost={stats.cost}
            price={stats.price}
            purchaseEvent={addToCart(key, stats)}
          />
          instantsArr.push(instantCard);
      }
      return instantsArr;
    } else {
      return <div>Nothing to Show</div>
    }

  }


  render() {
    return (
      <div className="container">
        <div>
          <h3>Store</h3>
          <Link className="btn btn-default btn-arrow-left left" to="/menu">Back to Menu</Link>
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
}

/*function mapStateToProps(state) {
  console.log(state);
}*/




export default connect(null, {getCards, addToCart})(Store);
