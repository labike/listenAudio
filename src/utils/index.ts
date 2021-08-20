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

export {viewportHeight, viewportWidth, wp, hp};
