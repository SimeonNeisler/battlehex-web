import axios from 'axios';
import { SIGN_IN, FETCH_USER } from './types';

export const signIn = (email, password, history) => dispatch => {
  const body = {
    email,
    password
  };
  axios.post('/auth/email', body).then((res) => {
    dispatch({ type: SIGN_IN, payload: res.data});
  }).catch((err) => {
    console.log(err);
  });
  history.push('/menu');
}

export const fetchUser = () => dispatch => {
  axios.get('/auth/currentUser').then((res) => {
    console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data});
  }).catch((err) => {
    console.log(err);
  });

}
