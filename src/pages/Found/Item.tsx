/*
 * @Author: your name
 * @Date: 2021-09-06 19:37:28
 * @LastEditTime: 2021-09-07 09:05:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Found/Item.tsx
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import VideoControls from 'react-native-video-custom-controls';

import {IFound} from '@/models/found';

interface IProps {
  data: IFound;
  setCurrentId: (id: string) => void;
  paused: boolean;
}

class Item extends React.Component<IProps> {
  onPlay = () => {
    const {data, setCurrentId} = this.props;
    setCurrentId(data.id);
  };
  onPause = () => {
    const {setCurrentId} = this.props;
    setCurrentId('');
  };
  render() {
    const {data, paused} = this.props;
    return (
      <View style={styles.itemContent}>
        <Text style={styles.title}>{data.title}</Text>
        <VideoControls
          paused={paused}
          source={{uri: data.videoUrl}}
          style={styles.video}
          onPlay={this.onPlay}
          onPause={this.onPause}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    height: 220,
  },
  itemContent: {
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 15,
    marginLeft: 5,
  },
});

export default Item;
