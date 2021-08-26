/*
 * @Author: your name
 * @Date: 2021-08-21 09:52:07
 * @LastEditTime: 2021-08-26 09:39:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Category/index.tsx
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
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

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  myCategorys: ICategory[];
}

const fixedItems = [0, 1];

class Category extends React.Component<IProps, IState> {
  state = {
    myCategorys: this.props.myCategorys,
  };
  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={this.onSubmit} />,
    });
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
      },
    });
  }
  // constructor(props: IProps) {
  //   super(props);
  //   props.navigation.setParams({
  //     title: '编辑',
  //   });
  //   props.route.params.title;
  // }
  onSubmit = () => {
    const {dispatch, navigation, isEdit} = this.props;
    const {myCategorys} = this.state;
    dispatch({
      type: 'category/toggle',
      payload: {
        myCategorys,
      },
    });
    if (isEdit) {
      navigation.goBack();
    }
  };
  renderItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
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
  longPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };
  onPress = (item: ICategory, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategorys} = this.state;
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled) return;
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategorys: myCategorys.filter(
            selectedItem => selectedItem.id !== item.id,
          ),
        });
      } else {
        this.setState({
          myCategorys: myCategorys.concat([item]),
        });
      }
    }
  };
  renderUnSelectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this.onPress(item, index, false)}
        onLongPress={this.longPress}>
        <Item data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  };
  onDataChange = (data: ICategory[]) => {
    this.setState({
      myCategorys: data,
    });
  };
  onClickItem = (data: ICategory[], item: ICategory) => {
    this.onPress(item, data.indexOf(item), true);
  };
  render() {
    const {categorys, isEdit} = this.props;
    const {myCategorys} = this.state;
    const classifyGroup = _.groupBy(categorys, item => item.classify);
    return (
      <View style={styles.container}>
        <Text style={styles.classifyName}>我的分类</Text>
        <View style={styles.classifyView}>
          <DragSortableView
            dataSource={myCategorys}
            renderItem={this.renderItem}
            sortable={isEdit}
            keyExtractor={item => item.id}
            onDataChange={this.onDataChange}
            parentWidth={parentWidth}
            childrenWidth={itemWidth}
            childrenHeight={itemHeight}
            marginChildrenTop={margin}
            onClickItem={this.onClickItem}
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
                    return this.renderUnSelectedItem(item, index);
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
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

export default connector(Category);
