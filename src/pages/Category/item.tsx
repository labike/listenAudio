/*
 * @Author: your name
 * @Date: 2021-08-23 09:41:30
 * @LastEditTime: 2021-08-24 09:33:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Category/item.tsx
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {ICategory} from '@/models/category';

export const parentWidth = viewportWidth - 10;
export const itemWidth = parentWidth / 4;
export const itemHeight = 48;
export const margin = 5;

interface IProps {
  data: ICategory;
  selected: boolean;
  isEdit: boolean;
  disabled?: boolean;
}

class Item extends React.Component<IProps> {
  render() {
    const {data, isEdit, selected, disabled} = this.props;
    return (
      <View style={styles.itemTag} key={data.id}>
        <View style={[styles.itemTagName, disabled && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disabled && (
            <View style={styles.icon}>
              <Text style={styles.iconText}>{selected ? '-' : '+'}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemTag: {
    width: itemWidth,
    height: itemHeight,
  },
  itemTagName: {
    flex: 1,
    backgroundColor: '#ffff',
    margin: margin,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  icon: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    backgroundColor: '#f86442',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  iconText: {
    color: '#fff',
    lineHeight: 15,
  },
  disabled: {
    backgroundColor: '#ccc',
  },
});

export default Item;
