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
import * as actionTypes from "../../store/burgerActions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState = () =>  {
    const sum = Object.keys(this.props.ingredients)
      .map((ingrKey) => this.props.ingredients[ingrKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    const ingredientsNotLoaded = <p>Ingredients not loaded!</p>;
    let burgerContent = this.state.error ? ingredientsNotLoaded : <Spinner />;
    let modalContent = null;
    if (this.props.ingredients) {
      burgerContent = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
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

      if (this.state.loading) {
        modalContent = <Spinner />;
      }
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
    ingredients: state.burgerReducer.ingredients,
    totalPrice: state.burgerReducer.price,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
