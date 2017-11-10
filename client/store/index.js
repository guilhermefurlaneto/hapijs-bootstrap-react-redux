import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';

export default function configureStore(history, initialState = {}) {

    const createStoreWithMiddleware = compose(
        applyMiddleware(
            thunk,
            createLogger(),
            routerMiddleware(history),
        ),
    )(createStore);

    const allReducers = buildRootReducer(reducers);

    return createStoreWithMiddleware(allReducers, initialState);
}

function buildRootReducer(allReducers) {
    return combineReducers(Object.assign({}, allReducers, { routing : routerReducer}));
}
