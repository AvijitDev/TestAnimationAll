import React from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';
import {width, SPACING} from './theme';

export default function PhotographyItemDetails({data, style, scrollX}) {
  return (
    <View style={style}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 0.5) * width,
          index * width,
          (index + 0.5) * width,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [20, 0, 20],
        });

        return (
          <Animated.View
            key={`detail.${item.key}`}
            style={{
              position: 'absolute',
              opacity,
              transform: [{translateY}],
            }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
  },
  description: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    opacity: 0.7
  },
});
