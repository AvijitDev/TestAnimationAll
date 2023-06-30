import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';

export default function Paginator({data, scrollX}) {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.conatiner}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [normalize(8), normalize(20), normalize(8)],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
              },
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
  },
  dot: {
    height: normalize(8),
    borderRadius: normalize(5),
    backgroundColor: Colors.periwinkle_blue,
    marginHorizontal: normalize(5),
  },
});
