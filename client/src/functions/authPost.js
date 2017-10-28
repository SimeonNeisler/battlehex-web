import axios from 'axios';

export default function post(email, password) {
  const credentials = {
    email,
    password
  };
  const res = axios.post('/auth/email', credentials);
  console.log(res);
}
