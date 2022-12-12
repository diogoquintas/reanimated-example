import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import Items from './src/Items';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Button from './src/Button';
import GestureContextProvider from './src/GestureContextProvider';

export default function App() {
  const bottomSheetRef = useRef(null);
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

  const handlePresentPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureContextProvider>
        <BottomSheetModalProvider>
          <Items />

          <Button title="Present" onPress={handlePresentPress} />

          <BottomSheetModal
            handleIndicatorStyle={styles.handleIndicatorStyle}
            backgroundStyle={styles.backgroundStyle}
            topInset={300}
            ref={bottomSheetRef}
            animateOnMount
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}>
            <BottomSheetView
              onLayout={handleContentLayout}
              style={styles.container}>
              <Items />
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureContextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'black',
  },
  handleIndicatorStyle: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    margin: 10,
    overflow: 'hidden',
    paddingBottom: 300,
  },
});
