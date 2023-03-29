import axios from 'axios';

import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

// const baseUrl = __IS_DEV__ ? 'http://localhost:8000/' : 'https://production.ru';

export const $api = axios.create({
  baseURL: __API__,
  // headers: {
  //   authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
  // },
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
  }
  return config;
});
