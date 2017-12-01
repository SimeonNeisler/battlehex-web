import axios from 'axios';
import { SIGN_IN, SIGN_OUT, FETCH_USER, GET_CARDS, ADD_TO_CART } from './types';

export const signIn = (email, password, history) => async dispatch => {
  const res = await axios.post('/auth/email', {email, password});
  dispatch({type: SIGN_IN, payload: res.data});
  if (res.data !== "Please Login") {
    history.push('/menu');
  }
}

export const signOut = (history) => async dispatch => {
  const res = await axios.get('/auth/logout');
  dispatch({type: SIGN_OUT, payload: res.data});
  history.push('/');
}


export const getCards = () => async dispatch => {
  const cards = await axios.get('/store');
  dispatch({type: GET_CARDS, payload: cards.data});
  return cards;
}

export const addToCart = (card) => async dispatch => {
  const res = await axios.post('/store/cart', {card});
  console.log(res);
}

export const postCard = (state, history) => async dispatch => {
  const res = await axios.post('/store', {state});
  console.log(res);
  history.push('/store');
}
