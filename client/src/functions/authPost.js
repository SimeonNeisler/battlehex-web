import axios from 'axios';

export default function post(email, password) {
  const data = ('?email=' + email + '&password=' + password);
  const res = await axios({
    method: 'post',
    url: '/auth/email',
    data: data
  });
  console.log(res);
}
