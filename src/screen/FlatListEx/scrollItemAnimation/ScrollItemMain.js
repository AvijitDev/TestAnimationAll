import React, {useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import {faker} from '@faker-js/faker';

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key:
      Math.floor(Math.random() * 87 + 1) * Math.floor(Math.random() * 65 + 1),
    image: faker.image.avatar(), //`https://randomuser.me/api/portraits/${faker.helpers.randomize(['women'])}`
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const BG_IMG =
  'https://cdn.pixabay.com/photo/2017/08/01/20/20/sky-2567748_960_720.jpg';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function ScrollItemMain({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={60}
      />
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(225,225,225,0.9)',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 10,
                transform: [{scale}],
                opacity,
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View
                style={
                  {
                    width: '75%',
                  }
                }>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 18,
                    opacity: 0.7,
                  }}>
                  {item.jobTitle}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    opacity: 0.8,
                    color: '#0099cc',
                  }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
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
