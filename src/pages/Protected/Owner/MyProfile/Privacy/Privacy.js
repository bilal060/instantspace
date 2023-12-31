import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, PackageCard} from '../../../../../containers';
import {
  CButton,
  CheckBox,
  CList,
  CPagination,
  CText,
  ProfileCard,
  ProgressiveImage,
  RadioButton,
} from '../../../../../components';
import Styles from '../Myprofile.style';
import {themes} from '../../../../../theme/colors';
import {
    ArrowLeft,
  ChangePass,
  EditProfile,
  Faq,
  Logout,
  ManagerIcon,
  Notification,
  Payment,
  Privacy,
  Profile,
} from '../../../../../assets/images';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';

const PrivacyScreen = ({}) => {
  const navigation = useNavigation();

  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: true,

    headerTitle: 'Privacy Policy',
    headerRight: false,
    backGroundColor: 'red',
    isShowLinerar: true,
    
  };



  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];

//  const  _renderSectionTitle = (section) => {
//     return (
//       <View style={styles.content}>
//         <Text>{section.content}</Text>
//       </View>
//     );
//   };

 const _renderHeader = (section) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

 const _renderContent = (section) => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  

 
 

  const renderProfile = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
        <View style={Styles.ProfileCard}>
          <ProgressiveImage
            source={item?.img}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
          <View style={{flex: 1, paddingHorizontal: 10 , paddingLeft:20}}>
            <CText style={item.address=== 'Log Out' ?  Styles.logout : Styles.messageName}>{item?.address}</CText>
          </View>
          <View>
          <ProgressiveImage
            source={ArrowLeft}
            resizeMode="contain"
            style={{width: 25, height: 25}}
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
      <CText style={Styles.title}>Acceptance of the Privacy Policy</CText>
      <CText style={Styles.answer}>Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.</CText>

      <CText style={Styles.answer}>Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur.</CText>

      <CText style={Styles.answer}>Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus con.</CText>

        </View>
        
      </View>
    </Container>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({});
