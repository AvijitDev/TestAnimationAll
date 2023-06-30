import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import {height, SPACING, width} from './theme';

const latterAnimation = {
  0: {opacity: 0, translateY: -42},
  1: {opacity: 1, translateY: 0},
};

const animation = {
  0: {translateX: width},
  1: {translateX: 0},
};

const DURATION = 300;

const UrbanEarsDetails = ({navigation, route}) => {
  const {items} = route.params;

  const circleSize = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          padding: 12,
          position: 'absolute',
          top: 50,
          right: 20,
          zIndex: 2,
        }}>
        <Text
          style={{
            color: '#000',
          }}>
          Back
        </Text>
      </TouchableOpacity>

      <SharedElement
        id={`item.${items.key}.circle`}
        style={[
          StyleSheet.absoluteFillObject,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            position: 'absolute',
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize,
            opacity: 0.2,
            backgroundColor: items.color,
          }}
        />
      </SharedElement>

      <SharedElement id={`item.${items.key}.image`} style={styles.image}>
        <Image source={items.imageUrl} style={styles.image} />
      </SharedElement>

      <View style={{position: 'absolute', top: SPACING * 4, left: SPACING}}>
        <View style={{flexDirection: 'row', overflow: 'hidden', height: 45}}>
          {items.type.split('').map((latter, index) => {
            return (
              <Animatable.Text
                animation={latterAnimation}
                useNativeDriver
                delay={300 + index * 50}
                key={`${latter} -${index}`}
                style={styles.heading}>
                {latter}
              </Animatable.Text>
            );
          })}
        </View>
        <View style={{overflow: 'hidden'}}>
          <Animatable.Text
            animation={latterAnimation}
            useNativeDriver
            delay={300 + (items.type.split('').length * 50 + 50)}
            style={{
              fontSize: 20,
              fontWeight: '800',
              textTransform: 'uppercase',
              color: items.color,
            }}>
            {items.color}
          </Animatable.Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: SPACING,
          height: 250,
          width: '100%',
          position: 'absolute',
          bottom: 30,
        }}>
        <View
          style={{
            flex: 0.35,
            overflow: 'hidden',
          }}>
          <Animatable.View
            animation={animation}
            delay={DURATION}
            useNativeDriver
            style={{
              justifyContent: 'space-between',
              flex: 1,
              backgroundColor: 'white',
              marginRight: SPACING,
              padding: SPACING,
              overflow: 'hidden',
            }}>
            <Animatable.View
              animation={animation}
              delay={DURATION + 100}
              useNativeDriver>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{fontWeight: '800', textTransform: 'uppercase'}}>
                Advertising
              </Text>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{fontWeight: '800', textTransform: 'uppercase'}}>
                Market
              </Text>
            </Animatable.View>
            <Animatable.View
              animation={animation}
              delay={DURATION + 200}
              useNativeDriver
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  marginRight: SPACING / 2,
                  fontSize: 11,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                }}>
                Play Video
              </Text>
              <Image
                source={{
                  uri: 'https://cdn-icons.flaticon.com/png/512/1666/premium/1666744.png?token=exp=1649409537~hmac=00b7d6719a2fddc3ddf79bc347271249',
                }}
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            </Animatable.View>
          </Animatable.View>
        </View>
        <Animatable.View style={{flex: 0.65, overflow: 'hidden'}}>
          <Animatable.Image
            animation={animation}
            useNativeDriver
            delay={DURATION + 300}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg',
            }}
            style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover'}]}
          />
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

UrbanEarsDetails.sharedElements = (route, otherRoute, showing) => {
  const {items} = route.params;

  return [
    {
      id: `item.${items.key}.image`,
    },
    {
      id: `item.${items.key}.circle`,
    },
  ];
};

export default UrbanEarsDetails;

const styles = StyleSheet.create({
  heading: {
    color: '#333',
    textTransform: 'uppercase',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: 'contain',
    alignSelf: 'center',
    // marginTop: 120,
    // marginVertical: 90,
    position: 'absolute',
    top: 80,
  },
});
