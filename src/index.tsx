/*
 * @Author: your name
 * @Date: 2021-08-17 16:05:21
 * @LastEditTime: 2021-08-17 16:07:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/index.tsx
 */
import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import store from '@/config/dva';
import Navigator from '@/navigators/index';
import '@/config/http';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
