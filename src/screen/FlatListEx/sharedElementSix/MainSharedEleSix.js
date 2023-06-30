import React from 'react';
import {Text, View, StyleSheet, Easing} from 'react-native';
import UrbanEarsList from './UrbanEarsList';
import UrbanEarsDetails from './UrbanEarsDetails';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

enableScreens();

const Stack = createSharedElementStackNavigator();

export default function MainSharedEleFive() {
  return (
    <Stack.Navigator
      initialRouteName="UrbanEarsList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'UrbanEarsList'} component={UrbanEarsList} />
      <Stack.Screen
        name={'UrbanEarsDetails'}
        component={UrbanEarsDetails}
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
