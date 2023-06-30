import React, {useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Colors from '../../../themes/Colors';
import normalize from '../../../utils/Dimen';
import Backdrop from './Backdrop';
import Sliders from './Sliders';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export default function MaskedMainView({navigation}) {
  const scrollx = useRef(new Animated.Value(0)).current;

  const DATA_LENGTH = Sliders.length;

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View
        style={{
          flex: 1,
        }}>
        <Backdrop data={Sliders} scrollX={scrollx} />
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={Sliders}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={{
            alignItems: 'center',
          }}
          snapToInterval={ITEM_SIZE}
          bounces={false}
          decelerationRate={0}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          renderItem={({item, index}) => {
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
                    // backgroundColor: Colors.blue,
                    // height: normalize(200),
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
              outputRange: [100, 50, 100], //[0, -50, 0]
            });

            // const opacityInputRange = [
            //   (index - 2) * ITEM_SIZE,
            //   (index - 1) * ITEM_SIZE,
            //   index * ITEM_SIZE,
            // ];

            // const opacity = scrollx.interpolate({
            //   inputRange: opacityInputRange,
            //   outputRange: [0.5, 1, 0.5],
            // });

            return (
              <View style={{width: ITEM_SIZE}}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    backgroundColor: Colors.white,
                    borderRadius: 34,
                    transform: [{translateY}],
                    // opacity,
                  }}>
                  <Image
                    source={{uri: item.img}}
                    style={styles.imageView}
                    // resizeMode={'stretch'}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                    }}>
                    {item.name}
                  </Text>
                </Animated.View>
              </View>
            );
          }}
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageView: {
    width: '100%',
    height: normalize(300),
    borderRadius: normalize(16),
  },
  touch: {
    width: '90%',
    backgroundColor: Colors.button_color,
    height: normalize(45),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(30),
  },
});
