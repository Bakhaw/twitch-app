import { applyMiddleware, createStore, combineReducers } from 'redux';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { gamesReducer } from '../reducers/gamesReducer';
import { streamsReducer } from '../reducers/streamsReducer';
import { userReducer } from '../reducers/userReducer';

const middleware = applyMiddleware(thunk);

const reducers = combineReducers({ gamesReducer, streamsReducer, userReducer })

export const store = createStore(reducers, middleware);