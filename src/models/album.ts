/*
 * @Author: your name
 * @Date: 2021-08-26 10:43:36
 * @LastEditTime: 2021-08-26 10:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/models/album.ts
 */
import axios from 'axios';
import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';

const ALBUM_URL = '/album/list';

// 节目
export interface IProgram {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  date: string;
}

// 作者
export interface IAuthor {
  name: string;
  avatar: string;
}

// 频道
export interface IAlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  introduction: string;
  author: IAuthor;
  list: IProgram[];
}

interface AlbumModel extends Model {
  namespace: 'album';
  state: IAlbumModelState;
  reducers: {
    setState: Reducer<IAlbumModelState>;
  };
  effects: {
    fetchAlbum: Effect;
  };
}

const initialState: IAlbumModelState = {
  id: '',
  thumbnailUrl: '',
  title: '',
  summary: '',
  list: [],
  introduction: '',
  author: {
    name: '',
    avatar: '',
  },
};

const albumModel: AlbumModel = {
  namespace: 'album',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchAlbum(_, {call, put}) {
      const {data} = yield call(axios.get, ALBUM_URL);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
};

export default albumModel;
