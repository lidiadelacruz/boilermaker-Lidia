import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './user';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;
