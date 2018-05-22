import axios from 'axios';

export default function purchaseCards(cards) {
  console.log(cards);
  axios.post('/store/cart', {cards});
}
