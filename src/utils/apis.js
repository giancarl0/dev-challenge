import axios from 'axios';

export const reqresApi = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: { Accept: 'application/json' },
});
