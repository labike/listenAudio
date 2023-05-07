import React, {useCallback, useEffect, useReducer} from 'react';
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

enum Action {
  LIST,
  CURRENTID,
}

type Iaction = {
      type: Action.LIST;
      list: IFound[];
    }
  | {
      type: Action.CURRENTID;
      currentId: string;
    };

function reducer(state: IState, action: Iaction) {
  switch (action.type) {
    case Action.LIST:
      return {
        ...state,
        list: action.list,
      };
    case Action.CURRENTID:
      return {
        ...state,
        currentId: action.currentId,
      };
    default:
      return state;
  }
}

function Found(props: IProps) {
  const initialState = {
    list: [],
    currentId: '',
  };
  const [state, _dispatch] = useReducer(reducer, initialState);
  const {dispatch} = props;

  useEffect(() => {
    dispatch({
      type: 'found/fetchFound',
      cb: (data: IFound[]) => {
        _dispatch({
          type: Action.LIST,
          list: data,
        })
      },
    });
  }, [dispatch])
  
  const setCurrentId = useEffect((id: string) => {
    _dispatch({
      type: Action.CURRENTID,
      currentId: id,
    })
    if (id) {
      _dispatch({
        type: 'player/pause',
      });
    }
  }, [dispatch]);
  
  const renderItem = useCallback(({item}: ListRenderItemInfo<IFound>) => {
    const paused = item.id !== state.currentId;
    return (
      <Item data={item} paused={paused} setCurrentId={setCurrentId} />
    );
    [state.currentId, setCurrentId]
  );

  const {list} = state;
  return (
    <FlatList
      data={list}
      extraData={state.currentId}
      renderItem={renderItem}
    />
  );
}


export default connector(Found);
