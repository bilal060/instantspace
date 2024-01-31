/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Container} from '../../../../../containers';
import {CPagination, CText, ProgressiveImage} from '../../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View} from 'react-native';
import AuthStyle from '../Myprofile.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {
  Facebook,
  Google,
  LoginImg,
  Profile,
} from '../../../../../assets/images';
import {BASE_URL_IMG} from '../../../../../config/webservices';
import {updateUserProfile} from '../../../../../redux/actions/Auth.action';
import moment from 'moment';
const {width, height} = Dimensions.get('screen');

function EditProfile({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [value, selectValue] = useState(false);

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
      user: auth?.user,
    };
  });
  const [selectDate, updateSelectDate] = useState(null);
  

  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: true,
    headerTitle: 'Edit Profile',
    headerRight: false,
    backGroundColor: 'red',
    ProgressiveImageHeader: true,
    backButtonIcon: true,
    headerRightImg: false,
    backGroundColor: 'red',
    isShowLinerar: true,
  };
  var convertedFilePath = `${BASE_URL_IMG}${reduxState?.user?.photo}`.replace(
    /\\/g,
    '/',
  );

  const submit = values => {
    const payload = new FormData();
    payload.append('fullName', values?.fullName);
    payload.append('phoneNo', values?.phone);
    payload.append('dob', moment(reduxState?.user?.dob).format('L'));
    payload.append('bio', reduxState?.user?.des  ? values?.des : "");

    
    dispatch(updateUserProfile(payload, callBack));
  };
  const callBack = res => {
  
  };

  return (
    <Container
      backgroundColor={'theme-color'}
      showPattern={true}
      scrollView={true}
      // style={AuthStyle.style}
      headerProps={headerProps}
      loading={reduxState?.loading}
      messagesScreen
      scrollViewProps={{
        contentContainerStyle: AuthStyle.container,
      }}>
      <View style={{backgroundColor: '#f1f6f7', height: '100%', width: '100%'}}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            backgroundColor: '#f1f6f7',
          }}>
          {reduxState?.user?.photo ? (
            <ProgressiveImage
              source={{uri: convertedFilePath}}
              resizeMode="contain"
              style={{width: 100, height: 100, borderRadius: 10}}
            />
          ) : (
            <ProgressiveImage
              source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"}}
              resizeMode="contain"
              style={{width: 100, height: 100, borderRadius: 10}}
            />
          )}
        </View>
        
        <CForm
          user={reduxState?.user}
          submit={submit}
          loading={reduxState?.loading}
          onForgotPress={() => navigation.navigate('Forgot')}
          updateSelectDate={updateSelectDate}
          selectDate={selectDate}
          cancelBtn={()=>navigation.goBack()}
        />
      </View>
      {/* </View> */}
    </Container>
  );
}
export default EditProfile;
