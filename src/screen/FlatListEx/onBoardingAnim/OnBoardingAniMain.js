import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import Sliders from './Sliders';

const {width, height} = Dimensions.get('screen');
const BGS = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF', '#BFDFFF'];

const Indicator = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
      }}>
      {Sliders.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              margin: 10,
              opacity,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: BGS.map((_, i) => i * width),
    outputRange: BGS.map(bg => bg),
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
        position: 'absolute',
      }}
    />
  );
};

export default function OnBoardingAniMain({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <FlatList
        data={Sliders}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width,
                alignItems: 'center',
                padding: 20,
              }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{flex: 0.3}}>
                <Text
                  style={{
                    fontWeight: '800',
                    fontSize: 24,
                    marginBottom: 10,
                    color: '#fff',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontWeight: '300',
                    color: '#fff',
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{
          position: 'absolute',
          bottom: 50,
          left: 30
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 18,
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
