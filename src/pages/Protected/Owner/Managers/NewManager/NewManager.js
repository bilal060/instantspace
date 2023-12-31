/* eslint-disable prettier/prettier */
import {FlatList, StyleSheet, Text, View, Modal, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Container,
  CountriesModal,
  PackageCard,
} from '../../../../../containers';
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
import Styles from '../Managers.styles';
import {themes} from '../../../../../theme/colors';
import {ManagerIcon} from '../../../../../assets/images';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
import {useSelector, useDispatch} from 'react-redux';
import CForm from './Form';
import {
  add_managers,
  getSpacsss,
} from '../../../../../redux/actions/Root.Action';
const NewManager = ({navigation}) => {
  const headerProps = {
    ProgressiveImageHeader: true,
    headerLeft: true,

    headerTitle: 'Add New Manager',
    backButtonIcon: true,
    headerRight: false,
    backGroundColor: 'red',
    isShowLinerar: true,
  };

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
      userId: auth?.user?._id,
    };
  });
  const dispatch = useDispatch();

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState('');
  const [spaces, setSpaces] = useState([]);

  const [branchModalIsOpen, updateBranchModalIsOpen] = useState(false);
  const [selectedBranch, updateSelectedBranch] = useState('');

  const [timeModalIsOpen, updateTimeModalIsOpen] = useState(false);
  const [selectedTime, updateSelectedTime] = useState('');


  useEffect(() => {
    // Alert.alert('2333');
    dispatch(getSpacsss(1, callBack));
  }, []);

  function onEndReached(pag) {
    // Alert.alert(pag.toString());
    dispatch(getSpacsss(pag, callBack));
  }

  const callBack = res => {

    // setSpaces(res);
    setSpaces([...spaces, ...res]);
  };

  const time = [
    {name: '7:00 am - 8:00 am'},
    {name: '9:00 am - 10:00 am'},

    {name: '1:00 am - 2:00 pm'},
    {name: '2:00 pm - 3:00 pm'},
    {name: '3:00 pm - 4:00 pm'},
  ];

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
  };

  const toggleTimeModal = () => {
    updateTimeModalIsOpen(!timeModalIsOpen);
  };

  const timeOnSelect = item => {
    updateSelectedTime(item);
    toggleTimeModal();
  };

  const submit = async values => {
    var time = null;
    if (selectedTime?.name) {
      time = selectedTime?.name?.split('-');
    }

    const payload = {
      firstName: values?.fullName,
      lastName: values?.fullName,
      managerOwner: 'Manager',
      email: values?.email,
      phoneNo: values?.phone,
      branch: selectedBranch?._id,
      platform: "mobile",
      slot: {
        from: time[0],
        to: time[1],
      },
       managerOwner: reduxState?.userId,
    };
 

    // return;
    dispatch(add_managers(payload, managerCallBack));
    // navigation.navigate('NewSpace');
  };
  const managerCallBack = res => {
    navigation.goBack();
  };

  return (
    <Container
      bottomSpace
      scrollViewProps={{
        contentContainerStyle: {
          flexGrow: 1,

          paddingHorizontal: 0,
        },
      }}
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollView>
      <View style={{backgroundColor: '#f1f6f7', height: '100%', width: '100%'}}>
        <View style={{paddingHorizontal: 20, paddingVertical: 25}}>
          <CForm
            submit={submit}
            loading={reduxState?.loading}
            selectedCountry={selectedCountry}
            selectedBranch={selectedBranch}
            selectedTime={selectedTime}
            toggleBranchModal={toggleBranchModal}
            toggleCountryModal={toggleCountryModal}
            toggleTimeModal={toggleTimeModal}
          />

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
                <CountriesModal
                  data={time}
                  onSelect={val => timeOnSelect(val)}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Container>
  );
};

export default NewManager;

const styles = StyleSheet.create({});
