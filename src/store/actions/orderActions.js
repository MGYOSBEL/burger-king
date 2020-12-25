import * as actionTypes from '../actions/actionTypes';


export const addOrder = (id, orderData) => {
    return {
        type: actionTypes.ADD_ORDER,
        orderId: id, 
        orderData: orderData
    };
}
