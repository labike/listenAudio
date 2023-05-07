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
import {RootSiblingParent} from 'react-native-root-siblings';
import {enableScreens} from 'react-native-screens';

import store from '@/config/dva';
import Navigator from '@/navigators/index';
import '@/config/http';

enableScreens();

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <Navigator />
        </RootSiblingParent>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
