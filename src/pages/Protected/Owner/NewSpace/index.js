/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import {FlatList, StyleSheet, Text, View, Modal, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Container, CountriesModal, PackageCard} from '../../../../containers';

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

import Styles from './NewSpace.style';

import {themes} from '../../../../theme/colors';
import {ManagerIcon, PlaceIcon, Banner} from '../../../../assets/images';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';

import TruckParking from './TruckParking';
import CarParking from './CarParking';
import WareHouse from './WareHouse';
import Storage from './Storage';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DocumentPicker from 'react-native-document-picker';

import {useDispatch, useSelector} from 'react-redux';
import {SliderBox} from 'react-native-image-slider-box';

import mime from 'mime';

import {
  add_newSpace,
  get_spaceCategory,
  add_newWarehoue,
} from '../../../../redux/actions/Root.Action';
const NewSpace = ({navigation}) => {
  var isActive;
  const dispatch = useDispatch();
  const [selectValue, setSelectedValue] = useState(
    // _id: '6470b05d2490274856cf6472',
    // name: 'Storage Unit',
    categories?.subcategories[0],
  );
  
  const [categories, setCategories] = useState({});
  const [mapAdreess, setMapAdreess] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [selectedWarehouseVideo, setselectedWarehouseVideo] = useState();
  const [activeImg, setActiveImg] = useState(0);
  const headerProps = {
    ProgressiveImageHeader: true,
    headerLeft: true,
    backBtnColor: themes.light.colors.fontLowColor,
    headerTransparentStyle: Styles.headerTransparentStyle,
    headerTitleStyle: Styles.headerTitleStyle,
    headerTitle: 'Add New Space',
    backButtonIcon: true,
    headerRight: false,
    backGroundColor: 'red',
    rightPress: () => navigation.navigate('AddNewManager'),
  };

  const timeSlot = [
    {
      name: 'True',
    },
    {
      name: 'False',
    },
  ];

  const reduxState = useSelector(({auth, global}) => {
    return {
      loading: auth.signUpLoading,
      currentCountry: global?.currentCountry,
      countries: global?.countries,
      userRole: auth?.user?.role,
      userId: auth?.user?._id,
    };
  });

  useEffect(() => {
    getSpaceCategory();
  }, [reduxState?.userRole]);

  const getSpaceCategory = () => {
    dispatch(get_spaceCategory(reduxState?.userRole, callBack));
  };
  const callBack = res => {
    setCategories(res?.roleCategory);
  };
  const renderTimeSlot = ({item, index}) => {
    if (
      item?.name == 'Storage Unit' ||
      // item?.name == 'Car Parking' ||
      item?.name == 'Container Storage'
    ) {
    } else {
      return (
        <TouchableOpacity
          onPress={() => setSelectedValue(item)}
          style={
            item?.name === selectValue?.name
              ? Styles.memberCard
              : Styles.unActiveMember
          }>
          <CText
            style={
              item?.name === selectValue?.name
                ? Styles.manager
                : Styles.unActivemanager
            }>
            {item?.name}
          </CText>
        </TouchableOpacity>
      );
    }
  };

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState(
    reduxState.currentCountry,
  );

  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };

  const countryOnSelect = item => {
    updateSelectedCountry(item);
    toggleCountryModal();
  };

  const [cctcModalIsOpen, updateCctvModalIsOpen] = useState(false);
  const [selectedCCtv, updateSelectedCctv] = useState('');

  const toggleCctvModal = () => {
    updateCctvModalIsOpen(!cctcModalIsOpen);
  };

  const cctcOnSelect = item => {
    updateSelectedCctv(item?.name);
    toggleCctvModal();
  };

  const [securityModalIsOpen, updateSecurityModalIsOpen] = useState(false);
  const [selectedSecurity, updateSelectedSecurity] = useState('');

  const toggleSecurityModal = () => {
    updateSecurityModalIsOpen(!securityModalIsOpen);
  };

  const securityOnSelect = item => {
    updateSelectedSecurity(item);
    toggleSecurityModal();
  };

  const [fuelModalIsOpen, updateFuelModalIsOpen] = useState(false);
  const [selectedFuel, updateSelectedFuel] = useState('');

  const toggleFuelModal = () => {
    updateFuelModalIsOpen(!fuelModalIsOpen);
  };

  const fuelOnSelect = item => {
    updateSelectedFuel(item);
    toggleFuelModal();
  };

  const [staffModalIsOpen, updateStaffModalIsOpen] = useState(false);
  const [selectedStaff, updateSelectedStaff] = useState('');

  const toggleStaffModal = () => {
    updateStaffModalIsOpen(!staffModalIsOpen);
  };

  const staffOnSelect = item => {
    updateSelectedStaff(item);
    toggleStaffModal();
  };

  const [climateModalIsOpen, updateClimateModalIsOpen] = useState(false);
  const [selectedClimate, updateSelectedClimate] = useState('');

  const toggleClimateModal = () => {
    updateClimateModalIsOpen(!climateModalIsOpen);
  };

  const climateOnSelect = item => {
    updateSelectedClimate(item);
    toggleClimateModal();
  };

  // const [secModalIsOpen, updateSecurityModalIsOpen] = useState(false);
  // const [selectedSecurity, updateSelectedSecurity] = useState("");

  // const toggleSecurityModal = () => {
  //   updateSecurityModalIsOpen(!SecurityModalIsOpen);
  // };

  // const SecurityOnSelect = item => {
  //   toggleSecurityModal();
  // };
  const setToggleType = (type, value) => {
    if (type == 'longTerm') {
      setLongtermOn(value);
    } else if (type == 'shortTerm') {
      shorttermOn(value);
    } else if (type == 'Pickupservice') {
      setPickupservice(value);
    } else if (type == 'Climatecontrol') {
      setClimatecontrol(value);
    } else if (type == 'Boxpacking') {
      setBoxpacking(value);
    } else if (type == 'Pickanddelivery') {
      setPickanddelivery(value);
    } else if (type == 'Locks') {
      setLocks(value);
    } else if (type == 'Householditems') {
      setHouseholditems(value);
    } else if (type == 'Businessitems') {
      setBusinessitems(value);
    } else if (type == 'Coldstorage') {
      setColdstorage(value);
    } else if (type == 'Furniture') {
      setFurniture(value);
    } else if (type == 'foodproducts') {
      setfoodproducts(value);
    } else if (type == 'Firealarm') {
      setFirealarm(value);
    } else if (type == 'Aircondition') {
      setAircondition(value);
    } else if (type == 'Sprinklersystem') {
      setSprinklersystem(value);
    } else if (type == 'Security') {
      setSecurity(value);
    } else if (type == 'CCTV') {
      setCCTV(value);
    } else if (type == 'DoorAlarm') {
      setDoorAlarm(value);
    } else if (type == 'Dustfree') {
      setDustfree(value);
    } else if (type == 'Pastcontrol') {
      setPastcontrol(value);
    }
  };

  const [LongtermOn, setLongtermOn] = useState(false);
  const [ShorttermOn, shorttermOn] = useState(false);
  const [Pickupservice, setPickupservice] = useState(true);
  const [Climatecontrol, setClimatecontrol] = useState(true);
  const [Boxpacking, setBoxpacking] = useState(true);
  const [Pickanddelivery, setPickanddelivery] = useState(true);
  const [Locks, setLocks] = useState(true);
  const [Householditems, setHouseholditems] = useState(false);
  const [Businessitems, setBusinessitems] = useState(false);
  const [Coldstorage, setColdstorage] = useState(false);
  const [Furniture, setFurniture] = useState(false);
  const [foodproducts, setfoodproducts] = useState(false);
  const [Firealarm, setFirealarm] = useState(false);
  const [Aircondition, setAircondition] = useState(false);
  const [Sprinklersystem, setSprinklersystem] = useState(false);
  const [Security, setSecurity] = useState(false);
  const [CCTV, setCCTV] = useState(false);
  const [DoorAlarm, setDoorAlarm] = useState(false);
  const [Dustfree, setDustfree] = useState(false);
  const [Pastcontrol, setPastcontrol] = useState(false);

  const renderProfile = ({item, index}) => {
    return (
      <View style={Styles.ProfileCard}>
        <ProfileCard
          name={item.name}
          address={item?.address}
          active={item?.active}
          phone={item?.phone}
        />
      </View>
    );
  };

  const onDocumentPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedFile(res?.[0]);

      //Printing the log realted to the file

      //Setting the state to show single file attributes
      // this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const onVideoPress = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });

      setselectedWarehouseVideo(res?.[0]);

      //Printing the log realted to the file

      //Setting the state to show single file attributes
      // this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const submit = async values => {
    console.log('🚀 ~ file: index.js:195 ~ submit ~ values:', values);

    let subTypes = [];
    let otherServices = [];
    let facilities = [];
    const newImageUri =
      'file:///' + selectedFile?.uri?.split('file:/').join('');

    subTypes.push(
      Householditems == true ? 'Householditems' : Householditems?.key,
    );
    subTypes.push(Businessitems == true ? 'Businessitems' : Businessitems?.key);
    subTypes.push(Coldstorage == true ? 'Coldstorage' : Coldstorage?.key);
    subTypes.push(Furniture == true ? 'Furniture' : Furniture?.key);
    subTypes.push(foodproducts == true && 'foodproducts');

    subTypes = subTypes.filter(data => data != undefined);

    otherServices.push(Pickupservice ? 'Pickupservice' : undefined);
    otherServices.push(Climatecontrol ? 'Climatecontrol' : undefined);
    otherServices.push(Boxpacking ? 'Boxpacking' : undefined);
    otherServices.push(Coldstorage ? 'Coldstorage' : undefined);
    otherServices.push(Pickanddelivery ? 'Pickanddelivery' : undefined);
    otherServices.push(Locks ? 'Locks' : undefined);

    otherServices = otherServices.filter(data => data != undefined);

    facilities.push(Firealarm ? 'Firealarm' : undefined);
    facilities.push(Aircondition ? 'Aircondition' : undefined);
    facilities.push(Sprinklersystem ? 'Sprinklersystem' : undefined);
    facilities.push(Security ? 'Security' : undefined);
    facilities.push(CCTV ? 'CCTV' : undefined);
    facilities.push(DoorAlarm ? 'DoorAlarm' : undefined);
    facilities.push(Dustfree ? 'Dustfree' : undefined);

    facilities = facilities.filter(data => data != undefined);

    if (selectValue?.name === 'Warehouse') {
      // Alert.alert('call');
      const formData = new FormData();
      formData.append('userId', reduxState?.userId);
      formData.append('categoryId', categories?._id);
      formData.append('subCategoryId', selectValue?._id);
      formData.append('name', values?.fullName);
      formData.append('contact', values?.phone);
      formData.append('space', values.areaSize);
      formData.append('subTypes', subTypes);

      formData.append('otherServices', otherServices);

      formData.append('facilities', facilities);

      formData.append('description', values.decs);
      formData.append('rate_day', values?.rDay);
      formData.append('rate_month', values?.rHour);
      formData.append(
        'location',

        [
          mapAdreess?.geometry?.location?.lat,
          mapAdreess?.geometry?.location?.lng,
        ],
      );
      formData.append('address', mapAdreess?.formatted_address);

      formData.append(
        'storageTypes',
        LongtermOn == true ? 'Long-term' : 'Short-term',
      );

      formData.append('warehouse_imgs', {
        uri: selectedFile?.uri,
        // path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvadwNGLxMtCPqFOWpdRoCTcI3qFxjNc234ohBSiBUIg&',
        type: 'image/jpeg',
        name: selectedFile?.name,
      });

      // formData.append('warehouse_video', {
      //   uri: selectedWarehouseVideo?.uri,
      //   type: 'video/mp4',
      //   name: selectedWarehouseVideo?.uri,
      // });

      // console.log(mime.getType(newImageUri));
      // console.log(newImageUri);

      // return;
      // console.log(selectedFile);
      dispatch(add_newWarehoue(formData, handleSpacecallBack));
    } else {
      const formData = new FormData();
      formData.append('userId', reduxState?.userId);
      formData.append('categoryId', categories?._id);
      formData.append('area', values?.areaSize);
      formData.append('contact', values?.phone);
      formData.append('security', 123);
      formData.append('cameras', 'true');
      formData.append('capacity', values.parking);
      formData.append('description', values.decs);

      formData.append('fuel', 'true');
      formData.append('rate_hour', values?.rHour);
      formData.append('rate_day', values?.rDay);
      formData.append('rate_week', values?.rWeek);
      formData.append('rate_month', values?.rMonth);
      formData.append('location', mapAdreess?.formatted_address);
      formData.append('space_imgs', {
        uri: selectedFile?.uri,
        type: 'image/jpeg',
        name: selectedFile?.name,
      });
      formData.append('subCategoryId', selectValue?._id);
      formData.append('ownerSite', 'true');
      formData.append('paidStaff', 'true');
      formData.append('paidSecurity', 'true');
      formData.append('climateControl', 'true');
      // formData.append('location[coordinates]', [124.5, 1245.3]);

      // console.log(JSON.stringify(formData));
      //  return;
      dispatch(add_newSpace(formData, handleSpacecallBack));
    }
  };

  const handleSpacecallBack = res => {
    navigation.replace('MySpace');
  };

  const renderForm = value => {
    if (value === 'Truck Parking') {
      return (
        <TruckParking
          submit={submit}
          loading={reduxState?.loading}
          selectedCountry={selectedCountry}
          toggleCountryModal={toggleCountryModal}
          selectedCCtv={selectedCCtv}
          toggleCctvModal={toggleCctvModal}
          selectedFuel={selectedFuel}
          toggleFuelModal={toggleFuelModal}
          mapAdreess={mapAdreess}
          setMapAdreess={setMapAdreess}
          selectedClimate={selectedClimate}
          toggleClimateModal={toggleClimateModal}
          selectedSecurity={selectedSecurity}
          toggleSecurityModal={toggleSecurityModal}
          selectedStaff={selectedStaff}
          toggleStaffModal={toggleStaffModal}
          onDocumentPress={onDocumentPress}
          onVideoPress={onVideoPress}
          selectedWarehouseVideo={selectedWarehouseVideo}
          selectedFile={selectedFile}
        />
      );
    } else if (value === 'Car Parking') {
      return (
        <CarParking
          submit={submit}
          loading={reduxState?.loading}
          selectedCountry={selectedCountry}
          toggleCountryModal={toggleCountryModal}
          selectedCCtv={selectedCCtv}
          toggleCctvModal={toggleCctvModal}
          selectedFuel={selectedFuel}
          toggleFuelModal={toggleFuelModal}
          mapAdreess={mapAdreess}
          setMapAdreess={setMapAdreess}
          selectedClimate={selectedClimate}
          toggleClimateModal={toggleClimateModal}
          selectedSecurity={selectedSecurity}
          toggleSecurityModal={toggleSecurityModal}
          selectedStaff={selectedStaff}
          toggleStaffModal={toggleStaffModal}
          onDocumentPress={onDocumentPress}
          selectedFile={selectedFile}
        />
      );
    } else if (value === 'Warehouse') {
      return (
        <WareHouse
          submit={submit}
          loading={reduxState?.loading}
          selectedCountry={selectedCountry}
          toggleCountryModal={toggleCountryModal}
          selectedCCtv={selectedCCtv}
          toggleCctvModal={toggleCctvModal}
          selectedFuel={selectedFuel}
          toggleFuelModal={toggleFuelModal}
          mapAdreess={mapAdreess}
          setMapAdreess={setMapAdreess}
          selectedClimate={selectedClimate}
          toggleClimateModal={toggleClimateModal}
          selectedSecurity={selectedSecurity}
          toggleSecurityModal={toggleSecurityModal}
          selectedStaff={selectedStaff}
          toggleStaffModal={toggleStaffModal}
          onDocumentPress={onDocumentPress}
          selectedFile={selectedFile}
          onVideoPress={onVideoPress}
          selectedWarehouseVideo={selectedWarehouseVideo}
          LongtermOn={LongtermOn}
          ShorttermOn={ShorttermOn}
          Pickupservice={Pickupservice}
          Climatecontrol={Climatecontrol}
          Boxpacking={Boxpacking}
          Pickanddelivery={Pickanddelivery}
          Locks={Locks}
          Householditems={Householditems}
          Businessitems={Businessitems}
          Coldstorage={Coldstorage}
          Furniture={Furniture}
          foodproducts={foodproducts}
          setToggleType={setToggleType}
          Firealarm={Firealarm}
          Aircondition={Aircondition}
          Sprinklersystem={Sprinklersystem}
          Security={Security}
          CCTV={CCTV}
          DoorAlarm={DoorAlarm}
          Dustfree={Dustfree}
          Pastcontrol={Pastcontrol}
        />
      );
    } else if (value === 'Storage Unit') {
      return (
        <Storage
          submit={submit}
          loading={reduxState?.loading}
          selectedCountry={selectedCountry}
          toggleCountryModal={toggleCountryModal}
          selectedCCtv={selectedCCtv}
          toggleCctvModal={toggleCctvModal}
          selectedFuel={selectedFuel}
          toggleFuelModal={toggleFuelModal}
          mapAdreess={mapAdreess}
          setMapAdreess={setMapAdreess}
          selectedClimate={selectedClimate}
          toggleClimateModal={toggleClimateModal}
          selectedSecurity={selectedSecurity}
          toggleSecurityModal={toggleSecurityModal}
          selectedStaff={selectedStaff}
          toggleStaffModal={toggleStaffModal}
          onDocumentPress={onDocumentPress}
          selectedFile={selectedFile}
        />
      );
    }
  };

  useEffect(() => {
    // console.log('countries');
    // console.log(JSON.stringify(selectedCountry));
  }, [selectedCountry]);

  const images = [
    Banner,
    Banner,
    Banner,
    Banner,
    // Local image
  ];

  return (
    <Container
      scrollView
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}>
      <View style={{...Styles.container}}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 25,
          }}>
          {/* <View style={[GlobalStyle.row, Styles.headerView]}>
              <ProgressiveImage
                source={PlaceIcon}
                resizeMode="contain"
                style={{width: 25, height: 25}}
              />

              <CText style={Styles.listHeader}>{`Select Space Stype`}</CText>
            </View> */}

          <SliderBox
            images={images}
            onCurrentImagePressed={index => {
              // setActiveImg(index);
              isActive = activeImg === index;
            }}
            currentImageEmitter={index => {
              setActiveImg(index);
              isActive = activeImg - 1 === index;
             

              console.warn(`current pos is: ${index}`);
            }}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            dotColor="rgba(255,255,225,1)"
            inactiveDotColor="rgba(63,128,225,1)"
            activeDotColor="rgba(255,255,225,1)"
            paginationBoxVerticalPadding={0}
            paginationBoxStyle={{
              position: 'absolute',
              left: 0,
              bottom: 5,
              padding: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
            dotStyle={{
              width: isActive ? 25 : 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: -5,
              padding: 0,
              margin: 0,
              backgroundColor: '#000',
            }}
            ImageComponentStyle={{
              borderRadius: 15,
              width: '90%',
              marginTop: 12,
              alignSelf: 'flex-start',
            }}
            imageLoadingColor="#2196F3"
          />

          <CText style={Styles.listHeader}>{`Add new space`}</CText>
          <FlatList
            data={categories?.subcategories}
            renderItem={renderTimeSlot}
            horizontal
            nestedScrollEnabled
            ListHeaderComponentStyle={{flex: 1}}
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {renderForm(selectValue?.name)}

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
          visible={cctcModalIsOpen}
          onRequestClose={() => toggleCctvModal()}>
          <View style={Styles.modalContainer}>
            <View style={Styles.modalInnerContainer}>
              <CountriesModal
                data={timeSlot}
                onSelect={val => cctcOnSelect(val)}
              />
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={securityModalIsOpen}
          onRequestClose={() => toggleSecurityModal()}>
          <View style={Styles.modalContainer}>
            <View style={Styles.modalInnerContainer}>
              <CountriesModal
                data={timeSlot}
                onSelect={val => securityOnSelect(val)}
              />
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={fuelModalIsOpen}
          onRequestClose={() => toggleFuelModal()}>
          <View style={Styles.modalContainer}>
            <View style={Styles.modalInnerContainer}>
              <CountriesModal
                data={timeSlot}
                onSelect={val => fuelOnSelect(val)}
              />
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={staffModalIsOpen}
          onRequestClose={() => toggleStaffModal()}>
          <View style={Styles.modalContainer}>
            <View style={Styles.modalInnerContainer}>
              <CountriesModal
                data={timeSlot}
                onSelect={val => staffOnSelect(val)}
              />
            </View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          visible={climateModalIsOpen}
          onRequestClose={() => toggleClimateModal()}>
          <View style={Styles.modalContainer}>
            <View style={Styles.modalInnerContainer}>
              <CountriesModal
                data={timeSlot}
                onSelect={val => climateOnSelect(val)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  );
};

export default NewSpace;

const styles = StyleSheet.create({});
