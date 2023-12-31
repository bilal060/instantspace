import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {TouchableOpacity, View} from 'react-native';
import {
  CButton,
  CDropDown,
  CInput,
  CText,
  ProgressiveImage,
} from '../../../components';
import AuthStyle from '../Auth.style';
import {themes} from '../../../theme/colors';
import {
  CNameIcon,
  CardIcon,
  DobIcon,
  LocationIcon,
  PhoneIcon,
  BServices,
  EmailIcon,
  FocusedOwner,
  FocusedServices,
  FocusedTruck,
  Onwer,
  PassIcon,
  RoleIcon,
  Services,
  Truck,
  UploadIcon,
  Company,
  FocusedCompany,
  Towtruck,
} from '../../../assets/images';
import GlobalStyle from '../../../assets/styling/GlobalStyle';

function CForm(props) {
  const {
    submit,
    loading,
    toggleCountryModal,
    selectedCountry,
    onDocumentPress,
    selectedFile,
    account,
    setAccount,
  } = props;

  const form = useRef(null);
  const CfullName = useRef(null);

  const email = useRef(null);
  const number = useRef(null);
  const cAddress = useRef(null);
  const cLicenseNo = useRef(null);
  const dob = useRef(null);
  const truckType = useRef(null);
  // const idCard = useRef(null);
  // const idCard = useRef(null);
  // const idCard = useRef(null);
  // const idCard = useRef(null);
  // const idCard = useRef(null);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={Validations}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={[AuthStyle.card]}>
              <>
                <View style={AuthStyle.cardBody}>
                <CInput
                    ref={truckType}
                    placeholder={'Company Name'}
                    value={values.cName}
                    onChangeText={handleChange('cName')}
                    error={errors.cName}
                    sec
                    leftIconNAme={CNameIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => truckType.current.focus()}
                  />
                  <CInput
                    ref={truckType}
                    placeholder={'Add Truck Type'}
                    value={values.truckType}
                    onChangeText={handleChange('truckType')}
                    error={errors.truckType}
                    sec
                    leftIconNAme={Truck}
                    returnKeyType="next"
                    onSubmitEditing={() => number.current.focus()}
                  />
                  <CInput
                    ref={number}
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
                  <CInput
                    ref={cLicenseNo}
                    placeholder={'Driving License No.'}
                    value={values.cLicenseNo}
                    onChangeText={handleChange('cLicenseNo')}
                    error={errors.cLicenseNo}
                    sec
                    leftIconNAme={CardIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => dob.current.focus()}
                  />

                  <CInput
                    ref={cAddress}
                    placeholder={'Complete Address'}
                    value={values.cAddress}
                    onChangeText={handleChange('cAddress')}
                    error={errors.cAddress}
                    sec
                    leftIconNAme={LocationIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => idCard.current.focus()}
                  />
                </View>
                <CText style={AuthStyle.uploadText}>
                  Upload Driving License
                </CText>

                <TouchableOpacity
                  onPress={onDocumentPress}
                  style={AuthStyle.selectFileView}>
                  {/* <CText>HHHH</CText> */}
                  <View style={{width: 40}}>
                    <ProgressiveImage
                      source={UploadIcon}
                      style={AuthStyle.inputLeftIconButton}
                      resizeMode={'contain'}
                      AQAQAQAQ
                    />
                  </View>
                  <View style={{width: 100}}>
                    <CText style={AuthStyle.selectFile}>Choose File</CText>
                  </View>
                </TouchableOpacity>
                {selectedFile?.name && (
                  <CText
                    style={[
                      AuthStyle.uploadText,
                      {marginLeft: 10, marginBottom: 10, color: '#0064FA'},
                    ]}>
                    {selectedFile?.name}
                  </CText>
                )}
              </>

              <CButton
                title={'Register'}
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
