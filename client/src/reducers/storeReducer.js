import { GET_CARDS } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_CARDS:
      //console.log(action);
      return action.payload;
    default:
      return state;
  }
}
