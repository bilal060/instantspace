/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Container} from '../../../../../containers';
import {
  BookingCard,
  CButton,
  CCalender,
  CInput,
  CList,
  CText,
  DateTimePicker,
  ProfileCard,
  ProgressiveImage,
  SpaceCard,
} from '../../../../../components';
import {
  CNameIcon,
  CallColoured,
  Cart,
  Events,
  Google,
  Hub,
  LocationColored,
  Marketplace,
  Notification,
  Profile,
  Services,
  filterIcon,
} from '../../../../../assets/images';
import Styles from '../MySpace.style';
import GlobalStyle from '../../../../../assets/styling/GlobalStyle';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {BASE_URL, BASE_URL_IMG} from '../../../../../config/webservices';
import {useDispatch, useSelector} from 'react-redux';
import {createBooking} from '../../../../../redux/actions/Root.Action';
import moment from 'moment';
import {handleError} from '../../../../../utils/methods';

const SpaceDetails = ({navigation, route}) => {
  const reduxState = useSelector(({auth, language, root}) => {
    console.log('rootrootroot', root?.spaces, auth);
    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.bookingLoading,
      userId: auth?.user?._id,
    };
  });
  const isCustomer = reduxState?.userRole === 'Customer';

  const dispatch = useDispatch();
  const {item} = route?.params || {};
  const [selectValue, setSelectedValue] = useState('Hourly');

  const fullName = useRef(null);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [selectDate, setSelectDate] = useState();
  const [pickerShow, setPickerShow] = useState(false);

  const [prize, updatedPrize] = useState();
  const headerProps = {
    headerTitle: 'My Spacesss',
    backButtonIcon: true,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',
  };
  const listData = [
    {
      img: Services,
      title: 'Book A Service',
      onPress: () => navigation.navigate('Service'),
    },
    {
      img: Marketplace,
      title: 'Marketplace',
    },
    {
      img: Hub,
      title: 'HUB',
    },
    {
      img: Events,
      title: 'Events',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <SpaceCard mainContainer={Styles.mainContainer} imgData={listData} />
    );
  };
  const reverseSlot = () => {
    if (!startTime && !endTime) {
      handleError('Please Select  time');
    } else if (!prize) {
      handleError('Please enter price');
    } else {
      navigation.navigate('AddVechile', {
        price: prize,
        spaceId: item?._id,
        startTime: startTime,
        endTime: endTime,
      });
    }

    // const sTIme = `${
    //   moment(startTime).format('LT').split(' ')[0].split(':')[0]
    // }${':'}${moment(startTime).format('LT').split(' ')[0].split(':')[1]}`;
    // const eTIme = `${
    //   moment(endTime).format('LT').split(' ')[0].split(':')[0]
    // }${':'}${moment(endTime).format('LT').split(' ')[0].split(':')[1]}`;

    // console.log('🚀 ~ file: SpaceDetails.js:89 ~ reverseSlot ~ sTIme:', sTIme);
    // const payload = {
    //   from: sTIme,
    //   to: eTIme,
    //   price: '200',
    //   spaceId: item?._id,
    //   userId: reduxState?.userId,
    // };
    // dispatch(createBooking(payload, handleBack));
  };
  console.log(item);
  const handleBack = res => {
    navigation.navigate('AddVechile');
  };
  const renderBooking = ({item}) => {
    // console.log('mmanager');
    // console.log(item);
    return (
      <View style={[GlobalStyle.row, Styles.profileCard]}>
        <View>
          <ProgressiveImage
            source={Profile}
            resizeMode="contain"
            style={{width: 55, height: 55}}
          />
        </View>
        <View style={GlobalStyle.profileDetailsView}>
          <CText style={GlobalStyle.ProfileName}>
            {item?.firstName + item?.lastName}
          </CText>
          <View style={[GlobalStyle.row, {flex: 1, alignItems: 'center'}]}>
            <Image
              source={LocationColored}
              resizeMode="contain"
              style={{width: 15, height: 15, tintColor: '#DF525B'}}
            />
            <CText style={GlobalStyle.contact}>{item?.phoneNo}</CText>
          </View>
          <View
            style={[
              GlobalStyle.row,
              {flex: 1, alignItems: 'center', paddingBottom: 20},
            ]}>
            <Image
              source={CallColoured}
              resizeMode="contain"
              style={{width: 15, height: 15, tintColor: '#DF525B'}}
            />
            <CText style={GlobalStyle.contact}>
              {item?.slot?.from + ' am to ' + item?.slot?.to + ' pm'}
            </CText>
          </View>
        </View>
      </View>
    );
  };

  const renderTimeSlot = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedValue(item)}
        style={
          item === selectValue ? Styles.memberCard : Styles.unActiveMember
        }>
        <CText
          style={
            item === selectValue ? Styles.manager : Styles.unActivemanager
          }>
          {item}
        </CText>
      </TouchableOpacity>
    );
  };

  const renderCustomerReviews = ({item}) => {
    return (
      <>
        <View style={[GlobalStyle.row, Styles.profileCard]}>
          <View>
            <ProgressiveImage
              source={Profile}
              resizeMode="contain"
              style={{width: 55, height: 55}}
            />
          </View>
          <View
            style={[
              GlobalStyle.profileDetailsView,
              {height: 60, borderBottomWidth: 0},
            ]}>
            <View style={[GlobalStyle.row, GlobalStyle.alignItems]}>
              <CText style={GlobalStyle.ProfileName}>{'Tony Stark'}</CText>
              <CText style={Styles.reviewDate}>{'12-05.2023'}</CText>
            </View>
            <View>
              <View style={Styles.ratingView}>
                <CText style={Styles.rating}>4.0</CText>
                <Rating type="star" ratingCount={5} imageSize={15} />
              </View>
            </View>
          </View>
        </View>
        <CText style={Styles.reviews}>
          Lorem ipsum dolor sit amet consectetur. Et in cursus egestas ipsum
          scelerisque cursus a vestibulum. Fringilla non semper purus vestibulum
          tortor faucibus. Pretium varius elit quis et.
        </CText>
        <View style={Styles.border} />
      </>
    );
  };
  const onRangeSelected = res => {
    console.log('🚀 ~ file: SpaceDetails.js:219 ~ onRangeSelected ~ res:', res);
  };

  const timeSlot = ['Hourly', 'Daily', 'Weekly', 'Monthly'];
  const onValueChange = (event, newDate) => {
    setPickerShow(false);
    const selectedDate = newDate || selectDate;
    setSelectDate(selectedDate);
  };
  const Pickertoggle = () => {
    setPickerShow(!pickerShow);
  };

  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollView>
      <View style={Styles.container}>
        {!isCustomer && (
          <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
            <CText style={Styles.mainHeading}>My Space</CText>

            <View style={[GlobalStyle.row]}>
              {/* <CText style={Styles.subHeading}>Total Spaces:</CText> */}
              {/* <CText style={Styles.spaceTotal}>205</CText> */}
            </View>
          </View>
        )}

        <SpaceCard
          name={item?.description}
          phone={item?.contact}
          ratePrize={item?.rate_day}
          address={item?.address}
          capacity={item?.space ? item?.space : item?.capacity}
          img={
            item?.images?.length >= 1
              ? `${BASE_URL_IMG}${item?.images?.[0]?.replace(/\\/g, '/')}`
              : undefined
          }
          mainContainer={Styles.mainPlaceContainer}
          imgData={item?.images}
          isCustomer={isCustomer}
        />
        {isCustomer ? (
          <View style={Styles.reverseSlot}>
            <CText style={Styles.selectTime}>Select Time</CText>

            <CList
              data={timeSlot}
              style={{marginVertical: 20}}
              renderItem={renderTimeSlot}
              horizontal
              nestedScrollEnabled
              ListHeaderComponentStyle={{flex: 1}}
              showsHorizontalScrollIndicator={false}
              // loading={reduxState.loading}
              keyExtractor={(item, index) => index.toString()}
              emptyOptions={{
                // icon: require('../../assets/images/empty.png'),
                text: 'Time Slots not found',
              }}
            />

            <View style={Styles.timevIew}>
              {selectValue === 'Hourly' ? (
                <>
                  <DateTimePicker
                    mode={selectValue === 'Hourly' ? 'time' : 'date'}
                    value={startTime}
                    onChange={setStartTime}
                    placeHolder={`00 : 00`}
                    inputContainer={Styles.inputContainer}
                    selectButtonText={Styles.selectButtonText}
                    selectContainer={Styles.selectContainer}
                  />
                  <CText>To</CText>
                  <DateTimePicker
                    mode={selectValue === 'Hourly' ? 'time' : 'date'}
                    value={endTime}
                    onChange={setEndTime}
                    placeHolder={'00 : 00'}
                    inputContainer={Styles.inputContainer}
                    selectButtonText={Styles.selectButtonText}
                    selectContainer={Styles.selectContainer}
                  />
                </>
              ) : selectValue === 'Weekly' ? (
                <CCalender onRangeSelected={onRangeSelected} />
              ) : selectValue === 'Monthly' ? (
                <>
                  <DateTimePicker
                    type="monthly"
                    mode={'date'}
                    value={selectDate}
                    onChange={onValueChange}
                    Pickertoggle={Pickertoggle}
                    pickershow={pickerShow}
                    placeHolder={'Select Date'}
                    inputContainer={Styles.inputDateContainer}
                    selectButtonText={Styles.selectButtonText}
                    selectContainer={Styles.selectContainer}
                  />
                </>
              ) : (
                <>
                  <DateTimePicker
                    mode={'date'}
                    value={selectDate}
                    onChange={setSelectDate}
                    placeHolder={'Select Date'}
                    inputContainer={Styles.inputDateContainer}
                    selectButtonText={Styles.selectButtonText}
                    selectContainer={Styles.selectContainer}
                  />
                </>
              )}
            </View>
            {/* <CInput
              placeholder={'Prize'}
              value={prize}
              onChangeText={updatedPrize}
              sec
              // leftIconNAme={Pri}
              returnKeyType="next"
              onSubmitEditing={() => {}}
            /> */}

            <CButton title="Reserve Slot" onPress={() => reverseSlot()} />
          </View>
        ) : null}

        <View>
          <View
            style={[
              GlobalStyle.row,
              {alignItems: 'center', alignContent: 'center'},
            ]}>
            <CText style={Styles.mainHeading}>All Managers</CText>
          </View>

          <CList
            style={[
              Styles.list,
              {
                backgroundColor:
                  item?.managers.length > 0 ? '#FFF' : 'transparent',
                marginBottom: 10,
                borderRadius: 10,
                // marginTop: item?.managers.length > 0 ? 10 : -50,
                elevation: item?.managers.length > 0 ? 5 : 0,
              },
            ]}
            data={item?.managers}
            // loading={reduxState.loading}
            renderItem={renderBooking}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              // icon: require('../../assets/images/empty.png'),
              text: 'Managers not found',
            }}
          />
        </View>

        <View>
          <View
            style={[
              GlobalStyle.row,
              {alignItems: 'center', alignContent: 'center'},
            ]}>
            <CText style={Styles.mainHeading}>Customers Reviews </CText>
          </View>

          <CList
            style={[
              Styles.list,
              {
                backgroundColor:
                  item?.managers.length > 0 ? '#FFF' : 'transparent',
                marginBottom: 30,
                borderRadius: 10,
                elevation: item?.managers.length > 0 ? 5 : 0,
                paddingBottom: 20,
              },
            ]}
            data={item?.reviews}
            // loading={reduxState.loading}
            renderItem={renderCustomerReviews}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              // icon: require('../../assets/images/empty.png'),
              text: 'No Any Reviews',
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default SpaceDetails;

const styles = StyleSheet.create({});
