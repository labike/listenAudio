/*
 * @Author: your name
 * @Date: 2021-08-18 15:40:04
 * @LastEditTime: 2021-09-25 15:46:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/navigators/HomeTabs.tsx
 */
import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import ViewPagerAdapter from 'react-native-tab-view-viewpager-adapter';
import Home from '@/pages/Home';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import {StyleSheet} from 'react-native';
import {RootState} from '../models';
import {connect, ConnectedProps, useSelector} from 'react-redux';
import {ICategory} from '@/models/category';
import {createHomeModel} from '@/config/dva';

export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const mapStateToProps = ({category}: RootState) => {
  return category.myCategorys;
};

// const connector = connect(mapStateToProps);

// type ModelState = ConnectedProps<typeof connector>;

// interface IProps extends ModelState {}

function HomeTabs() {
  const myCategorys = useSelector(mapStateToProps);
  const renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };
  const renderScreen = (item: ICategory) => {
    createHomeModel(item.id);
    return (
      <Tab.Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{tabBarLabel: item.name}}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      lazy
      tabBar={renderTabBar}
      pager={props => <ViewPagerAdapter {...props} />}
      sceneContainerStyle={styles.selfContainer}
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 80,
        },
        indicatorStyle: {
          height: 4,
          width: 20,
          marginLeft: 30,
          borderRadius: 2,
          backgroundColor: '#f86442',
        },
        activeTintColor: '#f86442',
        inactiveTintColor: '#333',
      }}>
      {myCategorys.map(renderScreen)}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  selfContainer: {
    backgroundColor: 'transparent',
  },
});

export default HomeTabs;
