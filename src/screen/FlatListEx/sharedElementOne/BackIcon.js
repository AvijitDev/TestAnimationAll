import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SPACING} from './theme';

export default function BackIcon({onPress}) {
  return (
    <TouchableOpacity
      style={{
        margin: SPACING,
      }}
      onPress={onPress}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
}
