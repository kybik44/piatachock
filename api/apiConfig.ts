import axios from 'axios';

const BASE_URL = 'https://admin-piatachok.by/wp-json';
const USER_API_KEY = 'ck_f35629a3a85382c6c597659e5193c33a588c7ccd';
const USER_SECRET_CODE = 'cs_97ebeccfa4f14a533e853a7cd1d5793d1da94c6a';

const apiClient = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: USER_API_KEY,
    password: USER_SECRET_CODE,
  },
});


export default apiClient;
