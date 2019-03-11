import axios from 'axios';
import { SIGN_IN, SIGN_OUT, GET_CARDS } from './types';

export const getAllCards = () => async dispatch => {
  const cards = await axios.get('/cards');
  dispatch({type: GET_CARDS, payload: cards.data});
  return cards.data;
}

export const getUserCards = () => async dispatch => {
  console.log("Retrieving user cards");
  const userCards = await axios.get('/userCards');
  dispatch({type: GET_CARDS, payload: userCards.data});
  console.log(userCards);
  return userCards.data;
}

export const signIn = (email, password, history) => async dispatch => {
  const res = await axios.post('/auth/token', {email, password});
  console.log(res.data);
  dispatch({type: SIGN_IN, payload: res.data});
  history.push('/app');
}

export const signOut = (history) => async dispatch => {
  const res = await axios.get('/auth/logout');
  dispatch({type: SIGN_OUT, payload: res.data});
  history.push('/');
}
