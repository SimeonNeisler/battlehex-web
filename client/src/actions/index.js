import axios from 'axios';
import { FETCH_USER } from './types';

export const signIn = (email, password) => async dispatch => {
  const res = await axios.post('/auth/email', email, password);

  dispatch({ type: FETCH_USER, payload: res.data});
}
