/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Dots from 'react-native-dots-pagination';

const CPagination = () => {
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        height: 20,
        marginHorizontal: 20,
      }}>
      <Dots
        length={3}
        active={2}
        style={{justifyContent: 'left'}}
        activeColor="#7BB564"
        passiveColor="rgba(13,16,16,0.13)"
        activeDotWidth={25}
        activeDotHeight={10}
      />
    </View>
  );
};

export default CPagination;

const styles = StyleSheet.create({});
