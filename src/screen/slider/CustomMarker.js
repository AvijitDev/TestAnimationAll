import React from 'react';
import { StyleSheet, Image,View } from 'react-native';
import Images from '../../themes/Icons';
import Colors from '../../themes/Colors';

class CustomMarker extends React.Component {
  render() {
    return (
      <View style={[styles.vv,{
        backgroundColor: this.props.pressed ? Colors.baby_blue : Colors.cerulean_blue
      }]}>

      </View>
      // <Image
      //   style={styles.image}
      //   source={
      //     this.props.pressed ? Images.arrow_up : Images.arrow_down
      //   }
      //   resizeMode="contain"
      // />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
  },
  vv: {
    height: 40,
    width: 40,
    borderRadius: 40,
  }
});

export default CustomMarker;