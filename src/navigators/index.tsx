/*
 * @Author: your name
 * @Date: 2021-08-17 17:47:22
 * @LastEditTime: 2021-08-21 09:54:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/navigator/index.tsx
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Platform, StatusBar, StyleSheet} from 'react-native';

import Detail from '@/pages/Detail';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category/index';

export type RootStackParamsList = {
  BottomTabs: undefined;
  Category: undefined;
  Detail: {
    id: number;
  };
};

const Stack = createStackNavigator<RootStackParamsList>();

export type RootStackNavigation = StackNavigationProp<RootStackParamsList>;

class Navigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="float"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerBackTitleVisible: false,
            headerTintColor: '#333',
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight,
              },
            }),
            headerStyle: {
              ...Platform.select({
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth,
                },
              }),
            },
          }}>
          <Stack.Screen
            options={{headerTitle: '首页'}}
            name="BottomTabs"
            component={BottomTabs}
          />
          <Stack.Screen
            options={{
              headerTitle: '分类',
            }}
            name="Category"
            component={Category}
          />
          <Stack.Screen
            options={{headerTitle: '详情页'}}
            name="Detail"
            component={Detail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;
