import {StyleSheet} from 'react-native';
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import React from 'react';
import {useGestureContext} from './GestureContextProvider';

const SIZE = 50;
const MARGIN = 10;

export default function Item({x, y, canvasPosition}) {
  const {isGestureActive, gesturePosition} = useGestureContext();

  const elementRef = useAnimatedRef();

  const position = useDerivedValue(() => {
    if (
      !_WORKLET ||
      !elementRef ||
      elementRef() === -1 ||
      !isGestureActive.value
    ) {
      return;
    }

    const measured = measure(elementRef);

    if (measured !== null) {
      return {x: measured.pageX, y: measured.pageY};
    } else {
      return;
    }
  });

  const isActive = useDerivedValue(() => {
    if (!position.value) {
      return false;
    }

    const distance = Math.sqrt(
      Math.pow(position.value.x - gesturePosition.value.x, 2) +
        Math.pow(position.value.y - gesturePosition.value.y, 2),
    );

    return distance <= 50;
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: x * (SIZE + MARGIN),
      },
      {
        translateY: y * (SIZE + MARGIN),
      },
      {
        scale: withTiming(isActive.value ? 1.2 : 1),
      },
    ],
  }));

  return <Animated.View style={[styles.item, style]} ref={elementRef} />;
}

const styles = StyleSheet.create({
  item: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'blue',
  },
});
