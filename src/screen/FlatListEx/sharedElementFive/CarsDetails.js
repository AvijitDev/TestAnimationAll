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
import vwcars, {buttons, colors} from './vwcars';
import {SPACING, width} from './theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import Icons from '../../../themes/Icons';
import * as Animatable from 'react-native-animatable';

const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

const animation = {
  0: {opacity: 0, translateX: 50},
  1: {opacity: 1, translateX: 0},
};

const CarsDetails = ({navigation, route}) => {
  const {item} = route.params;

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

      <SharedElement id={`item.${item.key}.image`} style={styles.image}>
        <Image source={item.image} style={styles.image} />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`item.${item.key}.model`}>
          <Text style={styles.model} numberOfLines={1} adjustsFontSizeToFit>
            {item.model}
          </Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.description`}>
          <Text style={styles.desctiption}>{item.description}</Text>
        </SharedElement>
      </View>
      <View style={styles.container}>
        <AnimatableScrollView
          useNativeDriver
          animation={animation}
          delay={300}
          horizontal
          style={{flexGrow: 0, marginBottom: SPACING}}
          contentContainerStyle={{
            padding: SPACING,
          }}
          showsHorizontalScrollIndicator={false}>
          {colors.map(color => {
            return (
              <View
                key={color}
                style={[styles.switch, {backgroundColor: color}]}
              />
            );
          })}
        </AnimatableScrollView>
        {buttons.map((text, index) => {
          return (
            <Animatable.View
              animation={animation}
              useNativeDriver
              delay={300 + (index + 1) * 100}>
              <TouchableOpacity key={index} onPress={() => {}}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: SPACING * 2,
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.3,
                    borderTopWidth: index == 0 ? 0.3 : 0,
                    borderColor: 'rbga(166, 164, 159,0.1)',
                  }}>
                  <Text style={{fontSize: 14}}>{text}</Text>
                  <Image
                    source={Icons.arrow_right}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: '#6b6a67',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

CarsDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;

  return [
    {
      id: `item.${item.key}.model`,
    },
    {
      id: `item.${item.key}.description`,
    },
    {
      id: `item.${item.key}.image`,
    },
  ];
};

export default CarsDetails;

const styles = StyleSheet.create({
  image: {
    width: width * 2.1,
    height: width,
    resizeMode: 'contain',
    position: 'absolute',
    top: 65,
  },
  desctiption: {
    fontSize: 12,
    opacity: 0.7,
    position: 'absolute',
    top: 32 + SPACING / 2,
  },
  model: {
    fontSize: 32,
    fontWeight: '700',
    position: 'absolute',
  },
  meta: {
    position: 'absolute',
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6,
  },
  switch: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: SPACING,
  },
  container: {
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: '15%',
  },
});
