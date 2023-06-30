import React from 'react';
import { Dimensions,PixelRatio } from 'react-native';

const scale = Dimensions.get('window').width / 320;

function normalize(size){

    const newSize = scale * size;

    return(
        Math.round(PixelRatio.roundToNearestPixel(newSize))
    );

};

export default normalize;

