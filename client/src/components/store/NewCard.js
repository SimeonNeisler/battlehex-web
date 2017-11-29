import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import postCard from '../../functions/cardPost';
import uniqueFields from './fields/uniqueFields';
import universalFields from './fields/universalFields';
import '../../css/newCard.css';

class newCard extends Component {
  constructor(props) {
    super(props);
    this.state = {cardName: '', type: 'false', deployCost: '', storePrice: '', description: '', image: '', strength: '', hitpoints: '', range: '', moves: '', unitClass: '', abilities: 'N/A', area: ''};
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  }

  renderUniversalFields() {
    return _.map(universalFields, ({key, type, name, min, step, placeholder}) => {
      return (
        <div key={key}>
          <input
            className="form-control"
            type={type}
            name={name}
            min={min}
            step={step}
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
            required
          />
        </div>
      )
    });
  }

  renderUniqueFields() {
    return _.map(uniqueFields, ({type, classNames, name, placeholder}) => {
      return (
        <div key={name}>
          <input
            className={classNames}
            type={type}
            name={name}
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleInputChange}
            required
            disabled={classNames.includes(this.state.type) ? false : true}
          />
        </div>
      )
    });
  }

  render() {
    return (
      <div style={{width:'100%'}} ref={(div) => {this.rootDiv = div}}>
          <h4>Create a New Card</h4>
          <Link className="btn btn-default btn-arrow-left left" to="/store">Back to Store</Link>
        <div className="custom-container">
          <select id="CardType" className="form-control" name="type"
          value={this.state.value}
          onChange={this.handleInputChange}>
            <option value="unit">Unit</option>
            <option value="instant">Instant Damage</option>
            <option value="upgrade">Upgrade</option>
            <option value="ability">Ability</option>
          </select>
          {this.renderUniversalFields()}
          {this.renderUniqueFields()}
          <button className="btn btn-lg btn-success"
          type="submit" onClick={() =>
            postCard(this.state, this.props.history)}>Submit</button>
        </div>
      </div>
    )
  }
}

export default connect(null, {postCard})(withRouter(newCard));
