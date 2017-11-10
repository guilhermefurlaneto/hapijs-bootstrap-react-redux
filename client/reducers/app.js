import reducerFactory from '../helpers/reducer-factory';

const _defaultState = {
  isLoading : false,
};

export const actions = {
  APP_SET_LOADING : 'app-set-loading',
};

const handlers = {};

handlers[actions.APP_SET_LOADING] = (state, action) => {
  return {
    ...state,
    isLoading : action.payload,
  };
};

export const actionsCreator = {
  toggleLoading : (loading) => {
    return {
      type : actions.APP_SET_LOADING,
      payload : loading,
    };
  },
};


export default reducerFactory(_defaultState, handlers);
