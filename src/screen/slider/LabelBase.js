import React from 'react';
import { Animated,View,Text,StyleSheet } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

const width = 50;
const pointerWidth = width * 0.47;

export default function LabelBase(props) {

    const { position, value, leftDiff, pressed } = props;
    const scaleValue = React.useRef(new Animated.Value(0.1)); // Behaves oddly if set to 0
    const cachedPressed = React.useRef(pressed);
  
    React.useEffect(() => {
      Animated.timing(scaleValue.current, {
        toValue: pressed ? 1 : 0.1,
        duration: 200,
        delay: pressed ? 0 : 2000,
        useNativeDriver: false,
      }).start();
      cachedPressed.current = pressed;
    }, [pressed]);
  
    return (
      Number.isFinite(position) &&
      Number.isFinite(value) && (
        <AnimatedView
          style={[
            styles.sliderLabel,
            {
              left: position - width / 2,
              transform: [
                { translateY: width },
                { scale: scaleValue.current },
                { translateY: -width },
              ],
            },
          ]}
        >
          <View style={styles.pointer} />
          <Text style={styles.sliderLabelText}>{value}</Text>
        </AnimatedView>
      )
    );
  }

  const styles = StyleSheet.create({
    parentView: {
      position: 'relative',
    },
    sliderLabel: {
      position: 'absolute',
      justifyContent: 'center',
      bottom: '100%',
      width: width,
      height: width,
    },
    sliderLabelText: {
      textAlign: 'center',
      lineHeight: width,
      borderRadius: width / 2,
      borderWidth: 2,
      borderColor: '#999',
      backgroundColor: '#fff',
      flex: 1,
      fontSize: 18,
      color: '#aaa',
    },
    pointer: {
      position: 'absolute',
      bottom: -pointerWidth / 4,
      left: (width - pointerWidth) / 2,
      transform: [{ rotate: '45deg' }],
      width: pointerWidth,
      height: pointerWidth,
      backgroundColor: '#999',
    },
  });