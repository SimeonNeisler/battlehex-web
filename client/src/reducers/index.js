import { combineReducers} from 'redux';
import authReducer from './authReducer';
import storeReducer from './storeReducer';

export default combineReducers({
  auth: authReducer,
  store: storeReducer
});
