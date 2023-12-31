/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useRef, memo, useEffect, useState} from 'react';
import {Formik} from 'formik';
import {Alert, View, ScrollView} from 'react-native';
import {CButton, CInput, CText, ProgressiveImage} from '../../../../components';
import Styles from './NewSpace.style';
import {themes} from '../../../../theme/colors';
import {
  AreaIcon,
  CNameIcon,
  CardIcon,
  CctvIcon,
  DesIcon,
  DobIcon,
  EmailIcon,
  FuelIcon,
  LocationIcon,
  NameIcon,
  ParkingIcon,
  PassIcon,
  PhoneIcon,
  PlaceIcon,
  RateIcon,
  SecurityIcon,
  TimeIcon,
  UploadIcon,
} from '../../../../assets/images';
import * as Yup from 'yup';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Storage(props) {
  const {
    submit,
    loading,
    toggleCountryModal,
    selectedCountry,
    toggleFuelModal,
    selectedFuel,
    toggleStaffModal,
    selectedStaff,
    selectedClimate,
    toggleClimateModal,
    selectedSecurity,
    mapAdreess,
    setMapAdreess,
    toggleSecurityModal,
    onDocumentPress,
    selectedFile,
  } = props;

  const scheme = Yup.object().shape({
    phone: Yup.string().required('Please enter phone number '),
    areaSize: Yup.string().required('Please enter are size '),
    decs: Yup.string().required('Please enter descripition  '),
    parking: Yup.string().required('Please enter parking'),
    rHour: Yup.string().required('Please enter your rate as per hour'),

    rDay: Yup.string().required('Please enter your rate as per day'),
    rWeek: Yup.string().required('Please enter your rate as per week'),

    rMonth: Yup.string().required('Please enter your rate as per Month'),
    selectedFile: Yup.object().required('Please select Image'),
  });

  const form = useRef(null);
  const fullName = useRef(null);
  const areaSize = useRef(null);
  const number = useRef(null);
  const decs = useRef(null);
  const location = useRef(null);
  const dob = useRef(null);
  const idCard = useRef(null);
  const fuel = useRef(null);
  const parking = useRef(null);
  const rMonth = useRef(null);
  const rHour = useRef(null);
  const rDay = useRef(null);
  const rWeek = useRef(null);

  const [IsImageSelect, setIsImageSelect] = useState(false);

  const handlePlaceSelection = (data, details) => {
    setMapAdreess(data);
  };

  useEffect(() => {
    if (selectedFile?.name) {
      setIsImageSelect(true);
    }
  }, [selectedFile]);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={scheme}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={[Styles.card]}>
              <View style={Styles.cardBody}>
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
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 15,
                  marginBottom: 10,
                }}>
                <ProgressiveImage
                  source={LocationIcon}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
                <ScrollView
                  horizontal={true}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    // backgroundColor: 'red',
                  }}>
                  <GooglePlacesAutocomplete
                    placeholder={'Select Your Adreess'}
                    debounce={100}
                    listViewDisplayed={false}
                    keepResultsAfterBlur={true}
                    minLength={2}
                    autoFocus={true}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    onPress={(data, details) => {
                      handlePlaceSelection(details);
                    }}
                    onPlaceSelected={place => {
                      handlePlaceSelection(place);
                    }}
                    renderRow={(rowData, details) => (
                      <TouchableOpacity
                        onPress={() =>
                          handlePlaceSelection(rowData.description)
                        }>
                        <CText
                          style={Styles.suggestionText}
                          // onPress={() => console.log('1', 1)}
                        >
                          {rowData.description}
                        </CText>
                      </TouchableOpacity>
                    )}
                    query={{
                      key: 'AIzaSyC43lfaTBweW8gJZ5D90VyKmN0j_SH_-6A',
                      language: 'en',
                    }}
                    textInputProps={{
                      leftIcon: {type: 'font-awesome', name: 'back'},
                      errorStyle: {color: 'red'},
                    }}
                    styles={{
                      textInputContainer: Styles.textInput,
                      textInput: Styles.input,
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                      powered: {},
                      listView: {},
                      row: {
                        height: 44,
                        flexDirection: 'row',
                      },
                      separator: {
                        height: 0.5,
                        backgroundColor: '#c8c7cc',
                        marginHorizontal: 22,
                      },
                      description: {},
                      loader: {
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        height: 20,
                      },
                    }}
                  />
                </ScrollView>
              </View>
              <CInput
                ref={areaSize}
                placeholder={'Area Size in Sq. Yd.'}
                value={values.areaSize}
                onChangeText={handleChange('areaSize')}
                error={errors.areaSize}
                sec
                leftIconNAme={AreaIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />

              <CInput
                placeholder={'CCTV Cameras'}
                value={values.dob}
                error={errors.dob}
                onPress={toggleFuelModal}
                selectValue={selectedFuel}
                sec
                type="view"
                leftIconNAme={CctvIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />

              <CInput
                ref={dob}
                placeholder={'Security Type'}
                onPress={toggleSecurityModal}
                selectValue={selectedSecurity}
                error={errors.dob}
                sec
                type="view"
                leftIconNAme={SecurityIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
              <CInput
                ref={decs}
                placeholder={'Add Description...'}
                value={values.decs}
                onChangeText={handleChange('decs')}
                error={errors.decs}
                sec
                leftIconNAme={DesIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
              <CInput
                ref={parking}
                placeholder={'Enter Parking Capacity '}
                value={values.parking}
                onChangeText={handleChange('parking')}
                error={errors.parking}
                sec
                leftIconNAme={ParkingIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
              <CInput
                ref={fuel}
                placeholder={'Select Fuel Availability'}
                value={values.fuel}
                onChangeText={handleChange('fuel')}
                onPress={toggleFuelModal}
                selectValue={selectedFuel}
                error={errors.fuel}
                sec
                type="view"
                leftIconNAme={FuelIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
              <CInput
                ref={fuel}
                placeholder={'Select Paid Staff'}
                value={values.fuel}
                onPress={toggleStaffModal}
                selectValue={selectedStaff}
                onChangeText={handleChange('fuel')}
                error={errors.fuel}
                sec
                type="view"
                leftIconNAme={FuelIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />

              <CInput
                ref={fuel}
                placeholder={'Select Climate Control'}
                value={values.fuel}
                onPress={toggleClimateModal}
                selectValue={selectedClimate}
                onChangeText={handleChange('fuel')}
                error={errors.fuel}
                sec
                type="view"
                leftIconNAme={FuelIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
              <View style={GlobalStyle.row}>
                <View style={Styles.inputView}>
                  <CInput
                    ref={rHour}
                    placeholder={'Rate / Hour'}
                    value={values.rHour}
                    onChangeText={handleChange('rHour')}
                    error={errors.rHour}
                    sec
                    leftIconNAme={RateIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                </View>
                <View style={Styles.inputView}>
                  <CInput
                    ref={rDay}
                    placeholder={'Rate / Day'}
                    value={values.rDay}
                    onChangeText={handleChange('rDay')}
                    error={errors.rDay}
                    sec
                    leftIconNAme={RateIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                </View>
              </View>
              <View style={GlobalStyle.row}>
                <View style={Styles.inputView}>
                  <CInput
                    ref={rWeek}
                    placeholder={'Rate / Week'}
                    value={values.rWeek}
                    onChangeText={handleChange('rWeek')}
                    error={errors.rWeek}
                    sec
                    leftIconNAme={RateIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                </View>
                <View style={Styles.inputView}>
                  <CInput
                    ref={rMonth}
                    placeholder={'Rate / Month'}
                    value={values.rMonth}
                    onChangeText={handleChange('rMonth')}
                    error={errors.rMonth}
                    sec
                    leftIconNAme={RateIcon}
                    returnKeyType="next"
                    onSubmitEditing={() => {}}
                  />
                </View>
              </View>

              <CText style={Styles.uploadText}>Upload Images</CText>

              <TouchableOpacity
                onPress={onDocumentPress}
                style={Styles.selectFileView}>
                {/* <CText>HHHH</CText> */}
                <View style={{width: 40}}>
                  <ProgressiveImage
                    source={UploadIcon}
                    style={Styles.inputLeftIconButton}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={{width: 100}}>
                  <CText style={Styles.selectFile}>Choose File</CText>
                </View>
              </TouchableOpacity>
              {IsImageSelect == false && (
                <CText style={[Styles.uploadText, {color: 'red'}]}>
                  {'Please select Image'}
                </CText>
              )}
              {selectedFile?.name && (
                <CText
                  style={[
                    Styles.uploadText,
                    {marginLeft: 10, marginBottom: 10, color: '#0064FA'},
                  ]}>
                  {selectedFile?.name}
                </CText>
              )}

              <CButton
                title={'Cancel'}
                iconType="left"
                loading={loading}
                buttonStyle={Styles.spaceCancelBtn}
                buttonText={Styles.buttonText}
                onPress={() => handleSubmit()}
              />
              <CButton
                title={'Save'}
                iconType="left"
                loading={loading}
                buttonStyle={Styles.spaceSaveBtn}
                onPress={() => handleSubmit()}
              />

              {/* <View>
                <CText style={Styles.continueText}>Or continue with</CText>
              </View> */}
            </View>
          </View>
        );
      }}
    </Formik>
  );
}
export default memo(Storage);
