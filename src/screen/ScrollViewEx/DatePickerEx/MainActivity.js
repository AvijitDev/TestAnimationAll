import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../../themes/Colors';
import Booking from './Booking';
import normalize from '../../../utils/Dimen';

export default function MainActivity({navigation}) {
  const [isBookNow, setBookNow] = useState(false);
  const [bookingDate, setBookingDate] = useState('');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {bookingDate !== '' ? (
        <Text>{'Selected Date - ' + bookingDate}</Text>
      ) : null}

      <TouchableOpacity
        style={{
          width: normalize(150),
          height: normalize(40),
          backgroundColor: Colors.blue,
          marginVertical: normalize(15),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: normalize(30),
          paddingBottom: normalize(2),
        }}
        onPress={() => setBookNow(true)}>
        <Text
          style={{
            fontSize: normalize(12),
            color: Colors.white,
            fontWeight: '500',
          }}>
          {'Book Now'}
        </Text>
      </TouchableOpacity>

      <Booking
        modalVisible={isBookNow}
        onBackdropPress={() => setBookNow(false)}
        date={new Date()}
        setDate={setBookingDate}
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
    </View>
  );
}

const styles = StyleSheet.create({
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
