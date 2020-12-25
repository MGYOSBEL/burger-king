import * as actionTyes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  purchased: false,
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTyes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTyes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTyes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state);
    case actionTyes.PURCHASE_BURGER_FAILED:
      return purchaseBurgerFail(state, action);
    default:
      return state;
  }
};

const purchaseInit = (state) => {
  return {
    ...state,
    purchased: false,
  };

}
const purchaseBurgerStart = (state) => {
  return {
    ...state,
    loading: true,
  };

}
const purchaseBurgerSuccess = (state) => {
  return {
    ...state,
    loading: false,
    purchased: true
  };

}
const purchaseBurgerFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
}

export default purchaseReducer;
