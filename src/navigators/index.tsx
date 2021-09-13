/*
 * @Author: your name
 * @Date: 2021-08-17 17:47:22
 * @LastEditTime: 2021-09-10 10:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/navigator/index.tsx
 */
import React from 'react';
import {
  NavigationContainer,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {Platform, StatusBar, StyleSheet, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import BottomTabs from './BottomTabs';
import Category from '@/pages/Category/index';
import Album from '@/pages/Album/index';
import Detail from '@/pages/Detail';
import IconFont from '@/assets/iconfont';
import PlayView from '@/pages/views/PlayView';
import {getActiveRouteName, naviogationRef} from '@/utils/index';
import Login from '@/pages/Login';

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

function RootStackScreen() {
  return (
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
      <Stack.Screen options={getAlbumOptions} name="Album" component={Album} />
    </Stack.Navigator>
  );
}

export type ModalStackParamList = {
  Root: undefined;
  Detail: {
    id: string;
  };
  Login: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();
export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;
function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerBackTitleVisible: false,
        headerTintColor: '#333',
      }}
      mode="modal"
      headerMode="screen">
      <ModalStack.Screen
        options={{headerShown: false}}
        name="Root"
        component={RootStackScreen}
      />
      <ModalStack.Screen
        options={{
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {
            backgroundColor: '#807c66',
          },
          headerBackImage: ({tintColor}) => (
            <IconFont
              name="iconjiantou"
              size={20}
              color={tintColor}
              style={styles.headerBackImg}
            />
          ),
        }}
        name="Detail"
        component={Detail}
      />
      <ModalStack.Screen
        name="Login"
        component={Login}
        options={{headerTitle: '登录'}}
      />
    </ModalStack.Navigator>
  );
}

class Navigator extends React.Component {
  state = {
    routeName: 'Root',
  };
  componentDidMount() {
    SplashScreen.hide();
  }
  stateChange = (state: NavigationState | undefined) => {
    if (typeof state !== 'undefined') {
      const routeName = getActiveRouteName(state);
      this.setState({
        routeName,
      });
    }
  };
  render() {
    const {routeName} = this.state;
    return (
      <NavigationContainer
        ref={naviogationRef}
        onStateChange={this.stateChange}>
        <ModalStackScreen />
        <PlayView routeName={routeName} />
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
  headerBackImg: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});

export default Navigator;
