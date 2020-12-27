import burgerReducer from './burgerReducer';
import purchase from './purchaseReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    burger: burgerReducer, 
    purchase: purchase,
    order: orderReducer,
    auth: authReducer
});

export default rootReducer;