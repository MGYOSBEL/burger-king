import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAILED:
      return fetchOrdersFail(state, action);
    case actionTypes.ADD_ORDER:
      return addOrder(state, action);
    default:
      return state;
  }
};

const fetchOrdersStart = (state) => {
  return {
    ...state,
    loading: true,
  };
};

const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders,
  };
};

const fetchOrdersFail = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: [],
    error: action.error,
  };
};

const addOrder = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return {
    ...state,
    orders: state.orders.concat(newOrder),
  };
};

export default orderReducer;
