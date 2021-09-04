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

let Iconxiayiqu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M216.7 844.3V179.7l445 332.3-445 332.3z m590.6 0h-80V179.7h80v664.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconxiayiqu.defaultProps = {
  size: 18,
};

Iconxiayiqu = React.memo ? React.memo(Iconxiayiqu) : Iconxiayiqu;

export default Iconxiayiqu;
