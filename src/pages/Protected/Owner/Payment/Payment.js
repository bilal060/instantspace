/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, Modal, Alert} from 'react-native';
import React, {useRef , useEffect, useState} from 'react';
import {Container, CountriesModal} from '../../../../containers';
import {
  BookingCard,
  CInput,
  CList,
  CText,
  ProgressiveImage,
  SpaceCard,
} from '../../../../components';
import moment from 'moment';
import {
  CNameIcon,
  Cancel,
  Cart,
  Earning,
  Events,
  FuelIcon,
  Google,
  Hub,
  Marketplace,
  Notification,
  Paid,
  Profile,
  Services,
  Total,
  filterIcon,
} from '../../../../assets/images';
import Styles from './Payment.style';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import DatePicker from 'react-native-modern-datepicker';
import {  changeBookingStatus, filter_ownerBooking,
  getAllBooking,
  getAllBookingStatus,
  getAllBookingupcoming,
  getSpacsss,
  get_ownerBooking, } from '../../../../redux/actions/Root.Action';
import {useDispatch, useSelector} from 'react-redux';
const Payment = ({navigation}) => {

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState('');
  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };
  const countryOnSelect = item => {
   // console.log(item)
     updateSelectedCountry(item);
     toggleCountryModal();
     const isCustomer = reduxState?.userRole === 'Customer';
     const isStorageOwner = reduxState?.userRole === 'Storage Owner';
   if (isCustomer) {
    //  console.log({id:reduxState?.userId,type:"Customer", status :item?.name , upcoming : selectedupComingOpen?.name });
     dispatch(getAllBookingStatus ( {id:reduxState?.userId,type:"Customer", status :item?.name  },  callBack));
   } 
   else if(isStorageOwner)
   {
    dispatch(getAllBookingStatus( {id:reduxState?.userId,type:"Storage Owner" ,  status :item?.name},  callBack));
   }
  };


