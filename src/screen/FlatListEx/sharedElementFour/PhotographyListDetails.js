import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import MasonryList from './MasonryList';
import {height, width} from './theme';
import UserCard from './UserCard';
import * as Animatable from 'react-native-animatable';

const PhotographyListDetails = ({navigation, route}) => {
  const {item} = route.params;

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          padding: 12,
          position: 'absolute',
          top: 35,
          left: 20,
          zIndex: 2,
        }}>
        <Text
          style={{
            color: '#fff',
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <SharedElement id={`item.${item.key}.image`}>
        <Image
          source={{uri: item.image}}
          style={[
            StyleSheet.absoluteFillObject,
            {
              resizeMode: 'cover',
              height: height / 2,
            },
          ]}
        />
      </SharedElement>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: height / 2 - 100,
        }}>
        <SharedElement id={`item.${item.key}.userCard`}>
          <UserCard user={item.user} />
        </SharedElement>
        <Animatable.View
          style={{
            width: width
          }}
          animation="fadeInUp"
          duration={800}
          delay={400}
          useNativeDriver>
          <MasonryList />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

PhotographyListDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;

  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `item.${item.key}.userCard`,
    },
  ];
};

export default PhotographyListDetails;
