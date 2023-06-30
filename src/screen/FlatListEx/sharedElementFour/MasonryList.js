import React, {useEffect, useRef, useState} from 'react';
import Masonry from '@react-native-seoul/masonry-list';
import {View, Image, SafeAreaView} from 'react-native';
import {width, SPACING} from './theme';

export default function MasonryList() {
  const photographyImages = [
    'https://cdn.pixabay.com/photo/2015/10/09/00/55/lotus-978659__480.jpg',
    'https://cdn.pixabay.com/photo/2018/01/29/07/11/flower-3115353__340.jpg',
    'https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692__340.jpg',
    'https://cdn.pixabay.com/photo/2016/08/28/23/24/sunflower-1627193__340.jpg',
    'https://cdn.pixabay.com/photo/2016/07/10/09/41/lavender-1507499__340.jpg',
    'https://cdn.pixabay.com/photo/2016/11/29/09/16/roses-1868669__340.jpg',
    'https://cdn.pixabay.com/photo/2012/12/14/11/36/leaves-69999__340.jpg',
    'https://cdn.pixabay.com/photo/2018/05/01/18/30/lilac-3366467__340.jpg',
    'https://cdn.pixabay.com/photo/2020/11/23/15/00/butterfly-5770034__340.jpg',
    'https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538__340.jpg',
  ];

  const items = [...Array(10).keys()].map(i => {
    return {
      key: String(i),
      height: width * Math.max(0, Math.random()) + width / 45,
      image: photographyImages[i],
    };
  });

  return (
    <Masonry
      data={items}
      numColumns={2}
      style={{flex: 1, alignSelf: 'stretch'}}
      contentContainerStyle={{
        paddingHorizontal: SPACING / 2,
        paddingBottom: 40,
        alignSelf: 'stretch',
      }}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              marginHorizontal: SPACING / 1.2,
              backgroundColor: '#fff',
              borderRadius: 15,
              overflow: 'hidden',
              flex: 1,
              marginTop: 20,
            }}>
            <Image
              source={{uri: item.image}}
              style={{
                height: item.height > 150 ? 150 : 280,
                resizeMode: 'cover',
                alignSelf: 'stretch',
              }}
            />
          </View>
        );
      }}
    />
  );
}
