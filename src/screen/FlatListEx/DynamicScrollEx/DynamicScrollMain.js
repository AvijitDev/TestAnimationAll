import {faker} from '@faker-js/faker';
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {MotiView} from 'moti';
const {width, height} = Dimensions.get('screen');
import normalize from '../../../utils/Dimen';
import Color from '../../../themes/Colors';

const data = [...Array(20).keys()].map(() => ({
  key: faker.datatype.uuid(),
  job: faker.animal.crocodilia(),
}));

const Colors = {
  active: '#FCD259ff',
  inactive: '#FCD25900',
};

const SPACING = 10;

export default function DynamicScrollMain({navigation}) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : SPACING,
      viewPosition, // percentage from the viewport starting from left handside
    });
  }, [index, viewPosition]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        ref={ref}
        data={data}
        initialScrollIndex={index}
        style={{flexGrow: 0}}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingLeft: SPACING}}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index: findex}) => {
          return (
            <TouchableOpacity onPress={() => setIndex(findex)}>
              <MotiView
                animate={{
                  backgroundColor:
                    findex === index ? Colors.active : Colors.inactive,
                    opacity: findex === index ? 1 : 0.6,
                }}
                transition={{
                  duration: 500,
                }}
                style={{
                  marginRight: SPACING,
                  padding: SPACING,
                  borderWidth: 2,
                  borderColor: Colors.active,
                //   backgroundColor:
                //     findex === index ? Colors.active : Colors.inactive,
                  borderRadius: 12,
                }}>
                <Text style={{color: '#36303f', fontWeight: '700'}}>
                  {item.job}
                </Text>
              </MotiView>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: SPACING * 10,
          justifyContent: 'space-evenly',
          width: width,
        }}>
        <View>
          <Text
            style={{
              color: '#36303f',
              fontWeight: '700',
              marginBottom: SPACING,
              alignSelf: 'center',
            }}>
            Scroll Position
          </Text>

          <View
            style={{
              flexDirection: 'row',
              //   width: width / 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => setViewPosition(0)}>
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: '#FCD259',
                  borderRadius: SPACING,
                  marginRight: SPACING,
                  marginLeft: SPACING,
                }}>
                <Text>{'<-'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewPosition(0.5)}>
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: '#FCD259',
                  borderRadius: SPACING,
                  marginRight: SPACING,
                }}>
                <Text>{'|-|'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewPosition(1)}>
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: '#FCD259',
                  borderRadius: SPACING,
                  marginRight: SPACING,
                }}>
                <Text>{'->'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text
            style={{
              color: '#36303f',
              fontWeight: '700',
              marginBottom: SPACING,
              alignSelf: 'center',
            }}>
            Navigation
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (index === 0) {
                  return;
                }

                setIndex(index - 1);
              }}>
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: '#FCD259',
                  borderRadius: SPACING,
                  marginRight: SPACING,
                  marginLeft: SPACING,
                }}>
                <Text>{'<-'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (index === data.length - 1) {
                  return;
                }

                setIndex(index + 1);
              }}>
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: '#FCD259',
                  borderRadius: SPACING,
                  marginRight: SPACING,
                }}>
                <Text>{'->'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Main')}
        style={styles.touch}>
        <Text
          style={{
            color: Color.white,
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
    backgroundColor: Color.button_color,
    height: normalize(45),
    alignSelf: 'center',
    borderRadius: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: normalize(50),
  },
});