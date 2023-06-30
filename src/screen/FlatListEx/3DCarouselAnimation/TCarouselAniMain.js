import React, {useRef, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('screen');
import {faker} from '@faker-js/faker';

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;

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

faker.seed(10);

const DATA = [...Array(IMAGES.length).keys()].map((_, i) => {
  return {
    key: i,
    image: IMAGES[i],
    title: faker.commerce.productName(),
    subtitle: faker.company.bs(),
    price: faker.finance.amount(80, 200, 0),
  };
});

const SPACING = 20;

const Content = ({item}) => {
  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 16,
          textTransform: 'uppercase',
        }}>
        {item.title}
      </Text>
      <Text style={{fontSize: 12, opacity: 0.4}}>{item.subtitle}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: SPACING,
        }}>
        <Text
          style={{
            fontSize: 42,
            letterSpacing: 3,
            fontWeight: '900',
            marginRight: 8,
          }}>
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 36,
            fontWeight: '800',
            alignSelf: 'flex-end',
          }}>
          USD
        </Text>
      </View>
    </>
  );
};

export default function TCarouselAniMain({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const [index, setIndex] = useState(0);
  const ref = useRef();

  const setActiveSlide = useCallback(newIndex => {
    ref?.current?.scrollToOffset({
        offset: (newIndex) * width,
        animated: true
    })
  });

  return (
    <View style={{backgroundColor: 'rgba(0,0,256,0.2)', flex: 1}}>
      <StatusBar hidden />
      <SafeAreaView style={{marginTop: SPACING * 4}}>
        <View style={{height: IMAGE_HEIGHT * 2.1}}>
          <Animated.FlatList
            ref={ref}
            data={DATA}
            keyExtractor={item => item.key}
            horizontal
            pagingEnabled
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: true},
            )}
            bounces={false}
            style={{flexGrow: 0, zIndex: 9999}}
            contentContainerStyle={{
              height: IMAGE_HEIGHT + SPACING * 2, ////
            }}
            onMomentumScrollEnd={ev => {
              setIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [50, 0, 20],
              });

              return (
                <Animated.View
                  style={{
                    width,
                    paddingVertical: SPACING,
                    opacity,
                    transform: [{translateY}],
                  }}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      alignSelf: 'center',
                      right: 28,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
          <View
            style={{
              width: IMAGE_WIDTH,
              alignItems: 'center',
              paddingHorizontal: SPACING * 2,
              marginLeft: SPACING * 2,
              zIndex: 99,
            }}>
            {DATA.map((item, index) => {
              const inputRange = [
                (index - 0.2) * width,
                index * width,
                (index + 0.2) * width,
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });

              const rotateY = scrollX.interpolate({
                inputRange,
                outputRange: ['90deg', '0deg', '90deg'],
              });

              return (
                <Animated.View
                  key={item.key}
                  style={{
                    position: 'absolute',
                    opacity,
                    transform: [
                      {
                        perspective: IMAGE_WIDTH * 4,
                      },
                      {
                        rotateY,
                      },
                    ],
                  }}>
                  <Content item={item} />
                </Animated.View>
              );
            })}
          </View>
          <Animated.View
            style={{
              width: IMAGE_WIDTH + SPACING * 2,
              position: 'absolute',
              backgroundColor: '#fff',
              backfaceVisibility: true,
              zIndex: -1,
              top: SPACING * 2,
              left: SPACING,
              bottom: 0,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 24,
              elevation: 12,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              transform: [
                {
                  perspective: IMAGE_WIDTH * 4,
                },
                {
                  rotateY: progress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['0deg', '90deg', '180deg'],
                  }),
                },
              ],
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: IMAGE_WIDTH + SPACING * 4,
            paddingHorizontal: SPACING,
            paddingVertical: SPACING,
          }}>
          <TouchableOpacity
            disabled={index === 0}
            style={{opacity: index === 0 ? 0.2 : 1}}
            onPress={() => {
              if (index === 0) {
                return;
              }
              setActiveSlide(index - 1);
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '800',
              }}>
              PREV
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={index === DATA.length - 1}
            style={{opacity: index === DATA.length - 1 ? 0.2 : 1}}
            onPress={() => {
              if (index === DATA.length - 1) {
                return;
              }
              setActiveSlide(index + 1);
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '800',
              }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={{
            position: 'absolute',
            left: SPACING,
        }}>
            <Text style={{
                fontSize: 18,
            }}>Back</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  );
}
