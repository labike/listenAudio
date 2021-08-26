import {NavigationState} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percent: number) {
  const value = (percent * viewportWidth) / 100;
  return Math.round(value);
}

function hp(percent: number) {
  const value = (percent * viewportHeight) / 100;
  return Math.round(value);
}

function getActiveRouteName(state: NavigationState) {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
}

export {viewportHeight, viewportWidth, wp, hp, getActiveRouteName};
