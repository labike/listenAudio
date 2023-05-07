/*
 * @Author: your name
 * @Date: 2021-08-18 17:55:36
 * @LastEditTime: 2022-07-24 19:15:58
 * @LastEditors: labike ddmmy@hotmail.com
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/config/http.ts
 */
import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;

axios.interceptors.request.use(
  config => {
    config.headers = {
      icode: 'B70B17427DC0A3FB',
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
