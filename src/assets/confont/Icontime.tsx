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

let Icontime: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M517.16565 54.30379c-246.874667 0-446.980147 200.12083-446.980147 446.980147 0 246.857271 200.10548 446.980147 446.980147 446.980147 246.841921 0 446.980147-200.122877 446.980147-446.980147C964.145797 254.42462 764.006548 54.30379 517.16565 54.30379zM518.42841 902.320707c-221.058698 0-400.259056-179.207521-400.259056-400.26622 0-221.064838 179.200358-400.26622 400.259056-400.26622 221.073024 0 400.273383 179.200358 400.273383 400.26622C918.701792 723.114209 739.501434 902.320707 518.42841 902.320707z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M532.62883 198.47433 500.686327 198.47433 500.686327 516.249791 500.686327 548.176944 532.62883 548.176944 771.585153 548.176944 771.585153 516.249791 532.62883 516.249791Z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Icontime.defaultProps = {
  size: 18,
};

Icontime = React.memo ? React.memo(Icontime) : Icontime;

export default Icontime;
