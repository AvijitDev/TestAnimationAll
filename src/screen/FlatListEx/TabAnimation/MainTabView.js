import React, {createRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import Colors from '../../../themes/Colors';
const {width, height} = Dimensions.get('screen');
import Tabs from './Tabs';
import normalize from '../../../utils/Dimen';

export default function MainTabView({navigation}) {
  
  const DATA = [
    {
      id: '1',
      name: 'Lotus',
      img: 'https://cdn.pixabay.com/photo/2015/10/09/00/55/lotus-978659__480.jpg',
      ref: createRef(),
    },
    {
      id: '2',
      name: 'Rose',
      img: 'https://cdn.pixabay.com/photo/2018/01/29/07/11/flower-3115353__340.jpg',
      ref: createRef(),
    },
    {
      id: '3',
      name: 'Tulips',
      img: 'https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692__340.jpg',
      ref: createRef(),
    },
    {
      id: '4',
      name: 'Sunflower',
      img: 'https://cdn.pixabay.com/photo/2016/08/28/23/24/sunflower-1627193__340.jpg',
      ref: createRef(),
    },
  ];

  const ref = React.useRef();
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const onItemPress = React.useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Animated.FlatList
          ref={ref}
          data={DATA}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollx}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item}) => {
            return (
              <View style={{width, height}}>
                <Image
                  source={{uri: item.img}}
                  style={{
                    flex: 1,
                    resizeMode: 'cover',
                  }}
                />
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    },
                  ]}
                />
              </View>
            );
          }}
        />

        <Tabs scrollx={scrollx} data={DATA} onItemPress={onItemPress} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={styles.touch}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(14),
              fontWeight: '600',
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    width: '90%',
    backgroundColor: Colors.button_color,
    height: normalize(45),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(30),
  },
});
