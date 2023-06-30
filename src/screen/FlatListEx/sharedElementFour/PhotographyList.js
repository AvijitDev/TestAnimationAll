import React, {useRef} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native';
import photography from './photography';
import UserCard from './UserCard';
import normalize from '../../../utils/Dimen';
import PhotographyItemDetails from './PhotographyItemDetails';
import {height, SPACING, width} from './theme';
import TouchableScale from 'react-native-touchable-scale';
import {SharedElement} from 'react-navigation-shared-element';

export default function PhotographyList({navigation}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden />
      {/* <MasonryList/> */}
      <Animated.FlatList
        data={photography}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          return (
            <View style={{flex: 1, width, height}}>
              <SharedElement id={`item.${item.key}.image`}>
                <Image
                  source={{uri: item.image}}
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      width: width,
                      height: height,
                      resizeMode: 'cover',
                    },
                  ]}
                />
              </SharedElement>
              <View
                style={{
                  position: 'absolute',
                  bottom: 120,
                  alignSelf: 'center',
                }}>
                <TouchableScale
                  activeScale={0.8}
                  tension={20}
                  friction={7}
                  useNativeDriver
                  onPress={() =>
                    navigation.navigate('PhotographyListDetails', {item})
                  }>
                  <SharedElement id={`item.${item.key}.userCard`}>
                    <UserCard user={item.user} />
                  </SharedElement>
                </TouchableScale>
              </View>
            </View>
          );
        }}
      />

      <PhotographyItemDetails
        data={photography}
        style={{
          position: 'absolute',
          top: SPACING * 6,
          width: width * 0.84,
          alignSelf: 'center',
        }}
        scrollX={scrollX}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.touch}>
        <Text style={styles.txt}>back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
})