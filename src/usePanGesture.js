import {Gesture} from 'react-native-gesture-handler';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

export default function usePanGesture() {
  const position = useSharedValue({x: 0, y: 0});
  const initialPosition = useSharedValue({x: 0, y: 0});

  const gesture = new Gesture.Pan()
    .onStart(() => {
      'worklet';

      initialPosition.value = position.value;
    })
    .onUpdate(({translationX, translationY, absoluteX, absoluteY}) => {
      'worklet';

      position.value = {
        x: initialPosition.value.x + translationX,
        y: initialPosition.value.y + translationY,
      };
    });

  const style = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: position.value.x,
        },
        {
          translateY: position.value.y,
        },
      ],
    }),
    [],
  );

  return {gesture, position, style};
}
