/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Dimensions, Alert, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Container} from '../../../../containers';

import {
  BookingCard,
  CList,
  CText,
  ProgressiveImage,
  SpaceCard,
} from '../../../../components';
import {
  Booking,
  Profile,
  filterIcon,
  newFilter,
} from '../../../../assets/images';
import Styles from './Home.styles';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import DatePicker from 'react-native-modern-datepicker';
import {login, verifyOTP} from '../../../../redux/actions/Auth.action';
import {
  getSpacsss,
  get_ownerBooking,
} from '../../../../redux/actions/Root.Action';
import {reduxStateSelector} from '../../../../utils/selector';
import {BASE_URL_IMG} from '../../../../config/webservices';
import moment from 'moment';
const width = Dimensions.get('screen').width;
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [spaces, setSpaces] = useState([]);
  const [ownerBooking, setOwnerBooking] = useState([]);

  console.log('🚀 ~ file: Home.js:35 ~ Home ~ spaces:', spaces);
  // const reduxState = useSelector(({auth, language, root}) => {
  //   console.log('🚀 ~ file: Home.js:260 ~ reduxState ~ auth:', auth);
  //   return {
  //     spaces: root?.userSpaces,
  //     userRole: auth?.user?.role,
  //     loading: root?.userSpacesLoading,
  //     userId: auth?.user?._id,
  //   };
  // });
  const {auth, root} = useSelector(reduxStateSelector);
  const {_id} = auth?.user || {};
  const {userSpaces, userSpacesLoading} = root || {};

  useEffect(() => {
    dispatch(getSpacsss(1, callBack));
    // dispatch(get_ownerBooking(_id, handleBookingCallBack));
    // dispatch(getAllBooking);
  }, []);

  const callBack = res => {
    console.log('🚀 ~ file: Home.js:276 ~ callBack ~ res:', res);
    // Alert.alert(res?.length.toString());
    if (res && res?.length >= 3) {
      const data = res?.filter((data, idx) => idx < 3);
      setSpaces(data);
    } else {
      setSpaces(res);
    }
  };
  const handleBookingCallBack = res => {
    setOwnerBooking(res?.bookings);
    console.log('🚀 ~ file: Home.js:276 ~ handleBookingCallBack ~ res:', res);
  };
  const headerProps = {
    headerTitle: 'Home',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: true,
    // headerRightImg: Profile,
    backGroundColor: 'red',
    rightPress: () => navigation.navigate('Profile'),
  };

  const renderItem = ({item}) => {
    const data = item?.images?.[0]?.replace(/\\/g, '/');
    // console.log(
    //   '🚀 ~ file: Home.js:76 ~ renderItem ~ data:',
    //   data,
    //   item?.images,
    // );
    // Alert.alert(data);
    // console.log('itemmm');

    // console.log(data);
    // return;

    return (
      <SpaceCard
        mainContainer={{
          width: spaces?.length > 1 ? width * 0.75 : width * 0.75,
          alignSelf: 'center',
        }}
        name={item?.description}
        phone={item?.contact}
        ratePrize={item?.rate_day}
        address={item?.address}
        capacity={item?.capacity}
        img={data == undefined ? undefined : `${BASE_URL_IMG}${data}`}
        onPress={() => navigation.navigate('SpaceDetails', {item})}
      />
    );
  };

  const renderBooking = ({item}) => {
    return (
      // <BookingCard
      //   location={item?.spaceId?.location?.address}
      //   date={moment(item?.createdAt).format('LL')}
      //   contact={item?.userId?.phoneNo}
      //   fullName={item?.userId?.fullName}
      //   time={moment(item?.createdAt).startOf('hour').fromNow()}
      //   prize={item.price}
      //   eTime={item?.to}
      //   sTime={item?.from}
      // />
      <BookingCard
        location={'Malir halt'}
        date={'12/3/March'}
        contact={'03323669509'}
        fullName={'osama'}
        time={'3 hours'}
        prize={'300 Prize'}
        eTime={'2/12'}
        sTime={'3/12'}
      />
    );
  };
  const barData = [
    {value: 500, label: 'Jan', frontColor: '#DF525B60'},
    {value: 700, label: 'Feb', frontColor: '#DF525B60'},
    {value: 630, label: 'Mar', frontColor: '#DF525B60'},
    {value: 270, label: 'Apr', frontColor: '#DF525B60'},
    {value: 520, label: 'May', frontColor: '#DF525B60'},
    {value: 710, label: 'June', frontColor: '#DF525B60'},
    {value: 180, label: 'July', frontColor: '#DF525B60'},
    {value: 950, label: 'Aug', frontColor: '#DF525B60'},
    {value: 800, label: 'Sep', frontColor: '#DF525B60'},
    {value: 450, label: 'Oct', frontColor: '#DF525B60'},
    {value: 830, label: 'Nov', frontColor: '#DF525B60'},
    {value: 100, label: 'Dec', frontColor: '#DF525B60'},
  ];

  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollView>
      <View style={Styles.container}>
        <CText style={Styles.mainHeading}>My Spaces</CText>
        <View style={GlobalStyle.row}>
          <View style={[GlobalStyle.row]}>
            <CText style={Styles.subHeading}>Total Spaces:</CText>
            <CText style={Styles.spaceTotal}>{spaces?.length}</CText>
          </View>
          <View>
            <CText style={Styles.view}>View All</CText>
          </View>
        </View>
        <CList
          style={Styles.list}
          horizontal
          data={spaces}
          extraData={spaces}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            text: 'Spaces not found',
          }}
        />
        <View
          style={[
            GlobalStyle.row,
            {alignItems: 'center', alignContent: 'center'},
          ]}>
          <CText style={Styles.mainHeading}>Booking History</CText>

          <CText style={Styles.view}>View All</CText>
        </View>
        <CList
          style={Styles.list}
          // data={ownerBooking}
          data={[1, 2]}
          extraData={ownerBooking}
          renderItem={renderBooking}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            // icon: require('../../assets/images/empty.png'),
            text: 'Bookings not found',
          }}
        />
        <View
          style={[
            GlobalStyle.row,
            {alignItems: 'center', alignContent: 'center', marginVertical: 10},
          ]}>
          <CText style={Styles.mainHeading}>My Earnings</CText>

          <ProgressiveImage
            source={newFilter}
            resizeMode="contain"
            style={{width: 25, height: 25, marginTop: 10}}
          />
        </View>
        <View style={Styles.BarChart}>
          <BarChart
            width={330}
            data={barData}
            barWidth={22}
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
              // backgroundColor: '#FFFFF',
              textHeaderColor: '#707070',
              textDefaultColor: '#707070',
              selectedTextColor: '#fff',
              mainColor: '#DF525B',
              textSecondaryColor: '#707070',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            current="2023-05-09"
            selected="2023-05-09"
            mode="calendar"
            minuteInterval={30}
            style={{borderRadius: 10}}
          />
        </View>
        <CText style={{...Styles.mainHeading}}>How it Works</CText>
        <Image
          style={{
            width: Dimensions.get('window').width * 0.96,
            height: Dimensions.get('window').height * 0.8,
            marginTop: 20,
            alignSelf: 'center',
          }}
          resizeMode="cover"
          source={require('../../../../assets/images/howitworks.png')}
        />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
