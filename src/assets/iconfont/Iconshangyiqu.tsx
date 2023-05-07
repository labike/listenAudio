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

let Iconshangyiqu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M362.3 512l445-332.3v664.5L362.3 512zM216.7 179.7h80v664.5h-80V179.7z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconshangyiqu.defaultProps = {
  size: 18,
};

Iconshangyiqu = React.memo ? React.memo(Iconshangyiqu) : Iconshangyiqu;

export default Iconshangyiqu;
