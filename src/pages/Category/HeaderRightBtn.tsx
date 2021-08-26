/*
 * @Author: your name
 * @Date: 2021-08-23 09:55:49
 * @LastEditTime: 2021-08-24 11:31:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /listenAudio/src/pages/Category/HeaderRightBtn.tsx
 */
import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {connect, ConnectedProps} from 'react-redux';

import {RootState} from '@/models/index';

const mapStateToProps = ({category}: RootState) => {
  return {
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  onSubmit: () => void;
}

class HeaderRightBtn extends React.Component<IProps> {
  render() {
    const {onSubmit, isEdit} = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? '完成' : '编辑'} onPress={onSubmit} />
      </HeaderButtons>
    );
  }
}

export default connector(HeaderRightBtn);
