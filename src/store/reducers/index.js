import burgerReducer from './burgerReducer';
import purchase from './purchaseReducer';
import orderReducer from './orderReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    burger: burgerReducer, 
    purchase: purchase,
    order: orderReducer
});

export default rootReducer;