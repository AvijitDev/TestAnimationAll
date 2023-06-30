import React from 'react';
import {Text,View} from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App(){
  return(
    <View style={{
      flex: 1,
    }}>
      <StackNavigator/>
    </View>
  )
}