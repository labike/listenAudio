import React from 'react';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from '@/components/Touchable';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {getActiveRouteName} from '@/utils/index';

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state);
  const modelState = state[routeName];
  return {
    gradientVisible: modelState.gradientVisible,
    linearColors:
      modelState.carousel && modelState.carousel.length > 0
        ? modelState.carousel[modelState.activeCarouselIndex]
          ? modelState.carousel[modelState.activeCarouselIndex].colors
          : undefined
        : undefined,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

type IProps = MaterialTopTabBarProps & ModelState;

class TopTabBarWrapper extends React.Component<IProps> {
  get linearGradient() {
    const {gradientVisible, linearColors = ['#ccc', '#e2e2e2']} = this.props;
    if (gradientVisible) {
      return (
        <LinearAnimatedGradientTransition
          colors={linearColors}
          style={styles.gradient}
        />
      );
    }
    return null;
  }
  goCategory = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };
  render() {
    let {gradientVisible, indicatorStyle, ...restProps} = this.props;
    let textStyle = styles.text;
    let activeTintColor = '#333';
    if (gradientVisible) {
      textStyle = styles.whiteText;
      activeTintColor = '#fff';
      if (indicatorStyle) {
        indicatorStyle = StyleSheet.compose(indicatorStyle, styles.whiteBg);
      }
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topbarView}>
          <MaterialTopTabBar
            {...restProps}
            indicatorStyle={indicatorStyle}
            activeTintColor={activeTintColor}
            style={styles.topbar}
          />
          <Touchable style={styles.categoryBtn} onPress={this.goCategory}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.btn}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight(),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  topbar: {
    flex: 1,
    elevation: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  topbarView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ccc',
  },
  btn: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  searchBtn: {
    flex: 1,
    paddingLeft: 12,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  historyBtn: {
    marginLeft: 24,
  },
  text: {
    color: '#333',
  },
  whiteText: {
    color: '#fff',
  },
  whiteBg: {
    backgroundColor: '#fff',
  },
});

export default connector(TopTabBarWrapper);
