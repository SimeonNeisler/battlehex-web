import axios from 'axios';

export default function purchase(token, cart) {
  const postData = {
    token,
    cart
  }
  axios.post('/store/purchase', postData);
}
