import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (const key in props.ingredients) {
    ingredients.push(
        <span key={key} className={classes.Ingredient}>
          {key} ({props.ingredients[key]})
        </span>
    );
  }
  return (
    <div className={classes.Order}>
      <p>
        <em>Ingredients:</em>
      </p>
      <hr />
      {ingredients}
      <hr />
      <p>
        <strong>Price: {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
