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
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../models';

import {RootStackNavigation} from '../navigators';

const mapStateToProps = ({home, loading}: RootState) => ({
  num: home.num,
  loading: loading.effects['home/asyncAdd'],
});

const connector = connect(mapStateToProps);

type Modelstate = ConnectedProps<typeof connector>;

interface IProps extends Modelstate {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps> {
  handleOnpress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 123,
    });
  };
  addOne = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/add',
      payload: {
        num: 10,
      },
    });
  };
  asyncAddOne = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/asyncAdd',
      payload: {
        num: 5,
      },
    });
  };
  render() {
    const {num} = this.props;
    return (
      <View>
        <Text>Home {num}</Text>
        <Button title="加" onPress={this.addOne} />
        <Button title="异步加" onPress={this.asyncAddOne} />
        <Button title="跳转到详情页" onPress={this.handleOnpress} />
      </View>
    );
  }
}

export default connector(Home);
