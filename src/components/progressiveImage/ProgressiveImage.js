/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import CText from '../cText/CText';
import {themes} from '../../theme/colors';

const ProgressiveImage = props => {
  return (
    <FastImage {...props}>
      {props.rec && (
        <View style={{width: '100%', height: '100%'}}>
          <ImageBackground
            style={{
              width: 50,
              height: 48,
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            resizeMode="contain"
            source={require('../../assets/images/Rectangle.png')}>
            <Image
              style={{
                width: 17,
                height: 17,
              }}
              resizeMode="contain"
              source={require('../../assets/images/spacemoon.png')}
            />
            <CText
              style={{
                marginLeft: 2,
                color: 'white',
                fontWeight: '600',
                fontFamily: themes.font.bold,
              }}>
              12
            </CText>
          </ImageBackground>
        </View>
      )}
    </FastImage>
  );
};

export default React.memo(ProgressiveImage);
