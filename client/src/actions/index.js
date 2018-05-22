import axios from 'axios';
import { SIGN_IN, SIGN_OUT, GET_CARDS, ADD_TO_CART } from './types';

export const getCards = () => async dispatch => {
  const cards = await axios.get('/store');
  dispatch({type: GET_CARDS, payload: cards.data});
  return cards;
}

export const signIn = (email, password, history) => async dispatch => {
  const res = await axios.post('/auth/email', {email, password});
  console.log(res.data);
  dispatch({type: SIGN_IN, auth: true, payload: res.data});
  if(res.data.auth) {
    history.push('/app');
  }
}

export const signOut = (history) => async dispatch => {
  const res = await axios.get('/auth/logout');
  dispatch({type: SIGN_OUT, payload: res.data});
  history.push('/');
}
