import {Model, Effect} from 'dva-core-ts';
import axios from 'axios';

const FOUND_URL = '/found/list';

export interface IFound {
  id: string;
  title: string;
  videoUrl: string;
}

interface FoundModel extends Model {
  name: 'found';
  effects: {
    fetchFound: Effect;
  };
}

const foundModel: FoundModel = {
  namespace: 'found',
  state: {},
  effects: {
    *fetchFound({cb}, {call}) {
      const {data} = yield call(axios.get, FOUND_URL);
      if (typeof cb === 'function') {
        cb(data);
      }
    },
  },
};

export default foundModel;
