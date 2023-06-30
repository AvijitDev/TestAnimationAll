import React from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SLIDER_DATA} from './travel';
import {ITEM_WIDTH, width, SPACING} from './theme';

export default function MarketingSlider() {
  return (
    <View>
      <FlatList
        data={SLIDER_DATA}
        keyExtractor={item => item.color}
        horizontal
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        contentContainerStyle={{
          paddingRight: width - ITEM_WIDTH - SPACING * 2,
          // backgroundColor: '#456782',
          marginTop: SPACING
        }}
        decelerationRate={'fast'}
        renderItem={({item}) => {
          return (
            <View style={[styles.itemContainer, {backgroundColor: item.color}]}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.6,
    borderRadius: 16,
    padding: SPACING,
    margin: SPACING,
  },
  itemText: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 20,
  },
});
