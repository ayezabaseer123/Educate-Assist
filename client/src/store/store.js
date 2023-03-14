import { createStore } from 'redux';
import mainReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
//create a store for debuggong states
const store = createStore(
  mainReducer,
  composeWithDevTools()
);

export default store;
