import {StyleSheet, View, Button as RNButton} from 'react-native';
import React from 'react';

export default function Button(props) {
  return (
    <View style={styles.button}>
      <RNButton color="black" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    alignSelf: 'center',
    width: 100,
    backgroundColor: 'white',
  },
});
