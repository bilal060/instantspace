/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  Profile,
  WelcomeLogo,
  newWelcomeLogo,
  starLogin,
} from '../../assets/images';
import {CText, ProgressiveImage} from '../../components';
import {themes} from '../../theme/colors';
const {width, height} = Dimensions.get('screen');
const Welcome = ({navigation}) => {
  const onPressLogin = () => {
    navigation.navigate('Login');
  };
  const onPressForgotPassword = () => {
    navigation.navigate('Register');
  };
  const onPressSignUp = () => {
    navigation.navigate('Register', {role: 'Storage Owner'});
    // navigation.navigate('VerifyOtp', {role: 'Storage Owner'});
  };
  const onPressCustomerSignUp = () => {
    navigation.navigate('Register', {role: 'Customer'});
  };
  return (
    <ImageBackground
      source={starLogin}
      resizeMode="cover"
      style={styles.container}>
      <ProgressiveImage
        source={newWelcomeLogo}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <LinearGradient
          colors={['#FB7C5F', '#DF525B']}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CText
            style={[
              styles.loginText,
              {color: 'white', fontWeight: 'bold', fontSize: 15},
            ]}>
            Login
          </CText>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressCustomerSignUp}
        style={styles.createBtn}>
        <CText
          style={[
            styles.loginText,
            {color: '#DF525B', fontWeight: 'bold', fontSize: 15},
          ]}>
          Create New Account
        </CText>
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.hairline} />

        <CText style={styles.forgotAndSignUpText}>OR</CText>

        <View style={styles.hairline} />
      </View>

      <TouchableOpacity onPress={onPressSignUp} style={styles.createBtn}>
        <CText
          style={[
            styles.loginText,
            {color: '#000000', fontWeight: 'bold', fontSize: 15},
          ]}>
          Register as Service Provder
        </CText>
      </TouchableOpacity>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f6f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hairline: {
    marginTop: 31,
    backgroundColor: themes.light.colors.gray3,
    height: 2,
    width: width * 0.37,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#000',
    marginBottom: 50,
  },
  logo: {
    width: 187,
    height: 130,
    marginBottom: 120,
  },
  forgotAndSignUpText: {
    color: themes.light.colors.gray4,
    marginTop: 24,
    fontFamily: themes.font.medium,
    fontSize: 11,
    paddingHorizontal: 5,
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: themes.font.regular,
    fontSize: 15,
    lineHeight: 16,
  },
  loginBtn: {
    width: '80%',
    color: 'white',
    backgroundColor: themes.light.colors.primary,
    fontFamily: themes.font.semiBold,

    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    // marginBottom: 10
  },
  createBtn: {
    width: '80%',
    color: themes.light.colors.fontColor,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
    // marginBottom: 10
  },
  registerBtn: {
    width: '80%',
    color: '#0064FA',
    backgroundColor: themes.light.colors.secondary4,
    borderWidth: 1,
    borderColor: '#0064FA',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 31,
    // marginBottom: 10
  },
});
export default Welcome;
