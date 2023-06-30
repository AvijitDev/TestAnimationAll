import React from 'react';
import {View, FlatList, Dimensions, Image, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const BACKDROP_HEIGHT = height * 1; //height * 0.6
const AnimatedSVG = Animated.createAnimatedComponent(Svg);

export default function Backdrop({data, scrollX}) {
  return (
    <View
      style={{
        position: 'absolute',
        width,
        height: BACKDROP_HEIGHT,
      }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          if (!item.img) {
            return null;
          }

          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0],
          });
          return (
            <MaskedView
              style={{
                position: 'absolute',
              }}
              maskElement={
                <AnimatedSVG
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{
                    transform: [{translateX}],
                  }}>
                  <Rect x="0" y="0" width={width} height={height} fill="red" />
                </AnimatedSVG>
              }>
              <Image
                source={{uri: item.img}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  resizeMode: 'cover',
                }}
              />
            </MaskedView>
          );
        }}
      />
      <LinearGradient
        colors={['transparent', 'white']}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
}
