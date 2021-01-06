import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utils/helpers";

const login = (state, action) => {
    const authData = {
        userId: action.userId,
        token: action.token,
        loading: false,
        error: null,
    };
    return updateObject(state, authData);
};

const logout = (state, action) => {
    const cleanState = {
        userId: null,
        token: null,
        loading: false,
        error: null,
        authRedirectPath: '/'
    };
    return updateObject(state, cleanState);
}

const setError = (state, action) => {
    const updatedState = {
        loading: false,
        error: action.error
    };
    return updateObject(state, updatedState);
};

const setRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
}

const initialState = {
    userId: null,
    token: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
        return updateObject(state, {loading: true});
    case actionTypes.AUTH_SUCCESS:
        return login(state, action);
    case actionTypes.AUTH_FAIL:
        return setError(state, action);
    case actionTypes.AUTH_LOGOUT:
        return logout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
        return setRedirectPath(state, action);
    default:
      return state;
  }
};




export default authReducer;
