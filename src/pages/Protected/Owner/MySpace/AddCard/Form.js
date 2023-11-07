import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import {View, TouchableOpacity} from 'react-native';
import {
  CButton,
  CInput,
  CText,
  DateTimePicker,
} from '../../../../../components';
import AuthStyle from '../MySpace.style';
import {themes} from '../../../../../theme/colors';
import {
  CardIcon,
  DesIcon,
  EmailIcon,
  NameIcon,
  PassIcon,
  PhoneIcon,
  Truck,
  VComapny,
  VModal,
  Vreg,
  langIcon,
} from '../../../../../assets/images';
import Styles from '../MySpace.style';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import * as Yup from 'yup';

function CForm(props) {
  const {submit, loading} = props;
  const {t} = useTranslation();

  const form = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const cardNo = useRef(null);
  const expMonth = useRef(null);
  const cvc = useRef(null);
  const expYear = useRef(null);

  const des = useRef(null);

  const scheme = Yup.object().shape({
    fullName: Yup.string().required('Please enter your name '),
    cardNo: Yup.string().required('Please enter credit/debit card number '),
    expMonth: Yup.string().required('Please enter Expiry Date  '),
    cvc: Yup.string().required('Please enter cvc code'),
  });
  const creditCardMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    [/\d/],
    [/\d/],
    [/\d/],
    [/\d/],
    ' ',
    [/\d/],
    [/\d/],
    [/\d/],
    [/\d/],
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  const expiMask = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  return (
    <Formik
      innerRef={form}
      enableReinitialize
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={scheme}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={AuthStyle.card}>
              <View style={AuthStyle.cardBody}>
                <CInput
                  ref={fullName}
                  placeholder={'Name'}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={errors.fullName}
                  sec
                  leftIconNAme={NameIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => cardNo.current.focus()}
                />
                <CInput
                  ref={cardNo}
                  placeholder={'Card No.'}
                  value={values.cardNo}
                  onChangeText={handleChange('cardNo')}
                  error={errors.cardNo}
                  mask={creditCardMask}
                  sec
                  leftIconNAme={CardIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => expMonth.current.focus()}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={Styles.inputView}>
                    <CInput
                      ref={expMonth}
                      mask={expiMask}
                      placeholder={'Expiry Date'}
                      value={values.expMonth}
                      onChangeText={handleChange('expMonth')}
                      error={errors.expMonth}
                      sec
                      leftIconNAme={CardIcon}
                      returnKeyType="next"
                      onSubmitEditing={() => cvc.current.focus()}
                    />
                  </View>
                  <View style={Styles.inputView}>
                    <CInput
                      ref={cvc}
                      placeholder={'Cvc'}
                      value={values.cvc}
                      onChangeText={handleChange('cvc')}
                      error={errors.cvc}
                      sec
                      leftIconNAme={CardIcon}
                      returnKeyType="done"
                      onSubmitEditing={() => submit()}
                    />
                  </View>
                </View>

                {/* <CInput
                  ref={des}
                  placeholder={t('Registration No.')}
                  value={registerNo}
                  onChangeText={updateRegisterNo}
                  error={registerNoError}
                  sec
                  leftIconNAme={Vreg}
                 
                  returnKeyType="next"
                  onSubmitEditing={() =>password.current.focus()}
                />
                 */}

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
                buttonText={AuthStyle.buttonText}
                onPress={() => handleSubmit()}
              />
              <CButton
                title={'Add Card'}
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
