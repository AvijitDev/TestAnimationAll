import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import vwcars from './vwcars';
import {SPACING, width} from './theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import normalize from '../../../utils/Dimen';

const ITEM_SIZE = 120;
const BG_COLOR = '#C1CEE077';

export default function CarsList({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden />
      <FlatList
        data={vwcars}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: SPACING,
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('CarsDetails', {item})}>
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.model`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.description`}>
                    <Text style={styles.desctiption}>{item.description}</Text>
                  </SharedElement>
                </View>
                <SharedElement
                  id={`item.${item.key}.image`}
                  style={styles.image}>
                  <Image
                    source={item.image}
                    style={{
                      height: '100%',
                      width: '100%',
                      resizeMode: 'center',
                    }}
                  />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.touch}>
        <Text style={styles.txt}>back</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    color: '#000'
  },
  item: {
    height: ITEM_SIZE * 1.2,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: 'hidden',
  },
  model: {
    fontSize: 18,
    fontWeight: '700',
    position: 'absolute',
  },
  desctiption: {
    fontSize: 12,
    opacity: 0.7,
    position: 'absolute',
    top: 20 + SPACING / 2,
  },
  image: {
    height: ITEM_SIZE * 1.1,
    width: '80%',
    position: 'absolute',
    bottom: 5,
    right: '-20%',
    // backgroundColor: 'red'
  },
});
