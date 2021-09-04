import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Item from './Item';

export interface Msg {
  id: string;
  title: string;
}

export interface IBarrage extends Msg {
  trackIndex: number;
  isFree?: boolean;
}

interface IProps {
  data: Msg[];
  maxTrack: number;
  style?: StyleProp<ViewStyle>;
}

interface IState {
  data: Msg[];
  list: IBarrage[][];
}

function addBarrage(data: Msg[], maxTrack: number, list: IBarrage[][]) {
  for (let i = 0; i < data.length; i++) {
    const trackIndex = getTrackIndex(list, maxTrack);
    if (trackIndex < 0) {
      continue;
    }
    if (!list[trackIndex]) {
      list[trackIndex] = [];
    }
    const barrage = {
      ...data[i],
      trackIndex,
    };
    list[trackIndex].push(barrage);
  }
  return list;
}

/**
 * 获取弹幕轨道下标
 * @param list
 * @param maxTrack
 * @returns
 */
function getTrackIndex(list: IBarrage[][], maxTrack: number) {
  for (let i = 0; i < maxTrack; i++) {
    const barragesOfTrack = list[i];
    if (!barragesOfTrack || barragesOfTrack.length === 0) {
      return i;
    }
    const lastBarragesOfTrack = barragesOfTrack[barragesOfTrack.length - 1]
    if (lastBarragesOfTrack.isFree) {
      return i;
    }
  }
  return -1;
}

class Barrage extends React.Component<IProps, IState> {
  state = {
    data: this.props.data,
    list: [this.props.data.map(item => ({...item, trackIndex: 0}))],
  };

  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const {data, maxTrack} = nextProps;
    if (data !== prevState.data) {
      return {
        data,
        list: addBarrage(data, maxTrack, prevState.list),
      };
    }
    return null;
  }
  outside = (data: IBarrage) => {
    const {list} = this.state;
    const newList = list.slice();
    if (newList.length > 0) {
      const {trackIndex} = data;
      newList[trackIndex] = newList[trackIndex].filter(
        item => item.id !== data.id,
      );
      this.setState({
        list: newList,
      });
    }
  };
  renderItem = (item: IBarrage[]) => {
    return item.map(barrage => {
      return <Item data={barrage} key={barrage.id} outside={this.outside} />;
    });
  };
  render() {
    const {list} = this.state;
    const {style} = this.props;
    return (
      <View style={[styles.container, style]}>{list.map(this.renderItem)}</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default Barrage;
