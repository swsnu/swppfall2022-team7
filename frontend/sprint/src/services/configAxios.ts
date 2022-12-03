import axios from 'axios';
import { BASE_URL } from './api';

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(config => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem('token');
  if (token !== null) config.headers.Authorization = `Token ${token}`;
  return config;
});
