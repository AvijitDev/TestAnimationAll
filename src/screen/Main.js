import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../themes/Colors';
import normalize from '../utils/Dimen';

export default function Main({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txt}>All Custom Component</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          paddingVertical: normalize(10),
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Text>FlatList Animation</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('OnBoarding')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Onboarding Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Confirmation')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Confirmation Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MaskedMainView')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>MaskedMainView</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabView')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Header Tab View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('FlatListMainView')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Render View Item Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ProductItemAniMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Product Items Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainSharedEle')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Shared Element Transition Animation - 1
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainSharedEleTwo')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Shared Element Transition Animation - 2
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainShareEleThree')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Shared Element Transition Animation - 3
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainSharedEleFour')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Shared Element Transition Animation - 4
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainSharedEleFive')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Shared Element Transition Animation - 5
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainSharedEleSix')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Shared Element Transition Animation - 6
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('GalleryViewMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Gallery View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('DynamicScrollMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>
              Dynamic size item scroll inside Flatlist
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ScrollItemMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Scroll item Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ScrollItemAnimMain2')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Scroll item Animation 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('CarouselAniMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Carousel Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ParallaxCarouselMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Parallax Carousel Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('OnBoardingAniMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Onbording Screen Animation</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            onPress={() => navigation.navigate('TCarouselAniMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>3D Carousel Animation</Text>
          </TouchableOpacity>

          <Text>Search Cuntry</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Search</Text>
          </TouchableOpacity>

          <Text>Accordian Animation</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('AccrodianMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Accordian Screen</Text>
          </TouchableOpacity>

          <Text>ScrollView Animation</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainActivity')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Select Date ( Date Picker )</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SelectCountryMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Select Country Picker</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('StickyFooter')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Sticky Footer</Text>
          </TouchableOpacity>

          <Text>Animation</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('AnimatedCircle')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Animation Circle</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AdCarouselAniMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Advance Carousel Animation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('PanGestureHandlerMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Pan Gesture Handler</Text>
          </TouchableOpacity>

          <Text>Calender</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Calender')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Custom Calender</Text>
          </TouchableOpacity>

          <Text>Text Animation</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('TextAnimation')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Text Animation</Text>
          </TouchableOpacity>

          <Text>Slider</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MultipleSliderMain')}
            style={styles.touch}>
            <Text style={styles.touch_txt}>Multiple Slider</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: '100%',
    height: normalize(45),
    backgroundColor: Colors.box_color,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  touch: {
    width: '100%',
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.button_color,
    marginVertical: normalize(10),
  },
  touch_txt: {
    fontSize: normalize(14),
    color: Colors.white,
    fontWeight: '600',
  },
});
