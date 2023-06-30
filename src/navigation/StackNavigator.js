import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Main from '../screen/Main';
import OnBoarding from '../screen/FlatListEx/onBoarding/OnBoarding';
import Confirmation from '../screen/FlatListEx/confirmation/Confirmation';
import AccrodianMain from '../screen/AccordianEx/AccordianMain';
import MaskedMainView from '../screen/FlatListEx/maskedOnBoarding/MaskedMainView';
import MainTabView from '../screen/FlatListEx/TabAnimation/MainTabView';
import MainActivity from '../screen/ScrollViewEx/DatePickerEx/MainActivity';
import Search from '../screen/CountryPicker.js/Search';
import AnimatedCircle from '../screen/Animation/animationCircle/AnimatedCircle';
import SelectCountryMain from '../screen/CountryPicker.js/PickerCom/SelectCountryMain';
import Calender from '../screen/CalenderEx/Calender';
import FlatListMainView from '../screen/FlatListEx/StackCarousel/FlatlistMainView';
import ProductItemAniMain from '../screen/FlatListEx/ProductItemAnim/ProductItemAniMain';
import TextAnimation from '../screen/TextAnimation/TextAnimation';
import MainSharedEle from '../screen/FlatListEx/sharedElementOne/MainSharedEle';
import MainSharedEleTwo from '../screen/FlatListEx/sharedElementTwo/MainSharedEleTwo';
import MainShareEleThree from '../screen/FlatListEx/sharedElementThree/MainShareEleThree';
import MainSharedEleFour from '../screen/FlatListEx/sharedElementFour/MainSharedEleFour';
import MainSharedEleFive from '../screen/FlatListEx/sharedElementFive/MainSharedEleFive';
import MainSharedEleSix from '../screen/FlatListEx/sharedElementSix/MainSharedEleSix';
import GalleryViewMain from '../screen/FlatListEx/galleryViewEX/GalleryViewMain';
import DynamicScrollMain from '../screen/FlatListEx/DynamicScrollEx/DynamicScrollMain';
import ScrollItemMain from '../screen/FlatListEx/scrollItemAnimation/ScrollItemMain';
import CarouselAniMain from '../screen/FlatListEx/carouselAnim/CarouselAniMain';
import ParallaxCarouselMain from '../screen/FlatListEx/ParallaxCarousel/ParallaxCarouselMain';
import OnBoardingAniMain from '../screen/FlatListEx/onBoardingAnim/OnBoardingAniMain';
import AdCarouselAniMain from '../screen/Animation/advancedCarouselAnim/AdCarouselAniMain';
import ScrollItemAnimMain2 from '../screen/FlatListEx/scrollItemAnimation2/ScrollItemAnimMain2';
import PanGestureHandlerMain from '../screen/Animation/PanGestureHandlerEx/PanGestureHandlerMain';
import TCarouselAniMain from '../screen/FlatListEx/3DCarouselAnimation/TCarouselAniMain';
import MultipleSliderMain from '../screen/slider/MultipleSliderMain';

export default function StackNavigator() {
  const allScreens = {
    Main: Main,
    OnBoarding: OnBoarding,
    Confirmation: Confirmation,
    AccrodianMain: AccrodianMain,
    MaskedMainView: MaskedMainView,
    MainTabView: MainTabView,
    MainActivity: MainActivity,
    Search: Search,
    AnimatedCircle: AnimatedCircle,
    SelectCountryMain: SelectCountryMain,
    Calender: Calender,
    FlatListMainView: FlatListMainView,
    ProductItemAniMain: ProductItemAniMain,
    MainSharedEle: MainSharedEle,
    MainSharedEleTwo: MainSharedEleTwo,
    TextAnimation: TextAnimation,
    MainShareEleThree: MainShareEleThree,
    MainSharedEleFour: MainSharedEleFour,
    MainSharedEleFive: MainSharedEleFive,
    MainSharedEleSix: MainSharedEleSix,
    GalleryViewMain: GalleryViewMain,
    DynamicScrollMain: DynamicScrollMain,
    ScrollItemMain: ScrollItemMain,
    CarouselAniMain: CarouselAniMain,
    ParallaxCarouselMain: ParallaxCarouselMain,
    OnBoardingAniMain: OnBoardingAniMain,
    AdCarouselAniMain: AdCarouselAniMain,
    ScrollItemAnimMain2: ScrollItemAnimMain2,
    PanGestureHandlerMain: PanGestureHandlerMain,
    TCarouselAniMain: TCarouselAniMain,
    MultipleSliderMain: MultipleSliderMain,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries({
          ...allScreens,
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
