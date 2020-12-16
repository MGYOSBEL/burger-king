import React from "react";
import classes from "./OrderSummary.module.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingrKey) => {
    return (
      <li key={ingrKey}>
        <span style={{textTransform: 'capitalize'}}>{ingrKey}</span>: {props.ingredients[ingrKey]}
      </li>
    );
  });
  return (
    <Auxiliary className={classes.OrderSummary}>
      <h3>Your Order</h3>
      <p>A delicious burguer with the following ingredients:</p>
      <ul>
          {ingredientSummary}
      </ul>
      <hr />
      <p><strong>Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button buttonType='Danger' clicked={props.canceled}>CANCEL</Button>
      <Button buttonType='Success' clicked={props.accepted}>CONTINUE</Button>
    </Auxiliary>
  );
};

export default orderSummary;
