import { createStore, applyMiddleware, combineReducers } from 'redux';

//import reducers
import reducers from './reducers';

export function initializeStore(initialState) {
    return createStore(
        combineReducers(reducers),
        initialState
    );
};

