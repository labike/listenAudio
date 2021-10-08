/*
 * @Author: your name
 * @Date: 2021-08-27 09:38:08
 * @LastEditTime: 2021-09-14 10:00:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/album/Tab.tsx
 */

import React, {useState} from 'react';
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

function Tab(props: ITabProps) {
  const [routes] = useState([
    {key: 'introduction', title: '简介'},
    {key: 'albums', title: '节目'},
  ]);
  const [index, setIndex] = useState(1);

  const onIndexChange = (index: number) => {
    console.log('index:', index);
    setIndex(index);
  };
  const renderScreen = ({route}: {route: IRoute}) => {
    const {panRef, tapRef, nativeRef, scrollDrag, onItemPress} = props;
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
  const renderTabBar = (
    props: SceneRendererProps & {navigationState: IState},
  ) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        style={styles.tabbar}
        tabStyle={styles.tabStyle}
        labelStyle={styles.labelText}
        indicatorStyle={styles.indicator}
      />
    );
  };
  return (
    <TabView
      navigationState={{routes, index}}
      onIndexChange={onIndexChange}
      renderScene={renderScreen}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    width: 80,
  },
  labelText: {
    color: '#333',
  },
  tabbar: {
    backgroundColor: '#fff',
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
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderColor: '#fff',
  },
});

export default Tab;
