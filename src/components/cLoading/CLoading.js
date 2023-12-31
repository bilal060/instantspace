import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './CLoading.style';
import {themes} from '../../theme/colors';
import {CText} from '../index';
import Spinner from 'react-native-loading-spinner-overlay';

const CLoading = ({style, theme, loading, text, transparent = false}) => {
  text = text === 'hide' ? '' : text ? text : 'Please_wait';
  let color = transparent
    ? themes['light'].colors.primary
    : themes['light'].colors.tertiary;
  if (loading) {
    return (
      <Spinner
        visible={loading}
        customIndicator={
          <View style={styles.container}>
            <ActivityIndicator size="small" color={themes['light'].colors.fontColor} />
            <CText style={styles.text}>Loading, please wait...</CText>
          </View>
        }
      />
    );
  } else {
    return null;
  }
};

CLoading.defaultProps = {
  loading: false,
  color: themes['light'].colors.primary,
};

export default React.memo(CLoading);
