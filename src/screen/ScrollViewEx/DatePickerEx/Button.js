import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';

export default function Button(props) {

  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        justifyContent: props.justifyContent,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginVertical: props.marginVertical,
        marginHorizontal: props.marginHorizontal,
      }}>
      <TouchableOpacity 
        style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center'
        }}
        onPress={() => {
            onPress();
        }}
      >
        <Image
          style={{
            height: props.imgHeight,
            width: props.imgWidth,
            alignSelf: props.alignSelf,
            marginRight: props.imgMarginRight,
            marginLeft: props.imgMarginLeft,
            tintColor: props.tintColor,
          }}
          source={{
            uri: props.imageUri,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.any,
  borderRadius: PropTypes.number,
  height: PropTypes.number,
  justifyContent: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginVertical: PropTypes.number,
  marginHorizontal: PropTypes.number,

  imgHeight: PropTypes.number,
  imgWidth: PropTypes.any,
  alignSelf: PropTypes.string,
  imgMarginRight: PropTypes.number,
  tintColor: PropTypes.string,
  imageUri: PropTypes.string,
  imgMarginLeft: PropTypes.number,

  onPress: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: Colors.blue,
  borderRadius: normalize(30),
  width: normalize(30),
  height: normalize(30),
  justifyContent: 'center',
  imgHeight: normalize(14),
  imgWidth: normalize(13),
  alignSelf: 'center',
  imgMarginRight: normalize(2),
  tintColor: Colors.white,
  onPress: null,
};
