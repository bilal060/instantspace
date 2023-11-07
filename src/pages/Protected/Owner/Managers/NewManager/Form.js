/* eslint-disable prettier/prettier */
import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View} from 'react-native';
import {CButton, CInput, CText} from '../../../../../components';
import Styles from '../Managers.styles';
import {themes} from '../../../../../theme/colors';
import {
  CNameIcon,
  CardIcon,
  DobIcon,
  EmailIcon,
  NameIcon,
  PassIcon,
  PhoneIcon,
  TimeIcon,
} from '../../../../../assets/images';

function CForm(props) {
  const {
    submit,
    loading,
    toggleCountryModal,
    selectedCountry,
    toggleBranchModal,
    selectedBranch,
    selectedTime,
    toggleTimeModal,
  } = props;

  const form = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const cpassword = useRef(null);
  const password = useRef(null);
  const dob = useRef(null);
  const idCard = useRef(null);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={Validations}>
      {({handleChange, values, handleSubmit, errors}) => {
        {
          /* console.log('errorserrorserrorserrors', errors); */
        }
        return (
          <View style={[Styles.card]}>
            <View style={Styles.cardBody}>
              <CInput
                ref={fullName}
                placeholder={'Full Name'}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                error={errors.fullName}
                sec
                leftIconNAme={NameIcon}
                returnKeyType="next"
                onSubmitEditing={() => number.current.focus()}
              />

              <CInput
                ref={fullName}
                placeholder={'Select Branch'}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onPress={toggleBranchModal}
                selectValue={selectedBranch}
                sec
                type="view"
                leftIconNAme={CNameIcon}
                returnKeyType="next"
                error={selectedBranch == '' ? 'Select branch' : ''}
                onSubmitEditing={() => dob.current.focus()}
              />

              <CInput
                ref={fullName}
                placeholder={'Select Time Slot'}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                sec
                onPress={toggleTimeModal}
                selectValue={selectedTime}
                type="view"
                leftIconNAme={TimeIcon}
                returnKeyType="next"
                error={selectedTime?.name ? '' : 'Select time slot'}
                onSubmitEditing={() => dob.current.focus()}
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
                onSubmitEditing={() => fullName.current.focus()}
              />
            </View>

            <CInput
              ref={email}
              placeholder={'Manager’s Email Address'}
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              sec
              leftIconNAme={EmailIcon}
              returnKeyType="next"
              onSubmitEditing={() => idCard.current.focus()}
            />

            <CButton
              title={'Send Invite'}
              iconType="left"
              loading={loading}
              buttonStyle={Styles.buttonStyle}
              onPress={() => handleSubmit()}
            />

            {/* <View>
                <CText style={Styles.continueText}>Or continue with</CText>
              </View> */}
          </View>
        );
      }}
    </Formik>
  );
}
export default memo(CForm);
