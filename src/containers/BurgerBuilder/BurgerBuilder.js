import React, { Component } from "react";
import Auxiliary from "../../hoc//Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = () => {
    const sum = Object.keys(this.props.ingredients)
      .map((ingrKey) => this.props.ingredients[ingrKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isLoggedIn) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    const ingredientsNotLoaded = <p>Ingredients not loaded!</p>;
    let burgerContent = this.props.error ? ingredientsNotLoaded : <Spinner />;
    let modalContent = null;
    if (this.props.ingredients) {
      burgerContent = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            isLoggedIn={this.props.isLoggedIn}
            price={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            purchaseable={this.updatePurchaseState()}
          />
        </>
      );
      modalContent = (
        <OrderSummary
          price={this.props.totalPrice}
          canceled={this.purchaseCancelHandler}
          accepted={this.purchaseContinueHandler}
          ingredients={this.props.ingredients}
        />
      );
    }
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
        {burgerContent}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.price,
    error: state.burger.error,
    isLoggedIn: state.auth.token !== null
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
