import 'whatwg-fetch';
import { SIGN_IN } from './types';

export const signIn = (email, password) => dispatch => {
  const body = {
    email: email,
    password: password
  }
  dispatch({ type: SIGN_IN, payload: body});
}
