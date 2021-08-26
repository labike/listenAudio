/*
 * @Author: your name
 * @Date: 2021-08-18 13:39:44
 * @LastEditTime: 2021-08-21 09:51:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/models/index.ts
 */
import {DvaLoadingState} from 'dva-loading-ts';
import category from './category';
import home from './home';

const models = [home, category];

export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
  category: typeof category.state;
} & {
  [key: string]: typeof home.state;
};

export default models;
