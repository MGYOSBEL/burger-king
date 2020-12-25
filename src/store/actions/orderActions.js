import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const addOrder = (id, orderData) => {
  return {
    type: actionTypes.ADD_ORDER,
    orderId: id,
    orderData: orderData,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: err,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then((response) => {
        //   Transform the orders here cause is better the reducer receives the data it's going to save
        // If i changed my backend, or the way data is formatted, I prepare the orer here, and the reducer doesnt have to change
        const orders = [];
        for (const key in response.data) {
          orders.push({
            ...response.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
