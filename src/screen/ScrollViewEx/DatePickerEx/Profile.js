import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import Button from './Button';
import PropTypes from 'prop-types';

export default function Profile(props) {

    function onPress() {
        if (props.onPress) {
          props.onPress();
        }
      }

  return (
    <View
      style={{
        flexDirection: 'row',
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
        alignItems: props.alignItems
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://bit.ly/3F3kjUO',
          }}
          style={styles.img}
        />

        <View>
          <Text style={styles.txt}>DR. Lorem Ipsum</Text>
          <Text style={styles.txt1}>MBBS</Text>
        </View>
      </View>

      <Button
        backgroundColor={Colors.hawkes_blue}
        imageUri={'https://cdn-icons-png.flaticon.com/512/747/747310.png'}
        onPress={() => {
            onPress();
        }}
        imgMarginLeft={normalize(2)}
        marginHorizontal={normalize(10)}
        tintColor={Colors.blue}
        imgWidth={normalize(16)}
        imgHeight={normalize(16)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: normalize(40),
    height: normalize(40),
    borderRadius: normalize(60),
    shadowColor: Colors.blue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.35,
    elevation: Platform.OS === 'android' ? 15 : 10,
    marginRight: normalize(10),
  },
  txt: {
    color: Colors.blue,
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: normalize(10),
  },
  txt1: {
    fontSize: normalize(8),
    fontWeight: '500',
    marginTop: normalize(2),
  },
});

Profile.propTypes = {
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
    alignItems: PropTypes.string,
  
    onPress: PropTypes.func,
  };
  
  Profile.defaultProps = {
    backgroundColor: Colors.blue,
    width: normalize(250),
    height: normalize(50),
    justifyContent: 'space-between',
    imgHeight: normalize(14),
    imgWidth: normalize(13),
    alignSelf: 'center',
    imgMarginRight: normalize(2),
    tintColor: Colors.white,
    onPress: null,
    alignItems: 'center'
  };
  