import http from '../helpers/http';
import reducerFactory from '../helpers/reducer-factory';

import { push } from 'react-router-redux';

const TOKEN_NAME = 'app-token';

function getAuthToken() {
  const auth = window.localStorage.getItem(TOKEN_NAME);
  return auth
    ? JSON.parse(auth)
    : null;
}

function setAuthToken(userInfo) {
  window.localStorage.setItem(TOKEN_NAME, JSON.stringify(userInfo));
}

function flushAuthToken() {
  window.localStorage.removeItem(TOKEN_NAME);
}

const currentUserInfo = getAuthToken();

const _defaultState = {
  isLoggedIn : !! currentUserInfo,
  userData : currentUserInfo,
  errors : [],
};

export const actions = {
  USER_SIGN_IN : 'user-sign-in',
  USER_LOGOUT : 'user-logout',
  USER_VALIDATION_ERRORS : 'user-validation-errors'
};

const handlers = {};

handlers[actions.USER_SIGN_IN] = (state, action) => {
  return  {
    ...state,
    isLoggedIn : true,
    userData : action.payload,
  };
};

handlers[actions.USER_LOGOUT] = (state, action) => {
  return {
    ...state,
    isLoggedIn : false,
    userData : null,
  };
};

handlers[actions.USER_VALIDATION_ERRORS] = (state, action) => {
  return {
    ...state,
    errors : action.payload,
  };
};

export const actionsCreator = {
  login : (payload) => (dispatch) => {
    return http.post('/api/account/login', payload)
      .then((response) => {
        setAuthToken(response.data);
        dispatch({
          type : actions.USER_SIGN_IN,
          payload : response.data,
        });
        dispatch(push('/dashboard'));
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type : actions.USER_VALIDATION_ERRORS,
            payload : [error.response.data.message],
          });
        } else {
          dispatch({
            type : actions.USER_VALIDATION_ERRORS,
            payload : [error.message],
          });
        }
      });
  },
  signOut : () => (dispatch) => {
    flushAuthToken();
    dispatch({
      type : actions.USER_LOGOUT,
    });
    dispatch(push('/login'));
  },
  changePassword : (payload) => (dispatch) => {
    return http.post('/api/account/change-password', payload)
      .then((response) => {
        dispatch(push('/dashboard'));
      }).catch((error) => {
        dispatch({
          type : actions.USER_VALIDATION_ERRORS,
          payload : [error.message],
        });
      });
  },
  requestPasswordRecovery : (payload) => (dispatch) => {
    return http.post('/api/account/reset-password', payload)
      .then((response) => {
        // TODO : Notify
        dispatch(push('/login'));
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type : actions.USER_VALIDATION_ERRORS,
            payload : [error.response.data.message],
          });
        } else {
          dispatch({
            type : actions.USER_VALIDATION_ERRORS,
            payload : [error.message],
          });
        }
      });
  },
  resetPassword : (payload) => (dispatch) => {
    return http.put('/api/account/reset-password', payload)
      .then((response) => {
        dispatch(push('/login'));
      })
      .catch((error) => {
        dispatch({
          type : actions.USER_VALIDATION_ERRORS,
          payload : [error.message],
        });
      });
  },

  signUp : (payload) => (dispatch) => {
    return http.post('/api/account/sign-up', payload)
      .then((response) => {
        dispatch(push('/login'));
      })
      .catch((error) => {
        dispatch({
          type : actions.USER_VALIDATION_ERRORS,
          payload : [error.message],
        });
      });
  },
};

export default reducerFactory(_defaultState, handlers);
