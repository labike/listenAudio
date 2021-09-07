import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigators/index';
import {IFound} from '@/models/found';
import Item from './Item';

const connector = connect();

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  list: IFound[];
  currentId: string;
}

class Found extends React.Component<IProps, IState> {
  state = {
    list: [],
    currentId: '',
  };
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'found/fetchFound',
      cb: (data: IFound[]) => {
        this.setState({
          list: data,
        });
      },
    });
  }
  setCurrentId = (id: string) => {
    this.setState({
      currentId: id,
    });
    const {dispatch} = this.props;
    if (id) {
      dispatch({
        type: 'player/pause',
      });
    }
  };
  renderItem = ({item}: ListRenderItemInfo<IFound>) => {
    const paused = item.id !== this.state.currentId;
    return (
      <Item data={item} paused={paused} setCurrentId={this.setCurrentId} />
    );
  };
  render() {
    const {list} = this.state;
    return (
      <FlatList
        data={list}
        extraData={this.state.currentId}
        renderItem={this.renderItem}
      />
    );
  }
}

export default connector(Found);
