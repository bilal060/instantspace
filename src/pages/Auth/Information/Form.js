import React, {useRef, memo} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View} from 'react-native';
import {
  CButton,
  CInput,
  CText,
  DateTimePicker,
  ProgressiveImage,
} from '../../../components';
import AuthStyle from '../Auth.style';
import {themes} from '../../../theme/colors';
import {
  CameraIcon,
  CardIcon,
  DesIcon,
  DobIcon,
  EmailIcon,
  PassIcon,
  PhoneIcon,
  RoleIcon,
  UploadIcon,
} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';

function CForm(props) {
  const {
    submit,
    loading,
    toggleCountryModal,
    selectedCountry,
    onImageClick,
    selectDate,
    updateSelectDate,
    profileImage,
  } = props;
  const form = useRef(null);
  const fullName = useRef(null);
  const phone = useRef(null);
  const number = useRef(null);
  const bio = useRef(null);
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
        return (
          <View>
            <View style={[AuthStyle.card]}>
              <View style={AuthStyle.cardHeader}>
                <CText style={AuthStyle.cardHeaderTitle}>Personal Info</CText>
                <CText style={AuthStyle.cardHeaderSubTitle}>
                  Enter your personal information below.
                </CText>
              </View>

              <TouchableOpacity
                onPress={onImageClick}
                style={AuthStyle.profileView}>
                {/* <CText>HHHH</CText> */}
                {!profileImage ? (
                  <>
                    <View style={{width: 40}}>
                      <ProgressiveImage
                        source={CameraIcon}
                        style={AuthStyle.inputLeftIconButton}
                        resizeMode={'contain'}
                      />
                    </View>

                    <View style={{width: 100}}>
                      <CText style={AuthStyle.uploadProfile}>
                        Upload Picture
                      </CText>
                    </View>
                  </>
                ) : (
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      overflow: 'hidden',
                      borderRadius: 200,
                    }}>
                    <ProgressiveImage
                      source={profileImage}
                      style={{width: 110, height: 100, borderRadius: 100}}
                      resizeMode={'cover'}
                    />
                  </View>
                )}
              </TouchableOpacity>

              <View style={AuthStyle.cardBody}>
                <CInput
                  ref={fullName}
                  placeholder={'Full Name'}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  error={errors.fullName}
                  sec
                  leftIconNAme={RoleIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => phone.current.focus()}
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
              </View>

              <DateTimePicker
                placeHolder={'Date of birth'}
                hideIcon
                value={selectDate}
                onChange={updateSelectDate}
              />
              <CInput
                ref={bio}
                placeholder={'Add Your Bio'}
                value={values.bio}
                onChangeText={handleChange('bio')}
                error={errors.bio}
                sec
                leftIconNAme={DesIcon}
                returnKeyType="done"
                onSubmitEditing={() => handleSubmit()}
              />

              <CButton
                title={'Register'}
                iconType="left"
                loading={loading}
                onPress={() => handleSubmit()}
              />

              {/* <View>
                <CText style={AuthStyle.continueText}>Or continue with</CText>
              </View> */}
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
export default memo(CForm);
