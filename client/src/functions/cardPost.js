import axios from 'axios';

export default async function postCard (state, history) {
  const res = await axios.post('/store', {state});
  history.push('/store');
}
