/*
 * @Author: your name
 * @Date: 2021-08-18 09:42:44
 * @LastEditTime: 2021-09-06 11:21:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Listen.tsx
 */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Image,
} from 'react-native';

import realm, {IProgram} from '@/config/realm';
import IconFont from '@/assets/iconfont';
import {formatTime} from '@/utils/index';
import Touchable from '@/components/Touchable';

class Listen extends React.Component {
  del = (item: IProgram) => {
    realm.write(() => {
      const program = realm.objects('Program').filtered(`id='${item.id}'`);
      realm.delete(program);
      this.setState({});
    });
  };
  renderItem = ({item}: ListRenderItemInfo<IProgram>) => {
    return (
      <View style={styles.item}>
        <Image source={{uri: item.thumbnailUrl}} style={styles.img} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.bottom}>
            <IconFont name="icontime" size={14} color="#999" />
            <Text style={styles.text}>{formatTime(item.duration)}</Text>
            {/* <Text style={styles.rate}>已播: {item.rate}%</Text> */}
          </View>
        </View>
        <Touchable
          style={styles.delBtn}
          onPress={() => {
            this.del(item);
          }}>
          <IconFont name="icondelete" size={20} />
        </Touchable>
      </View>
    );
  };
  render() {
    const programs = realm.objects<IProgram>('Program');
    return <FlatList data={programs} renderItem={this.renderItem} />;
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  img: {
    width: 65,
    height: 65,
    borderRadius: 3,
    margin: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    color: '#999',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#999',
    marginLeft: 5,
  },
  rate: {
    color: '#f6a624',
    marginLeft: 20,
  },
  delBtn: {
    justifyContent: 'center',
    padding: 10,
  },
});

export default Listen;
