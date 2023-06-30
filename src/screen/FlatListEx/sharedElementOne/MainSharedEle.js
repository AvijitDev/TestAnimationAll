import React from 'react';
import {Text, View, StyleSheet, Easing} from 'react-native';
import List from './List';
import Details from './Details';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

enableScreens();

// https://github.com/IjzerenHein/react-navigation-shared-element/tree/native-stack
// https://github.com/IjzerenHein/react-navigation-shared-element/blob/native-stack/docs/API.md
// yarn add react-navigation-shared-element react-native-shared-element
// react-native link react-native-shared-element

const Stack = createSharedElementStackNavigator();

export default function MainSharedEle() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'List'} component={List} />
      <Stack.Screen
        name={'Details'}
        component={Details}
        options={() => ({
          gestureEnabled: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {duration: 700, easing: Easing.inOut(Easing.ease)},
            },
            close: {
              animation: 'timing',
              config: {duration: 700, easing: Easing.inOut(Easing.ease)},
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
