/*
 * @Author: your name
 * @Date: 2021-08-27 09:51:05
 * @LastEditTime: 2021-08-30 09:28:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/album/List.tsx
 */
import React from 'react';
import {ListRenderItemInfo, Animated, StyleSheet} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '@/models/index';
import {IProgram} from '@/models/album';
import Item from './Item';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {ITabProps} from '../Tab';

const mapStateToProps = ({album}: RootState) => {
  return {
    list: album.list,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = ModelState & ITabProps;

class List extends React.Component<IProps> {
  onPress = (data: IProgram, index: number) => {
    const {onItemPress} = this.props;
    onItemPress(data, index);
  };
  renderItem = ({item, index}: ListRenderItemInfo<IProgram>) => {
    return <Item data={item} index={index} onPress={this.onPress} />;
  };
  renderKey = (item: IProgram) => {
    return item.id;
  };
  render() {
    const {list, panRef, tapRef, nativeRef, scrollDrag} = this.props;
    return (
      <NativeViewGestureHandler
        simultaneousHandlers={panRef}
        ref={nativeRef}
        waitFor={tapRef}>
        <Animated.FlatList
          style={styles.container}
          data={list}
          bounces={false}
          renderItem={this.renderItem}
          keyExtractor={this.renderKey}
          onScrollBeginDrag={scrollDrag}
          onScrollEndDrag={scrollDrag}
        />
      </NativeViewGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(List);
