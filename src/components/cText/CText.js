/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, Animated} from 'react-native';
import {themes} from '../../theme/colors';
import {useTranslation} from 'react-i18next';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};

const CText = props => {
  const {t} = useTranslation();

  return (
    <Animated.Text allowFontScaling={false} {...props} style={[props.style]}>
      {t(props.children)}
    </Animated.Text>
  );
};

export default React.memo(CText);