// --------
  const [upComingOpen, updateupComingOpen] = useState(false);
  const [selectedupComingOpen, selectedupdateupComingOpen] = useState('');
  const toggleupComingOpenModal = () => {
    updateupComingOpen(!upComingOpen);
  };
  const upComingOpenOnSelect = item => {
  //  console.log(item)
  selectedupdateupComingOpen(item);
  toggleupComingOpenModal();
  const isCustomer = reduxState?.userRole === 'Customer';
  const isStorageOwner = reduxState?.userRole === 'Storage Owner';
  if (isCustomer) {
    dispatch(getAllBookingupcoming ( {id:reduxState?.userId,type:"Customer",  upcoming : item?.name},  callBack));
  } 
  else if(isStorageOwner)
   {
    dispatch(getAllBookingupcoming( {id:reduxState?.userId,type:"Storage Owner", upcoming : item?.name},  callBack));
   }
  };

  //----------------
  const [bookingStatusIndex, setbookingStatusIndex] = useState(-1);
  const [selectedBooking, setselectedBooking] = useState(null);
  const [statusOpen, updatestatusOpen] = useState(false);
  const [selectedstatus, setselectedstatus] = useState('');
  const dispatch = useDispatch();
  const togglestatusOpenModal = () => {
    updatestatusOpen(!statusOpen);
  };
  const statusOpenOnSelect = item => {
   // console.log("Iiitem")
   // console.log(item)
    dispatch(changeBookingStatus( {id:selectedBooking?._id,type:"Storage Owner" ,    "status": item?.name,
    "notes": ""},  callBackStatus));
   setselectedstatus(item);

   let data = [...booking];
   if(bookingStatusIndex >=0)
   {
      data[bookingStatusIndex].status = item?.name;
      //setAllBooking(data);
   }

   togglestatusOpenModal();

  
  };

  const togglestatusOpenSelectModal = (index , item) => {

    const isStorageOwner = reduxState?.userRole === 'Storage Owner';
   
    if(isStorageOwner)
    {
      //  Alert.alert(index.toString());
      setselectedBooking(item);
      setbookingStatusIndex(index);
      updatestatusOpen(!statusOpen);
    }
    
  };


  
  const reduxState = useSelector(({auth, language, root}) => {
    return {
      booking: root?.booking,
      loading: root?.bookingLoading,
      userId: auth?.user?._id,
      userRole: auth?.user?.role,
    };
  });
  const type = useRef(null);
  const sort = useRef(null);
  const [booking, setAllBooking] = useState([]);
  const [spaces, setSpaces] = useState([]);

  const headerProps = {
    headerTitle: 'My Payments',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',

    isShowLinerar: true,
  };
  const listData = [
    {
      img: Total,
      title: 'Total Bookings',
      value: '205',
    },
    {
      img: Paid,
      title: 'Paid Bookings',
      value: '185',
    },
    {
      img: Cancel,
      title: 'Cancelled Bookings',
      value: '20',
    },
    {
      img: Earning,
      title: 'Total Earning',
      value: '$15,35',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View style={Styles.bookingCard}>
        <>
          <ProgressiveImage
            source={item.img}
            resizeMode="contain"
            style={{width: 35, height: 35, marfinRight: 10}}
          />
        </>

        <View style={{flexDirection: 'column', paddingLeft: 10}}>
          <CText style={Styles.cardHeading}>{item?.title}</CText>
          <CText style={Styles.cardValue}>{item?.value}</CText>
        </View>
      </View>
    );
  };
  const renderBooking = ({item , index}) => {
  // console.log(item);
    return (
      <BookingCard
      item={item}
        location={item?.serviceId?.address}
        date={moment(item?.createdAt).format('LL')}
        contact={item?.userId?.phoneNo}
        fullName={item?.userId?.fullName}
        time={moment(item?.createdAt).startOf('hour').fromNow()}
        prize={item.price?.toFixed(3)}
        eTime={item?.to}
        sTime={item?.from}
        img={item?.userId?.photo}
        status={item?.status}
        type ={item?.category}
        onPress={togglestatusOpenSelectModal}
        IdIndex ={index}
      />
    );
  };

  useEffect(() => {
    getbooking();
 }, []);

 const getbooking = () => {
  //Alert.alert(reduxState?.userRole)
   const isCustomer = reduxState?.userRole === 'Customer';
   const isStorageOwner = reduxState?.userRole === 'Storage Owner';
   if (isCustomer) {
     dispatch(getAllBooking( {id:reduxState?.userId,type:"Customer"},  callBack));
   } 
   else if(isStorageOwner)
   {
    dispatch(getAllBooking( {id:reduxState?.userId,type:"Storage Owner"},  callBack));
   }
   
   else {
     dispatch(getSpacsss(reduxState?.userId, spaceCallBack));

     dispatch((reduxState?.userId, callBack));
   }
 };

 const spaceCallBack = res => {
   setSpaces(res?.spaces);
 };
 const callBack = res => {
   // Alert.alert("success")
   setAllBooking(res?.bookings);
 };
 const callBackStatus = res => {
  // Alert.alert("success")
  dispatch(getAllBooking( {id:reduxState?.userId,type:"Storage Owner"},  callBack));
};
  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollView
      scrollViewProps={{
        contentContainerStyle: {
          flexGrow: 1,

          paddingHorizontal: 0,
        },
       
      }}>
      <View style={Styles.container}>
        <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
          <CText style={Styles.mainHeading}>Booking History</CText>
        </View>
        <CInput
          ref={type}
          placeholder={'Sort By'}
          onPress={toggleCountryModal}
         selectValue={selectedCountry}
          // value={values.fuel}
          // onChangeText={handleChange('fuel')}
          // error={errors.fuel}
          sec
          inputInnerContainerStyle={Styles.inputInnerContainerStyle}
          type="view"
          leftIconNAme={FuelIcon}
          returnKeyType="next"
        />
        <CInput
          ref={type}
          placeholder={'Incoming Type'}
          onPress={toggleupComingOpenModal}
          selectValue={selectedupComingOpen}
          // value={values.fuel}
          // onChangeText={handleChange('fuel')}
          // error={errors.fuel}
          inputInnerContainerStyle={Styles.inputInnerContainerStyle}
          sec
          type="view"
          leftIconNAme={FuelIcon}
          returnKeyType="next"
        />

<CList
          style={Styles.spacelist}
          contentContainerStyle={[GlobalStyle.list]}
          data={booking}
          renderItem={renderBooking}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
   
            text: 'Booking not found',
          }}
   
          onRefreshHandler={() => getAllBooking()}
         
        />
      </View>
      <Modal
        transparent={true}
        visible={countryModalIsOpen}
        onRequestClose={() => toggleCountryModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal
              data={[{name: "pending"}, {name:"approved"} , {name: "rejected"} ]}
              onSelect={val => countryOnSelect(val)}
            />
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={upComingOpen}
        onRequestClose={() => toggleupComingOpenModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal
              data={[{name: "true"}, {name:"false"}]}
              onSelect={val => upComingOpenOnSelect(val)}
            />
          </View>
        </View>
      </Modal>


      <Modal
        transparent={true}
        visible={statusOpen}
        onRequestClose={() => togglestatusOpenModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal
              data={[{name: "rejected"},{name:"approved"}]}
              onSelect={val => statusOpenOnSelect (val)}
            />
          </View>
        </View>
      </Modal>



    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({});
