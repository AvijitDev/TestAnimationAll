import React from "react";
import { View,StyleSheet,Image } from 'react-native';
import { ICON_SIZE } from './theme';

export default function Icon({ uri }){
    return(
        <View style={[styles.imageContainer]}>
            <Image source={uri} style={[styles.image]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        borderRadius: ICON_SIZE / 2,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: ICON_SIZE * 0.6,
        width: ICON_SIZE * 0.6,
        resizeMode: 'contain',
    }

})