import { combineReducers } from 'redux';
import puppiesReducer from './puppies';

const appReducer = combineReducers({
  puppies: puppiesReducer,
});

export default appReducer;
