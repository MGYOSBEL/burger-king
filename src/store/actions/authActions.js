import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path: path,
});

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logoutWhenTokenExpires = (expirationTimeInSeconds) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), expirationTimeInSeconds * 1000);
  };
};

export const login = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const requestBody = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    const requestUrl = isSignUp ? 
     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAenblCMRqTQHxsaAlP0JGv_3A6h1WJjnE'
    : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAenblCMRqTQHxsaAlP0JGv_3A6h1WJjnE";

    axios
      .post( requestUrl, requestBody)
      .then((response) => {
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(logoutWhenTokenExpires(response.data.expiresIn));
      })
      .catch((err) => {
        console.error(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = localStorage.getItem("expirationDate");
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        const expirationTimeInSeconds =
          (new Date(expirationDate).getTime() - new Date().getTime()) / 1000;
        dispatch(logoutWhenTokenExpires(expirationTimeInSeconds));
      }
    }
  };
};
