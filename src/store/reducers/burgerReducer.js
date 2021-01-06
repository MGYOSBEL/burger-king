import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utils/helpers";

const initialState = {
  ingredients: null,
  price: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return setError(state);
    default:
      return state;
  }
};

const addIngredient = (state, action) => {
  const oldState = { ...state };
  const oldIngredients = { ...state.ingredients };
  const newIngredients = updateObject(oldIngredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  const newState = updateObject(oldState, {
    ingredients: newIngredients,
    price: state.price + INGREDIENT_PRICES[action.ingredientName],
  });
  return newState;
};

const removeIngredient = (state, action) => {
  const oldState = { ...state };
  const oldIngredients = { ...state.ingredients };
  const newIngredients = updateObject(oldIngredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  const newState = updateObject(oldState, {
    ingredients: newIngredients,
    price: state.price - INGREDIENT_PRICES[action.ingredientName],
  });
  return newState;
};

const setIngredients = (state, action) => {
  const oldState = {...state};
  const newState = updateObject(oldState, {ingredients: action.ingredients, error: false, price: initialState.price});
  return newState;
} 

const setError = (state) => {
  const updatedState = {...state};
  updatedState.error = true;
  return updatedState;
} 

export default burgerReducer;
