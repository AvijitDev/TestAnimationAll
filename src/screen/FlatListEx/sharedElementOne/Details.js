import React, {useEffect, useRef} from 'react';
import {ITEM_WIDTH, width, SPACING, ICON_SIZE} from './theme';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from './Icon';
import BackIcon from './BackIcon';
import {DATA} from './travel';
import {SharedElement} from 'react-navigation-shared-element';
import {SafeAreaView} from 'react-native-safe-area-context';

const Details = ({navigation, route}) => {
  const {item} = route.params;
  const ref = useRef();
  const selectedItemIndex = DATA.findIndex(i => i.id === item.id);
  const mountedAnimated = useRef(new Animated.Value(0)).current;
  const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
  const activeIndexAnimation = useRef(
    new Animated.Value(selectedItemIndex),
  ).current;

  const animation = (toValue, delay) =>
    Animated.timing(mountedAnimated, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(activeIndexAnimation, {
        toValue: activeIndex,
        duration: 300,
        useNativeDriver: true,
      }),
      animation(1, 500),
    ]).start();
  }, [activeIndexAnimation, activeIndex]);

  const translateY = mountedAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const size = ICON_SIZE + SPACING * 2;

  const translateX = activeIndexAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [size, 0, -size],
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <BackIcon
        onPress={() => {
          animation(0).start(() => {
            navigation.goBack();
          });
        }}
      />
      <Animated.View
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginVertical: 20,
          // backgroundColor: '#352343'
          marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
          transform: [{translateX}],
        }}>
        {DATA.map((item, index) => {
          const inputRange = [index - 1, index, index + 1];

          const opacity = activeIndexAnimation.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              onPress={() => {
                activeIndex.setValue(index);
                ref.current.scrollToIndex({
                  index,
                  animated: true,
                });
              }}
              key={item.id}
              style={{
                padding: SPACING,
              }}>
              <Animated.View
                style={{
                  alignItems: 'center',
                  opacity,
                }}>
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
                <Text style={{fontSize: 10}}>{item.title}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      <Animated.FlatList
        style={{
          opacity: mountedAnimated,
          transform: [{translateY}],
        }}
        ref={ref}
        data={DATA}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        initialScrollIndex={selectedItemIndex}
        nestedScrollEnabled
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          const newIndex = Math.floor(ev.nativeEvent.contentOffset.x / width);
          activeIndex.setValue(newIndex);
        }}
        renderItem={({item}) => {
          return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                width: width - SPACING * 2,
                margin: SPACING,
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 16,
              }}>
              <View style={{padding: SPACING}}>
                <Text style={{fontSize: 16}}>
                  {Array(35).fill(`${item.title} inner text \n`)}
                </Text>
              </View>
            </ScrollView>
          );
        }}
      />
    </SafeAreaView>
  );
};

Details.sharedElements = (route, otherRoute, showing) => {
  // const { item } = route.params;
  return DATA.map(item => `item.${item.id}.icon`);
  // return [`item.${item.id}.photo`];;
};

export default Details;

const styles = StyleSheet.create({
  imageContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: ICON_SIZE * 0.6,
    width: ICON_SIZE * 0.6,
    resizeMode: 'contain',
  },
});
