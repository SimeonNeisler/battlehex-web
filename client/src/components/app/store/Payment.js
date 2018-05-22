import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

class Payment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StripeCheckout
        name="Battle-Hex"
        description="Purchase for your shopping cart"
        amount={this.props.price}
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    )
  }
}
