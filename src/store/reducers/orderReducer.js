import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
    case actionTypes.ADD_ORDER:
        const newOrder = {
            ...action.orderData,
            id: action.orderId,
          };
    
        return {
            ...state,
            orders: state.orders.concat(newOrder)
        };
    default:
      return state;
  }
};

export default orderReducer;
