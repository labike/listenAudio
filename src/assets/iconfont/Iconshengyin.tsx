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

let Iconshengyin: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M689.085 335.699c-18.785-18.785-49.239-18.785-68.023 0s-18.785 49.239 0 68.023c56.355 56.355 56.355 147.717 0 204.069-18.785 18.785-18.785 49.239 0 68.023 18.785 18.785 49.239 18.785 68.023 0 93.92-93.92 93.92-246.199 0-340.125z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M463.835 159.435v0l-205.238 153.931h-128.336c-35.674 0-64.067 28.451-64.067 63.543v257.721c0 34.619 28.684 63.543 64.067 63.543h128.336l205.238 153.931c28.537 21.398 51.299 9.69 51.299-25.82v-641.027c0-35.062-22.971-47.065-51.299-25.82z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M825.132 199.656c-18.785-18.785-49.239-18.785-68.023 0s-18.785 49.239 0 68.023c131.492 131.492 131.492 344.682 0 476.174-18.785 18.785-18.785 49.239 0 68.023 18.785 18.785 49.239 18.785 68.023 0v-0.001c169.060-169.060 169.060-443.158 0-612.221z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

Iconshengyin.defaultProps = {
  size: 18,
};

Iconshengyin = React.memo ? React.memo(Iconshengyin) : Iconshengyin;

export default Iconshengyin;
