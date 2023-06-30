import React from 'react';
import {Text, View, StyleSheet, Easing} from 'react-native';
import TravelUpList from './TravelUpList';
import TravelUpDetails from './TravelUpDetails';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

enableScreens();

// https://github.com/IjzerenHein/react-navigation-shared-element/tree/native-stack
// https://github.com/IjzerenHein/react-navigation-shared-element/blob/native-stack/docs/API.md
// yarn add react-navigation-shared-element react-native-shared-element
// react-native link react-native-shared-element

// https://www.npmjs.com/package/@faker-js/faker

const Stack = createSharedElementStackNavigator();

export default function MainShareEleThree() {
  return (
    <Stack.Navigator
      initialRouteName="TravelUpList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'TravelUpList'} component={TravelUpList} />
      <Stack.Screen
        name={'TravelUpDetails'}
        component={TravelUpDetails}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 500},
            },
            close: {
              animation: 'timing',
              config: {duration: 500},
            },
          },
          cardStyleInterpolator: ({current: {progress}}) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
