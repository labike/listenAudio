/*
 * @Author: your name
 * @Date: 2021-08-17 17:47:22
 * @LastEditTime: 2021-08-21 09:54:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/navigator/index.tsx
 */
import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {Platform, StatusBar, StyleSheet, Animated} from 'react-native';

import BottomTabs from './BottomTabs';
import Category from '@/pages/Category/index';
import Album from '@/pages/album/index';

export type RootStackParamsList = {
  BottomTabs: undefined;
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value;
  };
};

const Stack = createStackNavigator<RootStackParamsList>();

export type RootStackNavigation = StackNavigationProp<RootStackParamsList>;

function getAlbumOptions({
  route,
}: {
  route: RouteProp<RootStackParamsList, 'Album'>;
}) {
  return {
    headerTitle: route.params.item.title,
    headerTransparent: true,
    headerTitleStyle: {
      opacity: route.params.opacity,
    },
    headerBackground: () => {
      return (
        <Animated.View
          style={[styles.headerBg, {opacity: route.params.opacity}]}
        />
      );
    },
  };
}

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
            options={getAlbumOptions}
            name="Album"
            component={Album}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  headerBg: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});

export default Navigator;
