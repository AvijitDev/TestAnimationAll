import React from 'react';
import {
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
// import Fonts from '../../../themes/Fonts';
import Sliders from './Sliders';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.74;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export default function ConfirmationItem({item, index, scrollx}) {
  const DATA_LENGTH = Sliders.length;

  if (index == 0) {
    return (
      <View
        style={{
          width: SPACER_ITEM_SIZE,
          // backgroundColor: Colors.blue,
          // height: normalize(200),
        }}
      />
    );
  }

  if (index == DATA_LENGTH - 1) {
    return (
      <View
        style={{
          width: SPACER_ITEM_SIZE,
        }}
      />
    );
  }

  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const translateY = scrollx.interpolate({
    inputRange,
    outputRange: [normalize(45), normalize(15), normalize(45)],
  });

  const opacityInputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const opacity = scrollx.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0.5, 1, 0.5],
  });

  const viewOpacity = scrollx.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View
      style={{
        width: ITEM_SIZE,
      }}>
      <Animated.View
        style={{
          marginHorizontal: normalize(10),
          alignItems: 'center',
          // backgroundColor: Colors.baby_blue_l,
          borderRadius: normalize(20),
          transform: [{translateY}],
          opacity,
          paddingHorizontal: normalize(5),
          paddingVertical: normalize(10),
        }}>
        <Animated.View 
        style={[styles.vv,{
          shadowOpacity: viewOpacity,
        }]}>
          <LinearGradient
            colors={[Colors.periwinkle_blue, Colors.baby_blue]}
            style={styles.gradient}
            useAngle={true}
            angle={280}>
            <Animated.Image
              source={item.image}
              style={[
                styles.imageView,
                {
                  opacity: viewOpacity,
                  position: 'absolute',
                },
              ]}
              resizeMode={'stretch'}
            />
            <Animated.Text
              style={[
                styles.txt2,
                {
                  transform: [{translateY}],
                },
              ]}>
              {item.title}
            </Animated.Text>
            <Animated.View
              style={[
                styles.line,
                {
                  transform: [{translateY}],
                },
              ]}
            />
            <Animated.Text
              style={[
                styles.txt3,
                {
                  transform: [{translateY}],
                },
              ]}>
              {item.description}
            </Animated.Text>
          </LinearGradient>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageView: {
    width: normalize(160),
    height: normalize(210),
    // borderRadius: normalize(16),
    marginTop: normalize(25),
  },
  vv: {
    width: '100%',
    shadowColor: 'rgba(128,128,128,0.2)',
    shadowOffset: {
      width: 1,
      height: 8,
    },
    shadowRadius: normalize(5),
    elevation: Platform.OS == 'android' ? normalize(8) : normalize(6)
  },
  gradient: {
    width: '100%',
    height: normalize(355),
    borderRadius: normalize(20),
    // justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'row',
  },
  txt2: {
    fontSize: normalize(12),
    color: Colors.white,
    fontWeight: '600',
    // fontFamily: Fonts.Poppins_SemiBold,
    alignSelf: 'center',
    marginTop: normalize(225),
  },
  line: {
    height: normalize(1),
    backgroundColor: Colors.white,
    width: normalize(40),
    marginTop: normalize(5),
  },
  txt3: {
    fontSize: normalize(11),
    color: Colors.white,
    // fontFamily: Fonts.Poppins_Regular,
    alignSelf: 'center',
    marginTop: normalize(10),
    width: normalize(160),
    textAlign: 'center',
  },
});
