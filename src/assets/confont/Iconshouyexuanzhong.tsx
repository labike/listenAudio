/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let Iconshouyexuanzhong: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M859.093333 406.613333L582.826667 172.8a113.706667 113.706667 0 0 0-141.653334 0l-277.333333 234.666667a43.733333 43.733333 0 0 0 28.373333 77.226666h638.506667a43.733333 43.733333 0 0 0 28.373333-78.08z"
        fill={getIconColor(color, 0, '#FC455D')}
      />
      <Path
        d="M814.933333 410.666667v362.666666a103.893333 103.893333 0 0 1-105.386666 102.613334H661.333333a42.666667 42.666667 0 0 1-42.666666-42.666667v-149.333333a78.293333 78.293333 0 0 0-31.146667-60.373334A122.026667 122.026667 0 0 0 512 598.613333c-58.88 0-106.666667 38.186667-106.666667 85.333334v149.333333a42.666667 42.666667 0 0 1-42.666666 42.666667h-48.213334a103.893333 103.893333 0 0 1-105.386666-102.613334v-362.666666z"
        fill={getIconColor(color, 1, '#FC455D')}
      />
    </Svg>
  );
};

Iconshouyexuanzhong.defaultProps = {
  size: 18,
};

Iconshouyexuanzhong = React.memo ? React.memo(Iconshouyexuanzhong) : Iconshouyexuanzhong;

export default Iconshouyexuanzhong;
