/*
 * @Author: your name
 * @Date: 2021-08-27 09:38:08
 * @LastEditTime: 2021-09-13 09:28:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/album/Tab.tsx
 */

import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  LogBox,
} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {SceneRendererProps, TabBar, TabView} from 'react-native-tab-view';
import {IProgram} from '@/models/album';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import Introduction from './Introduction';
import List from './List';

interface IRoute {
  key: string;
  title: string;
}

interface IState {
  routes: IRoute[];
  index: number;
}

export interface ITabProps {
  panRef: React.RefObject<PanGestureHandler>;
  tapRef: React.RefObject<TapGestureHandler>;
  nativeRef: React.RefObject<NativeViewGestureHandler>;
  scrollDrag: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemPress: (data: IProgram, index: number) => void;
}

class Tab extends React.Component<ITabProps, IState> {
  state = {
    routes: [
      {key: 'introduction', title: '简介'},
      {key: 'albums', title: '节目'},
    ],
    index: 1,
  };
  onIndexChange = (index: number) => {
    // console.log('index:', index);
    this.setState({
      index: index,
    });
  };
  renderScreen = ({route}: {route: IRoute}) => {
    const {panRef, tapRef, nativeRef, scrollDrag, onItemPress} = this.props;
    switch (route.key) {
      case 'introduction':
        return <Introduction />;
      case 'albums':
        return (
          <List
            scrollDrag={scrollDrag}
            panRef={panRef}
            tapRef={tapRef}
            nativeRef={nativeRef}
            onItemPress={onItemPress}
          />
        );
    }
  };
  renderTabBar = (props: SceneRendererProps & {navigationState: IState}) => {
    return (
      <TabBar
        labelStyle={styles.labelText}
        {...props}
        scrollEnabled
        style={styles.tabbar}
        tabStyle={styles.tabStyle}
        indicatorStyle={styles.indicator}
      />
    );
  };
  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onIndexChange}
        renderScene={this.renderScreen}
        renderTabBar={this.renderTabBar}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 80,
  },
  labelText: {
    color: '#333',
  },
  tabbar: {
    backgroundColor: '#ccc',
    ...Platform.select({
      android: {
        elevation: 0,
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
    }),
  },
  indicator: {
    backgroundColor: '#eb6d48',
    // borderLeftWidth: 20,
    // borderRightWidth: 20,
    borderColor: '#fff',
  },
});

export default Tab;
