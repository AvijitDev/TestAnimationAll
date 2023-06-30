import React, {useState, Fragment} from 'react';
import {Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import MyStatusBar from '../../../utils/MyStatusBar';
import CountryPicker from './CountryPicker';
import CountryList from './CountryList';

export default function SelectCountryMain({navigation}) {
  const [countryCode, setCountryCode] = useState('');
  const [countryVisible, setCountryVisible] = useState(false);

  return (
    <Fragment>
      <MyStatusBar
        backgroundColor={Colors.cerulean_blue}
        barStyle={'light-content'}
      />
      <SafeAreaView style={styles.container}>
        <Text style={styles.txt}>{'+'+countryCode}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCountryVisible(true)}>
          <Text style={{
              color: Colors.white,
              fontSize: normalize(14),
              fontWeight: '500'
          }}>Select Country</Text>
        </TouchableOpacity>

        <CountryPicker
          modalVisible={countryVisible}
          onBackdropPress={() => setCountryVisible(false)}
          data={CountryList}
          setData={setCountryCode}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Main')}
          style={styles.touch}>
          <Text
            style={{
              color: Colors.white,
              fontSize: normalize(14),
              fontWeight: '600',
            }}>
            Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  txt: {
    color: Colors.blue,
    fontWeight: '500',
    fontSize: normalize(18),
    marginVertical: normalize(40),
    marginHorizontal: normalize(15),
    alignSelf: 'center'
  },
  button: {
    width: '90%',
    backgroundColor: Colors.button_color,
    height: normalize(45),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    width: '90%',
    backgroundColor: Colors.button_color,
    height: normalize(45),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(50),
  },
});
