import React, {useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Data from './Data';
import {travelListTheme, width} from './theme';
import normalize from '../../../utils/Dimen';
import {SharedElement} from 'react-navigation-shared-element';
const {ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE} = travelListTheme;
import * as Animatable from 'react-native-animatable';

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  }
}

const TravelListDetails = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden />
      <SharedElement
        id={`item.${item.key}.photo`}
        style={[StyleSheet.absoluteFillObject]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: 0,
            },
          ]}>
          <Image
            source={{uri: item.image}}
            style={[
              StyleSheet.absoluteFillObject,
              {
                resizeMode: 'cover',
                // transform: [{ scale }]
              },
            ]}
          />
        </View>
      </SharedElement>

      <SharedElement id={`item.${item.key}.location`}>
        <Text
          style={[
            styles.location,
            {
              //   transform: [{translateX}],
            },
          ]}>
          {item.location}
        </Text>
      </SharedElement>

      <View
        style={{
          position: 'absolute',
          bottom: 120,
          // left: SPACING,
          // right: SPACING,
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            fontSize: 16,
            width: '100%',
            textTransform: 'uppercase',
            fontWeight: '800',
            marginHorizontal: SPACING,
            color: '#fff',
          }}>
          Activities
        </Text>

        <FlatList
          data={[...Array(8).keys()]}
          keyExtractor={item => String(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) => {
            return (
              <Animatable.View
                animation={"zoomIn"}
                duration={700}
                delay={400 + index * 100}
                style={{
                  backgroundColor: '#fff',
                  padding: SPACING,
                  width: width * 0.33,
                  height: width * 0.5,
                  marginRight: SPACING,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '70%',
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: 'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg',
                  }}
                />
                <Text>Activity #{item + 1}</Text>
              </Animatable.View>
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
};

TravelListDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;

  return [
    {
      id: `item.${item.key}.photo`,
    },
    {
      id: `item.${item.key}.location`,
    },
  ];
};

export default TravelListDetails;

const styles = StyleSheet.create({
  touch: {
    position: 'absolute',
    left: normalize(20),
    top: normalize(45),
  },
  txt: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: 'white',
  },
  location: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    width: ITEM_WIDTH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: 50,
    left: SPACING * 2,
  },
});
