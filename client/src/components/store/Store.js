import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import '../../css/store.css';
import { getCards } from '../../actions';
import Card from './Card';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: {}};
    this.toggleCards = this.toggleCards.bind(this);
  }

  async componentDidMount() {
    const res = await this.props.getCards();
    const cards = res.data;
    this.setState({cards});
    console.log(this.state);
  }

  toggleCards() {
    var node = ReactDOM.findDOMNode(this.refs.unitCards);
    node.classList.toggle('closed');
  }

  render() {
    if(this.state.cards.unit) {
      var units = this.state.cards.unit;
      var unitsArr = [];
      for(var key in units) {
        if(!units.hasOwnProperty(key)) continue;
        var stats = units[key];
        var unitCard =
          <Card
            name={stats.name}
            unitClass={stats.unitClass}
            strength={stats.strength}
            hitpoints={stats.hitpoints}
            range={stats.range}
            moves={stats.moves}
            abilities={stats.abilities}
            cost={stats.cost}
            price={stats.price}
          />
          unitsArr.push(unitCard);
      }
    } else {
      var unitCards = <div>Nothing to Show</div>
    }
    return (
      <div>
        <h3>Store</h3>
        <button id="unitButton" onClick={this.toggleCards} className="dropbtn">Units<span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span></button>
        <div className="row text-center dropdown">
          <div ref="unitCards" className="drop-content closed">
            {unitsArr}
          </div>
        </div>
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  console.log(state);
}*/




export default connect(null, {getCards})(Store);
