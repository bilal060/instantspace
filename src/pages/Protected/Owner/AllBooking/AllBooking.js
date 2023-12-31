/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Container, CountriesModal} from '../../../../containers';
import {
  BookingCard,
  CInput,
  CList,
  CText,
  ProgressiveImage,
  SpaceCard,
} from '../../../../components';
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
import Styles from './AllBooking.style';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import DatePicker from 'react-native-modern-datepicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  filter_ownerBooking,
  getAllBooking,
  getSpacsss,
  get_ownerBooking,
} from '../../../../redux/actions/Root.Action';
import moment from 'moment';

const AllBooking = ({navigation}) => {

  const type = useRef(null);
  const sort = useRef(null);
  const dispatch = useDispatch();

  const headerProps = {
    headerTitle: navigation.getState()?.index === 0 ? 'Home' : 'All Booking',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',
    isShowLinerar: true,
    rightPress: () => navigation.navigate('Profile'),
  };
  const reduxState = useSelector(({auth, language, root}) => {
    return {
      booking: root?.booking,
      loading: root?.bookingLoading,
      userId: auth?.user?._id,
      userRole: auth?.user?.role,
    };
  });
  const [booking, setAllBooking] = useState([]);
  const [spaces, setSpaces] = useState([]);

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
   
  ];

  useEffect(() => {
     getbooking();
  }, []);

  const getbooking = () => {
    const isCustomer = reduxState?.userRole === 'Customer';
    const isManager = reduxState?.userRole === 'Manager';
    if (isCustomer) {
      dispatch(getAllBooking( {id:reduxState?.userId,type:"Customer"},  callBack));
    } 
     else if(isManager)
     {
      dispatch(getAllBooking( {id:reduxState?.userId,type:"Manager"},  callBack));
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

  const [countryModalIsOpen, updateCountryModalIsOpen] = useState(false);
  const [selectedCountry, updateSelectedCountry] = useState('');

  const toggleCountryModal = () => {
    updateCountryModalIsOpen(!countryModalIsOpen);
  };

  const countryOnSelect = item => {
    filterBooking(item?._id);
    updateSelectedCountry(item);
    toggleCountryModal();
  };

  const filterBooking = id => {
    console.log("filter all booking")
    const payload = {
      id: reduxState?.userId,
      spaceId: id,
    };
    dispatch(filter_ownerBooking(payload, callBack));
  };

  const renderItem = ({item}) => {
    const pendingBookings = booking?.filter((booking) => booking.status === 'pending');
    const cancelledBookings = booking?.filter((booking) => booking.status === 'rejected');
    // console.log(pendingBookings.length)
    // console.log("pending")
    //  return;
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
          <CText style={Styles.cardValue}>{item?.title =="Paid Bookings"? booking?.filter((booking) => booking.status === 'pending').length :  item?.title =="Cancelled Bookings" ?  booking?.filter((booking) => booking.status === 'rejected').length   : booking?.length || 0}</CText>
        </View>
      </View>
    );
  };
  const renderBooking = ({item}) => {

    return (
      <BookingCard
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
      />
    );
  };

  const barData = [
    {value: 500, label: 'Jan', frontColor: '#ED675D'},
    {value: 700, label: 'Feb', frontColor: '#ED675D'},
    {value: 630, label: 'Mar', frontColor: '#ED675D'},
    {value: 270, label: 'Apr', frontColor: '#ED675D'},
    {value: 520, label: 'May', frontColor: '#ED675D'},
    {value: 710, label: 'June', frontColor: '#ED675D'},
    {value: 180, label: 'July', frontColor: '#ED675D'},
    {value: 950, label: 'Aug', frontColor: '#ED675D'},
    {value: 800, label: 'Sep', frontColor: '#ED675D'},
    {value: 450, label: 'Oct', frontColor: '#ED675D'},
    {value: 830, label: 'Nov', frontColor: '#ED675D'},
    {value: 100, label: 'Dec', frontColor: '#ED675D'},
  ];
  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollView>
      <View style={Styles.container}>
        <CList
          style={Styles.sbookinglist}
          numColumns={2}
          data={listData}
          loading={reduxState.loading}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            text: 'Store not found',
          }}
          onRefreshHandler={() => getbooking()}
        />
        <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
          <CText style={Styles.mainHeading}>New Bookings</CText>
        </View>

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
        {/* <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
          <CText style={Styles.mainHeading}>Booking History</CText>
        </View>
        {booking?.length > 0 && (
          <React.Fragment>
            <CInput
              ref={type}
              placeholder={'Sort By'}
              onPress={toggleCountryModal}
              selectValue={selectedCountry}
              sec
              inputInnerContainerStyle={Styles.inputInnerContainerStyle}
              type="view"
              leftIconNAme={FuelIcon}
              returnKeyType="next"
            />
            <CInput
              ref={type}
              placeholder={'Select Space Type'}
              inputInnerContainerStyle={Styles.inputInnerContainerStyle}
              sec
              type="view"
              leftIconNAme={FuelIcon}
              returnKeyType="next"
            />
          </React.Fragment>
        )}

        <CList
          style={Styles.spacelist}
          contentContainerStyle={[GlobalStyle.list]}
          data={booking}
        
          renderItem={renderBooking}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            text: 'Booking not found',
          }}
        
        />
        <View style={Styles.BarChart}>
          <BarChart
            width={330}
            data={barData}
            barWidth={14}
            isAnimated={true}
            height={150}
            maxValue={1000}
            initialSpacing={3}
            noOfSections={4}
            frontColor="lightgray"
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
        <View style={Styles.Calender}>
          <DatePicker
            options={{
              backgroundColor: '#FFFFF',
              textHeaderColor: '#707070',
              textDefaultColor: '#707070',
              selectedTextColor: '#fff',
              mainColor: '#ED675D',
              textSecondaryColor: '#707070',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            current="2023-05-09"
            selected="2023-05-09"
            mode="calendar"
            minuteInterval={30}
            style={{borderRadius: 10}}
          />
        </View> */}
      </View>

      <Modal
        transparent={true}
        visible={countryModalIsOpen}
        onRequestClose={() => toggleCountryModal()}>
        <View style={Styles.modalContainer}>
          <View style={Styles.modalInnerContainer}>
            <CountriesModal
              data={spaces}
              onSelect={val => countryOnSelect(val)}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default AllBooking;

const styles = StyleSheet.create({});
