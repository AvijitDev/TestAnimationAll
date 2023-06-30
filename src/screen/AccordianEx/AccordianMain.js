import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import AccordianCom from './component/AccordianCom';
import Colors from '../../themes/Colors';
import Icons from '../../themes/Icons';
import normalize from '../../utils/Dimen';

export default function AccrodianMain({navigation}) {
  const DATA = [
    {
      title: 'Non Veg Biryanis',
      data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
      expanded: false,
    },
    {
      title: 'Pizzas',
      data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.',
      expanded: false,
    },
    {
      title: 'Drinks',
      data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.',
      expanded: false,
    },
    {
      title: 'Deserts',
      data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
      expanded: false,
    },
  ];

  const [AccrodianData, setAccrodianData] = useState(DATA);

  function renderAccordians({item, index}) {
    return (
      <AccordianCom
        title={item.title}
        data={item.data}
        index={index}
        expanded={item.expanded}
        arr={AccrodianData}
        setData={setAccrodianData}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: normalize(20),
        }}
        data={AccrodianData}
        horizontal={false}
        renderItem={renderAccordians}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
