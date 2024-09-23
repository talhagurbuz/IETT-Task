import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import apiReducer from '../services/apiReducers';
import tableReducers from '../services/Reducers/tableReducers';
import filterReducers from '../services/Reducers/filterReducers';
import authReducer from '../features/auth/authReducer';

const rootReducer = combineReducers({
  api: apiReducer,
  auth: authReducer,
  tables: tableReducers,
  filter: filterReducers
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
