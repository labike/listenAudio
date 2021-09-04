/*
 * @Author: your name
 * @Date: 2021-08-19 09:58:42
 * @LastEditTime: 2021-08-19 09:58:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Home/Guess.tsx
 */
import React from 'react';
import {View, StyleSheet, FlatList, Text, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '@/models/index';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';

const mapStateToProps = ({home}: RootState) => {
  return {
    guess: home.guess,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  namespace: string;
  goAlbum: (item: IGuess) => void;
}

class Guess extends React.Component<IProps> {
  componentDidMount() {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchGuess',
    });
  }
  renderItem = ({item}: {item: IGuess}) => {
    const {goAlbum} = this.props;
    return (
      <Touchable
        onPress={() => {
          goAlbum(item);
        }}
        style={styles.item}>
        <Image source={{uri: item.image}} style={styles.img} />
        <Text numberOfLines={2}>{item.title}</Text>
      </Touchable>
    );
  };
  repalceAll = () => {};
  render() {
    const {guess} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRight}>
            <IconFont name="iconxihuan" />
            <Text style={styles.headerTitle}>猜你喜欢</Text>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.moreTitle}>更多</Text>
            <IconFont name="iconmore" size={14} />
          </View>
        </View>
        <FlatList
          style={styles.list}
          numColumns={3}
          data={guess}
          renderItem={this.renderItem}
        />
        <Touchable onPress={this.repalceAll} style={styles.changeGuess}>
          <Text>换一批</Text>
          <IconFont name="iconhuanyipi" />
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  item: {
    flex: 1,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  img: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 5,
    color: '#333',
  },
  headerLeft: {
    flexDirection: 'row',
  },
  moreTitle: {
    color: '#6f6f6f',
  },
  changeGuess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  list: {
    padding: 10,
  },
});

export default connector(Guess);
