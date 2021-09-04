/*
 * @Author: your name
 * @Date: 2021-08-19 10:24:45
 * @LastEditTime: 2021-08-24 10:16:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/components/Touchable.tsx
 */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const Touchable: React.FC<TouchableOpacityProps> = React.memo(({style, ...rest}) => {
    const touchableStyle = rest.disabled ? [style, styles.disabled] : style;
    return (
      <TouchableOpacity style={touchableStyle} activeOpacity={0.8} {...rest} />
    );
  },
);

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});

export default Touchable;
