import axios from 'axios';

axios.defaults.baseURL = 'https://api.swppsprint.site/';
axios.interceptors.request.use(config => {
  config.headers = config.headers ?? {};
  const token = localStorage.getItem('token');
  if (token !== null) config.headers.Authorization = `Token ${token}`;
  return config;
});
