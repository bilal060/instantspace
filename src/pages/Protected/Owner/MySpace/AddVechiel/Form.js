import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import {View , TouchableOpacity} from 'react-native';
import {CButton, CInput, CText, DateTimePicker} from '../../../../../components';
import AuthStyle from '../MySpace.style';
import {themes} from '../../../../../theme/colors';
import { DesIcon, EmailIcon, PassIcon, PhoneIcon, Truck, VComapny, VModal, Vreg, langIcon } from '../../../../../assets/images';
import { useTranslation } from 'react-i18next';
import moment from 'moment';



function CForm(props) {
  const {submit, loading , onForgotPress , selectedCountry , toggleCountryModal , selectDate , updateSelectDate ,
    updateRegisterNo,
    registerNo,
    selectedCompanyError,
    selectedCompany,
    onCompanyPress,
    onCompanyModelPress,
    selectedCompanyModel,
    selectedCompanyModelError,
    onStatePress , selectedState  ,
    updateDRegisterNo,dregisterNo,dregisterNoError,
    registerNoError,
     user , selectedStateError} = props;
  const {t,} = useTranslation();

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
        fullName:user?.fullName,
        phone:user?.phone,
        email:user?.email,
        des:user?.bio
      }}
    //   validationSchema={Validations}
      >
      {({handleChange, values, handleSubmit, errors}) => {
        console.log('errors', errors);
        return (
            <View style={AuthStyle.card }>
              
              

             
              <CInput
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

                
                
                <CInput
                  ref={des}
                  placeholder={t('Driving License No')}
                  value={dregisterNo}
                  onChangeText={updateDRegisterNo}
                  error={dregisterNoError}
                  sec
                  leftIconNAme={Vreg}
                 
                  returnKeyType="next"
                  onSubmitEditing={() =>password.current.focus()}
                />
              
              <CButton
                title={'Cancel'}
                iconType="left"
                loading={loading}
                buttonStyle={AuthStyle.spaceCancelBtn}
                buttonText={AuthStyle.buttonText}
                onPress={() => handleSubmit()}
              />
              <CButton
                title={'Reserve Slot'}
                iconType="left"
                loading={loading}
                buttonStyle={AuthStyle.spaceSaveBtn}
                onPress={() => submit()}
              />

              

            
            </View>
        );
      }}
    </Formik>
  );
}
export default memo(CForm);
