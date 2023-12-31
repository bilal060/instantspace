/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, Text, View, Modal, Alert} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Container, CountriesModal, PackageCard} from '../../../../containers';
import {
  CButton,
  CheckBox,
  CInput,
  CList,
  CPagination,
  CText,
  ProfileCard,
  ProgressiveImage,
  RadioButton,
} from '../../../../components';
import Styles from './Managers.styles';
import {themes} from '../../../../theme/colors';
import {CNameIcon, ManagerIcon, TimeIcon} from '../../../../assets/images';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {useDispatch, useSelector} from 'react-redux';
import {
  filter_ownerManager,
  getSpacsss,
  get_ownerManager,
} from '../../../../redux/actions/Root.Action';

const Managers = ({navigation}) => {
  const type = useRef(null);
  const sort = useRef(null);
  const headerProps = {
    ProgressiveImageHeader: true,
    headerLeft: true,
    backBtnColor: themes.light.colors.fontLowColor,
    headerTransparentStyle: Styles.headerTransparentStyle,
    headerTitleStyle: Styles.headerTitleStyle,
    headerTitle: 'My Managers',
    headerRight: true,
    backButtonIcon: false,
    backGroundColor: 'red',
   
    isShowLinerar: true,
    headerRight: true,
    rightPress: () => navigation.navigate('AddNewManager'),
  };
  const reduxState = useSelector(({auth, language, root}) => {

    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.spacesLoading,
      userId: auth?.user?._id,
    };
  });

  const time = [
    {name: '7:00 am - 8:00 am'},
    {name: '9:00 am - 10:00 am'},

    {name: '1:00 am - 2:00 pm'},
    {name: '2:00 pm - 3:00 pm'},
    {name: '3:00 pm - 4:00 pm'},
  ];

  const [spaces, setSpaces] = useState([]);
  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState('');

  const [branchModalIsOpen, updateBranchModalIsOpen] = useState(false);
  const [selectedBranch, updateSelectedBranch] = useState('');

  const [timeModalIsOpen, updateTimeModalIsOpen] = useState(false);
  const [selectedTime, updateSelectedTime] = useState('');
  const [managers, setManagers] = useState([]);
  const [allmanagers, setallManagers] = useState([]);
  const dispatch = useDispatch();

  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };

  const countryOnSelect = item => {
    updateSelectedCountry(item);
    toggleCountryModal();
  };

  const toggleBranchModal = () => {
    updateBranchModalIsOpen(!branchModalIsOpen);
  };

  const branchOnSelect = item => {
    updateSelectedBranch(item);
    toggleBranchModal();
    // console.log(item);
    const filteredItems = allmanagers.filter((user) =>
    user?.branch?._id == item?._id)
    // console.log(item?._id);
     setManagers(filteredItems);
  };

  const toggleTimeModal = () => {
   
    updateTimeModalIsOpen(!timeModalIsOpen);
  };

  const timeOnSelect = item => {
    updateSelectedTime(item);
    toggleTimeModal();
    let isStatus = item?.name =="UnActive" ? false : true;
    const filteredItems = allmanagers.filter((user) =>
    user?.isTrue == isStatus)
     setManagers(filteredItems);
    // console.log(item);
    // console.log(filteredItems);
    // Alert.alert("bdsds")
  };

  useEffect(() => {
    getAllAPi();
  }, [reduxState?.userId]);

  const getAllAPi = () => {
    // console.log(reduxState?.userId);
    // console.log('id user');
    dispatch(getSpacsss(1, callBack));
    dispatch(get_ownerManager(reduxState?.userId, managerCallBack));
  };

  const callBack = res => {
   
    setSpaces([...spaces, ...res]);
  };

  function onEndReached(pag) {
    // Alert.alert(pag.toString());
    dispatch(getSpacsss(pag, callBack));
  }

  const filterManger = id => {
    const payload = {
      id: reduxState?.userId,
      spaceId: id,
    };
    dispatch(filter_ownerManager(payload, managerCallBack));
  };

  const managerCallBack = res => {
    // console.log(res)
    setManagers(res?.managers);
    setallManagers(res?.managers);
  };

  const renderListHeader = () => (
    <CText style={Styles.mainHeading}>{`All Managers`}</CText>
  );

  const renderProfile = ({item, index}) => {
    //  console.log(item)
    return (
      <View style={Styles.ProfileCard}>
        <ProfileCard
          name={item?.fullName ? item?.fullName: item?.firstName + item?.lastName}
          address={item?.branch?.location?.address? item?.branch?.location?.address : item?.branch?.address }
          active={item?.isTrue}
          phone={item?.phoneNo}
          photo={item?.photo ? item?.photo : null }
        />
      </View>
    );
  };

  return (
    <Container
      scrollView
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollViewProps={{
        contentContainerStyle: {
          flexGrow: 1,

          paddingHorizontal: 0,
        },
      }}>
      <View style={Styles.container}>
        <View
          style={{backgroundColor: '#f1f6f7', height: '100%', width: '100%'}}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 25,
            }}>
            <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
              <CText style={Styles.mainHeading}>Managers Filters</CText>
            </View>
            <CInput
              ref={type}
              placeholder={'Select Branch'}
              // selectedCountry={selectedCountry}
              // onPress={toggleCountryModal}
              // selectValue={selectedCountry}
              // sec
              // onChangeText={handleChange('fullName')}
              onPress={toggleBranchModal}
              selectValue={selectedBranch}
              sec
              inputInnerContainerStyle={Styles.inputInnerContainerStyle}
              type="view"
              leftIconNAme={CNameIcon}
              returnKeyType="next"
            />
            <CInput
              ref={type}
              placeholder={'Select Status'}
              inputInnerContainerStyle={Styles.inputInnerContainerStyle}
              sec
              onPress={toggleTimeModal}
              selectValue={selectedTime}
              type="view"
              leftIconNAme={TimeIcon}
              returnKeyType="next"
            />

            <CList
            data={managers}
              style={Styles.spacelist}
              loading={reduxState.loading}
              renderItem={renderProfile}
              ListHeaderComponent={renderListHeader}
              ListHeaderComponentStyle={Styles.listHeader}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              emptyOptions={{
                text: 'Mangers not found',
              }}
              onRefreshLoading={reduxState.loading}
              onRefreshHandler={() => getAllAPi()}
            />
          </View>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={countryModalIsOpen}
        onRequestClose={() => toggleCountryModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal
              data={reduxState?.countries}
              onSelect={val => countryOnSelect(val)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={branchModalIsOpen}
        onRequestClose={() => toggleBranchModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal
              isId={true}
              onEndReached={onEndReached}
              data={spaces}
              onSelect={val => branchOnSelect(val)}
            />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={timeModalIsOpen}
        onRequestClose={() => toggleTimeModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal data={[{name:"Active"},{name:"UnActive"}]} onSelect={val => timeOnSelect(val)} />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default Managers;

const styles = StyleSheet.create({});
