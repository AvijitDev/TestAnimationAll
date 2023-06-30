import React from 'react';
import {StatusBar, Platform, StyleSheet, SafeAreaView} from 'react-native';
import propTypes, {bool} from 'prop-types';
import Colors from '../themes/Colors';
import normalize from './Dimen';
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = ({backgroundColor, barStyle, ...props}) => (
  <SafeAreaView
    style={Platform.OS === 'ios' && [styles.statusBar, {backgroundColor}]}>
    <StatusBar
      translucent={false}
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      hidden={false}
    />
  </SafeAreaView>
);

export default MyStatusBar;
MyStatusBar.propTypes = {
  backgroundColor: propTypes.string,
  barStyle: propTypes.string,
  height: propTypes.number,
  //hidden:propTypes.bool,
};

MyStatusBar.defaultProps = {
  backgroundColor: Colors.white,
  barStyle: 'light-content',
  height: normalize(20),
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});