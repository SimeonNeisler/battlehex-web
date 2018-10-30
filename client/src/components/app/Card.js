import React from 'react';
import '../../css/card.css';

export default ({card}) => {
  let {type, name, unitClass, strength, hitpoints, range, moves, area, abilities, deployCost, storePrice} = card;
  if(abilities != null) {
    abilities.join(', ');
    var powers = <li>{abilities}</li>
  } else {
    powers = null;
  }
  switch (type) {
    case 'unit':
      return (
        <div className="card">
          <div className="name">
            <h5>{name}</h5>
            <p>{unitClass}</p>
          </div>
          <div className="stats">
            <li>Strength: {strength}</li>
            <li>HP: {hitpoints}</li>
            <li>Range: {range}</li>
            <li>Movement: {moves}</li>
            {powers}
            <li>Cost: {deployCost}</li>
            <div id='price'>${storePrice}</div>
          </div>
        </div>
      );
    case 'instant':
      return (
        <div className="card">
          <div className="name">
            <h5>{name}</h5>
          </div>
          <div className="stats">
            <li>Strength: {strength}</li>
            <li>Area: {area}</li>
            <li>Cost: {deployCost}</li>
            <div id='price'>${storePrice}</div>
          </div>
        </div>
      );
  }
}
