/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { FlatList, StyleSheet, Text, View, Modal, Alert, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Container, CountriesModal, PackageCard } from '../../../../containers';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {
    CButton,
    CDropDown,
    CheckBox,
    CList,
    CPagination,
    CText,
    ProfileCard,
    ProgressiveImage,
    RadioButton,
} from '../../../../components';

import Styles from './style';
import ModalDropdown from 'react-native-modal-dropdown';

import { themes } from '../../../../theme/colors';
import { ManagerIcon, PlaceIcon, Banner, Banner1 } from '../../../../assets/images';
import DocumentPicker from 'react-native-document-picker';

import { useDispatch, useSelector } from 'react-redux';
import countryCode from '../../../../helper/countryCode'
import { SliderBox } from 'react-native-image-slider-box';
import {
    add_newSpace,
    get_spaceCategory,
    add_newWarehoue,
} from '../../../../redux/actions/Root.Action';
import { TextInputIcons } from '../../../../components/newSpaceComp/TextInput/TextInputIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NewButtonIcon } from '../../../../components/newSpaceComp/NewButtonIcon/NewButtonIcon';
import CustomDropdown from '../../../../components/newSpaceComp/CustomDropdown/CustomDropdown';
import { CustomSwitch } from '../../../../components/newSpaceComp/CustomSwitch/CustomSwitch';
import { ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NewDesignSpace = ({ navigation }) => {
    var isActive;

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
        isShowLinerar: true,
        rightPress: () => navigation.navigate('AddNewManager'),
    };
    let dropdownData = [
        { label: 'Yes', value: "Yes" },
        { label: 'No', value: "No" },
        // { label: 'Option 3', value: 3 },
    ];

    let Parkingdeatils = [
      { name: 'Security Measure', isActive: "No" },
      { name: 'Air Condition', isActive: "No" },
      { name: 'Temperature Control', isActive: "No" },
   
  ];

  let Servicedeatils = [
    { name: 'Pickup Service', isActive: "No" },
    { name: 'Box Packaging', isActive: "No" },
    { name: 'Pick & Delivery', isActive: "No" },
 
];

let TruckParkingdeatils = [
  { name: 'Restroom', isActive: "No" },
  { name: 'Showers', isActive: "No" },
  { name: 'Fuel Station', isActive: "No" },

];




    

    const images = [
        Banner,
        Banner,
      
        
        // Local image
    ];
    ////neww space states////
    const [selected, setSelected] = useState('Warehouse')
    const category = {
        'Warehouse': {
            name: 'Warehouse',
            icon: require('../../../../assets/images/icons/Services.png'),
            _id:"6470b05d2490274856cf6475"
        },
        'Truck Parking': {
            name: 'Truck Parking',
            icon: require('../../../../assets/images/icons/FocusedTruck.png'),
            _id:"6470b05d2490274856cf6474"
        }
    };
    const [categoryIndex, setcategoryIndex] = React.useState(0)
    var isActive;
    const dispatch = useDispatch();
    const [selectValue, setSelectedValue] = useState(
      // _id: '6470b05d2490274856cf6472',
      // name: 'Storage Unit',
      {
      name: 'Warehouse',
      icon: require('../../../../assets/images/icons/Services.png'),
      _id:"6470b05d2490274856cf6475"
      }
    );
    // console.log('🚀 ~ file: index.js:38 ~ NewSpace ~ selectValue:', selectValue);
    const [categories, setCategories] = useState({});
    const [mapAdreess, setMapAdreess] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [selectedWarehouseVideo, setselectedWarehouseVideo] = useState();
    
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
  const handlePlaceSelection = (data, details) => {
    setMapAdreess(data);
  };

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
  




  const [fullName, setfullName] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [descripation, setdescripation] = useState("");
  const [location, setlocation] = useState("");
  const [typeParking, settypeParking] = useState("");
  const [securityMeasure, setsecurityMeasure] = useState("");
  const [capacity, setcapacity] = useState("");
  const [ratehour, setratehour] = useState("");
  const [rateday, setrateday] = useState("");
  const [rateweek, setrateweek] = useState("");
  const [creditcard, setcreditcard] = useState(false);
  const [availabilityreservation, setavailabilityreservation] = useState(false);
  const [notes, setnotes] = useState("");
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
  const [countrycode, setcountrycode] = useState('+971');
  const [formValidation, setformValidation] = useState({
    'Full Name': '',
    'Email': '',
     'City': '',
     "Address":"",
    'Province': '',
    'descripation': '',
    'phoneNumber':"",
    'capacity':"",
    'rate-day':"",
    'rate-week':"",
    'rate-hour':"",

  });
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

  

  function Validation() {
    var isValidate = true;
    if (fullName === '') {
      setformValidation(prevState => ({
        ...prevState,
       ['Full Name']: "Please enter your name"
    }));
      isValidate = false;
    }
    if(!mapAdreess?.formatted_address )
    {
      setformValidation(prevState => ({
        ...prevState,
       ['Address']: "Please enter your Address"
    }));
      isValidate = false;
    }
    if ( city === '') {
      
      setformValidation(prevState => ({
        ...prevState,
       ['City']: "Please enter your city"
    }));
      isValidate = false;
    }
    if ( province=== '') {
  
      setformValidation(prevState => ({
        
        ...prevState,
       ['Province']: "Please enter your Province"
    }));
      isValidate = false;
    }

    if ( email=== '') {
  
      setformValidation(prevState => ({
        
        ...prevState,
       ['Email']: "Please enter your Email"
    }));
      isValidate = false;
    }

    if ( phoneNumber=== '') {
     
      setformValidation(prevState => ({
        
        ...prevState,
       ['phoneNumber']: "Please enter your phoneNumber"
    }));
      isValidate = false;
    }
    if ( descripation=== '') {
  
      setformValidation(prevState => ({
        
        ...prevState,
       ['descripation']: "Please enter your descripation"
    }));
      isValidate = false;
    }

    if ( capacity=== '') {
    
      setformValidation(prevState => ({
        
        ...prevState,
       ['capacity']: "Please enter your capacity"
    }));
      isValidate = false;
    }

    if (  rateday=== '') {
    
      setformValidation(prevState => ({
         
        ...prevState,
       ['rate-day']: "Please enter your rateday"
    }));
      isValidate = false;
    }

    if (  ratehour === '') {
    
      setformValidation(prevState => ({
        ...prevState,
       ['rate-hour']: "Please enter your ratehour"
    }));
      isValidate = false;
    }

    
    if (  rateweek === '') {
    
      setformValidation(prevState => ({
        ...prevState,
       ['rate-week']: "Please enter your rateweek"
    }));
      isValidate = false;
    }
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

   
   
      if (emailPattern.test(email) === false) {
        setformValidation(prevState => ({
        
          ...prevState,
         ['Email']: "Incorrect Email address"
      }));
        isValidate = false;
      
      }

    return isValidate;
  }

  const submit = async values => {
    // console.log('🚀 ~ file: index.js:195 ~ submit ~ values:', values);

    // let subTypes = [];
    // let otherServices = [];
    // let facilities = [];
    // const newImageUri =
    //   'file:///' + selectedFile?.uri?.split('file:/').join('');

    // subTypes.push(
    //   Householditems == true ? 'Householditems' : Householditems?.key,
    // );
    // subTypes.push(Businessitems == true ? 'Businessitems' : Businessitems?.key);
    // subTypes.push(Coldstorage == true ? 'Coldstorage' : Coldstorage?.key);
    // subTypes.push(Furniture == true ? 'Furniture' : Furniture?.key);
    // subTypes.push(foodproducts == true && 'foodproducts');

    // subTypes = subTypes.filter(data => data != undefined);

    // otherServices.push(Pickupservice ? 'Pickupservice' : undefined);
    // otherServices.push(Climatecontrol ? 'Climatecontrol' : undefined);
    // otherServices.push(Boxpacking ? 'Boxpacking' : undefined);
    // otherServices.push(Coldstorage ? 'Coldstorage' : undefined);
    // otherServices.push(Pickanddelivery ? 'Pickanddelivery' : undefined);
    // otherServices.push(Locks ? 'Locks' : undefined);

    // otherServices = otherServices.filter(data => data != undefined);

    // facilities.push(Firealarm ? 'Firealarm' : undefined);
    // facilities.push(Aircondition ? 'Aircondition' : undefined);
    // facilities.push(Sprinklersystem ? 'Sprinklersystem' : undefined);
    // facilities.push(Security ? 'Security' : undefined);
    // facilities.push(CCTV ? 'CCTV' : undefined);
    // facilities.push(DoorAlarm ? 'DoorAlarm' : undefined);
    // facilities.push(Dustfree ? 'Dustfree' : undefined);

    // facilities = facilities.filter(data => data != undefined);

      const newImageUri =
       'file:///' + selectedFile?.uri?.split('file:/').join('');

     if (selected === 'Warehouse') {
     const isValidate = Validation();
     if(isValidate== true)
     {

      const formData = new FormData();
      formData.append('userId', reduxState?.userId);
      formData.append('categoryId', categories?._id);
      formData.append('subCategoryId', selectValue?._id);
      formData.append('fullName', fullName);
      formData.append('name', fullName);
      formData.append('email', email);
      formData.append('type', "wareHouse");
      formData.append('availabilty', "yes");
      formData.append('contact', countrycode + phoneNumber);
       formData.append('state', province);
       formData.append('zipCode', 123);
       formData.append('size', 12090);
      // formData.append('subTypes', subTypes);

      formData.append('otherServices', JSON.stringify( Servicedeatils));

      formData.append('facilities', JSON.stringify( Parkingdeatils));

      formData.append('description', descripation);
      formData.append('rate_day', rateday);
      formData.append('rate_hour', rateweek);
    
      formData.append('rate_month', rateweek);
      formData.append('security', "37656655");
      formData.append('capacity', capacity);
      formData.append('address', mapAdreess?.formatted_address);
      formData.append('notes', notes);

     

      formData.append('space_imgs', {
        uri: selectedFile?.uri,
        type: 'image/jpeg',
        name: selectedFile?.name,
      });

      dispatch(add_newSpace(formData, handleSpacecallBack));
    }
    } 
    
    else {
      // console.log(Parkingdeatils);
      const isValidate = Validation();
      if(isValidate == true)
      {
      const formData = new FormData();
      formData.append('userId', reduxState?.userId);
      formData.append('categoryId', categories?._id);
      formData.append('subCategoryId', selectValue?._id);
      formData.append('name', fullName);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('type', "wareHouse");
      formData.append('availabilty', "yes");
      formData.append('contact', countrycode + phoneNumber);
       formData.append('state', province);
       formData.append('zipCode', 123);
       formData.append('size', 12090);
      formData.append('otherServices', JSON.stringify( Servicedeatils));
      formData.append('facilities',  JSON.stringify(  Parkingdeatils));
      formData.append('description', descripation);
      formData.append('rate_day', rateday);
      formData.append('rate_hour', rateweek);
      formData.append('rate_month', rateweek);
      formData.append('security', "37656655");
      formData.append('capacity', capacity);
      formData.append('address', mapAdreess?.formatted_address);
      formData.append('notes', notes);

     

      formData.append('space_imgs', {
        uri: selectedFile?.uri,
        type: 'image/jpeg',
        name: selectedFile?.name,
      });
      dispatch(add_newSpace(formData, handleSpacecallBack));
    }
  }
  };

  const handleSpacecallBack = res => {
    navigation.replace('MySpace');
  };

  const renderDropdownRow = rowData => {
    return (
      <View
        style={{
          // ...Styles.dropdownRender,
          padding: 12,
          // backgroundColor: 'white',
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            _dropdown_2_renderButtonText(rowData);
          }}
          style={{padding: 10}}> */}
        <Text style={{}}>
          {rowData.country}: {rowData.code}
        </Text>
        {/* </TouchableOpacity> */}
      </View>
    );
  };

  function _dropdown_2_renderButtonText(rowData) {
    
    const {code, country} = rowData;
    setcountrycode(code);
    return (
      <View>
        <Text style={{fontSize: 14, fontWeight: '600', color: 'black'}}>
          {code}
        </Text>
      </View>
    );

    // return `${name} - ${age}`;
  }

    const CategoryList = () => {
        const categoryKeys = Object.keys(category);
        // console.log(cat)
        return (
            <View style={Styles.categoryContainer}>
                {categoryKeys.map((key, index) => (
                    <View key={index}>

                        <TouchableOpacity
                            activeOpacity={0.2}
                            onPress={() => {
            
                              ResetValidationanndData();
                                setSelected(key);
                                setcategoryIndex(index);
                                setSelectedValue(category[key])
                            }}
                             style={[Styles.categoryText, categoryIndex === index && Styles.categoryTextSelected]}
                        >
                          <LinearGradient
                         colors={ categoryIndex === index ?['#FB7C5F', '#DF525B']:["#FFFFFF",'#0000001A']}
                         style={[Styles.categoryText, categoryIndex === index && Styles.categoryTextSelected ,]}>
                      
                            <Image source={category[key].icon} style={[Styles.iconn, categoryIndex === index && Styles.iconSelected]} />
                            <Text style={[Styles.text, categoryIndex === index && Styles.TextSelected]}>
                                {category[key].name}
                            </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                      
                    </View>
                ))}
            </View>
        )
    }

  function  ResetValidationanndData()
  {
    setcity('');
    setprovince('');
    setzipcode('');
    setSelectedFile(null);
    setfullName('');
    setemail('');
    setphoneNumber('');
    setcountrycode('+971');
    setdescripation('');
    setcapacity('');
    setrateday('');
    setratehour('');
    setrateweek('');
    setnotes('');
  }
    return (
        <Container
            scrollView
            bottomSpace
            edges={['left', 'right']}
            headerProps={headerProps}>
            <View style={{ ...Styles.container }}>
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 25,
                    }}>
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
                        
                        // dotColor="rgba(255,255,225,1)"
                        // inactiveDotColor="rgba(63,128,225,1)"
                        // activeDotColor="rgba(255,255,225,1)"
                        paginationBoxVerticalPadding={0}
                        // paginationBoxStyle={{
                        //     position: 'absolute',
                        //     left: 0,
                        //     bottom: 5,
                        //     padding: 0,
                        //     alignItems: 'center',
                        //     alignSelf: 'center',
                        //     justifyContent: 'center',
                        //     paddingVertical: 10,
                        // }}
                        // dotStyle={{
                        //     width: isActive ? 25 : 10,
                        //     height: 10,
                        //     borderRadius: 5,
                        //     marginHorizontal: -5,
                        //     padding: 0,
                        //     margin: 0,
                        //     backgroundColor: '#000',
                        //     alignSelf: 'center'
                        // }}
                        dotStyle={{ display: 'none' }}
                        ImageComponentStyle={{
                            borderRadius: 15,
                            width: '90%',
                            marginTop: 12,
                            alignSelf: 'flex-start',
                        }}
                        imageLoadingColor="#2196F3"
                    />

                    <CText style={Styles.listHeader}>{`Add new space`}</CText>
                    <View style={Styles.Card}>
                        <View style={Styles.flexView}>
                            <Image source={require('../../../../assets/images/fuelIcon.png')} style={Styles.icon} />
                            <Text style={Styles.normalText}>Select Space Type</Text>
                        </View>
                         <CategoryList /> 
                        {/* <FlatList
            data={categories?.subcategories}
            renderItem={renderTimeSlot}
            horizontal
            nestedScrollEnabled
            ListHeaderComponentStyle={{flex: 1}}
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
          /> */}
                        <CText style={Styles.listHeader}>{`Location Information`}</CText>
                
        
                        {/* <TextInputIcons
                            image={require('../../../../assets/images/area.png')}
                            placeholder={'Name location'}
                            multi
                            value ={fullName}
                            onChangetxt={(value)=>{
                                
                                setfullName(value)
                            }}
                            error={"Enter your name"}
                        /> */}
                         <GooglePlacesAutocomplete
                       
                  placeholder={'Select Your Adreess'}
                  debounce={100}
                  listViewDisplayed={false}
                  minLength={2}
                  autoFocus={true}
                  returnKeyType={'default'}
                  fetchDetails={true}
                  onPress={(data, details) => {
                    // Alert.alert("call")
                    setformValidation(prevState => ({
                      ...prevState,
                     ['Address']: ""
                  }));
                    handlePlaceSelection(details);
                  }}
                  onPlaceSelected={place => {
                    // handlePlaceSelection(place);
                  }}
                  renderRow={(rowData, details) => (
                    <TouchableOpacity
                      onPress={() => {
                        // Alert.alert("call11")
                        handlePlaceSelection(details);
                        setformValidation(prevState => ({
                          ...prevState,
                         ['Address']: ""
                      }));
                        handlePlaceSelection(rowData.description)}}>
                      <CText
                        style={Styles.suggestionText}
                        // onPress={() => console.log('1', 1)}
                      >
                        {rowData.description}
                      </CText>
                    </TouchableOpacity>
                  )}
                  query={{
                    key: 'AIzaSyC43lfaTBweW8gJZ5D90VyKmN0j_SH_-6A',
                    language: 'en',
                  }}
                  textInputProps={{
                    leftIcon: {type: 'font-awesome', name: 'back'},
                    errorStyle: {color: 'red'},
                  }}
                  styles={{
                    textInputContainer: Styles.textInput,
                    textInput: Styles.input,
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    powered: {},
                    listView: {},
                    row: {
                      height: 44,
                      flexDirection: 'row',
                    },
                    separator: {
                      height: 0.5,
                      backgroundColor: '#c8c7cc',
                      marginHorizontal: 22,
                    },
                    description: {},
                    loader: {
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      height: 20,
                    },
                  }}
                />
               {formValidation.Address !='' && <Text style={{...Styles.normalText, color:"red", bottom:5}}>{formValidation.Address}</Text>
}
                        <TextInputIcons
                            image={require('../../../../assets/images/area.png')}
                            placeholder={'City'}
                            
                            multi
                            value ={city}
                            onChangetxt={(value)=>{
                              setformValidation(prevState => ({
                                ...prevState,
                               ['City']: ""
                            }));
                                setcity(value)
                            }}
                            error={formValidation.City}
                        />
                                    
                                    {/* <View style={[Styles.flexView, { justifyContent: 'space-between' }]}> */}
                            <TextInputIcons
                                image={require('../../../../assets/images/area.png')}
                                placeholder={'Province'}
                                multi
                            value ={province}
                            onChangetxt={(value)=>{
                              setformValidation(prevState => ({
                                ...prevState,
                               ['Province']: ""
                            }));
                                setprovince(value)
                            }}
                           error={formValidation.Province}
                            />
                            {/* <TextInputIcons
                                image={require('../../../../assets/images/area.png')}
                                placeholder={'Zip code'}
                                multi
                                value ={zipcode}
                                onChangetxt={(value)=>{
                                    
                                    setzipcode(value)
                                }}
                                error={formValidation.Province}
                            /> */}
                        {/* </View> */}
                        <CText style={Styles.listHeader}>{`Upload Media`}</CText>
                        <View style={Styles.DottedView}>
                            <View style={[Styles.flexView, { justifyContent: 'space-evenly' }]}>
                                <View style={Styles.flexView}>
                                  {selectedFile?.name &&
                                  <>
                                    <MaterialIcons name={'note'} size={20} color={'red'} />
                                    <Text style={Styles.greytext}> {selectedFile?.name}</Text>
                                    </>
                                  }
                                </View>
                                {/* <View style={Styles.flexView}>
                                    <MaterialIcons name={'note'} size={20} color={'red'} />
                                    <Text style={Styles.greytext}> instant.jpg</Text>
                                </View> */}
                            </View>
                            <NewButtonIcon  onPress={onDocumentPress} half title={'Upload'} icon />
                            {!selectedFile?.name && (
                <CText
                  style={[
                    Styles.uploadText,
                    {marginLeft: 10, marginBottom: 10, color: 'red',textAlign:"center"},
                  ]}>
                  {"Please select images"}
                </CText>
              )}
                        </View>
                        <CText style={Styles.listHeader}>{`Parking Facility Details`}</CText>
                        <TextInputIcons
                            image={require('../../../../assets/images/nameIcon.png')}
                            placeholder={'Name'}
                            multi
                            value ={fullName}
                            onChangetxt={(value)=>{
                              setformValidation(prevState => ({
                                ...prevState,
                               ['Full Name']: ""
                            }));
                              setfullName(value)
                            }}
                            error={formValidation['Full Name']}
                        />
                        <TextInputIcons
                            image={require('../../../../assets/images/emailIcon.png')}
                            placeholder={'Email'}
                            multi
                            value ={email}
                            
                            onChangetxt={(value)=>{
                                
                              setemail(value);
                              setformValidation(prevState => ({
                                ...prevState,
                               ['Email']: ""
                            }));
                            }}
                            error={formValidation.Email}
                            
                        />
                        {/* <TextInputIcons
                            image={require('../../../../assets/images/phoneIcon.png')}
                            placeholder={' US+1 0123456789'}
                            multi
                            value ={phoneNumber}
                            
                            onChangetxt={(value)=>{
                                
                              setphoneNumber(value)
                            }}
                        /> */}
                        <View
              style={{
                flexDirection: 'row',

                width: '100%',
                alignSelf: 'center',
                height: 52,
                borderRadius:10,
        borderColor:'grey',
        borderWidth:0.6,
              }}>
                        <ModalDropdown
                options={countryCode}
                defaultValue="+971 ∨"
                renderRow={renderDropdownRow}
                style={Styles.dropdown}
                textStyle={{color: 'black'}}
                renderButtonText={rowData =>
                  _dropdown_2_renderButtonText(rowData)
                }
              />
                 <TextInput
                style={{...Styles.Numberinput}}
                placeholder={'0123456789'}
                keyboardType="number-pad"
                onChangeText={txt => {
                
                  setformValidation(prevState => ({
                    ...prevState,
                   ['phoneNumber']: ""
                }));
                  setphoneNumber(txt)
                  // onChangeText(txt, 'Email/PhoneNo');
                  // onErrorText('', 'Email/PhoneNo');
                }}
              />
            
            </View>
            {formValidation.phoneNumber !='' &&
               <CText
               style={[
                 Styles.uploadText,
                 {marginLeft: 10, marginBottom: 1,   color:themes.light.colors.danger,
                  top:3,
                  fontFamily: themes.font.regular,},
               ]}>
               {"Please enter phoneNumber"}
             </CText>
              }
                        <TextInputIcons
                            image={require('../../../../assets/images/area.png')}
                            placeholder={'Description'}
                            multi
                            value ={descripation}
                            
                            onChangetxt={(value)=>{
                              
                              setformValidation(prevState => ({
                                ...prevState,
                               ['descripation']: ""
                            }));
                              setdescripation(value)
                            }}
                            error={formValidation.descripation}
                        />
                        <CustomDropdown icon={'local-parking'} label={'Type of parking'} data={dropdownData} onSelect={(item)=>settypeParking(item)}/>
                        <CustomDropdown icon={'security'} label={'Security Measure'} data={dropdownData} onSelect={(item)=>setsecurityMeasure(item)}/>
                        {/* <CustomDropdown icon={'flag'} label={'Capacity'} data={dropdownData} onSelect={(item)=>setcapacity(item)}/> */}
                        <TextInputIcons
                            image={require('../../../../assets/images/emailIcon.png')}
                            placeholder={'Capacity'}
                            multi
                            value ={capacity}
                            
                            onChangetxt={(value)=>{
                              setformValidation(prevState => ({
                                ...prevState,
                               ['capacity']: ""
                            }));
                              setcapacity(value)
                            }}
                            error={formValidation.capacity}
                            
                        />
                    </View>
                    <CText style={Styles.listHeader}>{`Parking Facility Details`}</CText>
                    {selected === 'Warehouse' ? (
                        <>
                            <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly' }} horizontal showsHorizontalScrollIndicator={false}>
                                <CustomSwitch title={'Security \nMeasure'} icon={'security'}  ToggleSwitch ={(value)=> {
                                  // console.log(value)
                                  Parkingdeatils[0].isActive= value
                                  // console.log(Parkingdeatils)
                                }
                                  }/>
                                <CustomSwitch title={'Air \nCondition'} icon={'ac-unit'} ToggleSwitch ={(value)=> Parkingdeatils[1].isActive= value } />
                                <CustomSwitch title={'Temperature \nControl'} icon={'device-thermostat'} ToggleSwitch ={(value)=> Parkingdeatils[2].isActive= value } />
                            </ScrollView>

                            <CText style={Styles.listHeader}>{`Services`}</CText>

                            <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly' }} horizontal showsHorizontalScrollIndicator={false}>
                                <CustomSwitch title={'Pickup \nServices'} icon={'hail'} ToggleSwitch ={(value)=> Servicedeatils[0].isActive= value }/>
                                <CustomSwitch title={'Box \nPackaging'} icon={'inventory'}  ToggleSwitch ={(value)=> Servicedeatils[1].isActive= value }/>
                                <CustomSwitch title={'Pick \n& Delivery'} icon={'local-shipping'}  ToggleSwitch ={(value)=> Servicedeatils[2].isActive= value }/>
                            </ScrollView>
                        </>
                    ) : (
                        <>
                            <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly' }} horizontal showsHorizontalScrollIndicator={false}>
                                <CustomSwitch title={'Restroom'} icon={'king-bed'} ToggleSwitch ={(value)=> TruckParkingdeatils[0].isActive= value }/>
                                <CustomSwitch title={'Showers'} icon={'bathtub'}  ToggleSwitch ={(value)=> TruckParkingdeatils[1].isActive= value }/>
                                <CustomSwitch title={'Fuel \nStation'} icon={'local-gas-station'}  ToggleSwitch ={(value)=> TruckParkingdeatils[2].isActive= value }/>
                            </ScrollView>
                        </>
                    )}

                    
                    <CText style={Styles.listHeader}>{`Pricing`}</CText>
                    <TextInputIcons
                        image={require('../../../../assets/images/rateIcon.png')}
                        placeholder={'Rate / Hour'}
                        multi
                        value ={ratehour}
                        
                        onChangetxt={(value)=>{
                          setformValidation(prevState => ({
                            ...prevState,
                           ['rate-hour']: ""
                        }));
                          setratehour(value)
                        }}
                        error={formValidation['rate-hour']}
                    />
                    <View style={[Styles.flexView, { justifyContent: 'space-between' }]}>
                  
                        <TextInputIcons
                            image={require('../../../../assets/images/rateIcon.png')}
                            placeholder={'Rate / Weak'}
                            multi
                            value ={rateweek}
                        
                        onChangetxt={(value)=>{
                          setformValidation(prevState => ({
                            ...prevState,
                           ['rate-week']: ""
                        }));
                          setrateweek(value)
                        }}
                        error={formValidation['rate-week']}
                        
                        />
                     
                      
                        <TextInputIcons
                            image={require('../../../../assets/images/rateIcon.png')}
                            placeholder={'Rate / Day'}
                            multi
                            value ={rateday}
                        
                            onChangetxt={(value)=>{
                              setformValidation(prevState => ({
                                ...prevState,
                               ['rate-day']: ""
                            }));
                              setrateday(value)
                            }}
                            error={formValidation['rate-day']}
                        />
                  
                    </View>
                    {/* <CText style={Styles.listHeader}>{`Payment Method`}</CText>
                    <TextInputIcons
                        image={require('../../../../assets/images/cardIcon.png')}
                        placeholder={'Credit Card'}
                    /> */}
                    <CText style={Styles.listHeader}>{`Availability & Reservation`}</CText>
                    <CustomDropdown label={'Available'} data={dropdownData} onSelect={(item)=>setavailabilityreservation (item)} />
                    <CText style={Styles.listHeader}>{`Notes`}</CText>
                    <TextInput
                        style={Styles.Input}
                        placeholder='Type here...'
                        placeholderTextColor={'grey'}
                        multiline={true}
                        onChangetxt={(value)=>{
                            
                          setnotes(value)
                        }}
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{ flex: 1 }}>
                            <NewButtonIcon title={'Book Now'}  onPress={submit}/>
                        </View>
                        {/* <View style={{ flex: 0.48 }}>
                            <NewButtonIcon title={'Chat Now'} borderStyle />
                        </View> */}
                    </View>
                    <CText style={[Styles.listHeader, { textAlign: 'center' }]}>{`Share`}</CText>
                    <Text style={Styles.shareText}>Links to your social media profiles {`\n`}for updates and promotions</Text>
                    <View style={[Styles.flexView,{justifyContent:'space-evenly'}]}>
                        <View style={Styles.sicon}>
                            <Image style={Styles.socialicon} source={require('../../../../assets/images/icons/facebook.png')} />
                        </View>
                        <View style={[Styles.sicon,{backgroundColor: themes['light'].colors.main,}]}>
                            <Image style={[Styles.socialicon,{
                                tintColor: 'white',
                            }]} source={require('../../../../assets/images/icons/instagram.png')} />
                        </View>
                        <View style={Styles.sicon}>
                            <Image style={Styles.socialicon} source={require('../../../../assets/images/icons/twitter.png')} />
                        </View>
                        <View style={Styles.sicon}>
                            <Image style={Styles.socialicon} source={require('../../../../assets/images/icons/in.png')} />
                        </View>

                    </View>
                </View>
                {/* {renderForm(selectValue?.name)} */}


            </View>
        </Container>
    );
};

export default NewDesignSpace;

