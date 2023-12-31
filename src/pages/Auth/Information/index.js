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
import i18n from '../../../utils/i18n/i18n';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {updateUserProfile} from '../../../redux/actions/Auth.action';
import moment from 'moment';
import {navigate} from '../../../routing/Ref';
function Information({route}) {
  const {role} = route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth?.registerLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
    };
  });

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [profileImage, updateProfileImage] = useState(false);
  const [selectDate, updateSelectDate] = useState(false);
  const [account, setAccount] = useState('Truck Driver');

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

  const openLibrary = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      updateProfileImage(response?.assets?.[0]);
     // console.log(response);
    });
  };

  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Sing in',
    // showCenterLogo: RegisterImg
  };

  const submit = async values => {
    // console.log('asd');
    // console.log(profileImage?.uri);
    // console.log('asd');
    // return;
    const payload = new FormData();
    payload.append('fullName', values?.fullName);
    payload.append('phoneNo', values?.phone);
    payload.append('dob', moment(selectDate).format('L'));
    payload.append('bio', values?.bio);
    payload.append('field', 'Personal');
    payload.append('profile_img', {
      uri:
        profileImage?.uri == undefined || profileImage?.uri == ''
          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvadwNGLxMtCPqFOWpdRoCTcI3qFxjNc234ohBSiBUIg&s'
          : profileImage?.uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    dispatch(updateUserProfile(payload, callBack));

    // navigation.navigate("VerifyOtp")
  };
  const callBack = res => {
    //console.log('🚀 ~ file: index.js:93 ~ callBack ~ res:', res);
    if (role === 'Customer') {
      navigation.navigate('Login');
    } else {
      // navigation.navigate('CompanyProfile');
      navigation.navigate('Login');
    }
   // console.log('🚀 ~ file: index.js:58 ~ callBack ~ res:', res);
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
          onImageClick={openLibrary}
          profileImage={profileImage}
          toggleCountryModal={toggleCountryModal}
          updateSelectDate={updateSelectDate}
          selectDate={selectDate}
        />

        <View
          style={[
            AuthStyle.orContainer,
            {paddingHorizontal: 20, marginStart: 30, alignSelf: 'center'},
          ]}>
          <CText style={AuthStyle.cardBottomText}>
            By registering, you’re agree to our,
          </CText>
        </View>
        <View
          style={[
            AuthStyle.orContainer,
            {paddingHorizontal: 20, alignSelf: 'center'},
          ]}>
          <CText
            onPress={() => navigation.navigate('Login')}
            style={[AuthStyle.cardBottomText2]}>
            Terms & Condition
          </CText>

          <CText style={AuthStyle.cardBottomText}>and</CText>
          <CText
            onPress={() => navigation.navigate('Login')}
            style={[AuthStyle.cardBottomText2]}>
            Privacy Policy
          </CText>
        </View>
        <Modal
          transparent={true}
          visible={countryModalIsOpen}
          onRequestClose={() => toggleCountryModal()}>
          <View style={AuthStyle.modalContainer}>
            <View style={AuthStyle.modalInnerContainer}>
              <CountriesModal
                data={reduxState?.countries}
                onSelect={val => countryOnSelect(val)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
}
export default Information;
