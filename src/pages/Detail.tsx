/*
 * @Author: your name
 * @Date: 2021-08-17 17:46:48
 * @LastEditTime: 2021-08-18 09:26:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Detail.tsx
 */
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamsList} from '../navigators';

interface IProps {
  route: RouteProp<RootStackParamsList, 'Detail'>;
}

class Detail extends React.Component<IProps> {
  render() {
    const {route} = this.props;
    return (
      <View>
        <Text>Detail</Text>
        <Text>{route.params.id}</Text>
      </View>
    );
  }
}

export default Detail;
