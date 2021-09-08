/*
 * @Author: your name
 * @Date: 2021-09-07 09:13:42
 * @LastEditTime: 2021-09-07 09:13:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/models/my.ts
 */
import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import axios from 'axios';
import {Reducer} from 'redux';
import {goBack} from '@/utils/index';
import storage, {load} from '@/config/storage';
import Toast from 'react-native-root-toast';

const USER_URL = '/login';

export interface IUser {
  name: string;
  avatar: string;
}

export interface UserModelState {
  user?: IUser;
}

interface UserModel extends Model {
  namespace: 'user';
  state: UserModelState;
  reducers: {
    setState: Reducer<UserModelState>;
  };
  effects: {
    login: Effect;
    logout: Effect;
    loadStorage: Effect;
  };
  subscriptions: SubscriptionsMapObject;
}

const initialState = {
  user: undefined,
};

const userModel: UserModel = {
  namespace: 'user',
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
    *login({payload}, {call, put}) {
      const {data, status, msg} = yield call(axios.post, USER_URL, payload);
      if (status === 300) {
        yield put({
          type: 'setState',
          payload: {
            user: data,
          },
        });
        storage.save({
          key: 'user',
          data,
        });
        goBack();
      } else {
        Toast.show(msg, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
        });
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'setState',
        payload: {
          user: undefined,
        },
      });
      storage.save({
        key: 'user',
        data: null,
      });
    },
    *loadStorage(_, {call, put}) {
      try {
        const user = yield call(load, {key: 'user'});
        yield put({
          type: 'setState',
          payload: {
            user,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
  subscriptions: {
    setUp({dispatch}) {
      dispatch({
        type: 'loadStorage',
      });
    },
  },
};

export default userModel;
