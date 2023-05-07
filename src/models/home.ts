/*
 * @Author: your name
 * @Date: 2021-08-18 11:49:11
 * @LastEditTime: 2021-08-20 10:27:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/models/home.ts
 */
import axios from 'axios';
import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {RootState} from '.';

const CAROUSEL_URL = '/carousel';
const GUESS_URL = '/guess';
const CHANNEL_URL = '/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [string, string];
}

export interface IGuess {
  id: string;
  title: string;
  image: string;
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface IPagination {
  current: number;
  total: number;
  hasMore: boolean;
}

export interface HomeState {
  carousel: ICarousel[];
  activeCarouselIndex: number;
  gradientVisible: boolean;
  guess: IGuess[];
  channel: IChannel[];
  pagination: IPagination;
}

interface HomeModel extends Model {
  namespace: 'home';
  state: HomeState;
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
    fetchChannel: Effect;
  };
}

const initialState: HomeState = {
  carousel: [],
  activeCarouselIndex: 0,
  gradientVisible: true,
  guess: [],
  channel: [],
  pagination: {
    current: 1,
    total: 0,
    hasMore: true,
  },
};

// function delay(timeout: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, timeout);
//   });
// }

const homeModel: HomeModel = {
  namespace: 'home',
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
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      yield put({
        type: 'setState',
        payload: {
          carousel: data,
        },
      });
    },
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    *fetchChannel({cb, payload}, {call, put, select}) {
      const {channel, pagination} = yield select(
        (state: RootState) => state.home,
      );

      let page = 1;
      if (payload && payload.loadMore) {
        page = pagination.current + 1;
      }

      const {data} = yield call(axios.get, CHANNEL_URL, {
        params: {
          page,
        },
      });

      let newChannel = data.results;
      if (payload && payload.loadMore) {
        newChannel = channel.concat(newChannel);
      }

      yield put({
        type: 'setState',
        payload: {
          channel: newChannel,
          pagination: {
            current: data.pagination,
            total: data.pagination.total,
            hasMore: newChannel.length < data.pagination.total,
          },
        },
      });
      if (typeof cb === 'function') {
        cb();
      }
    },
  },
};

export default homeModel;
