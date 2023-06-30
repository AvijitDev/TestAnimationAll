import React from 'react';
import {Text, View, StyleSheet, Easing} from 'react-native';
import TravelList from './TravelList';
import TravelListDetails from './TravelListDetails';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

enableScreens();

const Stack = createSharedElementStackNavigator();

export default function MainSharedEleTwo() {
  return (
    <Stack.Navigator
      initialRouteName="TravelList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'TravelList'} component={TravelList} />
      <Stack.Screen
        name={'TravelListDetails'}
        component={TravelListDetails}
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
