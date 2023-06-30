import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  SafeAreaView,
} from 'react-native';
import Sliders from './Sliders';
import OnBoardingItem from './OnBoardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import MyStatusBar from '../../../utils/MyStatusBar';

export default function OnBoarding(props) {

  const sliderRef = useRef(null);
  const [currentindex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  async function scrollTo() {
    if (currentindex < Sliders.length - 1) {
      sliderRef.current.scrollToIndex({index: currentindex + 1});
    } else {
      props.navigation.navigate('Main');
      // console.log('Last Item');
    }
  }

  return (
    <>
      <MyStatusBar backgroundColor={Colors.baby_blue} />
      <SafeAreaView style={styles.container}>
        <View style={{flex: 0.8}}>
          <FlatList
            data={Sliders}
            renderItem={({item, i}) => (
              <OnBoardingItem item={item}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={16}
            decelerationRate={0}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={viewConfig}
            ref={sliderRef}
          />
        </View>

        <View style={styles.page}>
          <Paginator data={Sliders} scrollX={scrollX} />
          <NextButton
            scrollTo={scrollTo}
            percentage={(currentindex + 1) * (100 / Sliders.length)}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  page: {
    flexDirection: 'row',
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    // backgroundColor: Colors.baby_blue_l
  },
});
