import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import Icons from '../../../themes/Icons';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import LinearGradient from 'react-native-linear-gradient';

export default function NextButton({percentage, scrollTo}) {
  const size = normalize(60); //128
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  function animation(toValue) {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      value => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );

    return () => {
        progressAnimation.removeAllListeners()
    }
  },[]);

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={Colors.desert_storm}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />

          <Circle
            ref={progressRef}
            stroke={Colors.periwinkle_blue}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}>

      <LinearGradient
        colors={[Colors.periwinkle_blue,Colors.periwinkle_blue,Colors.baby_blue]}
        style={styles.gradient}
        useAngle={true}
        angle={230}>
        <Image
          source={Icons.right}
          style={{
            width: normalize(20),
            height: normalize(20),
            tintColor: Colors.white,
          }}
          resizeMode={'stretch'}
        />
      </LinearGradient>
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    borderRadius: 100,
    alignSelf: 'center',
    width: normalize(45),
    height: normalize(45),
    justifyContent: 'center',
    alignItems: 'center'
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
