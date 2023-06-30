import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import normalize from '../../../utils/Dimen';

const API_URL = `https://api.pexels.com/v1/curated?page=1&per_page=40`;
const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async () => {
  const response = await fetch(`${API_URL}`, {
    method: 'GET',
  });

  let images = null;
  if (response.ok) {
    const {photos} = await response.json();
    images = photos;
  }

  return images;
};

export default function GalleryViewMain({navigation}) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPexels();
      setImages(images);
    };

    fetchImages();
  }, []);

  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    // scroll faltlist
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!images) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={ev => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width),
          );
        }}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.src.portrait}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: IMAGE_SIZE}}
        contentContainerStyle={{paddingHorizontal: SPACING}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.touch}>
        <Text style={styles.txt}>back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  touch: {
    position: 'absolute',
    right: normalize(20),
    top: normalize(45),
  },
  txt: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#fff'
  },
});
