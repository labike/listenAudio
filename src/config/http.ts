/*
 * @Author: your name
 * @Date: 2021-08-18 17:55:36
 * @LastEditTime: 2021-09-25 15:46:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/config/http.ts
 */
import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;

axios.interceptors.request.use(
  config => {
    config.headers = {
      icode: 'C1A769FAD9340C57',
    };
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    return Promise.reject(err);
  },
);
