import React, {useRef} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {width, height} from './theme';
import LinearGradient from 'react-native-linear-gradient';
import {avatars} from './Travelup';
import {SharedElement} from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';

const Height = () => {
  return (
    <View>
      <Text style={styles.heading}>Height</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={styles.number}>
          {Math.floor(Math.random() * 2200) + 1000}
        </Text>
        <Text style={styles.numberType}>m</Text>
      </View>
    </View>
  );
};

const Distance = () => {
  return (
    <View>
      <Text style={styles.heading}>Distance</Text>
      <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
        <Text style={styles.number}>{Math.floor(Math.random() * 40) + 20}</Text>
        <Text style={styles.numberType}>km</Text>
      </View>
    </View>
  );
};

const Avatars = () => {
  return (
    <View>
      <Text style={styles.heading}>Your team</Text>
      <View style={{flexDirection: 'row'}}>
        {avatars.map((uri, index) => {
          return (
            <Image
              key={index}
              source={{uri}}
              style={[
                styles.avatar,
                {
                  zIndex: avatars.length - index,
                  marginLeft: index === 0 ? 0 : -20,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const TravelUpDetails = ({navigation, route}) => {
  const {item} = route.params;
  const topRef = useRef();
  const bottomRef = useRef();

  return (
    <View style={{flex: 1, backgroundColor: '#1E1D1D'}}>
      <SharedElement id={`item.${item.key}.image`} style={styles.image}>
        <Image source={{uri: item.image}} style={styles.image} />
      </SharedElement>
      <Animatable.View
        ref={topRef}
        duration={800}
        delay={600}
        animation={'fadeIn'}
        style={[
          StyleSheet.absoluteFillObject,
          {backgroundColor: 'rgba(0,0,0,0.3'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            Promise.all([
              topRef.current.fadeOut(300),
              bottomRef.current.fadeOut(300),
            ]).then(() => {
              navigation.goBack();
            });
          }}
          style={{
            padding: 12,
            position: 'absolute',
            top: 40,
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

        <LinearGradient
          colors={['transparent', '#000', '#000']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: height / 2,
          }}
        />
      </Animatable.View>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 70,
          justifyContent: 'flex-end',
        }}>
        <View style={{paddingHorizontal: 20, alignItems: 'flex-start'}}>
          <SharedElement id={`item.${item.key}.name`}>
            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
              {item.name}
            </Text>
          </SharedElement>
        </View>
        <Animatable.View
          ref={bottomRef}
          animation="fadeIn"
          duration={800}
          delay={700}
          style={{
            width,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <Avatars />
          <Distance />
          <Height />
        </Animatable.View>
      </View>
    </View>
  );
};

TravelUpDetails.sharedElements = (route, otherRoute, showing) => {
  const {item} = route.params;

  return [
    {
      id: `item.${item.key}.image`,
    },
    {
      id: `item.${item.key}.name`,
    },
  ];
};

export default TravelUpDetails;

const styles = StyleSheet.create({
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: '#000',
  },
  heading: {
    color: '#fff',
    fontWeight: '300',
    marginBottom: 8,
  },
  number: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 32,
    marginRight: 2,
    marginBottom: -5,
  },
  numberType: {
    color: '#fff',
    fontSize: 12,
  },
  name: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: '900',
    fontSize: 62,
  },
});
