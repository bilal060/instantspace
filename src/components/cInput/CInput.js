/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Fragment} from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Icons from "../../assets/icons/CustomIcon";
import GlobalStyle from '../../assets/styling/GlobalStyle';
import {themes} from '../../theme/colors';
import MaskInput from 'react-native-mask-input';
import CText from '../cText/CText';
import CIcon from '../cIcon/CIcon';
import ProgressiveImage from '../progressiveImage/ProgressiveImage';
import {EmailIcon} from '../../assets/images';
import {useTranslation} from 'react-i18next';
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

const CInput = React.forwardRef((props, ref) => {
  const {t} = useTranslation();

  const {
    inputContainerStyle,
    inputInnerContainerStyle,
    inputLabel,
    inputLabelStyle,

    type,

    leftIconName,
    toggleLeftIconFunc,
    leftIconButtonStyle,
    iconStyle,
    inputErrorStyle,
    error,
    toggleRightIconFunc,
    rightIconButtonStyle,
    rightIconName,
    rightButton,
    style,
    value,
    selectedCountry,
    countryView,
    disabled,
    onPress,
    countryViewLoading,
    secureTextEntry = false,
    leftIconType,
    leftIconNAme,
    leftIconColor,
    leftIconeSize,
    rightIconType,
    rightIconeSize,
    rightIconeColor,
    selectValue,
    placeholder,
    textStyle,
    editable,
    parentStyle,
  } = props;

  const renderLabel = () => {
    return (
      <CText style={[{...GlobalStyle.inputLabel, ...inputLabelStyle}]}>
        {inputLabel}
      </CText>
    );
  };

  const renderLeftIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleLeftIconFunc}
        style={{
          ...GlobalStyle.inputLeftIconButton,
          ...leftIconButtonStyle,
        }}>
        <ProgressiveImage
          resizeMode={'contain'}
          style={{...GlobalStyle.inputIcon, ...iconStyle}}
          source={leftIconNAme}
        />
        {/* <CIcon
          type={leftIconType}
          name={leftIconNAme}
          color={leftIconColor}
          size={leftIconeSize}
          style={{...GlobalStyle.inputIcon, ...iconStyle}}
        /> */}
      </TouchableOpacity>
    );
  };

  const renderCountryView = () => {
    return (
      <TouchableOpacity
        style={{
          ...GlobalStyle.countryView,
          ...countryView,
          ...(error && GlobalStyle.errorBorder),
        }}
        disabled={disabled}
        onPress={onPress}>
        {countryViewLoading ? (
          <ActivityIndicator color="#000080" size={24} />
        ) : (
          <Fragment>
            {/* <ProgressiveImage
              resizeMode={'contain'}
              style={GlobalStyle.countryViewImage}
              source={{uri: selectedCountry?.flags?.png}}
            /> */}
            <CText style={GlobalStyle.countryViewText}>
              {selectedCountry?.detail?.iso}
            </CText>
            <CText style={GlobalStyle.countryViewText}>
              {selectedCountry?.detail?.code}
            </CText>
            <AntDesign
              name="caretdown"
              style={GlobalStyle.countryViewDropDownIcon}
            />
          </Fragment>
        )}
      </TouchableOpacity>
    );
  };

  const renderRightIcon = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={toggleRightIconFunc}
        style={{
          ...GlobalStyle.inputRightIconButton,
          ...rightIconButtonStyle,
          //  backgroundColor: 'red',
        }}>
        <CIcon
          type={rightIconType}
          name={rightIconName}
          color={rightIconeColor}
          size={rightIconeSize}
          style={{...GlobalStyle.inputIcon, ...iconStyle}}
        />

        {/* <AntDesign
                    name={rightIconName}
                    style={{ ...GlobalStyle.inputIcon, ...iconStyle }}
                /> */}
      </TouchableOpacity>
    );
  };

  const renderErrorView = () => {
    return (
      <CText style={{...GlobalStyle.errorTextStyle, ...inputErrorStyle}}>
        {error}
      </CText>
    );
  };

  const renderInputView = () => {
    return (
      <MaskInput
        ref={ref}
        maskChar="x"
        autoCorrect={false}
        editable={editable && editable}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={themes['light'].colors.dark}
        style={[{...GlobalStyle.inputStyle, ...style}]}
        autoCapitalize="none"
        value={value}
        {...props}
        placeholder={t(placeholder)}
      />
    );
  };

  const renderSelectionView = () => {
    return (
      <TouchableOpacity
        style={[
          {...GlobalStyle.inputStyle, ...style},
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
        onPress={onPress}>
        <CText
          style={[
            {...GlobalStyle.inputTextStyle, ...textStyle},
            {color: themes['light'].colors.dark},
          ]}>
          {selectValue
            ? selectValue?.name || selectValue?.description
            : placeholder}
        </CText>
        <AntDesign name="down" style={GlobalStyle.slectedViewDropDownIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{...GlobalStyle.inputContainer, ...inputContainerStyle}}>
      {inputLabel ? renderLabel() : null}
      <View
        style={{
          ...GlobalStyle.inputInnerContainer,
          ...inputInnerContainerStyle,
          backgroundColor: '#f1f6f7',
          ...(error && GlobalStyle.errorBorder),
        }}>
        {leftIconNAme ? renderLeftIcon() : null}

        <View
          style={{
            alignSelf: 'flex-start',
            flex: 1,
            borderBottomWidth: 0.8,
            borderBottomColor: '#D6D6D6',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: -15,
            backgroundColor: '#f1f6f7',
            ...parentStyle,
          }}>
          {selectedCountry && Object.keys(selectedCountry).length
            ? renderCountryView()
            : null}
          {type !== 'view' ? renderInputView() : renderSelectionView()}
          {rightIconName ? renderRightIcon() : null}
        </View>
      </View>
      {error ? renderErrorView() : null}
    </View>
  );
});

CInput.defaultProps = {
  inputContainerStyle: {},
  inputLabelStyle: {},
  iconButtonStyle: {},
  inputInnerContainerStyle: {},
  iconStyle: {},
  inputErrorStyle: {},
  toggleIconFunc: () => null,

  toggleRightIconFunc: () => null,
  rightButton: () => null,
  rightIconButtonStyle: {},
  rightIconName: '',

  toggleLeftIconFunc: () => null,
  leftIconButtonStyle: {},
  leftIconName: '',

  inputLabel: '',
  error: '',
};

export default React.memo(CInput);
