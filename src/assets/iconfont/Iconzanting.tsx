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

let Iconzanting: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.227168 0 0 229.227168 0 512s229.227168 512 512 512S1024 794.772832 1024 512 794.772832 0 512 0z m108.745947 550.932189l-159.357793 132.286017a38.348206 38.348206 0 0 1-57.522309-33.203596v-264.460799a38.348206 38.348206 0 0 1 57.522309-33.203595l159.357793 132.230399a38.348206 38.348206 0 0 1 0 66.351574z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconzanting.defaultProps = {
  size: 18,
};

Iconzanting = React.memo ? React.memo(Iconzanting) : Iconzanting;

export default Iconzanting;
