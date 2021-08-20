/*
 * @Author: your name
 * @Date: 2021-08-17 17:44:49
 * @LastEditTime: 2021-08-20 10:58:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Home.tsx
 */
import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

import {RootStackNavigation} from '@/navigators/index';
import Carousel, {slideHeight} from './Carousel';
import Guess from './Guess';
import {IChannel} from '@/models/home';
import ChannelItem from './ChannelItem';

const mapStateToProps = ({home, loading}: RootState) => ({
  carousel: home.carousel,
  channel: home.channel,
  hasMore: home.pagination.hasMore,
  gradientVisible: home.gradientVisible,
  loading: loading.effects['home/fetchChannel'],
});

const connector = connect(mapStateToProps);

type Modelstate = ConnectedProps<typeof connector>;

interface IState {
  refreshing: boolean;
}

interface IProps extends Modelstate {
  navigation: RootStackNavigation;
}

class Home extends React.Component<IProps, IState> {
  state = {
    refreshing: false,
  };
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchCarousels',
    });
    dispatch({
      type: 'home/fetchChannel',
    });
  }
  onPress = (data: IChannel) => {
    console.log(data);
  };
  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.onPress} />;
  };
  get header() {
    return (
      <View>
        <Carousel />
        <View style={styles.guessBg}>
          <Guess />
        </View>
      </View>
    );
  }
  get footer() {
    const {hasMore, loading, channel} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>------我是有底线的------</Text>
        </View>
      );
    }
    if (loading && hasMore && channel.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
  }
  get empty() {
    const {loading} = this.props;
    if (loading) return;
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  }
  getKey = (item: IChannel) => {
    return item.id;
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    const {dispatch} = this.props;
    dispatch({
      type: 'home/fetchChannel',
      cb: () => {
        this.setState({
          refreshing: false,
        });
      },
    });
  };
  onEndRefresh = () => {
    const {dispatch, loading, hasMore} = this.props;
    if (loading || !hasMore) return;
    dispatch({
      type: 'home/fetchChannel',
      payload: {
        loadMore: true,
      },
    });
  };
  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offsetY < slideHeight;
    const {dispatch, gradientVisible} = this.props;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };
  render() {
    const {channel} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channel}
        renderItem={this.renderItem}
        keyExtractor={this.getKey}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onEndReached={this.onEndRefresh}
        onEndReachedThreshold={0.2}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  guessBg: {
    backgroundColor: '#fff',
  },
});

export default connector(Home);
