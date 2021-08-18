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

import Home from '@/pages/Home';
import Listen from '@/pages/Listen';
import Found from '@/pages/Found';
import Account from '@/pages/Account';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {RootStackNavigation, RootStackParamsList} from '.';

export type BottomTabParamList = {
  Home: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
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

function getHeaderTitle(route: Route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
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
  componentDidUpdate() {
    const {navigation, route} = this.props;
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
    });
  }
  render() {
    return (
      <Tab.Navigator tabBarOptions={{activeTintColor: '#f86442'}}>
        <Tab.Screen
          options={{tabBarLabel: '首页'}}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{tabBarLabel: '我听'}}
          name="Listen"
          component={Listen}
        />
        <Tab.Screen
          options={{tabBarLabel: '发现'}}
          name="Found"
          component={Found}
        />
        <Tab.Screen
          options={{tabBarLabel: '我的'}}
          name="Account"
          component={Account}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabs;
