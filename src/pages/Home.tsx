/*
 * @Author: your name
 * @Date: 2021-08-17 17:44:49
 * @LastEditTime: 2021-08-18 09:24:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Home.tsx
 */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {RootStackNavigation} from '../navigators';

interface IProps {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  handleOnpress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 123,
    });
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button title="跳转到详情页" onPress={this.handleOnpress} />
      </View>
    );
  }
}

export default Home;
