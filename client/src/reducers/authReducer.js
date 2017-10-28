import { SIGN_IN } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case SIGN_IN:
      console.log("Success");
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
