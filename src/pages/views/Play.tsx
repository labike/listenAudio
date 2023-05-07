import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import Progress from './Progress';

const mapStateToProps = ({player}: RootState) => {
  return {
    thumbnailUrl: player.thumbnailUrl,
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onPress: () => void;
}

class Play extends React.Component<IProps> {
  ani = new Animated.Value(0);
  rotate: Animated.AnimatedInterpolation;
  timer: Animated.CompositeAnimation;

  constructor(props: IProps) {
    super(props);
    this.timer = Animated.loop(
      Animated.timing(this.ani, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {iterations: -1},
    );
    this.rotate = this.ani.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }
  componentDidMount() {
    const {playState} = this.props;
    if (playState === 'playing') {
      this.timer.start();
    }
  }
  componentDidUpdate() {
    const {playState} = this.props;
    if (playState === 'playing') {
      this.timer.start();
    } else if (playState === 'paused') {
      this.timer.stop();
    } else {
      return;
    }
  }
  onPress = () => {
    const {onPress, thumbnailUrl} = this.props;
    if (thumbnailUrl && onPress) {
      onPress();
    }
  };
  render() {
    const {thumbnailUrl} = this.props;
    return (
      <Touchable style={styles.play} onPress={this.onPress}>
        <Progress>
          <Animated.View
            style={{
              transform: [{rotate: this.rotate}],
            }}>
            {thumbnailUrl ? (
              <Animated.Image source={{uri: thumbnailUrl}} style={styles.img} />
            ) : (
              <IconFont name="iconbofang2" size={40} color="#ededed" />
            )}
          </Animated.View>
        </Progress>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  play: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
});

export default connector(Play);
