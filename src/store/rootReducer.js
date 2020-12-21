import burgerReducer from './burgerReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    burgerReducer: burgerReducer
});

export default rootReducer;