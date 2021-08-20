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

let IconPause: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m0-64A448 448 0 1 0 512 64a448 448 0 0 0 0 896zM384 320a32 32 0 0 1 64 0v384a32 32 0 1 1-64 0V320z m192 0a32 32 0 0 1 64 0v384a32 32 0 1 1-64 0V320z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPause.defaultProps = {
  size: 18,
};

IconPause = React.memo ? React.memo(IconPause) : IconPause;

export default IconPause;
