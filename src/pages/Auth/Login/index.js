/* eslint-disable prettier/prettier */
/* eslint-disable no-dupe-keys */
import React, {useEffect, useState} from 'react';
import {Container} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View, Alert} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google, LoginImg, newlock} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Googlelogin, login} from '../../../redux/actions/Auth.action';
import ToggleSwitch from '../../../components/cToggleSwitch/CToggleSwitch';
import i18n from '../../../utils/i18n/i18n';
const {width, height} = Dimensions.get('screen');

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

function Login({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, selectValue] = useState(false);

  const handleGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId:
        '332080344949-p588iqkva5d7uqh9nncrvjqs23luupag.apps.googleusercontent.com',
    });
    try {
      // await GoogleSignin?.hasPlayServices();
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token

      const userInfo = await GoogleSignin.signIn();
     
      //  console.log(userInfo);
       const currentUser = GoogleSignin.getTokens().then((res)=>{
        console.log(res.accessToken ); //<-------Get accessToken
        // var postData = {
        //   access_token: res.accessToken,
        //   code: data.idToken,
  
        //  };
        dispatch(Googlelogin({"token": res.accessToken , "email": userInfo?.user?.email}, callBack));
      });
       
       
      //  loginUser(payload);
           
      // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(
        '🚀 ~ file: index.js:30 ~ handleGoogleSignIn ~ error:',
        error,
      );
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google sign-in was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign-in is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services are not available.');
      } else {
        console.error('Error occurred during Google sign-in:', error);
      }
    }
  };

  const reduxState = useSelector(({auth, global}) => {
    return {
      // loading: auth.loginLoading,
      loading: false,
    };
  });
  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Sing in',
    showCenterLogo: newlock,
    isShowLinerar: false,
   
   
  };

  const submit = async values => {
    dispatch(login(values, callBack));
  };
  const callBack = res => {
    //Alert.alert('call');
    console.log('🚀 ~ file: index.js:37 ~ callBack ~ res:', res);
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
      }}
      >
      <View style={{backgroundColor: '#f1f6f7', height: '100%', width: '100%'}}>
        <CForm
          submit={submit}
          loading={reduxState?.loading}
          onForgotPress={() => navigation.navigate('Forgot')}
        />

        <TouchableOpacity
          onPress={() => handleGoogleSignIn()}
          style={[AuthStyle.orContainer, AuthStyle.googleContainer]}>
          <ProgressiveImage
            source={Google}
            resizeMode={'contain'}
            style={AuthStyle.IconImage}
          />
          <CText style={AuthStyle.googleAccount}>Login With Google</CText>
        </TouchableOpacity>

        <View style={AuthStyle.orContainer}>
          <CText style={AuthStyle.cardBottomText}>Don’t have an account?</CText>
          <CText
            onPress={() => navigation.navigate('Register', {role: 'Customer'})}
            style={[AuthStyle.cardBottomText2]}>
            Register?
          </CText>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register', {role: 'Storage Owner'})
          }
          style={{...AuthStyle.orContainer, marginTop: 20}}>
          <CText style={AuthStyle.regesiterProvider}>
            Register as Service Povider
          </CText>
        </TouchableOpacity>
      </View>
    </Container>
  );
}
export default Login;
