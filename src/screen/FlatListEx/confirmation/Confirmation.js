import React, {Fragment, useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
  View,
  ScrollView,
} from 'react-native';
import Colors from '../../../themes/Colors';
import normalize from '../../../utils/Dimen';
import MyStatusBar from '../../../utils/MyStatusBar';
// import Fonts from '../../../themes/Fonts';
import Sliders from './Sliders';
import ConfirmationItem from './ConfirmationItem';
import Button from './Button';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.74;

export default function Confirmation(props) {
  const scrollx = useRef(new Animated.Value(0)).current;

  return (
    <Fragment>
      <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.txt}>What is your goal ?</Text>
        <Text style={styles.txt1}>
          It will help us to choose a best program for you
        </Text>

        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={Sliders}
          keyExtractor={item => item.id}
          horizontal
          snapToInterval={ITEM_SIZE}
          bounces={false}
          decelerationRate={0}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
          renderItem={({item, index}) => {
            return (
              <ConfirmationItem scrollx={scrollx} item={item} index={index} />
            );
          }}
        />

        <Button
          onPress={() => props.navigation.navigate('Main')}
          title={'Confirm'}
          marginTop={5}
          marginBottom={15}
        />
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  txt: {
    // fontFamily: Fonts.Poppins_Bold,
    fontSize: normalize(18),
    marginTop: normalize(12),
    color: Colors.rangoon_green,
    fontWeight: '600'
  },
  txt1: {
    fontSize: normalize(11.5),
    // backgroundColor: Colors.rangoon_green,
    width: '50%',
    textAlign: 'center',
    marginTop: normalize(5),
    color: Colors.spicy_pink,
  },
});
