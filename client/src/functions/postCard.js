import axios from 'axios';

export default async function postCard(card, history) {
  await axios.post('/store', {card});
  history.push('/app/store');
}
