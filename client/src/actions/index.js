import axios from 'axios';
import { SIGN_IN, SIGN_OUT, FETCH_USER, GET_CARDS } from './types';

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

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/currentUser');
  dispatch({ type: FETCH_USER, payload: res.data});

}

export const getCards = () => async dispatch => {
  const cards = await axios.get('/store');
  dispatch({type: GET_CARDS, payload: cards.data});
  return cards;
}
