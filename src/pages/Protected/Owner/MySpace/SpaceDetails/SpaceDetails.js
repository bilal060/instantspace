/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, ScrollView , Image, Alert} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
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
import {createBooking, delete_CustomerCard, getUserConversations, get_CustomerCard} from '../../../../../redux/actions/Root.Action';
import moment from 'moment';
import {handleError} from '../../../../../utils/methods';
import { CustomSwitch } from '../../../../../components/newSpaceComp/CustomSwitch/CustomSwitch';
import { NewButtonIcon } from '../../../../../components/newSpaceComp/NewButtonIcon/NewButtonIcon';

const SpaceDetails = ({navigation, route}) => {
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
  const reduxState = useSelector(({auth, language, root}) => {
  
    
    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.bookingLoading,
      userId: auth?.user?._id,
      cards : root?.cards,
    };
  });
  const isCustomer = reduxState?.userRole === 'Customer';
  const dispatch = useDispatch();
  const {item} = route?.params || {};
  console.log(JSON.stringify(item))
  const [selectValue, setSelectedValue] = useState('Hourly');

  const fullName = useRef(null);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [selectDate, setSelectDate] = useState(null);
  const [pickerShow, setPickerShow] = useState(false);
  const [selectedCard, setselectedCard] = useState("");

  const [prize, updatedPrize] = useState();
  const headerProps = {
    headerTitle: 'My Spaces',
    backButtonIcon: true,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',
    
    isShowLinerar: true,
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
      return;
    } 

    if (selectedCard == '') {
      handleError('Please Select card');
      return;
    } 

    if(selectDate == null || selectDate == undefined)
    {
      handleError('Please Select Date');
      return;
    }
  

    // const sTIme = `${
    //   moment(startTime).format('LT').split(' ')[0].split(':')[0]
    // }${':'}${moment(startTime).format('LT').split(' ')[0].split(':')[1]}`;
    // const eTIme = `${
    //   moment(endTime).format('LT').split(' ')[0].split(':')[0]
    // }${':'}${moment(endTime).format('LT').split(' ')[0].split(':')[1]}`;

    // console.log('🚀 ~ file: SpaceDetails.js:89 ~ reverseSlot ~ sTIme:', sTIme);
    const payload = {
      from: startTime,
      to: endTime,
      // price: '200',
      spaceId: item?._id,
      userId: reduxState?.userId,
      serviceId: item?._id,
      bookingAreaType: "space",
      durationType : selectValue == 'Hourly'? "hourly" :  selectValue == 'Daily'?"daily"  :"monthly",
      card:selectedCard,
      startDate : selectDate ,
      // check('userId').not().isEmpty(),
      // check('serviceId').not().isEmpty(),
      // check('bookingAreaType').isString().isIn(['space']).withMessage('bookingAreaType can be space').not().isEmpty(),
      // check('durationType').isString().isIn(['hourly', 'daily', 'monthly']).withMessage('durationType can be hourly, daily, monthly').not().isEmpty(),
      // check('card').not().isEmpty(),
      // check('from').isISO8601().toDate().not().isEmpty(),
      // check('to').isISO8601().toDate().not().isEmpty(),
      // check('startDate').isISO8601().toDate().not().isEmpty(),
    // };
    }
    // console.log(JSON.stringify(payload));
    //  return;
     dispatch(createBooking(payload, handleBack));
  };
  
  const handleBack = res => {
    // Alert.alert("booking success");
    // console.log(JSON.stringify(res))
   navigation.replace('Explore');
  };
  const renderBooking = ({item}) => {
    // Alert.alert("nbbncbnvv")
    
   // return;
   if(item?.role =='Manager')
   {
    return (
      <View style={[GlobalStyle.row, Styles.profileCard]}>
        <View>
          
           {item?.photo == "" || item?.photo  == undefined ? (
        <ProgressiveImage
        source={ Profile}
        resizeMode="contain"
        style={{width: 55, height: 55}}
      />
      ) : (
        // <ProgressiveImage
        //   source={{uri: BASE_URL_IMG +item?.photo }}
        //   rec={true}
        //   resizeMode="contain"
        //   style={{width: 55, height: 55}}
        // />
        <Image
        resizeMode="contain"
      source={{uri: BASE_URL_IMG + item?.photo}}
      // rec={true}
      style={{width: 55, height: 55}}
    />
      )}
        </View>
        <View style={GlobalStyle.profileDetailsView}>
          <CText style={GlobalStyle.ProfileName}>{item?.fullName}</CText>
          <View style={[GlobalStyle.row, {flex: 1, alignItems: 'center'}]}>
            <ProgressiveImage
              source={LocationColored}
              resizeMode="contain"
              style={{width: 15, height: 15}}
            />
            <CText style={GlobalStyle.contact}>{item?.phoneNo}</CText>
          </View>
          <View
            style={[
              GlobalStyle.row,
              {flex: 1, alignItems: 'center', paddingBottom: 20},
            ]}>
            <ProgressiveImage
              source={CallColoured}
              resizeMode="contain"
              style={{width: 15, height: 15}}
            />
            <CText style={GlobalStyle.contact}>{ item?.slot?.from+' to '+ item?.slot?.to}</CText>
          </View>
        </View>
      </View>
    );
          }
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
   //  console.log(item);
   //  return;
    return (
      <>
        <View style={[GlobalStyle.row, Styles.profileCard]}>
          <View>
            
            {! item?.userId?.photo =="" || item?.userId?.photo == undefined ? (
       <ProgressiveImage
       source={Profile}
       style={{width: 50, height: 50}}
       resizeMode="contain"
     />
        
      ) : (
        // <ProgressiveImage
        //   resizeMode="contain"
        //   source={{uri: BASE_URL_IMG + item?.userId?.photo}}
        
        //   style={{width: 50, height: 50}}
        // />
        <Image
        resizeMode="contain"
      source={{uri: BASE_URL_IMG + item?.userId?.photo}}
      // rec={true}
      style={{width: 50, height: 50}}
    />
      )}
          </View>
          <View
            style={[
              GlobalStyle.profileDetailsView,
              {height: 60, borderBottomWidth: 0},
            ]}>
            <View style={[GlobalStyle.row, GlobalStyle.alignItems]}>
              <CText style={GlobalStyle.ProfileName}>{item?.userId?.fullName}</CText>
              <CText style={Styles.reviewDate}>{'12-05.2023'}</CText>
            </View>
            <View>
              <View style={Styles.ratingView}>
                <CText style={Styles.rating}>{item?.rating}</CText>
                <Rating type="star" ratingCount={item?.rating} imageSize={15} />
              </View>
            </View>
          </View>
        </View>
        <CText style={Styles.reviews}>
          {item?.review}
        </CText>
        <View style={Styles.border} />
      </>
    );
  };
  const onRangeSelected = res => {
    // console.log('🚀 ~ file: SpaceDetails.js:219 ~ onRangeSelected ~ res:', res);
  };

  const timeSlot = ['Hourly', 'Daily',  'Monthly'];
  const onValueChange = (event, newDate) => {
    setPickerShow(false);
    const selectedDate = newDate || selectDate;
    setSelectDate(selectedDate);
  };
  const Pickertoggle = () => {
    
    setPickerShow(!pickerShow);
  };

  const renderCrads = reduxState?.cards?.data?.map((data) => {
    
    return (
      <View  style={{padding:8, borderColor:"#CFCFCF", borderWidth:0.6, justifyContent:"center",alignItems:"center" , marginHorizontal:6}}>
        <TouchableOpacity onPress={()=>{  
         callDeleteCards(data)}}
         style={{width:"100%", justifyContent:"flex-end", alignItems:"flex-end", height:20}}>
        <Image resizeMode='contain' style={{width:17, height:17}} source={require('../../../../../assets/images/cross.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:"row", marginTop:6}} onPress={()=>setselectedCard(data?.id)}>
  <Image resizeMode='contain' style={{width:24, height:24}} source={require('../../../../../assets/images/icons/visa.png')}/>
<CText style={Styles.selectTime}>{data?.id}</CText>
</TouchableOpacity>
  </View>
    )
  })

  const renderfacilities = item?.facilities?.map((data) => {
    
    return (
  <>
        <CustomSwitch title={data?.name} icon={data?.name?.toLowerCase().includes("measure")? 'inventory' :
       data?.name?.toLowerCase().includes("services")? 'hail' : 
       data?.name?.toLowerCase().includes("pick")? 'local-shipping'  : 
       data?.name?.toLowerCase().includes("restroom")? 'king-bed' : 
       data?.name?.toLowerCase().includes("showers")? 'bathtub' :
       data?.name?.toLowerCase().includes("fuel")? 'local-gas-station' :
       data?.name?.toLowerCase().includes("door")? 'add-alarm' : 
       data?.name?.toLowerCase().includes("alarm")? 'alarm' :
       data?.name?.toLowerCase().includes("air")? 'ac-unit' : 
       data?.name?.toLowerCase().includes("temperature")? 'device-thermostat' : 
       data?.name?.toLowerCase().includes("system")? 'directions-train' :
       data?.name?.toLowerCase().includes("dust")? 'smoke-free' : 
       data?.name?.toLowerCase().includes("security")? 'security' :
       data?.name?.toLowerCase().includes("lifter")? 'stairs' :
       data?.name?.toLowerCase().includes("cctv")? 'connected-tv' : 
       data?.name?.toLowerCase().includes("lock")? 'lock' : 
       data?.name?.toLowerCase().includes("box")? 'all-inbox' : 
      
       'device-thermostat'
    }value={true}  islinear={true}/>
  
</>
    )
  })

  const renderservice = item?.services?.map((data) => {
    
    return (
  <>
        <CustomSwitch title={data?.name} icon={data?.name?.toLowerCase().includes("measure")? 'inventory' :
       data?.name?.toLowerCase().includes("services")? 'hail' : 
       data?.name?.toLowerCase().includes("pick")? 'local-shipping'  : 
       data?.name?.toLowerCase().includes("restroom")? 'king-bed' : 
       data?.name?.toLowerCase().includes("showers")? 'bathtub' :
       data?.name?.toLowerCase().includes("fuel")? 'local-gas-station' :
       data?.name?.toLowerCase().includes("door")? 'add-alarm' : 
       data?.name?.toLowerCase().includes("alarm")? 'alarm' :
       data?.name?.toLowerCase().includes("air")? 'ac-unit' : 
       data?.name?.toLowerCase().includes("temperature")? 'device-thermostat' : 
       data?.name?.toLowerCase().includes("system")? 'directions-train' :
       data?.name?.toLowerCase().includes("dust")? 'smoke-free' : 
       data?.name?.toLowerCase().includes("security")? 'security' :
       data?.name?.toLowerCase().includes("lifter")? 'stairs' :
       data?.name?.toLowerCase().includes("cctv")? 'connected-tv' : 
       data?.name?.toLowerCase().includes("lock")? 'lock' : 
       data?.name?.toLowerCase().includes("box")? 'all-inbox' : 
       'device-thermostat'
    }value={true}  />
  
</>
    )
  })

  useEffect(() => {
    getCard();
  }, []);

  const callDeleteCards = (data)=>{
    const payload = {
      "card": data?.id
    };
//  console.log(payload)
    // return;
    dispatch(delete_CustomerCard (payload, cardsCallBack))}
  

  const cardsCallBack = res => {
    // Alert.alert("success")
    getCard ();
  };

  const getCard = () => {
    // Alert.alert(reduxState?.usxerId);
     dispatch(get_CustomerCard ());
  };

  const getChatInitalize = res => {
    if (res) {
      // Alert.alert(res)
      console.log(res)
       navigation.navigate('Chats')
    }
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
          <>
       <View style={Styles.reverseSlot}>
       <CText style={Styles.selectTime}>Select Card</CText>
       <ScrollView horizontal>
{renderCrads}

  
  
  </ScrollView>
  </View>

          <View style={{...Styles.reverseSlot,marginTop:9}}>
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
                <View style={{flex:1}}>
                    <DateTimePicker
                    mode={'date'}
                    value={selectDate}
                    onChange={setSelectDate}
                    placeHolder={'Select Date'}
                    inputContainer={Styles.inputDateContainer}
                    selectButtonText={Styles.selectButtonText}
                    selectContainer={Styles.selectContainer}
                  /> 
                  <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
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
                  </View>
                </View>
              ) : selectValue === 'Weekly' ? (
                <CCalender onRangeSelected={onRangeSelected} />
              ) : selectValue === 'Monthly' ? (
                <View style={{flex:1}}>
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
                  <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
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
                  </View>
                </View>
              ) : (
                <View style={{flex:1}}>
                  <DateTimePicker
                    mode={'date'}
                    value={selectDate}
                    onChange={setSelectDate}
                    placeHolder={'Select Date'}
                    inputContainer={Styles.inputDateContainer}
                    selectButtonText={Styles.selectButtonText}
                    selectContainer={Styles.selectContainer}
                  />
                   <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
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
                  </View>
                 </View>
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
                  <CButton buttonStyle={{marginVertical:10}} title="Add Card" onPress={() => navigation.navigate("AddCard")} />

            <CButton title="Reserve Slot" onPress={() => reverseSlot()} />
      
          </View>
          </>
        ) : null}

<CText style={Styles.mainHeading}>{`Parking Facility Details`}</CText>
                    
                        <>
                            <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly' }} horizontal showsHorizontalScrollIndicator={false}>
                                {/* <CustomSwitch title={'Security \nMeasure'} icon={'security'}  
                                  value={true}/>
                                <CustomSwitch title={'Air \nCondition'} icon={'ac-unit'}   value={true} />
                                <CustomSwitch title={'Temperature \nControl'} icon={'device-thermostat'} value={true} /> */}
                                {renderservice}
                            </ScrollView>

                            <CText style={Styles.mainHeading}>{`Services`}</CText>

                          
  <ScrollView contentContainerStyle={{ justifyContent: 'space-evenly' }} horizontal showsHorizontalScrollIndicator={false}>
                        {renderfacilities}
                        </ScrollView>
                        </>
                  
                   

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
            // emptyOptions={{
            //    icon: require('../../assets/images/empty.png'),
            //   text: 'Managers not found',
             
            // }}
            emptycomponent ={()=>{
              return(
                <View style={{width:"100%", backgroundColor: 'white',
                height: 250,
                elevation: 2,
                borderRadius: 6,
                // alignItems: 'center',
                // justifyContent: 'center',
                margin:10,
                paddingHorizontal:13
                }}>
                        <CText style={Styles.mainHeading}>Staff</CText>
                        <View style={{width:'100%', height:"100%", alignItems:"center"}}>
                          <Image resizeMode='contain'  style={{width:200,height:120}}source={require('../../../../../assets/images/addstaff.png')}/>
                          {/* <View style={{ width:160, flex:1 }}>
                           
                            <NewButtonIcon  title={'Add Staff'}   onPress={()=>navigation.navigate('Managers')} style={{paddingVertical: 22 , }}  txtstyle ={{   position:"absolute"}}/>
                          
                        </View> */}
                          <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        //  alignItems: 'center',
                        justifyContent: 'space-between',
                        // backgroundColor:"red",
                        width:"90%",
                        marginTop:12
                    }}>
                        <View style={{ flex: 0.43 }}>
                            <NewButtonIcon title={'Add Staff'} style={{paddingVertical: 22 , }}  txtstyle ={{   position:"absolute"}}  onPress={()=>navigation.navigate('Managers')}/>
                        </View>
                        <View style={{ flex: 0.44 }}>
                            <NewButtonIcon title={'Chat Now'}  style={{paddingVertical: 22 , }}  txtstyle ={{   position:"absolute"}}  onPress={()=>{
                               const payload = {
                                "senderId":  reduxState?.userId,
                                "receiverId": item?.userId?._id,
                                // email: item?.userId?.email
                               
                              };
                              // console.log(payload);
                              // return;
                               dispatch(getUserConversations(payload, getChatInitalize));
                              // navigation.navigate('Chats')}}
                            }}/>
                        </View>
                    </View>
                          </View>
                  </View>
              )
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
}

export default SpaceDetails;

const styles = StyleSheet.create({});
