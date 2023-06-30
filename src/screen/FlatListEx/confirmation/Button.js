import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import Colors from '../../../themes/Colors';
import PropTypes from 'prop-types';
import normalize from '../../../utils/Dimen';
// import Fonts from '../themes/Fonts';
import LinearGradient from 'react-native-linear-gradient';

export default function Button(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={props.disabled}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        marginLeft: props.marginLeft,
        marginRight: props.marginRight,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        shadowColor: Colors.baby_blue_l,
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowRadius: normalize(10),
        shadowOpacity: normalize(0.5),
        elevation: normalize(5),
      }}
      onPress={() => {
        onPress();
      }}>
      <LinearGradient
        colors={[
          Colors.periwinkle_blue,
          Colors.periwinkle_blue,
          Colors.baby_blue,
        ]}
        style={styles.gradient}
        useAngle={true}
        angle={230}>

        {props.addLeftIcon ? (
          <Image
            source={props.leftIcon}
            style={styles.img1}
            resizeMode={'stretch'}
          />
        ) : null}

        <Text style={[styles.txt,{
          fontSize: props.fontSize,
          fontFamily: props.fontFamily
        }]}>{props.title}</Text>

        {props.addRightIcon ? (
          <Image
            source={props.rightIcon}
            style={styles.img}
            resizeMode={'stretch'}
          />
        ) : null}
      </LinearGradient>
    </TouchableOpacity>
  );
}
Button.propTypes = {
  height: PropTypes.number,
  width: PropTypes.any,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  disabled: PropTypes.bool,
  textMarginTop: PropTypes.number,
  fontWeight: PropTypes.string,
  tintColor: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  sideImage: PropTypes.any,
  issideImage: PropTypes.bool,
  elevation: PropTypes.number,
  textAlign: PropTypes.string,
  fontFamily: PropTypes.string,
  marginLeft: PropTypes.any,
  marginRight: PropTypes.any,
  addRightIcon: PropTypes.bool,
  rightIcon: PropTypes.any,
  addLeftIcon: PropTypes.bool,
  leftIcon: PropTypes.any,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.any,
};

Button.defaultProps = {
  height: normalize(45),
  width: '85%',
  // backgroundColor: Colors.white,
  borderRadius: normalize(30),
  color: Colors.white,
  fontSize: normalize(14),
  title: 'TITLE',
  onPress: null,
  alignSelf: 'center',
  marginTop: normalize(40),
  marginBottom: 0,
  marginHorizontal: 0,
  disabled: false,
  textMarginTop: 0,
  fontWeight: Platform.OS === 'android' ? '600' : '700',
  borderWidth: 0,
  issideImage: false,
  elevation: 0,
  textAlign: 'center',
  marginLeft: null,
  marginRight: null,
  tintColor: Colors.white,
  addRightIcon: false,
  addLeftIcon: false,
  fontSize: normalize(14),
  // fontFamily: Fonts.Poppins_Bold,
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    color: Colors.white,
    fontWeight: '600'
  },
  img: {
    width: normalize(18),
    height: normalize(18),
    tintColor: Colors.white,
    marginLeft: normalize(2),
  },
  img1: {
    width: normalize(18),
    height: normalize(18),
    tintColor: Colors.white,
    marginRight: normalize(8),
  }
});
