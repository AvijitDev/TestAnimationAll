import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Easing,
  Animated,
  SafeAreaViewBase,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';

const {width, height} = Dimensions.get('screen');

const DATA = [
  'https://cdn.pixabay.com/photo/2021/10/04/11/20/cosmos-6680031_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/04/03/07/30/blue-flower-2197679_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/05/15/15/12/hepatica-1393813_960_720.jpg',
  'https://cdn.pixabay.com/photo/2020/07/08/08/07/daisy-5383056_960_720.jpg',
  'https://cdn.pixabay.com/photo/2021/08/07/19/49/cosmea-6529220_960_720.jpg',
  'https://cdn.pixabay.com/photo/2022/03/27/09/51/cherry-blossom-7094565_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/08/22/12/02/butterfly-1611794_960_720.jpg',
  'https://cdn.pixabay.com/photo/2015/12/02/14/51/bird-of-paradise-flower-1073282_960_720.jpg',
  'https://cdn.pixabay.com/photo/2018/02/17/12/37/liverwort-3159876_960_720.jpg',
  'https://cdn.pixabay.com/photo/2018/04/18/08/59/flower-3329845_960_720.jpg',
];

const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.54;

export default function CarouselAniMain({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.black,
      }}>
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {DATA.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: image}}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity,
                },
              ]}
              blurRadius={15}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={DATA}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 20,
                elevation: 10,
              }}>
              <Image
                source={{uri: item}}
                style={{
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGHT,
                  borderRadius: 16,
                }}
                resizeMode={'cover'}
              />
            </View>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{
          position: 'absolute',
          bottom: normalize(50),
          left: normalize(20)
        }}>
        <Text
          style={{
            color: Colors.black,
            fontSize: normalize(16),
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}
