import React from 'react';
import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';

import {RootState} from '@/models/index';
import {RootStackNavigation, RootStackParamsList} from '@/navigators/index';
import Tab from './Tab';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {viewportHeight} from '@/utils/index';
import coverRight from '@/assets/cover-right.png';

const mapStateToProps = ({album}: RootState) => {
  return {
    summary: album.summary,
    author: album.author,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  headerHeight: number;
  route: RouteProp<RootStackParamsList, 'Album'>;
  navigation: RootStackNavigation;
}

const HEADER_HEIGHT = 260;
const USE_NATIVE_DRIVER = true;

class Album extends React.Component<IProps> {
  panRef = React.createRef<PanGestureHandler>();
  tapRef = React.createRef<TapGestureHandler>();
  nativeRef = React.createRef<NativeViewGestureHandler>();
  RANGE = [-(HEADER_HEIGHT - this.props.headerHeight), 0];
  translationYValue = 0;
  translationY = new Animated.Value(0);
  translateYOffset = new Animated.Value(0);
  lastScrollY = new Animated.Value(0);
  lastScrollYValue = 0;
  reverseLastScrollY = Animated.multiply(
    new Animated.Value(-1),
    this.lastScrollY,
  );

  translateY = Animated.add(
    Animated.add(this.translationY, this.reverseLastScrollY),
    this.translateYOffset,
  );

  componentDidMount() {
    const {dispatch, route, navigation} = this.props;
    const {id} = route.params.item;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
    navigation.setParams({
      opacity: this.translateY.interpolate({
        inputRange: this.RANGE,
        outputRange: [1, 0],
      }),
    });
  }
  renderHeader = () => {
    const {headerHeight, summary, author, route} = this.props;
    let _avatar = '';
    if (author.avatar) {
      _avatar = author.avatar.split('&')[0];
    }
    const {title, image} = route.params.item;
    return (
      <View style={[styles.header, {paddingTop: headerHeight}]}>
        <Image source={{uri: image}} style={styles.bgImg} />
        <BlurView
          blurType="light"
          blurAmount={10}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.leftView}>
          <Image source={{uri: image}} style={styles.thumbnail} />
          <Image source={coverRight} style={styles.coverRight} />
        </View>
        <View style={styles.rightView}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.summary}>
            <Text numberOfLines={1} style={styles.summaryText}>
              {summary}
            </Text>
          </View>
          <View style={styles.author}>
            <Image source={{uri: _avatar}} style={styles.avatar} />
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
      </View>
    );
  };
  scrollDrag = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: this.lastScrollY,
          },
        },
      },
    ],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
      listener: ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
        this.lastScrollYValue = nativeEvent.contentOffset.y;
      },
    },
  );
  onGestEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: this.translationY,
        },
      },
    ],
    {
      useNativeDriver: USE_NATIVE_DRIVER,
    },
  );
  handleStateChange = ({nativeEvent}: PanGestureHandlerStateChangeEvent) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let {translationY} = nativeEvent;
      translationY -= this.lastScrollYValue;
      this.translateYOffset.extractOffset();
      this.translateYOffset.setValue(translationY);
      // 初始值 + 偏移值
      this.translateYOffset.flattenOffset();
      this.translationY.setValue(0);
      this.translationYValue += translationY;
      let maxDeltaY = -this.RANGE[0] - this.translationYValue;
      if (this.translationYValue < this.RANGE[0]) {
        this.translationYValue = this.RANGE[0];
        Animated.timing(this.translateYOffset, {
          toValue: this.RANGE[0],
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = this.RANGE[1];
      } else if (this.translationYValue > this.RANGE[1]) {
        this.translationYValue = this.RANGE[1];
        Animated.timing(this.translateYOffset, {
          toValue: this.RANGE[1],
          useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
        maxDeltaY = -this.RANGE[0];
      }
      if (this.tapRef.current) {
        const tap: any = this.tapRef.current;
        tap.setNativeProps({
          maxDeltaY,
        });
      }
    }
  };
  render() {
    return (
      <TapGestureHandler ref={this.tapRef} maxDeltaY={-this.RANGE[0]}>
        <View style={styles.container}>
          <PanGestureHandler
            ref={this.panRef}
            simultaneousHandlers={[this.tapRef, this.nativeRef]}
            onHandlerStateChange={this.handleStateChange}
            onGestureEvent={this.onGestEvent}>
            <Animated.View
              style={[
                styles.container,
                {
                  transform: [
                    {
                      translateY: this.translateY.interpolate({
                        inputRange: this.RANGE,
                        outputRange: this.RANGE,
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              {this.renderHeader()}
              <View style={{height: viewportHeight - this.props.headerHeight}}>
                <Tab
                  panRef={this.panRef}
                  tapRef={this.tapRef}
                  nativeRef={this.nativeRef}
                  scrollDrag={this.scrollDrag}
                />
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </TapGestureHandler>
    );
  }
}

function Wrapper(props: IProps) {
  const headerHeight = useHeaderHeight();
  return <Album headerHeight={headerHeight} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bgImg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#eee',
  },
  leftView: {
    marginRight: 26,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
  },
  thumbnail: {
    width: 98,
    height: 98,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  coverRight: {
    height: 98,
    position: 'absolute',
    right: -23,
    resizeMode: 'contain',
  },
  rightView: {
    flex: 1,
  },
  summaryText: {
    color: '#fff',
  },
  summary: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 4,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
});

export default connector(Wrapper);
