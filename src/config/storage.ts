/*
 * @Author: your name
 * @Date: 2021-08-20 13:56:42
 * @LastEditTime: 2021-08-20 13:56:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/config/storage.ts
 */
import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCache: true,
  sync: {},
});

export const load = (params: LoadParams) => {
  return storage.load(params);
};

export default storage;
