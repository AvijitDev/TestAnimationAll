import React,{useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  SafeAreaView,
  Animated,
} from 'react-native';
import Colors from '../../../themes/Colors';
import normalize from '../../../utils/Dimen';

export default function OnBoardingItem({item}) {

  const {height, width} = useWindowDimensions();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          width,
        },
      ]}>
      <Image
        source={item.image}
        style={[
          styles.image,
          {
            width,
          },
        ]}
        resizeMode={'stretch'}
      />
      <View
        style={{
          flex: 0.3,
          marginHorizontal: normalize(16),
        }}>
        <Animated.Text style={styles.title}>{item.title}</Animated.Text>
        <Text style={styles.des}>{item.description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    marginBottom: normalize(50),
  },
  title: {
    width: '100%',
    // fontFamily: Fonts.Poppins_ExtraBold,
    fontWeight: '800',
    fontSize: normalize(16),
    color: Colors.black,
    marginBottom: normalize(8),
  },
  des: {
    width: '100%',
    fontSize: normalize(11),
    flexWrap: 'wrap',
    // fontFamily: Fonts.Poppins_Regular,
    color: Colors.spicy_pink,
    fontWeight: '500'
  },
});
