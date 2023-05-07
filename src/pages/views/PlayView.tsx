import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import {navigate, viewportWidth} from '@/utils/index';
import Play from './Play';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';

const mapStateToProps = ({player}: RootState) => {
  return {
    playState: player.playState,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  routeName: string;
}

class PlayView extends React.Component<IProps> {
  onPress = () => {
    navigate('Detail');
  };
  render() {
    const {routeName, playState} = this.props;
    if (
      routeName === 'Root' ||
      routeName === 'Detail' ||
      playState === 'paused'
    ) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Play onPress={this.onPress} />
      </View>
    );
  }
}

const width = 50;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: width + 20,
    bottom: 0,
    left: (viewportWidth - width) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 4,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.85,
        shadowRadius: 5,
        shadowOffset: {
          width: StyleSheet.hairlineWidth,
          height: StyleSheet.hairlineWidth,
        },
      },
    }),
  },
});

export default connector(PlayView);
