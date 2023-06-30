import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';

export default function TextAnimator(props) {
  const animatedValues = [];
  const textArr = props.content.trim().split(' ');

  textArr.forEach((_, i) => {
    animatedValues[i] = new Animated.Value(0);
  });

  useEffect(() => {
    animated();
  }, []);

  function animated(toValue = 1) {
    const animations = textArr.map((_, i) => {
      return Animated.timing(animatedValues[i], {
        toValue,
        duration: props.duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(
      props.duration / 5,
      toValue === 0 ? animations.reverse() : animations, // props.duration / 5,animations,
    ).start(() => {
      setTimeout(() => animated(toValue === 0 ? 1 : 0), 1000); // off
      if (props.onFinish) {
        props.onFinish();
      }
    });
  }

  return (
    <View style={[props.style, styles.texyWrapper]}>
      {textArr.map((word, index) => {
        return (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
              props.textStyle,
              {
                opacity: animatedValues[index],
                transform: [
                  {
                    translateY: Animated.multiply(
                      animatedValues[index],
                      new Animated.Value(-5),
                    ),
                  },
                ],
              },
            ]}>
            {word}
            {`${index < textArr.length ? ' ' : ''}`}
          </Animated.Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  texyWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
