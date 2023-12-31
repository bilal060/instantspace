/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, PackageCard} from '../../../../containers';
import {
  CButton,
  CheckBox,
  CList,
  CPagination,
  CText,
  ProfileCard,
  ProgressiveImage,
  RadioButton,
} from '../../../../components';
import Styles from './Myprofile.style';
import {themes} from '../../../../theme/colors';
import {
  ArrowLeft,
  BNotification,
  ChangePass,
  EditProfile,
  Faq,
  Language,
  Logout,
  ManagerIcon,
  Notification,
  Payment,
  Privacy,
  Profile,
  Rating,
} from '../../../../assets/images';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLogout} from '../../../../redux/actions/Auth.action';

const MyProfile = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const headerProps = {
    // ProgressiveImageHeader: false,
    // backButtonIcon: false,

    // headerTitle: 'Setting',
    // headerRight: true,
    // headerRightImg: false,
    // backButtonIcon: true,

    // headerRightImg: Profile,
    // backGroundColor: 'red',

    ProgressiveImageHeader: true,
    backButtonIcon: false,

    headerTitle: 'Settings',
    headerRight: false,
    backGroundColor: 'red',
    isShowLinerar: true,

    // rightPress: ()=> navigation.navigate("AddNewManager")
  };

  const data = [
    {
      img: EditProfile,
      address: 'Edit Profile',
      phone: '+1 012 3456 789',
      active: true,
      navigation: 'EditProfile',
    },

    {
      img: Payment,
      address: 'Payment History',
      phone: '+1 012 3456 789',
      active: true,
      navigation: 'Payment',
    },
    // {
    //   img: ChangePass,
    //   address: 'Change Password',
    //   phone: '+1 012 3456 789',
    //   active: true,
    // },
    {
      img: BNotification,
      address: 'Notifications',
      phone: '+1 012 3456 789',
      active: true,
    },
  ];

  const supportdata = [
    {
      img: Faq,
      address: 'FAQs',
      phone: '+1 012 3456 789',
      active: true,
      navigation: 'FAQs',
    },

    {
      img: Privacy,
      address: 'Privacy Policy',
      phone: '+1 012 3456 789',
      active: true,
      navigation: 'Privacy',
    },
    {
      img: Rating,
      address: 'Rate This App',
      phone: '+1 012 3456 789',
      active: true,
    },
  ];

  const prefrencedata = [
    // {
    //   img: Language,
    //   address: 'Language',
    //   phone: '+1 012 3456 789',
    //   active: true,
    //   navigation: 'Langugae',
    // },

    {
      img: Logout,
      address: 'Log Out',
      phone: '+1 012 3456 789',
      active: false,
    },
  ];
  const logOut = () => {
    dispatch(userLogout());
  };

  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.address === 'Log Out'
            ? logOut()
            : item?.navigation && navigation.navigate(item?.navigation)
        }>
        <View style={Styles.ProfileCard}>
          <ProgressiveImage
            source={item?.img}
            resizeMode="contain"
            style={{width: 22, height: 22}}
          />
          <View style={{flex: 1, paddingHorizontal: 10, paddingLeft: 20}}>
            <CText
              style={
                item.address === 'Log Out' ? Styles.logout : Styles.messageName
              }>
              {item?.address}
            </CText>
          </View>
          <View>
            <ProgressiveImage
              source={ArrowLeft}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
          </View>
        </View>
        <View style={Styles.bottomView} />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      scrollView
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}>
      <View style={Styles.container}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
            backgroundColor: '#FFF',
          }}>
          <CText style={Styles.profileName}>{`Your Account`}</CText>

          <CList
            style={Styles.spacelist}
            // numColumns={2}
            //   horizontal
            // contentContainerStyle={[GlobalStyle.list, ]}
            data={data}
            // loading={reduxState.loading}
            renderItem={renderProfile}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              // icon: require('../../assets/images/empty.png'),
              text: 'Store not found',
            }}
          />

          <CText style={Styles.profileName}>{`Support`}</CText>

          <CList
            style={Styles.spacelist}
            data={supportdata}
            // loading={reduxState.loading}
            renderItem={renderProfile}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              // icon: require('../../assets/images/empty.png'),
              text: 'Store not found',
            }}
          />

          <CText style={Styles.profileName}>{`Preferences`}</CText>

          <CList
            style={Styles.spacelist}
            // numColumns={2}
            //   horizontal
            // contentContainerStyle={[GlobalStyle.list, ]}
            data={prefrencedata}
            // loading={reduxState.loading}
            renderItem={renderProfile}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              text: 'Store not found',
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default MyProfile;

const styles = StyleSheet.create({});
