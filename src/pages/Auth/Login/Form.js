/* eslint-disable prettier/prettier */
import React, {useRef, memo, useState} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View, TouchableOpacity} from 'react-native';
import {CButton, CInput, CText} from '../../../components';
import AuthStyle from '../Auth.style';
import {themes} from '../../../theme/colors';
import {EmailIcon, PassIcon} from '../../../assets/images';
import {useTranslation} from 'react-i18next';

function CForm(props) {
  const {submit, loading, onForgotPress} = props;
  const {t} = useTranslation();

  const form = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const cpassword = useRef(null);

  const [passShow, setPassShow] = useState(true);

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
                <CText style={AuthStyle.cardHeaderTitle}>
                  {'Welcome Back!'}
                </CText>
                <CText style={AuthStyle.cardHeaderSubTitle}>
                  {'Login to your account.'}
                </CText>
              </View>

              <View style={AuthStyle.cardBody}>
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
                />

                <CInput
                  ref={password}
                  placeholder={'Password'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={passShow}
                  error={errors.password}
                  returnKeyType="done"
                  onSubmitEditing={() => handleSubmit()}
                  leftIconNAme={PassIcon}
                  leftIconeSize={18}
                  rightIconType="AntDesign"
                  rightIconName="eyeo"
                  rightIconeColor={themes.light.colors.gray4}
                  rightIconeSize={18}
                  toggleRightIconFunc={() => setPassShow(!passShow)}
                />
              </View>
              <TouchableOpacity
                onPress={onForgotPress}
                style={AuthStyle.forgot}>
                <CText style={AuthStyle.forgotText}>Forgot Password?</CText>
              </TouchableOpacity>
              <CButton
                title={'Sign in'}
                iconType="left"
                loading={loading}
                onPress={() => handleSubmit()}
              />

              <View style={{flexDirection: 'row'}}>
                <CText style={{marginTop: 5, color: '#E7E6E9'}}>
                  ____________________________
                </CText>
                <CText style={AuthStyle.continueText}> OR </CText>
                <CText style={{marginTop: 5, color: '#E7E6E9'}}>
                  _____________________
                </CText>
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
export default memo(CForm);
