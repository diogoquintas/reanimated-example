import React from 'react';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {withTiming} from 'react-native-reanimated';
import Button from './Button';
import Item from './Item';
import usePanGesture from './usePanGesture';

const ScaleDown = () => {
  'worklet';

  const initialValues = {
    transform: [
      {
        scale: 1.2,
      },
    ],
  };

  const animations = {
    transform: [
      {
        scale: withTiming(1, {duration: 800}),
      },
    ],
  };

  return {
    initialValues,
    animations,
  };
};

export default function Items() {
  const {gesture, position, style} = usePanGesture();

  const items = [];

  for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
      const label = `${x}, ${y}`;

      items.push(<Item x={x} y={y} key={label} canvasPosition={position} />);
    }
  }

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View entering={ScaleDown} style={style}>
          {items}
        </Animated.View>
      </GestureDetector>

      <Button
        title="reset"
        onPress={() => {
          position.value = {x: 0, y: 0};
        }}
      />
    </>
  );
}
