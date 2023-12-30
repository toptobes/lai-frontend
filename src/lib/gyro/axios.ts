import axios from 'axios';
import { DUMMY_CREDENTIALS } from '~/lib/prelude';

export const axiosClient = axios.create({
  headers: { 'Authorization': DUMMY_CREDENTIALS },
  baseURL: 'https://gyro-405519.uc.r.appspot.com/'
});
