import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import '../../css/store.css';
import { getCards } from '../../actions';
import Card from './Card';

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: {}};
  }

  async componentDidMount() {
    const res = await this.props.getCards();
    const cards = res.data;
    this.setState({cards});
    console.log(this.state);
  }

  render() {
    if(this.state.cards.unit) {
      var units = this.state.cards.unit;
      for(var key in units) {
        if(!units.hasOwnProperty(key)) continue;
        var stats = units[key];
        var unitCards =
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
      }
    } else {
      var unitCards = <div>Nothing to Show</div>
    }
    return (
      <div>
        <h3>Store</h3>
        <button id="unitButton" className="dropbtn">Units<span className="glyphicon glyphicon-menu-right rotate" aria-hidden="true"></span></button>
        {unitCards}
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  console.log(state);
}*/




export default connect(null, {getCards})(Store);
