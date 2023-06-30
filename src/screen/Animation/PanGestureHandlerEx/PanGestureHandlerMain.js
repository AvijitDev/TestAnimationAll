import React, {useRef, useState, useEffect} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

export default function PanGestureHandlerMain({navigation}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  return (
    <View style={[styles.container]}>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [
                {
                  translateY: translateY,
                },
                {
                  translateX: translateX,
                },
              ],
            },
          ]}
        />
      </PanGestureHandler>
    </View>
  ); 
  

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,256,0.5)',
    borderRadius: 100,
  },
});

/*
-----------------------------  Note ------------------------------
1st -> install - react-native-gesture-handler
2nd -> install - react-native-reanimated
3rd -> add plugin ->>> babel.config.js <-- add 
                  -> plugin: ['react-native-reanimated/plugin']
                  //npx react-native start --reset-cache

*/
