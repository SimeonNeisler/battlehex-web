import { SIGN_IN, FETCH_USER } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SIGN_IN:
      return action.payload;
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
