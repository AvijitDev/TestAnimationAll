import React from 'react';
import {View, Text, StyleSheet, Animated, Platform} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import Colors from '../../../themes/Colors';
// import Fonts from '../themes/Fonts';
import normalize from '../../../utils/Dimen';
import PropTypes from 'prop-types';

export default function CircleProgress(props) {
  
  const width = props.width;
  const strokeWidth = props.strokeWidth;
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * radius * Math.PI;
  const percentage = (circumference * (100 - props.percentage)) / 100;

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const strokeDashoffset = new Animated.Value(props.percentage * 2);

  Animated.timing(strokeDashoffset, {
    toValue: percentage,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: props.marginTop,
      }}>
      <Svg
        height={width}
        width={width}
        style={{transform: [{rotate: '85deg'}]}}>
        <Circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={Colors.water}
          strokeWidth={strokeWidth}
        />

        <AnimatedCircle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke={props.color2}
          strokeWidth={strokeWidth}
          strokeDasharray={2  *radius * Math.PI}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

CircleProgress.propTypes = {
  marginTop: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  percentage: PropTypes.number,
  strokeWidth: PropTypes.number,

  width2: PropTypes.number,
  percentage2: PropTypes.number,
  color2: PropTypes.string,

  width3: PropTypes.number,
  percentage3: PropTypes.number,
  color3: PropTypes.string,
  ShowTwoCircle: PropTypes.bool,

  Value: PropTypes.number,
  desc: PropTypes.string,
};

CircleProgress.defaultProps = {
  marginTop: normalize(0),
  color: Colors.white,
  percentage: 0,
  strokeWidth: 16,
  height: 11,
  percentage2: 0,
  percentage3: 0,
  ShowTwoCircle: false,
  width: 280,
  width2: 230,
  width3: 180,
  color3: '#FBBF24',
  color2: '#176B82',
  Value: 0,
};

const styles = StyleSheet.create({
  fontstyle: {
    // fontFamily:Fonts.Bahnschrift,
    fontSize: normalize(43),
    color: Colors.white,
    textAlign: 'center',
    fontWeight:Platform.OS==='ios'? '700':'700',
  },
  fontstyle2: {
    marginHorizontal: normalize(10),
    textAlign: 'center',
    // fontFamily: Fonts.Proxima_nova_Bold,
    fontSize: normalize(10),
    color: Colors.black,
    textTransform: 'capitalize',
  },
  descview: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});