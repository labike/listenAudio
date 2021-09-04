/*
 * @Author: your name
 * @Date: 2021-08-18 09:36:56
 * @LastEditTime: 2021-08-18 09:36:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/navigators/BottomTabs.tsx
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {RootStackNavigation, RootStackParamsList} from '.';
import IconFont from '@/assets/iconfont';
import HomeTabs from './HomeTabs';
import Play from '@/pages/views/Play';

export type BottomTabParamList = {
  HomeTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
  Play: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type Route = RouteProp<RootStackParamsList, 'BottomTabs'>;
// & {
//   state?: TabNavigationState<RootStackParamsList>;
// };

interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}

function getHeaderTitle(routeName: string) {
  // const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTabs';
  // route.state
  //   ? route.state.routes[route.state.index].name
  //   : route.params?.screen || 'Home';

  switch (routeName) {
    case 'Home':
      return '首页';
    case 'Listen':
      return '我听';
    case 'Found':
      return '发现';
    case 'Account':
      return '我的';
    default:
      return '首页';
  }
}

class BottomTabs extends React.Component<IProps> {
  setOptions() {
    const {navigation, route} = this.props;
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTabs';
    if (routeName === 'HomeTabs') {
      navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
      });
    } else {
      navigation.setOptions({
        headerTransparent: false,
        headerTitle: getHeaderTitle(routeName),
      });
    }
  }
  componentDidMount() {
    this.setOptions();
  }
  componentDidUpdate() {
    this.setOptions();
  }
  render() {
    return (
      <Tab.Navigator tabBarOptions={{activeTintColor: '#f86442'}}>
        <Tab.Screen
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconhome" size={size} color={color} />
            ),
          }}
          name="HomeTabs"
          component={HomeTabs}
        />
        <Tab.Screen
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconlisten" size={size} color={color} />
            ),
          }}
          name="Listen"
          component={Listen}
        />
        <Tab.Screen
          options={({navigation}) => ({
            tabBarButton: () => {
              return <Play onPress={() => navigation.navigate('Detail')} />;
            },
          })}
          name="Play"
          component={Play}
        />
        <Tab.Screen
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconfaxian" size={size} color={color} />
            ),
          }}
          name="Found"
          component={Found}
        />
        <Tab.Screen
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <IconFont name="iconuser" size={size} color={color} />
            ),
          }}
          name="Account"
          component={Account}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
