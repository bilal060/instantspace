/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Container, CountriesModal} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, Modal, View} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import ComapnyForm from './ComapnyForm';

import {useNavigation} from '@react-navigation/native';
import {
  Company,
  Facebook,
  FocusedCompany,
  FocusedTruck,
  Google,
  LoginImg,
  RegisterImg,
  Truck,
} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  updateCompnayProfile,
  updateUserProfile,
} from '../../../redux/actions/Auth.action';
const {width, height} = Dimensions.get('screen');
import DocumentPicker from 'react-native-document-picker';
import GlobalStyle from '../../../assets/styling/GlobalStyle';

function CompanyProfile({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [account, setAccount] = useState('Individual');

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
    };
  });
  const cData = [
    {name: 'Individual', image: Truck, activeImg: FocusedTruck},
    {name: 'Company', image: Company, activeImg: FocusedCompany},
  ];

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
    // showCenterLogo: RegisterImg
  };

  const submit = async values => {
   // console.log('🚀 ~ file: index.js:66 ~ submit ~ values:', values, null, 2);
    // "cAddress": "ee", "cName": "aabb", "noOFTruck": "12", "phone": "1234", "truckType": "abc"}
    const formData = new FormData();
    formData.append('companyName', values?.cName);
    formData.append('companyType', 'Individual');
    formData.append('companyPhone', values?.phone);
    formData.append('companyLicenseNo', values?.cLicenseNo);
    formData.append('companyAddress', values?.cAddress);
    formData.append('c_docs', selectedFile);

    dispatch(updateCompnayProfile(formData, callBack));

    // navigation.navigate("VerifyOtp")
  };
  const callBack = res => {
    if (res) {
      navigation.navigate('Login');
    }
  };
  const [selected, setSelected] = useState(undefined);
  const [selectedFile, setSelectedFile] = useState();

  const data = [
    {label: 'One', value: '1'},
    {label: 'Two', value: '2'},
    {label: 'Three', value: '3'},
    {label: 'Four', value: '4'},
    {label: 'Five', value: '5'},
  ];

  const onDocumentPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(res?.[0]);

      //Printing the log realted to the file

      //Setting the state to show single file attributes
      // this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
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
        <View style={[AuthStyle.cardHeader, {marginTop: 20}]}>
          <CText style={AuthStyle.cardHeaderTitle}>Business Info</CText>
          <CText style={AuthStyle.cardHeaderSubTitle}>
            Enter your business information below.
          </CText>
        </View>

        {/* <View style={AuthStyle.typesView}>
        {cData?.map(e => (
          <TouchableOpacity
            onPress={() => setAccount(e.name)}  
            style={
              account === e?.name
                ? AuthStyle.activeUser
                : AuthStyle.unactiveUser
            }>
            <ProgressiveImage
              resizeMode={'contain'}
              style={{
                ...GlobalStyle.inputIcon,
                ...AuthStyle.inputIcon,
              }}
              source={account === e.name ? e?.activeImg : e?.image}
            />
            <CText
              style={
                account === e.name
                  ? AuthStyle.activeText
                  : AuthStyle.unActiveText
              }>
              {e?.name}
            </CText>
          </TouchableOpacity>
        ))}
      </View> */}

        <CForm
          selectedFile={selectedFile}
          onDocumentPress={onDocumentPress}
          label="Select Item"
          data={data}
          onSelect={setSelected}
          submit={submit}
          loading={reduxState?.loading}
          selectedCountry={selectedCountry}
          toggleCountryModal={toggleCountryModal}
          account={account}
          setAccount={setAccount}
        />

        <View
          style={[
            AuthStyle.orContainer,
            {paddingHorizontal: 20, width: '70%', alignSelf: 'center'},
          ]}>
          <CText style={AuthStyle.cardBottomText}>
            By registering, you’re agree to our,
          </CText>
          <CText
            onPress={() => navigation.navigate('Login')}
            style={[AuthStyle.cardBottomText2]}>
            Terms & Condition{' '}
          </CText>
        </View>
        <View
          style={[
            AuthStyle.orContainer,
            {paddingHorizontal: 20, width: '70%', alignSelf: 'center'},
          ]}>
          <CText
            onPress={() => navigation.navigate('Login')}
            style={AuthStyle.cardBottomText}>
            {' '}
            and
          </CText>

          <CText
            onPress={() => navigation.navigate('Login')}
            style={[AuthStyle.cardBottomText2]}>
            {' '}
            Privacy Policy
          </CText>
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
export default CompanyProfile;
