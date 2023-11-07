import React, {useEffect, useState} from 'react';
import {Container, CountriesModal} from '../../../../../containers';
import {
  CList,
  CPagination,
  CText,
  ProgressiveImage,
} from '../../../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, FlatList, Modal, View} from 'react-native';
import AuthStyle from '../MySpace.style';
import CForm from './Form';
import {useNavigation} from '@react-navigation/native';
import {
  AddCard,
  Facebook,
  Google,
  LoginImg,
  Profile,
  VisaCard,
} from '../../../../../assets/images';
import {BASE_URL_IMG} from '../../../../../config/webservices';
import {
  add_vehicle,
  createBooking,
  getAllSpaces,
  get_CustomerCard,
  get_spaceCategory,
} from '../../../../../redux/actions/Root.Action';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
const {width, height} = Dimensions.get('screen');
import {useIsFocused} from '@react-navigation/native';

function AddVechiel({route}) {
  const {spaceId, startTime, price, endTime} = route?.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [carValue, selectCarValue] = useState(false);

  const [spaces, setSpaces] = useState([]);
  const [selectValue, setSelectedValue] = useState('Storage Unit');

  const [categories, setCategories] = useState({});

  const [stateModalIsOpen, updateStateModalIsOpen] = useState(false);
  const [selectedState, updateSelectedState] = useState('');
  const [selectedStateError, updateSelectedStateError] = useState('');

  const [companyModalIsOpen, updateCompanyModalIsOpen] = useState(false);
  const [selectedCompany, updateSelectedCompany] = useState('');
  console.log(
    '🚀 ~ file: index.js:45 ~ AddVechiel ~ selectedCompany:',
    selectedCompany,
  );
  const [selectedCompanyError, updateSelectedCompanyError] = useState('');

  const [companyModelModalIsOpen, updateCompanyModelModalIsOpen] =
    useState(false);
  const [selectedCompanyModel, updateCompanyModelState] = useState('');
  const [selectedCompanyModelError, updateSelectedCompanyModelError] =
    useState('');

  const [registerNo, updateRegisterNo] = useState('');
  const [registerNoError, updateRegisterNoError] = useState('');

  const [dregisterNo, updateDRegisterNo] = useState('');
  const [dregisterNoError, updateDRegisterNoError] = useState('');

  const toggleStateModal = () => {
    updateStateModalIsOpen(!stateModalIsOpen);
  };
  const stateOnSelect = item => {
    updateSelectedState(item);
    updateSelectedStateError('');
    toggleStateModal();
  };

  const toggleCompanyModal = () => {
    updateCompanyModalIsOpen(!companyModalIsOpen);
  };

  const companyOnSelect = item => {
    updateSelectedCompany(item);
    updateSelectedCompanyError('');
    toggleCompanyModal();
  };

  const toggleCompanyModelModal = () => {
    updateCompanyModelModalIsOpen(!companyModelModalIsOpen);
  };

  const companyModelOnSelect = item => {
    updateCompanyModelState(item);
    updateSelectedCompanyModelError('');
    toggleCompanyModelModal();
  };

  const reduxState = useSelector(({auth, language, root}) => {
    console.log(' ', root?.spaces);
    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.vehicleLoading,
      userId: auth?.user?._id,
      card: root?.cards?.data,
    };
  });
  const headerProps = {
    ProgressiveImageHeader: true,
    backButtonIcon: true,

    headerTitle: 'Add Vehicle',
    headerRight: false,
  };
  useEffect(() => {
    getCard();
    getSpaceCategory();
    // dispatch(getAllSpaces('', callBack));
  }, [reduxState?.userId, isFocused]);
  const getCard = () => {
    dispatch(get_CustomerCard(reduxState?.userId));
  };

  const getSpaceCategory = () => {
    dispatch(get_spaceCategory('Storage Owner', categoryCallBack));
  };
  const categoryCallBack = res => {
    setCategories(res?.roleCategory);
  };

  const submit = () => {
    if (!selectedCompany) {
      updateSelectedCompanyError('Please Select Company');
    } else if (!selectedCompanyModel) {
      updateSelectedCompanyModelError('Please Select Company Model');
    } else if (!selectedState) {
      updateSelectedStateError('Please Select Truck Type');
    } else if (!registerNo) {
      updateRegisterNoError('Please enter register number');
    } else if (!dregisterNo) {
      updateDRegisterNoError('Please enter License number');
    } else {
      updateRegisterNoError('');
      handleCallApi();
    }
  };
  const data = [
    {name: 'Kenworth'},
    {name: 'Peterbilt'},
    {name: 'Toyata'},
    {name: 'Suzuki'},
    {name: 'Mack Trucks'},
    {name: 'Honda'},
  ];
  const dataYear = [
    {name: '2023'},
    {name: '2022'},
    {name: '2021'},
    {name: '2020'},
    {name: '2019'},
    {name: '2018'},
    {name: '2017'},
    {name: '2016'},
    {name: '2015'},
    {name: '2014'},
    {name: '2013'},
    {name: '2012'},
    {name: '2011'},
    {name: '2010'},
  ];
  const dataTypes = [
    {name: 'Dump'},
    {name: 'Water'},
    {name: 'Bulldozers'},
    {name: 'Front Loaders'},
    {name: 'Grader'},
    {name: 'Cranes'},
    {name: 'Loaders'},
    {name: 'Compactors'},
  ];

  const callBack = res => {
    setSpaces(res?.spaces);
  };

  const handleCallApi = () => {
    console.log('2', 2);
    const payload = {
      userId: reduxState?.userId,
      spaceId: spaceId,
      from: startTime,
      to: endTime,
      price: price,
      card: carValue,
      subcategoryId: selectValue?._id,
      details: {
        company: selectedCompany?.name,
        model: selectedCompanyModel?.name,
        type: selectedState?.name,
        regNo: registerNo,
        license: dregisterNo,
      },
    };
    // formData.append('userId', reduxState?.userId),
    //   formData.append('company', selectedCompany?.name),
    //   formData.append('model', selectedCompanyModel?.name),
    //   formData.append('type', selectedState?.name),
    //   formData.append('regiterNo', registerNo),
    //   formData.append('drivingLicenseNo',dregisterNo),
    dispatch(createBooking(payload, handleBack));
  };
  const handleBack = res => {
    navigation.navigate('Home');
  };

  const renderTimeSlot = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedValue(item)}
        style={
          item?.name === selectValue?.name
            ? AuthStyle.memberCard
            : AuthStyle.unActiveMember
        }>
        <CText
          style={
            item?.name === selectValue?.name
              ? AuthStyle.manager
              : AuthStyle.unActivemanager
          }>
          {item?.name}
        </CText>
      </TouchableOpacity>
    );
  };

  const handleRes = res => {};
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
      {/* <FlatList
            data={categories?.subcategories}
            renderItem={renderTimeSlot}
            horizontal
            contentContainerStyle={{height:50 , backgroundColor:"red"}}
            nestedScrollEnabled
            // ListHeaderComponentStyle={{flex: 1 }}
            showsHorizontalScrollIndicator={false}
          /> */}
      <View style={{height: 50}}>
        <CList
          contentContainerStyle={{height: 100}}
          // numColumns={2}
          //   horizontal
          // contentContainerStyle={[GlobalStyle.list, ]}
          data={categories?.subcategories}
          loading={reduxState.loading}
          renderItem={renderTimeSlot}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            // icon: require('../../assets/images/empty.png'),
            text: 'time slot not found',
          }}
          onRefreshLoading={reduxState.loading}
          onRefreshHandler={() => {}}
          // onEndReached={onEndReached}
          // onEndReachedThreshold={0.1}
          // maxToRenderPerBatch={10}
          // windowSize={10}
        />
      </View>

      <CForm
        user={reduxState?.user}
        submit={submit}
        loading={reduxState?.loading}
        onForgotPress={() => navigation.navigate('Forgot')}
        onStatePress={toggleStateModal}
        selectedState={selectedState}
        selectedStateError={selectedStateError}
        onCompanyPress={toggleCompanyModal}
        selectedCompany={selectedCompany}
        selectedCompanyError={selectedCompanyError}
        onCompanyModelPress={toggleCompanyModelModal}
        selectedCompanyModel={selectedCompanyModel}
        selectedCompanyModelError={selectedCompanyModelError}
        registerNo={registerNo}
        updateRegisterNo={updateRegisterNo}
        registerNoError={registerNoError}
        dregisterNo={dregisterNo}
        updateDRegisterNo={updateDRegisterNo}
        dregisterNoError={dregisterNoError}
      />

      <CText style={AuthStyle.mainHeading}>Add Vehicle Details</CText>
      {reduxState?.card?.map(val => {
        console.log('valvalvalvalvalval', val);
        return (
          <TouchableOpacity
            onPress={() => selectCarValue(val?.id)}
            style={
              val?.id === carValue
                ? AuthStyle.selectedMultplyCard
                : AuthStyle.multplyCard
            }>
            <ProgressiveImage
              source={VisaCard}
              style={{width: 20, height: 20}}
            />
            <CText style={AuthStyle.cardText}>
              {' '}
              {`Ending in **** **** ****  ${val?.last4}`}
            </CText>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddCard')}
        style={AuthStyle.addCard}>
        <ProgressiveImage source={AddCard} style={{width: 20, height: 20}} />
        <CText style={AuthStyle.addCardText}>Add Card</CText>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={stateModalIsOpen}
        onRequestClose={() => toggleStateModal()}>
        <View style={AuthStyle.modalContainer}>
          <View style={AuthStyle.modalInnerContainer}>
            <CountriesModal
              onSelect={val => stateOnSelect(val)}
              data={dataTypes || []}
              key="c"
              Value="G"
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={companyModalIsOpen}
        onRequestClose={() => toggleCompanyModal()}>
        <View style={AuthStyle.modalContainer}>
          <View style={AuthStyle.modalInnerContainer}>
            <CountriesModal
              onSelect={val => companyOnSelect(val)}
              data={data || []}
              key="c"
              Value="G"
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={companyModelModalIsOpen}
        onRequestClose={() => toggleCompanyModelModal()}>
        <View style={AuthStyle.modalContainer}>
          <View style={AuthStyle.modalInnerContainer}>
            <CountriesModal
              onSelect={val => companyModelOnSelect(val)}
              data={dataYear || []}
              key="c"
              Value="G"
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}
export default AddVechiel;
