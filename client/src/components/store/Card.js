import React from 'react';
import '../../css/card.css';

export default ({name, unitClass, strength, hitpoints, range, moves, abilities, cost, price}) => {
  if(abilities != null) {
    abilities.join(', ');
    var powers = <li>{abilities}</li>
  } else {
    powers = null;
  }
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
        <li>Cost: {cost}</li>
      </div>
      <div className="price">
        <p>${price}</p>
      </div>
      {/*<div className="options">
      <button className="btn btn-info btn-sm info" type="button" name="button">Info</button>
        <form action="/store/checkout" method="post">
          <input type="hidden" name="price"/>
          <button className="btn btn-sm btn-success"name="card">Add To Cart</button>
        </form>
      </div>*/}
    </div>
  );
}
