import * as actionTyes from "../actions/actionTypes";
const initialState = {
  loading: false,
  error: null,
  purchased: false,
};

const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTyes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTyes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTyes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true
      };
    case actionTyes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default purchaseReducer;
