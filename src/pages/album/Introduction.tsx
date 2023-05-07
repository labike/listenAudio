/*
 * @Author: your name
 * @Date: 2021-08-27 09:49:36
 * @LastEditTime: 2021-08-27 09:50:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/album/Introduction.tsx
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({album}: RootState) => {
  return {
    introduction: album.introduction,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class Introduction extends React.Component<IProps> {
  render() {
    const {introduction} = this.props;
    return (
      <View style={styles.container}>
        <Text>{introduction}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default connector(Introduction);
