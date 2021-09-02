/*
 * @Author: your name
 * @Date: 2021-08-23 20:57:28
 * @LastEditTime: 2021-08-27 09:12:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/index.d.ts
 */
declare module 'dva-model-extend' {
  import {Model} from 'dva-core-ts';
  export default function modelExtend(...model: Model[]): Model;
}

declare module '*.png';
