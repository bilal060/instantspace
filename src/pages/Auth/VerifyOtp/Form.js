import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View} from 'react-native';
import {CButton, CInput, CText} from '../../../components';
import AuthStyle from '../Auth.style';
import {themes} from '../../../theme/colors';
import {OtpIcon} from '../../../assets/images';

function CForm(props) {
  const {submit, loading, toggleCountryModal, selectedCountry, email} = props;


  const form = useRef(null);
  const code = useRef(null);
  const number = useRef(null);
  const verifyCode = useRef(null);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={Validations}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={AuthStyle.card}>
              <View style={AuthStyle.cardHeader}>
                <CText style={AuthStyle.cardHeaderTitle}>Verify OTP</CText>
                <CText style={AuthStyle.cardHeaderSubTitle}>
                  A 6-digit code sent to your
                </CText>
                <CText style={AuthStyle.cardHeaderSubTitle}>{email}</CText>
              </View>

              <View style={AuthStyle.cardBody}>
                <CInput
                  ref={code}
                  placeholder={'Enter Email OTP'}
                  value={values.otp}
                  onChangeText={handleChange('otp')}
                  error={errors.otp}
                  sec
                  leftIconNAme={OtpIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => handleSubmit()}
                />
              </View>

              <CButton
                title={'Verify'}
                iconType="left"
                loading={loading}
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
