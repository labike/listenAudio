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
import album from './album';
import home from './home';
import player from './player';
import found from './found';
import user from './user';

const models = [home, category, album, player, found, user];

export type RootState = {
  home: typeof home.state;
  loading: DvaLoadingState;
  category: typeof category.state;
  album: typeof album.state;
  player: typeof player.state;
  user: typeof user.state;
} & {
  [key: string]: typeof home.state;
};

export default models;
