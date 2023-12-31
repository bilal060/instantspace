/* eslint-disable prettier/prettier */
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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
  SecurityIcon,
} from '../../../../../assets/images';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import Accordion from 'react-native-collapsible/Accordion';
import {MappedElement} from '../../../../../utils/methods';
import i18n from '../../../../../utils/i18n/i18n';

const PrivacyScreen = ({}) => {
  const navigation = useNavigation();
  const [selectedLan, setSelectedLan] = useState(false);
  const [options, setOptions] = useState([
    {
      title: 'English',
      content: 'Lorem ipsum...',
      value: true,
      code: 'en',
    },
    {
      title: 'German',
      content: 'Lorem ipsum...',
      value: false,
      code: 'hi',
    },
    {
      title: 'Arabic',
      content: 'Lorem ipsum...',
      value: false,
      code: 'ar',
    },
  ]);
  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: true,

    headerTitle: 'Langugae',
    headerRight: false,
  };

  const handleOptionChange = option => {
    const updatedOptions = options.map(opt => {
      if (opt?.title === option?.title) {
        return {...opt, value: true};
      } else {
        return {...opt, value: false};
      }
    });
    console.log(
      '🚀 ~ file: Langugae.js:72 ~ updatedOptions ~ updatedOptions:',
      updatedOptions,
    );
    setOptions(updatedOptions);
    handleLanguageChange(option?.code);
  };
  const handleLanguageChange = languageCode => {
    i18n.changeLanguage(languageCode);
  };

  const _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = section => {
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
          <CText style={Styles.title}>Select Language</CText>

          <MappedElement
            data={options}
            renderElement={(item, index) => (
              <RadioButton
                title={item?.title}
                value={item?.value}
                onChange={val => handleOptionChange(item)}
                containerStyles={Styles.containerStyles}
                myStyle2={Styles.myStyle2}
              />
            )}
          />

          {/* <RadioButton
            title="Abc"
            value={selectedLan}
            onChange={() => handleOptionChange(SECT)}
            containerStyles={Styles.containerStyles}
            myStyle2={Styles.myStyle2}
          /> */}
        </View>
      </View>
    </Container>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({});
