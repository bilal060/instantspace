/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useRef, memo, useState, useEffect} from 'react';
import {Formik} from 'formik';
import {Alert, View} from 'react-native';
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
import ToggleSwitch from '../../../../components/cToggleSwitch/CToggleSwitch';
import {RadioButton} from '../../../../components';
import {Text} from 'react-native-animatable';

function WareHouse(props) {
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
    onVideoPress,
    selectedWarehouseVideo,
    selectedFile,
    setToggleType,
    LongtermOn,
    ShorttermOn,
    Pickupservice,
    Climatecontrol,
    Boxpacking,
    Pickanddelivery,
    Locks,
    Householditems,
    Businessitems,
    Coldstorage,
    Furniture,
    foodproducts,
    Firealarm,
    Aircondition,
    Sprinklersystem,
    Security,
    CCTV,
    DoorAlarm,
    Dustfree,
    Pastcontrol,
  } = props;

  const scheme = Yup.object().shape({
    phone: Yup.string().required('Please enter phone number '),
    areaSize: Yup.string().required('Please enter are size '),
    decs: Yup.string().required('Please enter descripition  '),
    fullName: Yup.string().required('Please enter name'),
    rHour: Yup.string().required('Please enter your rate as per hour'),

    rDay: Yup.string().required('Please enter your rate as per day'),
    // rWeek: Yup.string().required('Please enter your rate as per week'),

    // rMonth: Yup.string().required('Please enter your rate as per Month'),
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

  const handlePlaceSelection = (data, details) => {
   
    setMapAdreess(data);
  };
  const [IsImageSelect, setIsImageSelect] = useState(false);
  useEffect(() => {
    if (selectedFile?.name) {
      setIsImageSelect(true);
    }
  }, [selectedFile]);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => {
        // console.log(values);
        submit(values);
      }}
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
              <CInput
                ref={fullName}
                placeholder={'Add name.'}
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                error={errors.fullName}
                sec
                leftIconNAme={AreaIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              />
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
                <GooglePlacesAutocomplete
                  placeholder={'Select Your Adreess'}
                  debounce={100}
                  listViewDisplayed={true}
                  minLength={2}
                  autoFocus={true}
                  returnKeyType={'default'}
                  fetchDetails={true}
                  onPress={(data, details) => {
                    handlePlaceSelection(details);
                  }}
                  onPlaceSelected={place => {
                    // handlePlaceSelection(place);
                  }}
                  renderRow={(rowData, details) => (
                    <TouchableOpacity
                      onPress={() => handlePlaceSelection(rowData.description)}>
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
              {/* <CInput
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
              /> */}
              {/* <CInput
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
              /> */}
              {/* <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={LongtermOn}
                label="Long-term"
                onPress={() => setToggleType('longTerm', !LongtermOn)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={ShorttermOn}
                label="Short-term"
                onPress={() => setToggleType('shortTerm', !ShorttermOn)}
              /> */}
              <RadioButton
                title={'Longterm On'}
                value={LongtermOn}
                onChange={val => {
                  setToggleType('longTerm', !LongtermOn);
                  setToggleType('shortTerm', false);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <RadioButton
                title={'Shortterm On'}
                value={ShorttermOn}
                onChange={val => {
                  setToggleType('longTerm', false);
                  setToggleType('shortTerm', !ShorttermOn);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  color: themes['light'].colors.dark,
                }}
                size={'small'}
                isOn={Pickupservice}
                label="Pickup service"
                onPress={() => setToggleType('Pickupservice', !Pickupservice)}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Climatecontrol}
                label="Climate control"
                onPress={() => setToggleType('Climatecontrol', !Climatecontrol)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Boxpacking}
                label="Box packing"
                onPress={() => setToggleType('Boxpacking', !Boxpacking)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Pickanddelivery}
                label="pick and delivery"
                onPress={() =>
                  setToggleType('Pickanddelivery', !Pickanddelivery)
                }
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Locks}
                label="Locks"
                onPress={() => setToggleType('Locks', !Locks)}
              />
              <CInput
                inputContainerStyle={{}}
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
              <RadioButton
                title={'Household items'}
                value={Householditems}
                onChange={val => {
                  setToggleType('Householditems', !Householditems);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <RadioButton
                title={'Business Items'}
                value={Businessitems}
                onChange={val => {
                  setToggleType('Businessitems', !Businessitems);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <RadioButton
                title={'Furniture'}
                value={Furniture}
                onChange={val => {
                  setToggleType('Furniture', !Furniture);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <RadioButton
                title={'Cold Storage'}
                value={Coldstorage}
                onChange={val => {
                  setToggleType('Coldstorage', !Coldstorage);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />
              <RadioButton
                title={'food Products'}
                value={foodproducts}
                onChange={val => {
                  setToggleType('foodproducts', !foodproducts);
                }}
                containerStyles={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
                stylesTitle={{color: themes['light'].colors.dark}}
              />

              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Firealarm}
                label="Firealarm"
                onPress={() => setToggleType('Firealarm', !Firealarm)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Aircondition}
                label="Air Condition"
                onPress={() => setToggleType('Aircondition', !Aircondition)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Sprinklersystem}
                label="Sprinkler System"
                onPress={() =>
                  setToggleType('Sprinkler System', !Sprinklersystem)
                }
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Security}
                label="Security"
                onPress={() => setToggleType('Security', !Security)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={CCTV}
                label="CCTV"
                onPress={() => setToggleType('CCTV', !CCTV)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={DoorAlarm}
                label="DoorAlarm"
                onPress={() => setToggleType('DoorAlarm', !DoorAlarm)}
              />

              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Dustfree}
                label="Dust free"
                onPress={() => setToggleType('Dustfree', !Dustfree)}
              />
              <ToggleSwitch
                containerStyle={{
                  marginLeft: 17,
                  paddingVertical: 3,
                  marginBottom: 20,
                }}
                size={'small'}
                isOn={Pastcontrol}
                label="Past Control"
                onPress={() => setToggleType('Pastcontrol', !Pastcontrol)}
              />
              {/* <CInput
                ref={parking}
                placeholder={'Enter Parking Capacity '}
                value={values.parking}
                onChangeText={handleChange('parking')}
                error={errors.parking}
                sec
                leftIconNAme={ParkingIcon}
                returnKeyType="next"
                onSubmitEditing={() => {}}
              /> */}
              {/* <CInput
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
              /> */}
              {/* <CInput
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
              /> */}
              {/* <CInput
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
              /> */}
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
          
              <CText style={Styles.uploadText}>Upload Images</CText>
              <TouchableOpacity
                onPress={onDocumentPress}
                style={Styles.selectFileView}>
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

              {selectedFile?.name && (
                <CText
                  style={[
                    Styles.uploadText,
                    {marginLeft: 10, marginBottom: 10, color: '#0064FA'},
                  ]}>
                  {selectedFile?.name}
                </CText>
              )}
              {IsImageSelect == false && (
                <CText style={[Styles.uploadText, {color: 'red', bottom: 20}]}>
                  {'Please select Image'}
                </CText>
              )}

              <CText style={Styles.uploadText}>Upload Video</CText>
              <TouchableOpacity
                onPress={onVideoPress}
                style={Styles.selectFileView}>
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

              {selectedWarehouseVideo?.name && (
                <CText
                  style={[
                    Styles.uploadText,
                    {marginLeft: 10, marginBottom: 10, color: '#0064FA'},
                  ]}>
                  {selectedWarehouseVideo?.name}
                </CText>
              )}

              <CButton
                title={'Cancel'}
                iconType="left"
                loading={loading}
                buttonStyle={Styles.spaceCancelBtn}
                // buttonText={Styles.buttonText}
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
export default memo(WareHouse);
