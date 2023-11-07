/* eslint-disable prettier/prettier */
import React, {Fragment} from 'react';
import {TouchableOpacity, ActivityIndicator, Animated} from 'react-native';
import styles from './CButton.style';
import {themes} from '../../theme/colors';
import CIcon from '../cIcon/CIcon';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from '../../assets/icons/CustomIcon';

const CButton = props => {
  const {t} = useTranslation();

  const {
    title,
    children,
    loading,
    disabled,
    loaderProps,
    buttonText,
    activeOpacity,
    onPress,
    buttonStyle,
    theme,
    colorType,
    type,
    iconType = 'custom',
    iconName,
    iconStyle = {},
    iconSize = 22,
    iconColor = themes.light.colors.tertiary,
  } = props;

  let backgroundColor = colorType;
  let borderColor = colorType;
  let textColor = colorType;

  if (type === 'without_outline') {
    backgroundColor = 'tertiary';
  } else if (type === 'outline') {
    backgroundColor = 'secondary';
  } else {
    textColor = 'tertiary';
  }
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.buttonStyle,
        {
          backgroundColor:
            type === 'without_outline'
              ? 'transparent'
              : themes['light'].colors[backgroundColor],
          borderColor:
            type === 'without_outline'
              ? 'transparent'
              : themes['light'].colors[borderColor],
        },
        (disabled || loading) && {opacity: 0.5},
        buttonStyle,
      ]}>
      {title ? (
        <LinearGradient
          colors={['#FB7C5F', '#DF525B']}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Fragment>
            <Animated.Text
              style={[
                styles.buttonText,
                {
                  color: themes['light'].colors[textColor],
                  fontWeight: 'bold',
                },
                buttonText,
              ]}>
              {t(title)}
            </Animated.Text>
            {iconType === 'custom' && iconName
              ? null
              : // <Icon name={iconName} style={[styles.buttonIcon, iconStyle]}/>
                null}
          </Fragment>
        </LinearGradient>
      ) : (
        children
      )}
      {/* {iconType === 'left' && (
        <CIcon
          name={'arrow-right'}
          type={'Feather'}
          size={iconSize}
          color={iconColor}
          styles={iconStyle}
        />
      )} */}
      {loading ? (
        <ActivityIndicator {...loaderProps} style={{marginLeft: 10}} />
      ) : null}
    </TouchableOpacity>
  );
};

CButton.defaultProps = {
  title: '',
  onPress: () => null,
  colorType: 'primary',
  type: 'normal',
  activeOpacity: 0.5,
  loading: false,
  disabled: false,
  loaderProps: {
    size: 20,
    color: themes['light'].colors.tertiary,
  },
};

export default React.memo(CButton);
