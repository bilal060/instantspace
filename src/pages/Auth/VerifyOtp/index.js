/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Container, CountriesModal} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, Modal, View} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google, LoginImg, RegisterImg} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');
import CountDown from 'react-native-countdown-component';
import {verifyOTP} from '../../../redux/actions/Auth.action';
import {useIsFocused} from '@react-navigation/native';
import {Alert} from 'react-native';

function VerifyOtp({route}) {
  const isFocused = useIsFocused();
  //Alert.alert(isFocused.toString());
  const {email, isForget, role} = route?.params || {};
  console.log('🚀 ~ file: index.js:17 ~ VerifyOtp ~ isForget:', route?.params);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.verifyLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
      role: auth?.role,
    };
  });
  console.log(
    '🚀 ~ file: index.js:28 ~ reduxState ~ reduxState:',
    reduxState?.role,
  );

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(
    reduxState.currentCountry,
  );

  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };

  const countryOnSelect = item => {
    updateSelectedCountry(item);
    toggleCountryModal();
  };

  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Sing in',
    showCenterLogo: RegisterImg,
  };

  const submit = async values => {
    const payload = {
      email: email,
      otp: values?.otp,
    };
    dispatch(verifyOTP(payload, callBack));
  };
  const callBack = res => {
    if (res) {
      if (isForget) {
        navigation.navigate('ChangePassword');
      } else {
        navigation.navigate('Information', {role: role});
      }
      // else if (reduxState?.role === 'Business Owner') {
      //   navigation.navigate('    ');
      // } else if (reduxState?.role === 'Customer') {
      //   navigation.navigate('Information');
      // }
    }
  };

  return (
    <Container
      backgroundColor={'theme-color'}
      showPattern={true}
      scrollView={true}
      style={AuthStyle.style}
      headerProps={headerProps}
      loading={reduxState?.loading}
      scrollViewProps={{
        contentContainerStyle: AuthStyle.container,
      }}>
      <View style={{backgroundColor: '#f1f6f7', height: '100%', width: '100%'}}>
        <CForm
          submit={submit}
          loading={reduxState?.loading}
          selectedCountry={selectedCountry}
          toggleCountryModal={toggleCountryModal}
          email={email}
        />

        <View style={[AuthStyle.orContainer, {marginTop: -20}]}>
          <CText style={AuthStyle.cardBottomText}>Re-Send code in.</CText>
          {isFocused == true ? (
            <CountDown
              until={100}
              onFinish={va => {}}
              onPress={() => {}}
              size={15}
              timeToShow={['S']}
              timeLabels={{s: ''}}
              digitTxtStyle={AuthStyle.timeCountDown}
              digitStyle={AuthStyle.timeView}
            />
          ) : null}
          <CText
            onPress={() => navigation.navigate('Login')}
            style={[AuthStyle.cardBottomText2]}></CText>
        </View>
        <Modal
          transparent={true}
          visible={countryModalIsOpen}
          onRequestClose={() => toggleCountryModal()}>
          <View style={AuthStyle.modalContainer}>
            <View style={AuthStyle.modalInnerContainer}>
              <CountriesModal onSelect={val => countryOnSelect(val)} />
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
}
export default VerifyOtp;
