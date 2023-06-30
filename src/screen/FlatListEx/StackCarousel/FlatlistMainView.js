import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import Sliders from './Sliders';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverFlowItems = ({data, scrollXAnimated}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overFlowContainer}>
      <Animated.View
        style={{
          transform: [{translateY}],
        }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text numberOfLines={1} style={[styles.title]}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  {/* <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{marginRight: 5}}
                  /> */}
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function FlatListMainView({navigation}) {
  const [data, setData] = useState(Sliders);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const setActiveIndex = useCallback(activeIndex => {
    setIndex(activeIndex);
    scrollXIndex.setValue(activeIndex);
  });

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();

    // setInterval(() => {
    //     scrollXIndex.setValue(Math.floor(Math.random() * data.length));
    // },3000);

    if (index === data.length - VISIBLE_ITEMS) {
      // get new data
      // fetch more data

      const newData = [...data, ...data];
      setData(newData);
    }
  }, [scrollXAnimated, scrollXIndex, index]);

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
          // setIndex(index + 1);
          // scrollXIndex.setValue(index + 1)
        }
      }}>
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
            // setIndex(index + 1);
            // scrollXIndex.setValue(index + 1)
          }
        }}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverFlowItems data={data} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, {zIndex: data.length - index}];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({item, index}) => {
              const inputRange = [index - 1, index, index + 1];

              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });

              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });

              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      {
                        scale,
                      },
                    ],
                  }}>
                  <Image
                    source={{uri: item.img}}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                    }}
                  />
                </Animated.View>
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
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overFlowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
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
