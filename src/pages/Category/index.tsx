/*
 * @Author: your name
 * @Date: 2021-08-21 09:52:07
 * @LastEditTime: 2021-08-26 10:22:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Category/index.tsx
 */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import {RootState} from '@/models/index';
import {connect, ConnectedProps, shallowEqual, useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {DragSortableView} from 'react-native-drag-sort';

import {ICategory} from '@/models/category';
import Item, {itemHeight, itemWidth, margin, parentWidth} from './item';
import {RootStackNavigation} from '@/navigators/index';
import HeaderRightBtn from './HeaderRightBtn';
import Touchable from '@/components/Touchable';

const mapStateToProps = ({category}: RootState) => {
  return {
    myCategorys: category.myCategorys,
    categorys: category.categorys,
    isEdit: category.isEdit,
  };
};

// const connector = connect(mapStateToProps);

// type ModelState = ConnectedProps<typeof connector>;

interface IProps {
  navigation: RootStackNavigation;
}

// interface IState {
//   myCategorys: ICategory[];
// }

const fixedItems = [0, 1];

function Category(props: IProps) {
  const {myCategorys, categorys, isEdit} = useSelector(mapStateToProps, shallowEqual);
  const [_myCategorys, setMyCategorys] = useState(myCategorys);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const {navigation} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const onSubmit = () => {
      dispatch({
        type: 'category/toggle',
        payload: {
          myCategorys: _myCategorys,
        },
      });
      if (isEdit) {
        navigation.goBack();
      }
    };
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
    });
  }, [dispatch, navigation, isEdit, _myCategorys]);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'category/setState',
        payload: {
          isEdit: false,
        },
      });
    };
  }, [dispatch]);

  const renderItem = (item: ICategory, index: number) => {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Item
        key={item.id}
        data={item}
        disabled={disabled}
        isEdit={isEdit}
        selected
      />
    );
  };

  const longPress = () => {
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };

  const onPress = (item: ICategory, index: number, selected: boolean) => {
    if (isEdit) {
      if (selected) {
        setMyCategorys(
          myCategorys.filter(selectedItem => selectedItem.id !== item.id),
        );
      } else {
        setMyCategorys(myCategorys.concat([item]));
      }
    }
  };

  const renderUnSelectedItem = (item: ICategory, index: number) => {
    return (
      <Touchable
        key={item.id}
        onPress={() => onPress(item, index, false)}
        onLongPress={longPress}>
        <Item data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  };
  
  const onDataChange = (data: ICategory[]) => {
    setMyCategorys(data);
  };
  
  const onClickItem = (data: ICategory[], item: ICategory) => {
    const disabled = fixedItems.indexOf(data.indexOf(item)) > -1;
    if (disabled) return;
    onPress(item, data.indexOf(item), true);
  };

  const classifyGroup = _.groupBy(categorys, item => item.classify);
  
  return (
    <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        <DragSortableView
          dataSource={myCategorys}
          renderItem={renderItem}
          sortable={isEdit}
          keyExtractor={item => item.id}
          onDataChange={onDataChange}
          parentWidth={parentWidth}
          childrenWidth={itemWidth}
          childrenHeight={itemHeight}
          marginChildrenTop={margin}
          onClickItem={onClickItem}
          onDragStart={() => {
            setScrollEnabled(false);
          }}
          onDragEnd={() => {
            setScrollEnabled(true);
          }}
        />
      </View>
      <View>
        {Object.keys(classifyGroup).map(classify => {
          return (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {classifyGroup[classify].map((item, index) => {
                  if (
                    myCategorys.find(
                      selectedItem => selectedItem.id === item.id,
                    )
                  ) {
                    return null;
                  }
                  return renderUnSelectedItem(item, index);
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f6',
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
});

export default Category;
