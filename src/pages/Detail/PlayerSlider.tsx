/*
 * @Author: your name
 * @Date: 2021-09-02 10:48:46
 * @LastEditTime: 2021-09-04 09:07:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Detail/PlayerSlider.tsx
 */
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider from 'react-native-slider-x';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {formatTime} from '@/utils/index';

const mapStateToProps = ({player}: RootState) => {
  return {
    currentTime: player.currentTime,
    duration: player.duration,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class PlayerSider extends React.Component<IProps> {
  renderThumb = () => {
    const {currentTime, duration} = this.props;
    return (
      <View>
        <Text style={styles.text}>
          {formatTime(currentTime)}/{formatTime(duration)}
        </Text>
      </View>
    );
  };
  render() {
    const {currentTime, duration} = this.props;
    return (
      <View style={styles.container}>
        <Slider
          value={currentTime}
          maximumValue={duration}
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          minimumTrackTintColor="white"
          renderThumb={this.renderThumb}
          thumbStyle={styles.thumb}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  thumb: {
    width: 76,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 10,
  },
  slider: {
    backgroundColor: '#fff',
  },
});

export default connector(PlayerSider);
