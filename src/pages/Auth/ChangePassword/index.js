import React from 'react';
import {Container} from '../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View} from 'react-native';
import AuthStyle from '../Auth.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {Facebook, Google, LoginImg} from '../../../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen')

function Forgot({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
    };
  });
  const headerProps = {
    showCenterLogo: false,
    headerLeft: true,
    headerTitle: 'Reset Password',
    showCenterLogo : LoginImg,
    bgHeadeStyle: {
      width: width * 1,
      height: height * 0.3,
      marginTop: -30,
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
  };


  const submit = async values => {
    const { email} = route?.params;

    const payload = {
        email: email,
        newPass:values?.password
    }
    dispatch(setPassword(payload , callBack))
  };
  const callBack = (res) => {
    navigation.navigate('Login')
    
  }

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
      <CForm submit={submit} loading={reduxState?.loading} />
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
