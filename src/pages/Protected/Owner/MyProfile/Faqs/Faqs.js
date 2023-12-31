import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Container, PackageCard} from '../../../../../containers';
import {
  CButton,
  CheckBox,
  CIcon,
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
import {AccordionList} from 'accordion-collapse-react-native';

const FAQS = ({}) => {
  const navigation = useNavigation();

  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: true,

    headerTitle: 'FAQs',
    headerRight: false,
    backGroundColor: 'red',
    isShowLinerar: true,
  };

  const SECTIONS = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet consr.?',
      body: 'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet consr.?',
      body: 'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.',
    },
    {
      id: 6,
      title: 'Lorem ipsum dolor sit amet consr.?',
      body: 'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet consr.?',
      body: 'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet consr.?',
      body: 'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.',
    },
    {
      id: 5,
      title: 'Lorem ipsum dolor sit amet consr.?',
      body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
    },
  ];
  const _head = (item, index) => {
    console.log('🚀 ~ file: Faqs.js:63 ~ FAQS ~ item:', item, index);

    return (
      <>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            height: 50,
          }}>
          <CText style={Styles.questionTitle}>{item.title}</CText>
          <CIcon
            type="AntDesign"
            name={!true ? 'up' : 'down'}
            size={20}
            color="000"
          />
        </View>
        <View
          style={{height: 1, backgroundColor: '#E7E6E9', }}
        />
      </>
    );
  };

  const _body = (item, index) => {
    return (
      <View style={{padding: 10}}>
        <Text style={Styles.content}>{item.body}</Text>
      </View>
    );
  };
  //  const  _renderSectionTitle = (section) => {
  //     return (
  //       <View style={styles.content}>
  //         <Text>{section.content}</Text>
  //       </View>
  //     );
  //   };

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
          <AccordionList
            list={SECTIONS}
            header={_head}
            body={_body}
            
            keyExtractor={item => `${item.id}`}
          />
        </View>
        {/* <Accordion
        sections={SECTIONS}
        // activeSections={0}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
      /> */}
      </View>
    </Container>
  );
};

export default FAQS;

const styles = StyleSheet.create({});
