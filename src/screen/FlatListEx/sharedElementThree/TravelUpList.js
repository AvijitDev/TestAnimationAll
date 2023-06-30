import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import {ITEM_WIDTH, SPACING, width} from './theme';
import travelup from './Travelup';
import normalize from '../../../utils/Dimen';

const IMAGE_WIDTH = width * 0.86;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;
const VISIBLE_ITEMS = 4;

export default function TravelUpList({navigation}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const reactiveAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const setActiveSlide = useCallback(newIndex => {
    setActiveIndex(newIndex);
    reactiveAnimated.setValue(newIndex);
  });

  return (
    <FlingGestureHandler
      key="UP"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (activeIndex === travelup.length - 1) {
            return;
          }
          setActiveSlide(activeIndex + 1);
        }
      }}>
      <FlingGestureHandler
        key="DOWN"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (activeIndex === 0) {
              return;
            }
            setActiveSlide(activeIndex - 1);
          }
        }}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#1E1D1D'}}>
          <StatusBar hidden />
          <FlatList
            data={travelup}
            keyExtractor={item => item.key}
            scrollEnabled={false}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            CellRendererComponent={({
              index,
              item,
              children,
              style,
              ...props
            }) => {
              const newStyle = [
                style,
                {
                  zIndex: travelup.length - index,
                  left: -IMAGE_WIDTH / 2,
                  top: -IMAGE_HEIGHT / 2,
                },
              ];

              return (
                <View index={index} {...props} style={newStyle}>
                  {children}
                </View>
              );
            }}
            renderItem={({item, index}) => {
              const inputRange = [index - 1, index, index + 1];
              const translateY = animatedValue.interpolate({
                inputRange,
                outputRange: [-30, 0, 30],
              });

              const opacity = animatedValue.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              const scale = animatedValue.interpolate({
                inputRange,
                outputRange: [0.92, 1, 1.2],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    opacity,
                    transform: [{translateY}, {scale}],
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('TravelUpDetails', {
                        item: travelup[activeIndex],
                      })
                    }>
                    <SharedElement
                      id={`item.${item.key}.image`}
                      style={styles.image}>
                      <Image source={{uri: item.image}} style={styles.image} />
                    </SharedElement>
                    <View style={{position: 'absolute', bottom: 20, left: 20}}>
                      <SharedElement id={`item.${item.key}.name`}>
                        <Text style={styles.name}>{item.name}</Text>
                      </SharedElement>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.touch}>
            <Text style={styles.txt}>back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  name: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '900',
    fontSize: 36,
  },
  touch: {
    position: 'absolute',
    left: normalize(20),
    bottom: normalize(45),
  },
  txt: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#fff'
  },
});
