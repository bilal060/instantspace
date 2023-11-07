/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Container, CountriesModal} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View, Modal} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google, LoginImg} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {forgotPass} from '../../../redux/actions/Auth.action';
const {width, height} = Dimensions.get('screen');

function Forgot({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  var email;
  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Reset Password',
    showCenterLogo: LoginImg,
    bgHeadeStyle: {
      width: width * 1,
      height: height * 0.3,
      marginTop: -30,
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
  };

  const submit = async values => {
    email = values?.email;
    dispatch(forgotPass(values, callBack));
    // navigation.navigate('ChangePassword');
  };
  const callBack = res => {
    navigation.navigate('VerifyOtp', {email: email, isForget: true});
  };

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
    };
  });

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
        />
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
      {/* <View style={AuthStyle.orContainer}>
       
      </View>
      <View style={AuthStyle.orContainer}>
        <CText style={AuthStyle.cardBottomText}>Already have an account? </CText>
        <CText style={[AuthStyle.cardBottomText2]}>Sign in</CText>
      </View> */}
    </Container>
  );
}
export default Forgot;
