/*
 * @Author: your name
 * @Date: 2021-08-17 17:46:48
 * @LastEditTime: 2021-09-04 09:20:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Detail.tsx
 */
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {ModalStackNavigation, ModalStackParamList} from '@/navigators/index';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import IconFont from '@/assets/iconfont';
import Touchable from '@/components/Touchable';
import PlayerSlider from './PlayerSlider';
import {viewportWidth} from '@/utils/index';
import LinearGradient from 'react-native-linear-gradient';
import Barrage, {Msg} from '@/components/Barrage';

const mapStateToProps = ({player}: RootState) => {
  return {
    id: player.id,
    soundUrl: player.soundUrl,
    playState: player.playState,
    title: player.title,
    previuodId: player.previousId,
    nextId: player.nextId,
    thumbnailUrl: player.thumbnailUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: ModalStackNavigation;
  route: RouteProp<ModalStackParamList, 'Detail'>;
}

interface IState {
  barrage: boolean;
  barrageData: Msg[];
}

const IMAGE_WIDTH = 180;
const SCALE = viewportWidth / IMAGE_WIDTH;

const data: string[] = [
  '君不见, 黄河之水天上来',
  '春日游, 杏花吹满头',
  '满城春色宫墙柳',
  '东风夜放花千树, 更吹落,星如雨, 宝马雕车香满路.',
  '吴山点点愁, 月明人倚楼',
  '春风十里扬州路',
  '人生若只如初见, 何事秋风悲画扇',
  '十年生死两茫茫, 不思量, 自难忘',
];

function randomIndex(length: number) {
  return Math.floor(Math.random() * length);
}

function getText() {
  return data[randomIndex(data.length)];
}

class Detail extends React.Component<IProps, IState> {
  state = {
    barrage: false,
    barrageData: [],
  };
  ani = new Animated.Value(1);
  componentDidMount() {
    const {dispatch, route, navigation, title, id} = this.props;
    if (route.params && route.params.id !== id) {
      dispatch({
        type: 'player/fetchPlayer',
        payload: {
          id: route.params.id,
        },
      });
    } else {
      dispatch({
        type: 'player/play',
      });
    }
    navigation.setOptions({
      headerTitle: title,
    });
    this.addBarrage();
  }
  componentDidUpdate(prevProps: IProps) {
    if (this.props.title !== prevProps.title) {
      this.props.navigation.setOptions({
        headerTitle: this.props.title,
      });
    }
  }
  toggle = () => {
    const {dispatch, playState} = this.props;
    dispatch({
      type: playState === 'playing' ? 'player/pause' : 'player/play',
    });
  };
  previuos = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/previuos',
    });
  };
  next = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'player/next',
    });
  };
  barrage = () => {
    this.setState({
      barrage: !this.state.barrage,
    });
    Animated.timing(this.ani, {
      toValue: this.state.barrage ? 1 : SCALE,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  addBarrage = () => {
    setInterval(() => {
      const {barrage} = this.state;
      if (barrage) {
        const id: any = Date.now();
        const title = getText();
        this.setState({
          barrageData: [
            {
              id,
              title,
            },
          ],
        });
      }
    }, 500);
  };
  render() {
    const {playState, previuodId, nextId, thumbnailUrl} = this.props;
    const {barrage, barrageData} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imgView}>
          <Animated.Image
            source={{uri: thumbnailUrl}}
            style={[
              styles.img,
              {borderRadius: barrage ? 0 : 8, transform: [{scale: this.ani}]},
            ]}
          />
        </View>
        {barrage && (
          <>
            <Barrage
              data={barrageData}
              maxTrack={5}
              style={{top: PADDING_TOP}}
            />
            <LinearGradient
              colors={['rgba(128, 104, 102, 0.5)', '#807c66']}
              style={styles.linear}
            />
          </>
        )}
        <Touchable style={styles.barrage} onPress={this.barrage}>
          <Text style={styles.barrageText}>弹幕</Text>
        </Touchable>
        <PlayerSlider />
        <View style={styles.control}>
          <Touchable
            disabled={!previuodId}
            onPress={this.previuos}
            style={styles.btn}>
            <IconFont name="iconshangyiqu" size={30} color="#fff" />
          </Touchable>
          <Touchable onPress={this.toggle} style={styles.btn}>
            <IconFont
              size={30}
              color="#fff"
              name={playState === 'playing' ? 'iconPause' : 'iconbofang2'}
            />
          </Touchable>
          <Touchable disabled={!nextId} onPress={this.next} style={styles.btn}>
            <IconFont name="iconxiayiqu" size={30} color="#fff" />
          </Touchable>
        </View>
      </View>
    );
  }
}

const PADDING_TOP = (viewportWidth - IMAGE_WIDTH) / 2;

const styles = StyleSheet.create({
  container: {
    paddingTop: PADDING_TOP,
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 90,
  },
  btn: {
    marginHorizontal: 10,
  },
  imgView: {
    height: IMAGE_WIDTH,
    alignItems: 'center',
  },
  img: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  barrage: {
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
  },
  barrageText: {
    color: '#fff',
  },
  linear: {
    position: 'absolute',
    top: 0,
    height: viewportWidth,
    width: viewportWidth,
  },
});

export default connector(Detail);
