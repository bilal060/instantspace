import React, {useState} from 'react';
import {Container, CountriesModal} from '../../../containers';
import {
  CPagination,
  CText,
  ProgressiveImage,
  RadioButton,
} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, Modal, View, Text, Alert} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {
  Facebook,
  Google,
  LoginImg,
  RegisterImg,
  RoleIcon,
} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalStyle from '../../../assets/styling/GlobalStyle';
import {forceTouchHandlerName} from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';
import {registerOwner} from '../../../redux/actions/Auth.action';
import axios from 'axios';
import {handleSuccess} from '../../../utils/methods';
const {width, height} = Dimensions.get('screen');
var payload;

function Register({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {role} = route?.params;
  // Alert.alert(role)
  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.registerLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
    };
  });

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(
    reduxState.currentCountry,
  );
  const [account, setAccount] = useState(role);
 

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
    ProgressiveImageHeader: false,
  };
  selectedCountry?.detai;
  const submit = async values => {
    payload = {
      email: values?.email,
      password: values?.password,
      role: account,
      passwordConfirm: values?.cpassword,
      companyType: 'Individual',
    };
    // navigation.navigate('VerifyOtp', {email: payload?.email});
    dispatch(registerOwner(payload, callBack));
  };
  const callBack = res => {
    if (res) {
      navigation.navigate('VerifyOtp', {email: payload?.email, role: role});
      //navigation.navigate('Information', {role: role});
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
          account={account}
          setAccount={setAccount}
          role={role}
        />
        <View style={AuthStyle.orContainer}>
          <CText style={AuthStyle.cardBottomText}>
            Already have an account?
          </CText>
          <CText
            onPress={() => navigation.navigate('Login')}
            style={[AuthStyle.cardBottomText2]}>
            Sign in
          </CText>
          <Text></Text>
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
export default Register;
