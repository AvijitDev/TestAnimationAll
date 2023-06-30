import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  StatusBar,
  Easing,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import DATA, {detailsList, iconsByType} from './DATA';
import {Transition, Transitioning} from 'react-native-reanimated';
import posed, {Transition as PoseTransition} from 'react-native-pose';

const {width, height} = Dimensions.get('window');

const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8;

const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};

const Item = ({children, style}) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const Icon = ({type}) => {
  return (
    <Image
      source={type}
      style={{
        tintColor: '#A5A6AA',
        width: 26,
        height: 26,
        marginRight: 15,
      }}
    />
  );
};

const Description = ({index, text, color}) => {
  return (
    <Item>
      <Text
        key={`description-${index}`}
        style={{
          fontSize: 16,
          color,
        }}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({index, text, color}) => {
  return (
    <Item
      style={{
        height: TITLE_SIZE * 3,
        justifyContent: 'flex-end',
      }}>
      <Text
        key={`title-${index}`}
        style={{
          fontSize: TITLE_SIZE,
          fontWeight: '900',
          color,
        }}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({color, index}) => {
  return (
    <View style={{marginVertical: SPACING}}>
      {detailsList.map(key => {
        return (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}>
            <Icon type={iconsByType[key]} />
            <Item style={{flex: 1, height: 26, justifyContent: 'center'}}>
              <Text
                key={`${key}-${index}`}
                style={{
                  fontSize: 16,
                  color,
                  fontWeight: '700',
                }}>
                {DATA[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeIn"
    />
    <Transition.Change />
    <Transition.In
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeOut"
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: 'tween',
    duration: DURATION,
    easing: Easing.elastic(0.9),
  },
};

const PoseView = posed.View({
  enter: {opacity: 1, rotate: '0.deg', ...config},
  exit: {opacity: 0, rotate: '180deg', ...config},
});

export default function AdCarouselAniMain({navigation}) {
  const [index, setIndex] = useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightBg : colors.darkBg;

  const activeIndex = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION * 0.7,
      useNativeDriver: true,
    }).start();

    StatusBar.setBarStyle(
      index % 2 === 0 ? 'dark-content' : 'light-content',
      true,
    );
  }, [animation, activeIndex]);

  const setActiveIndex = useCallback(newIndex => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
  });

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height],
  });

  const ref = useRef();

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (index === DATA.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: height * DATA.length,
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}>
            {DATA.map((_, i) => {
              return (
                <View
                  key={i}
                  style={{
                    height,
                    backgroundColor:
                      i % 2 === 0 ? colors.lightBg : colors.darkBg,
                  }}
                />
              );
            })}
          </Animated.View>
          <PoseTransition>
            {index % 2 === 0 ? (
              <PoseView
                key="image0"
                style={[
                  styles.imageConainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image source={{uri: DATA[index].image}} style={styles.image} />
              </PoseView>
            ) : (
              <PoseView
                key="image1"
                style={[
                  styles.imageConainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image source={{uri: DATA[index].image}} style={styles.image} />
              </PoseView>
            )}
          </PoseTransition>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{
              padding: 20,
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <Title
              color={headingColor}
              index={index}
              text={DATA[index].title}
            />
            <Details color={color} index={index} />
            <Description
              index={index}
              text={DATA[index].description}
              color={headingColor}
            />
          </Transitioning.View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 65,
              left: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: headingColor,
              }}>
              Back
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageConainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: 'absolute',
    right: -140,
    top: 250,
    padding: 20,
    borderLeftWidth: 1,
    borderRadius: IMAGE_SIZE / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: IMAGE_SIZE / 2,
  },
});
