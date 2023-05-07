/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import Icondelete from './Icondelete';
import Icontime from './Icontime';
import Iconhuanyipi from './Iconhuanyipi';
import Iconmore from './Iconmore';
import Iconhome from './Iconhome';
import IconPause from './IconPause';
import Iconbofang2 from './Iconbofang2';
import Iconuser from './Iconuser';
import IconcollectionB from './IconcollectionB';
import Iconfaxian from './Iconfaxian';
import Iconshouyexuanzhong from './Iconshouyexuanzhong';
import Iconxiala from './Iconxiala';
import Iconxiayiqu from './Iconxiayiqu';
import Iconshangyiqu from './Iconshangyiqu';
import Iconlike from './Iconlike';
import Iconfanhui from './Iconfanhui';
import Iconjiantou from './Iconjiantou';
import Iconlisten from './Iconlisten';
import Iconshengyin from './Iconshengyin';
import Iconxihuan from './Iconxihuan';
import Iconzanting from './Iconzanting';

export type IconNames = 'icondelete' | 'icontime' | 'iconhuanyipi' | 'iconmore' | 'iconhome' | 'iconPause' | 'iconbofang2' | 'iconuser' | 'iconcollection-b' | 'iconfaxian' | 'iconshouyexuanzhong' | 'iconxiala' | 'iconxiayiqu' | 'iconshangyiqu' | 'iconlike' | 'iconfanhui' | 'iconjiantou' | 'iconlisten' | 'iconshengyin' | 'iconxihuan' | 'iconzanting';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icondelete':
      return <Icondelete key="1" {...rest} />;
    case 'icontime':
      return <Icontime key="2" {...rest} />;
    case 'iconhuanyipi':
      return <Iconhuanyipi key="3" {...rest} />;
    case 'iconmore':
      return <Iconmore key="4" {...rest} />;
    case 'iconhome':
      return <Iconhome key="5" {...rest} />;
    case 'iconPause':
      return <IconPause key="6" {...rest} />;
    case 'iconbofang2':
      return <Iconbofang2 key="7" {...rest} />;
    case 'iconuser':
      return <Iconuser key="8" {...rest} />;
    case 'iconcollection-b':
      return <IconcollectionB key="9" {...rest} />;
    case 'iconfaxian':
      return <Iconfaxian key="10" {...rest} />;
    case 'iconshouyexuanzhong':
      return <Iconshouyexuanzhong key="11" {...rest} />;
    case 'iconxiala':
      return <Iconxiala key="12" {...rest} />;
    case 'iconxiayiqu':
      return <Iconxiayiqu key="13" {...rest} />;
    case 'iconshangyiqu':
      return <Iconshangyiqu key="14" {...rest} />;
    case 'iconlike':
      return <Iconlike key="15" {...rest} />;
    case 'iconfanhui':
      return <Iconfanhui key="16" {...rest} />;
    case 'iconjiantou':
      return <Iconjiantou key="17" {...rest} />;
    case 'iconlisten':
      return <Iconlisten key="18" {...rest} />;
    case 'iconshengyin':
      return <Iconshengyin key="19" {...rest} />;
    case 'iconxihuan':
      return <Iconxihuan key="20" {...rest} />;
    case 'iconzanting':
      return <Iconzanting key="21" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
