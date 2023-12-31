import React, {useRef, memo, useState} from 'react';
import {Formik} from 'formik';
import Validations from './Validations';
import {View} from 'react-native';
import {
  CButton,
  CInput,
  CText,
  ProgressiveImage,
  RadioButton,
} from '../../../components';
import AuthStyle from '../Auth.style';
import {themes} from '../../../theme/colors';
import {
  BServices,
  CNameIcon,
  EmailIcon,
  FocusedOwner,
  FocusedServices,
  FocusedTruck,
  Onwer,
  PassIcon,
  PhoneIcon,
  RoleIcon,
  Services,
  Truck,
} from '../../../assets/images';
import GlobalStyle from '../../../assets/styling/GlobalStyle';
import Styles from '../../../containers/tabBar/TabBar.style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

function CForm(props) {
  const {
    submit,
    loading,
    toggleCountryModal,
    selectedCountry,
    account,
    setAccount,
    role,
  } = props;
  const form = useRef(null);
  const fullName = useRef(null);
  const email = useRef(null);
  const number = useRef(null);
  const cpassword = useRef(null);
  const password = useRef(null);
  const data = [
    // {name: 'Truck Driver', image: Truck, activeImg: FocusedTruck},
    {name: 'Customer', image: BServices, activeImg: FocusedServices},
    {name: 'Storage Owner', image: Onwer, activeImg: FocusedOwner},
  ];
  const [passShow, setPassShow] = useState(true);
  const [cPassShow, setCPassShow] = useState(true);

  return (
    <Formik
      innerRef={form}
      onSubmit={values => submit(values)}
      initialValues={{}}
      validationSchema={Validations}>
      {({handleChange, values, handleSubmit, errors}) => {
        return (
          <View>
            <View style={AuthStyle.card}>
              <View style={AuthStyle.cardHeader}>
                <CText style={AuthStyle.cardHeaderTitle}>Register Now</CText>
                <CText style={AuthStyle.cardHeaderSubTitle}>
                  Create your new account.
                </CText>
              </View>

              <View style={AuthStyle.cardBody}>
                {role !== 'Customer' && (
                  <>
                    <View style={AuthStyle.typesView}>
                      {data?.map(e => (
                        
                        <TouchableOpacity
                          onPress={() => setAccount(e.name)}
                          style={
                            account === e?.name
                              ? AuthStyle.activeUser
                              : AuthStyle.unactiveUser
                          }>
                             <LinearGradient
                         colors={ account === e?.name ?['#FB7C5F', '#DF525B']:["#FFFFFF",'#FFFFFF']}
                         style={
                          account === e?.name
                            ? AuthStyle.activeUser
                            : AuthStyle.unactiveUser
                        }
                        
                         >
                          <ProgressiveImage
                            resizeMode={'contain'}
                            style={{
                              ...GlobalStyle.inputIcon,
                              ...AuthStyle.inputIcon,
                            }}
                            source={
                              account === e.name ? e?.activeImg : e?.image
                            }
                          />
                          <CText
                            style={
                              account === e.name
                                ? AuthStyle.activeText
                                : AuthStyle.unActiveText
                            }>
                            {e?.name}
                          </CText>
                          </LinearGradient>
                        </TouchableOpacity>
                      
                      ))}
                    </View>
                  </>
                )}

                <CInput
                  ref={email}
                  placeholder={'Email Address'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  sec
                  leftIconNAme={EmailIcon}
                  returnKeyType="next"
                  onSubmitEditing={() => password.current.focus()}
                />

                {/* <CInput
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
                  onSubmitEditing={() => handleSubmit()}
                /> */}
                <CInput
                  ref={password}
                  placeholder={'Password'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={passShow}
                  toggleRightIconFunc={() => setPassShow(!passShow)}
                  error={errors.password}
                  returnKeyType="next"
                  onSubmitEditing={() => cpassword.current.focus()}
                  leftIconNAme={PassIcon}
                  leftIconeSize={18}
                  rightIconType="AntDesign"
                  rightIconName="eyeo"
                  rightIconeColor={themes.light.colors.gray4}
                  rightIconeSize={18}
                />
                <CInput
                  ref={cpassword}
                  placeholder={'Confirm Password'}
                  value={values.cpassword}
                  onChangeText={handleChange('cpassword')}
                  secureTextEntry={cPassShow}
                  toggleRightIconFunc={() => setCPassShow(!cPassShow)}
                  error={errors.cpassword}
                  returnKeyType="done"
                  onSubmitEditing={() => handleSubmit()}
                  leftIconNAme={PassIcon}
                  leftIconeSize={18}
                  rightIconType="AntDesign"
                  rightIconName="eyeo"
                  rightIconeColor={themes.light.colors.gray4}
                  rightIconeSize={18}
                />
              </View>

              <CButton
                title={'Next'}
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
