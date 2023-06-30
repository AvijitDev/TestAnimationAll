import React, {useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Data from './Data';
import {travelListTheme} from './theme';
import {SharedElement} from 'react-navigation-shared-element';
import normalize from '../../../utils/Dimen';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = travelListTheme;

export default function TravelList({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Animated.FlatList
          data={Data}
          keyExtractor={item => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={FULL_SIZE}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * FULL_SIZE,
              index * FULL_SIZE,
              (index + 1) * FULL_SIZE,
            ];

            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
            });

            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.1, 1],
            });

            return (
              <TouchableOpacity
                onPress={() => navigation.push('TravelListDetails', {item})}
                style={styles.itemContainer}>
                <SharedElement
                  id={`item.${item.key}.photo`}
                  style={[StyleSheet.absoluteFillObject]}>
                  <View
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        overflow: 'hidden',
                        borderRadius: SPACING,
                      },
                    ]}>
                    <Animated.Image
                      source={{uri: item.image}}
                      style={[
                        StyleSheet.absoluteFillObject,
                        {
                          resizeMode: 'cover',
                          transform: [{scale}],
                        },
                      ]}
                    />
                  </View>
                </SharedElement>
                <SharedElement
                  id={`item.${item.key}.location`}
                  style={[StyleSheet.absoluteFillObject]}>
                  <Animated.Text
                    style={[
                      styles.location,
                      {
                        transform: [{translateX}],
                      },
                    ]}>
                    {item.location}
                  </Animated.Text>
                </SharedElement>

                <View style={styles.days}>
                  <Text style={styles.daysValue}>{item.numberOfDays}</Text>
                  <Text style={styles.daysLavel}>Days</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.touch}>
        <Text style={styles.txt}>back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysValue: {
    fontWeight: '800',
    color: 'white',
    fontSize: 18,
  },
  daysLavel: {
    color: 'white',
    fontSize: 10,
  },
  touch: {
    position: 'absolute',
    left: normalize(20),
    bottom: normalize(45),
  },
  txt: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
});
