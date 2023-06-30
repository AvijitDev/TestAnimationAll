import React, {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Colors from '../../../themes/Colors';
import normalize from '../../../utils/Dimen';

const Tab = forwardRef(({item, onItemPress}, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(12),
            fontWeight: '500',
            textTransform: 'uppercase',
            marginHorizontal: normalize(3)
          }}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default Tab;