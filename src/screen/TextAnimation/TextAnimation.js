import React from 'react';
import {Text, View, StyleSheet, StatusBar,TouchableOpacity} from 'react-native';
import normalize from '../../utils/Dimen';
import TextAnimator from './TextAnimator';

export default function TextAnimation({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TextAnimator
        content={
          'React Native is an open-source UI software framework created by Meta Platforms, Inc. It is used to develop applications for Android, Android TV, iOS, macOS, tvOS, Web, Windows and UWP by enabling developers to use the React framework along with native platform capabilities.'
        }
        style={styles.containerStyle}
        textStyle={styles.textStyle}
        duration={1000}
        onFinish={() => console.log('Done .........')}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={styles.touch}>
        <Text
          style={{
            color: 'black',
            fontSize: normalize(14),
            fontWeight: '600',
          }}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: normalize(15),
    padding: 0,
    backgroundColor: '#ecf0f1',
  },
  containerStyle: {},
  textStyle: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    marginBottom: 14,
  },
  touch: {
    position: 'absolute',
    top: normalize(30),
    right: normalize(30)
  },
});
