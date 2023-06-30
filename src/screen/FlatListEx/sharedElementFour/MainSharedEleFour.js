import React from 'react';
import {Text, View, StyleSheet, Easing} from 'react-native';
import PhotographyList from './PhotographyList';
import PhotographyListDetails from './PhotographyListDetails';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

enableScreens();

const Stack = createSharedElementStackNavigator();

export default function MainSharedEleFour() {
  return (
    <Stack.Navigator
      initialRouteName="PhotographyList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'PhotographyList'} component={PhotographyList} />
      <Stack.Screen
        name={'PhotographyListDetails'}
        component={PhotographyListDetails}
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
