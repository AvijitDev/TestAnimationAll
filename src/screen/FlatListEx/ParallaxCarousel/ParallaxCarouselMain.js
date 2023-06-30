import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import {faker} from '@faker-js/faker';

const {width, height} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const IMAGES = [
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

const DATA = IMAGES.map((image, index) => ({
  key: index.toString(),
  photo: image,
  avatar_url: faker.image.avatar(),
}));

export default function ParallaxCarouselMain({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={DATA}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.6, 0, width * 0.6],
          });

          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 18,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 20,
                  elevation: 10,
                  padding: 10,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Animated.Image
                    source={{uri: item.photo}}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: normalize(10),
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <Image
                  source={{uri: item.avatar_url}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    borderWidth: 6,
                    borderColor: '#fff',
                    position: 'absolute',
                    bottom: -30,
                    right: 50,
                  }}
                />
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{
          width: '85%',
          height: normalize(45),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.cerulean_blue,
          position: 'absolute',
          bottom: normalize(50),
          alignSelf: 'center',
          borderRadius: normalize(30),
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(16),
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/*
<Animated.FlatList
        data={DATA}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        showsHorizontalScrollIndicator={faker}
        pagingEnabled
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });

          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 18,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 30,
                  elevation: 10,
                  padding: 12,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 14,
                  }}>
                  <Animated.Image
                    source={{uri: item.photo}}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      transform: [
                        {
                          translateX,
                        },
                      ],
                    }}
                    resizeMode={'cover'}
                  />
                </View>
              </View>
               <Image
                source={{uri: item.avatar_url}}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                  borderWidth: 6,
                  borderColor: '#fff',
                  position: 'absolute',
                  bottom: -30,
                  right: 60,
                }}
              /> 
            </View>
          );
        }}
      />
*/
