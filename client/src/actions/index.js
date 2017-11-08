import axios from 'axios';
import { SIGN_IN, FETCH_USER } from './types';

export const signIn = (email, password, history) => async dispatch => {
  const res = await axios.post('/auth/email', {email, password});
  dispatch({type: SIGN_IN, payload: res.data});
  if (res.data !== "Please Login") {
    history.push('/menu');
  }
}

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/currentUser');
  dispatch({ type: FETCH_USER, payload: res.data});

}
