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

let Iconjiantou: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M513 767.9c-9.1 0-18.2-3.5-25.1-10.4L108.4 378c-13.9-13.9-13.9-36.4 0-50.3 13.9-13.9 36.4-13.9 50.3 0L513 682l354.3-354.3c13.9-13.9 36.4-13.9 50.3 0 13.9 13.9 13.9 36.4 0 50.3L538.1 757.5c-6.9 6.9-16 10.4-25.1 10.4z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconjiantou.defaultProps = {
  size: 18,
};

Iconjiantou = React.memo ? React.memo(Iconjiantou) : Iconjiantou;

export default Iconjiantou;
