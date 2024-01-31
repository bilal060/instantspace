import React, {Fragment, useState} from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Appearance,
} from 'react-native';
import GlobalStyle from '../../assets/styling/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Styles from './DateTimePickerStyle';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {themes as theme} from '../../theme/colors';
import CText from '../cText/CText';
import ProgressiveImage from '../progressiveImage/ProgressiveImage';
import {DobIcon} from '../../assets/images';
import MonthPicker from 'react-native-month-year-picker';

export const ErrorView = ({message}) => {
  return message ? (
    <CText style={GlobalStyle.errorTextStyle}>{message}</CText>
  ) : null;
};

function DateTimePicker({
  type,
  inputContainer,
  isVisible,
  value,
  error,
  onChange,
  placeHolder,
  label,
  activeOpacity,
  loading,
  disabled,
  minimumDate,
  maximumDate = null,
  selectButtonText,
  mode = 'date',
  hideIcon,
  selectContainer,
  Pickertoggle,
  pickershow,
}) {
  // const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChangeInner = selectedDate => {
    // console.log(Selec)
    setShow(false);
    onChange(selectedDate);
    setShow(false);

   
  };

  const toggle = () => {
    setShow(!show);
  };

  //console.log(value);
  //console.log('date');

  return (
    <Fragment>
      <View style={[GlobalStyle.inputContainer, inputContainer]}>
        {label ? <CText style={GlobalStyle.inputLabel}> {label} </CText> : null}
        <TouchableOpacity
          disabled={disabled}
          style={[
            GlobalStyle.inputInnerContainer,
            Styles.selectContainer,
            selectContainer,
            error && GlobalStyle.errorBorder,
          ]}
          activeOpacity={activeOpacity}
          onPress={() => {
            type === 'monthly' ? Pickertoggle() : toggle();
          }}>
          {loading ? (
            <ActivityIndicator style={Styles.buttonLoading} />
          ) : hideIcon ? (
            <View style={GlobalStyle.inputIconButton}>
              <ProgressiveImage
                source={DobIcon}
                style={[GlobalStyle.inputIcon, {marginBottom: 8}]}
              />
            </View>
          ) : null}
          <CText
            style={[
              Styles.selectButtonText,
              selectButtonText,
              {fontSize: 16},
              !value && {color: theme['light'].colors.lightGray},
            ]}>
            {value
              ? mode === 'time'
                ? moment(value).format('LT')
                : moment(value).format('MM-DD-YYYY')
              : placeHolder}
          </CText>
        </TouchableOpacity>
        <ErrorView message={error} />
      </View>
      <>
        {type === 'monthly' && pickershow ? (
          <MonthPicker onChange={onChange} value={value ? value : new Date()} />
        ) : (
          <DateTimePickerModal
            testID="dateTimePicker"
            isVisible={isVisible || show}
            mode={mode}
            date={value ? value : new Date()}
            onConfirm={onChangeInner}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            onCancel={() => toggle()}
            isDarkModeEnabled={false}
          />
        )}
      </>
    </Fragment>
  );
}

DateTimePicker.defaultProps = {
  label: '',
  value: '',
  placeHolder: 'Tap to select',
  error: '',
  activeOpacity: 0.5,
  isVisible: false,
  loading: false,
  disabled: false,
  onChange: () => null,
};

export default DateTimePicker;
