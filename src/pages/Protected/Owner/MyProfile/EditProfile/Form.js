/* eslint-disable prettier/prettier */
import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View, TouchableOpacity} from 'react-native';
import {
  CButton,
  CInput,
  CText,
  DateTimePicker,
} from '../../../../../components';
import AuthStyle from '../Myprofile.style';
import {themes} from '../../../../../theme/colors';
import {
  DesIcon,
  EmailIcon,
  PassIcon,
  PhoneIcon,
  langIcon,
} from '../../../../../assets/images';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

function CForm(props) {
  const {
    submit,
    loading,
    onForgotPress,
    selectedCountry,
    toggleCountryModal,
    selectDate,
    updateSelectDate,
    user,
    cancelBtn
  } = props;
  //console.log('🚀 ~ file: Form.js:16 ~ CForm ~ user:', user);
  const {t} = useTranslation();

  const form = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phone = useRef(null);
  const des = useRef(null);
  return (
    <Formik
      innerRef={form}
      enableReinitialize
      onSubmit={values => submit(values)}
      initialValues={{
        fullName: user?.firstName  ?  user?.firstName   :  user?.fullName,
        phone: user?.phoneNo == undefined ? "" :  user?.phoneNo,
        email: user?.email,
        des: user?.bio,
      }}
      validationSchema={Validations}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={AuthStyle.card}>
              <View style={AuthStyle.cardBody}>
                <CInput
                  ref={fullName}
                  placeholder={t('Name')}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={errors.fullName}
                  sec
                  leftIconNAme={EmailIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => password.current.focus()}
                />
                <CInput
                  ref={email}
                  placeholder={t('Email Address')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  sec
                  leftIconNAme={EmailIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => password.current.focus()}
                  editable={false}
                />
                <CInput
                  ref={phone}
                  type="number"
                  // disabled={true}
                  selectedCountry={selectedCountry}
                  onPress={() => toggleCountryModal()}
                  keyboardType={'numeric'}
                  leftIconNAme={PhoneIcon}
                  placeholder={'000-000-0000'}
                  value={values?.phone}
                  onChangeText={val => {
                    let phone = val;
                    let reg = /^0+/gi;
                    if (phone.match(reg)) {
                      phone = phone.replace(reg, '');
                    }
                    handleChange('phone')(phone);
                  }}
                  error={errors.phone}
                  returnKeyType="next"
                  onSubmitEditing={() => bio.current.focus()}
                />
                {/* {user?.dob &&
                <DateTimePicker
                  placeHolder={'Date of birth'}
                  hideIcon
                  value={selectDate ? selectDate : new Date( user?.dob)}
                  onChange={updateSelectDate}
                />
      } */}
{user?.bio  &&
                 <CInput
                  ref={des}
                  placeholder={t('Bio')}
                  value={values.des}
                  onChangeText={handleChange('des')}
                  error={errors.des}
                  sec
                  leftIconNAme={DesIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => password.current.focus()}
                /> 
}

                {/* <CInput
                  ref={fullName}
                  placeholder={'Select Branch'}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={errors.fullName}
                  sec
                  type="view"
                  leftIconNAme={langIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => dob.current.focus()}
                /> */}
              </View>

              <CButton
                title={'Cancel'}
                iconType="left"
                loading={loading}
                buttonStyle={AuthStyle.spaceCancelBtn}
                // buttonText={AuthStyle.buttonText}
                onPress={() => cancelBtn()}
              />
              <CButton
                title={'Save'}
                iconType="left"
                loading={loading}
                buttonStyle={AuthStyle.spaceSaveBtn}
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
export default memo(CForm);
