import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  FlatList,
  SafeAreaView,
} from 'react-native';
import normalize from '../../../utils/Dimen';
import Colors from '../../../themes/Colors';
import {faker} from '@faker-js/faker';
import * as Animatable from 'react-native-animatable';

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key:
      Math.floor(Math.random() * 87 + 1) * Math.floor(Math.random() * 65 + 1),
    image: faker.image.avatar(),
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

export default function ScrollItemAnimMain2({navigation}) {
  function RenderItem({item, index}) {
    return (
      <Animatable.View
        animation={'fadeInUp'}
        duration={1000}
        delay={index * 200}
        style={{
          width: '90%',
          height: normalize(120),
          backgroundColor: '#fff',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          marginBottom: normalize(15),
          borderRadius: normalize(10),
          flexDirection: 'row',
          alignItems: 'center',
          padding: normalize(10),
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            height: normalize(70),
            width: normalize(70),
            borderRadius: normalize(100),
          }}
        />

        <View
          style={{
            width: '70%',
            height: '100%',
            marginLeft: normalize(10),
            borderLeftColor: Colors.baby_blue,
            borderLeftWidth: normalize(1),
            justifyContent: 'center',
            paddingLeft: normalize(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: normalize(5),
            }}>
            <Text
              style={{
                width: '35%',
                color: Colors.prussian_blue,
                fontSize: normalize(11),
                fontWeight: '500',
              }}>
              Name :
            </Text>
            <Text
              style={{
                width: '55%',
              }}>
              {item.name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: normalize(5),
            }}>
            <Text
              style={{
                width: '35%',
                color: Colors.prussian_blue,
                fontSize: normalize(11),
                fontWeight: '500',
              }}>
              Job Title :
            </Text>
            <Text
              style={{
                width: '55%',
              }}>
              {item.jobTitle}
            </Text>
          </View>

          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text
              style={{
                width: '35%',
                color: Colors.prussian_blue,
                fontSize: normalize(11),
                fontWeight: '500',
              }}>
              Email :
            </Text>
            <Text
              style={{
                width: '55%',
              }}>
              {item.email}
            </Text>
          </View>
        </View>
      </Animatable.View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        bounces={false}
        keyExtractor={item => item.index}
        contentContainerStyle={{
          paddingTop: normalize(15),
          paddingBottom: normalize(80),
        }}
        renderItem={RenderItem}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={{
          width: normalize(45),
          height: normalize(45),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.cerulean_blue,
          position: 'absolute',
          bottom: normalize(50),
          alignSelf: 'center',
          borderRadius: normalize(60),
        }}>
        <Text
          style={{
            color: Colors.white,
            fontSize: normalize(16),
          }}>
          {'<'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
