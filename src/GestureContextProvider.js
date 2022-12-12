import React, {createContext, useContext} from 'react';
import {View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSharedValue} from 'react-native-reanimated';

const GestureContext = createContext();

export const useGestureContext = () => useContext(GestureContext);

export default function GestureContextProvider({children}) {
  const gesturePosition = useSharedValue({x: 0, y: 0});
  const isGestureActive = useSharedValue(false);

  const gesture = new Gesture.Pan()
    .activateAfterLongPress(500)
    .onStart(() => {
      'worklet';

      isGestureActive.value = true;
    })
    .onUpdate(({absoluteX, absoluteY}) => {
      'worklet';

      gesturePosition.value = {
        x: absoluteX,
        y: absoluteY,
      };
    })
    .onFinalize(() => {
      'worklet';

      isGestureActive.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={{flex: 1}}>
        <GestureContext.Provider
          value={{gesturePosition, isGestureActive, gesture}}>
          {children}
        </GestureContext.Provider>
      </View>
    </GestureDetector>
  );
}
