/*
 * @Author: your name
 * @Date: 2021-09-07 19:16:07
 * @LastEditTime: 2021-09-07 19:16:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/Authorized.tsx
 */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';

import defaultAvatar from '@/assets/default_avatar.png';
import {navigate} from '../utils';

// const mapStateToProps = ({user}: RootState) => {
//   return {
//     user: user.user,
//   };
// };

// const connector = connect(mapStateToProps);

// type ModelState = ConnectedProps<typeof connector>;

interface IProps {
  authority?: boolean;
  noMatch?: () => JSX.Element;
}

class Authorizated extends React.Component<IProps> {
  onPress = () => {
    navigate('Login');
  };
  renderNoMatch = () => {
    if (this.props.noMatch) {
      return <View>{this.props.noMatch()}</View>;
    }
    return (
      <View style={styles.loginView}>
        <View>
          <Image source={defaultAvatar} style={styles.img} />
        </View>
        <View style={styles.right}>
          <Touchable style={styles.loginBtn} onPress={this.onPress}>
            <Text style={styles.btnText}>立即登录</Text>
          </Touchable>
          <Text style={styles.tips}>登录后自动同步所有记录</Text>
        </View>
      </View>
    );
  };
  render() {
    const {children, authority} = this.props;
    if (authority) {
      return children;
    }
    // if (user) {
    //   return children;
    // }
    return this.renderNoMatch();
  }
}

const styles = StyleSheet.create({
  loginView: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  right: {
    flex: 1,
    marginLeft: 15,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    width: 76,
    borderRadius: 13,
    borderColor: '#f86442',
    borderWidth: 1,
    marginBottom: 12,
  },
  btnText: {
    color: '#f86442',
    fontWeight: '900',
  },
  tips: {
    color: '#999',
  },
});

export default Authorizated;
