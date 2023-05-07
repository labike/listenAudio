import {Effect, EffectsCommandMap, EffectWithType, Model} from 'dva-core-ts';
import axios from 'axios';
import {Reducer} from 'redux';
import {
  getCurrentTime,
  getDuration,
  init,
  pause,
  play,
  stop,
} from '@/config/sound';
import {RootState} from '.';
import {saveProgram} from '@/config/realm';

const PLAYER_URL = '/show';

export interface PlayerModelState {
  id: string;
  soundUrl: string;
  playState: string;
  currentTime: number;
  duration: number;
  previousId: string;
  nextId: string;
  sounds: {id: string; title: string}[];
  title: string;
  thumbnailUrl: string;
}

export interface PlayerModel extends Model {
  namespace: 'player';
  state: PlayerModelState;
  reducers: {
    setState: Reducer<PlayerModelState>;
  };
  effects: {
    fetchPlayer: Effect;
    play: Effect;
    pause: Effect;
    watcherCurrentTime: EffectWithType;
    previuos: Effect;
    next: Effect;
  };
}

const initialState: PlayerModelState = {
  id: '',
  soundUrl: '',
  playState: 'paused',
  currentTime: 0,
  duration: 0,
  previousId: '',
  nextId: '',
  sounds: [],
  title: '',
  thumbnailUrl: '',
};

const delay = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

function* currentTime({call, put}: EffectsCommandMap) {
  while (true) {
    yield call(delay, 1000);
    const curTime: number = yield call(getCurrentTime);
    yield put({
      type: 'setState',
      payload: {
        currentTime: curTime,
      },
    });
  }
}

const playerModel: PlayerModel = {
  namespace: 'player',
  state: initialState,
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchPlayer({payload}, {call, put, select}) {
      yield call(stop);
      const {data} = yield call(axios.get, PLAYER_URL, {
        params: {id: payload.id},
      });
      yield call(init, data.soundUrl);
      yield put({
        type: 'setState',
        payload: {
          id: payload.id,
          soundUrl: data.soundUrl,
          duration: getDuration(),
        },
      });
      yield put({
        type: 'play',
      });
      const {id, title, thumbnailUrl, currentTime}: PlayerModelState =
        yield select(({player}: RootState) => player);
      saveProgram({
        id,
        title,
        thumbnailUrl,
        currentTime,
        duration: getDuration(),
      });
    },
    *play(_, {call, put}) {
      yield put({
        type: 'setState',
        payload: {
          playState: 'playing',
        },
      });
      try {
        yield call(play);
      } catch (error) {
        return error;
      }
      yield put({
        type: 'setState',
        payload: {
          playState: 'pause',
        },
      });
    },
    *pause(_, {call, put, select}) {
      yield call(pause);
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
        },
      });
      const {id, currentTime}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      saveProgram({id, currentTime});
    },
    watcherCurrentTime: [
      function* (sagaEffects) {
        const {call, take, race} = sagaEffects;
        while (true) {
          yield take('play');
          yield race([call(currentTime, sagaEffects), take('pause')]);
        }
      },
      {type: 'watcher'},
    ],
    *previuos(_, {put, select}) {
      const {id, sounds}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      const index = sounds.findIndex(item => item.id === id);
      const currentIndex = index - 1;
      const currentItem = sounds[currentIndex];
      const previuosItem = sounds[currentIndex - 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
          id: currentItem.id,
          title: currentItem.title,
          previuosId: previuosItem ? previuosItem.id : '',
          nextId: id,
        },
      });
      yield put({
        type: 'fetchPlayer',
        payload: {
          id: currentItem.id,
        },
      });
    },
    *next(_, {put, select}) {
      const {id, sounds}: PlayerModelState = yield select(
        ({player}: RootState) => player,
      );
      const index = sounds.findIndex(item => item.id === id);
      const currentIndex = index + 1;
      const currentItem = sounds[currentIndex];
      const nextItem = sounds[currentIndex + 1];
      yield put({
        type: 'setState',
        payload: {
          playState: 'paused',
          id: currentItem.id,
          title: currentItem.title,
          previuosId: id,
          nextId: nextItem ? nextItem.id : '',
        },
      });
      yield put({
        type: 'fetchPlayer',
        payload: {
          id: currentItem.id,
        },
      });
    },
  },
};

export default playerModel;
