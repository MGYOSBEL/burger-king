import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import * as actions from './index';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
}

export const purchaseBurgerSuccess = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
    };
}

export const purchaseBurgerFailed = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: err
    };
}

export const  purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
        .post("/orders.json", orderData)
        .then((response) => {
            dispatch(purchaseBurgerSuccess());
            dispatch(actions.addOrder(response.data.name, orderData));
        })
        .catch((err) => {
            dispatch(purchaseBurgerSuccess(err));
        });
    };
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}