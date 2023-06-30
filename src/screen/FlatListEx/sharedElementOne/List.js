import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import MarketingSlider from './MarketingSlider';
import {DATA} from './travel';
import {ITEM_WIDTH, width, SPACING} from './theme';
import Icon from './Icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import normalize from '../../../utils/Dimen';

export default function List({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MarketingSlider />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 20,
          // backgroundColor: '#345667',
          position: 'absolute',
          bottom: 25,
        }}>
        {DATA.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              style={{
                padding: SPACING,
              }}
              onPress={() => navigation.push('Details', {item})}>
              <SharedElement id={`item.${item.id}.icon`}>
                <Icon uri={item.imageUri} />
              </SharedElement>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={styles.touch}>
        <Text
          style={{
            fontSize: normalize(14),
            fontWeight: '600',
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touch: {
    position: 'absolute',
    top: normalize(35),
    right: normalize(15),
  },
});
