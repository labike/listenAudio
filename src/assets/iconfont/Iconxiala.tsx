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

let Iconxiala: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M845.73750784 310.06631558c11.09419837 11.20906823 20.13556271 20.35048032 31.14453548 31.47432293-121.43960347 124.00379403-242.4271389 247.54069789-364.70047497 372.39675162C390.0527457 589.68162356 268.72060139 466.23735673 147.11795668 342.52259023c10.96450709-9.79728131 20.93224036-18.70524869 26.40152463-23.59647866C215.4321334 358.44873076 260.2906406 398.96812377 303.11484019 441.54035152c65.17934399 64.79767943 129.21369503 130.75517321 193.07018343 196.86088611 11.65372557 12.06503364 18.47550896 13.01363611 30.76657736 0.32608175 101.29663005-104.55003835 203.3232385-208.39233111 305.05711445-312.51994567C836.68502706 321.42360292 840.7128809 316.00990072 845.73750784 310.06631558z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconxiala.defaultProps = {
  size: 18,
};

Iconxiala = React.memo ? React.memo(Iconxiala) : Iconxiala;

export default Iconxiala;
