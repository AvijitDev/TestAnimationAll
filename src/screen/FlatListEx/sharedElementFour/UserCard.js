import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {SPACING, width} from './theme';

const Details = ({data}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor: '#134566',
        marginTop: SPACING
      }}>
      {data.map(item => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: '600',
                fontSize: 14,
              }}>
              {item.value}
            </Text>
            <Text
              style={{
                color: 'rgba(0,0,0,0.5)',
                fontWeight: '400',
                fontSize: 13,
              }}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default function UserCard({user}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          //   backgroundColor: '#232455',
        }}>
        <Image
          source={{uri: user.avatar}}
          style={{
            width: 75,
            height: 75,
            borderRadius: 100 / 2,
          }}
        />
        <View
          style={{
            height: 60,
            justifyContent: 'center',
            paddingLeft: 20,
          }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.job}>{user.job}</Text>
        </View>
      </View>
      <Details data={user.details} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    backgroundColor: '#fff',
    height: 155,
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  name: {
    color: '#000',
    fontWeight: '900',
    fontSize: 20,
  },
  job: {
    color: 'rgba(0,0,0,0.3)',
    fontWeight: '400',
    fontSize: 16,
  },
});
