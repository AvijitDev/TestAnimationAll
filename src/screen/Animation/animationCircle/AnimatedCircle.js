import React, {useState, useRef} from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import CircleProgress from './CircularProgress';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';

export default function AnimatedCircle({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircleProgress
        marginTop={Platform.OS === 'android' ? normalize(7) : normalize(0)}
        color2={'#28C00A'}
        width={160}
        percentage={90} //data.value
        strokeWidth={normalize(14)}
        Value={100} //data.value
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={styles.touch}>
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(14),
            fontWeight: '600',
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touch: {
    width: '90%',
    backgroundColor: Colors.button_color,
    height: normalize(45),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(50),
  },
});
