import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
 
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount() {
    // super(props);
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const param of params.entries()) {
        if (param[0] === 'price') {
            price = param[1];
        } else {
            ingredients[param[0]] = +[param[1]];
        }
    }
    this.setState({ ingredients: ingredients, price: price });
    console.log('ingredients setted');
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.push(`${this.props.match.url}/contact-data`);
  };

  render() {
    console.log('...rendering');
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route 
          path={this.props.match.url + '/contact-data'} 
          render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)} />
      </div>
    );
  }
}

export default Checkout;
