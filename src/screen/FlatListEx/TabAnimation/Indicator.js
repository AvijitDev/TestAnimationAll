import React from 'react';
import {Animated,Dimensions} from 'react-native';
import Colors from '../../../themes/Colors';
const {width, height} = Dimensions.get('screen');
import normalize from '../../../utils/Dimen';

export default function Indicator({measures, scrollx, data}){

  const inputRange = data.map((_, i) => i * width);
  
  const IndicatorWidth = scrollx.interpolate({
    inputRange,
    outputRange: measures.map(measures => measures.width),
  });

  const translateX = scrollx.interpolate({
    inputRange,
    outputRange: measures.map(measures => measures.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: normalize(2),
        width: IndicatorWidth,
        backgroundColor: Colors.white,
        bottom: normalize(-8),
        borderRadius: normalize(30),
        left: 0,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};