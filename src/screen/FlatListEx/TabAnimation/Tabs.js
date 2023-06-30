import React, {useState, useRef, useEffect} from 'react';
import Colors from '../../../themes/Colors';
import {Text, View, Dimensions, ScrollView} from 'react-native';
import Tab from './Tab';
import Indicator from './Indicator';
import normalize from '../../../utils/Dimen';

const {width, height} = Dimensions.get('screen');

export default function Tabs({data, scrollx, onItemPress}) {
  const [measures, setMeasures] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let m = [];
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          //   console.log(x, y, width, height);
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  });

  return (
    <View
      ref={containerRef}
      style={{
        position: 'absolute',
        top: normalize(60),
        width,
      }}>
      <View
        style={{
          justifyContent: 'space-evenly',
          flex: 1,
          flexDirection: 'row',
        }}>
        {data.map((item, index) => {
          return (
            <Tab
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>

      {measures.length > 0 && (
        <Indicator measures={measures} scrollx={scrollx} data={data} />
      )}
    </View>
  );
}
