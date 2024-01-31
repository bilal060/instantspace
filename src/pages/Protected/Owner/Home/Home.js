/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Dimensions, Alert, Image , Linking, Pressable} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Container} from '../../../../containers';
import { Calendar } from 'react-native-big-calendar'
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
  leftright
} from '../../../../assets/images';
import Styles from './Home.styles';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import DatePicker from 'react-native-modern-datepicker';
import {login, verifyOTP} from '../../../../redux/actions/Auth.action';
import {
  getAllBooking,
  getAllBookingupcoming,
  getMonthlyEarning,
  getSpacsss,
  get_ownerBooking,
} from '../../../../redux/actions/Root.Action';
import {reduxStateSelector} from '../../../../utils/selector';
import {BASE_URL_IMG} from '../../../../config/webservices';
import moment from 'moment';
const width = Dimensions.get('screen').width;
const Home = ({navigation}) => {
  const calendarRef = useRef(null);
  const dispatch = useDispatch();
  const [spaces, setSpaces] = useState([]);
  // const [ownerBooking, setOwnerBooking] = useState([]);
  const [events, setevents] = useState([]);
  const [earningData, setearningData] = useState([]);
  const [date, setDate] = React.useState(new Date())
  const [Allbooking, setAllBooking] = useState([]);

  
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
  const isStorageOwner = auth?.user?.role === 'Storage Owner';
  
  if(isStorageOwner)
   {
    dispatch(getAllBooking( {id:auth?.user?._id,type:"Storage Owner"},  callBackBooking));
    dispatch(getAllBookingupcoming( {id:auth?.user?._id,type:"Storage Owner", upcoming : true},  callBackEvents));
    dispatch(getMonthlyEarning( {id:auth?.user?._id},  handleBookingCallBack)); 
   }
   else{
    dispatch(getAllBooking( {id:auth?.user?._id,type:"Customer"},  callBackBooking));
   }
    
  }, []);
  const callBackEvents = res => {
    let createEvents = [];
    for (let index = 0; index < res?.bookings?.length; index++) {
      const element = res?.bookings[index];
      let end = new Date(element?.from);
      createEvents.push({   title: 'Sheduled',
       start: new Date(end?.getFullYear(), end?.getMonth(), end?.getDay()),
       end: new Date(end?.getFullYear(),  end?.getMonth(), end?.getDay()),
    }) 
    }
  setevents(createEvents);
  };

  const callBackBooking = res => {
    // Alert.alert("success")
    if(res?.bookings?.length>2)
    {
      let newArray = res?.bookings.slice(0,2);
      setAllBooking(newArray);
    }
    else{
    setAllBooking(res?.bookings);
    }
  };

 

  useEffect(() => {
    // Get the deep link used to open the app
    const getUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl === null) {
        return;
      }

      if (initialUrl.includes('companyProfile')) {
        // Alert.alert(initialUrl);
        // RootNavigation.navigate('Details');
      }
    };

    getUrl();
  });

  const callBack = res => {

    // Alert.alert(res?.length.toString());
    if (res && res?.length >= 3) {
      const data = res?.filter((data, idx) => idx < 3);
      setSpaces(data);
    } else {
      setSpaces(res);
    }
  };
  const handleBookingCallBack = res => {

    let barData = []
    for (let index = 0; index < res?.ownerEarning?.length; index++) {
      const element = res?.ownerEarning[index];
      barData.push(
        {value: element?.totalEarning, label: element?.month, frontColor: '#DF525B60'},
      )
    }
    setearningData(barData);

  };
  const headerProps = {
    headerTitle: 'Home',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: true,
    // headerRightImg: Profile,
    backGroundColor: 'red',
    isShowLinerar: true,
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

  const renderBooking = ({item, index}) => {
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
        // onPress={togglestatusOpenSelectModal}
        IdIndex ={index}
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
          <Pressable onPress={()=>navigation.navigate("MySpace")}>
            <CText style={Styles.view}>View All</CText>
            </Pressable>
          </View>
        </View>
        <CList
          style={Styles.list}
          horizontal
           data={spaces}
          // data={[]}
          extraData={spaces}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          emptycomponent ={()=>{
            return(
              <View style={{width:"100%", backgroundColor: 'white',
              height: 200,
              elevation: 2,
              borderRadius: 6,
              // alignItems: 'center',
              // justifyContent: 'center',
              margin:10,
              paddingHorizontal:13
              }}>
                     
                      <Pressable onPress={()=>navigation.navigate("NewDesignSpace")} style={{width:'100%', height:"100%", alignItems:"center",justifyContent:"center"}}>

                        <Image resizeMode='contain'  style={{width:234,height:150}}source={require('../../../../assets/images/AddnewSpace.png')}/>
                        
                        </Pressable>
                </View>
            )
          }}
        />
        <View
          style={[
            GlobalStyle.row,
            {alignItems: 'center', alignContent: 'center'},
          ]}>
          <CText style={Styles.mainHeading}>Booking History</CText>
          <Pressable onPress={()=>navigation.navigate("Payment")}>
          <CText style={Styles.view}>View All</CText>
          </Pressable>
        </View>
        <CList
          style={Styles.list}
           data={Allbooking}
          extraData={Allbooking}
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
          <Pressable onPress={()=>navigation.navigate("Payment")}>
          <ProgressiveImage
            source={newFilter}
            resizeMode="contain"
            style={{width: 25, height: 25, marginTop: 10}}
          />
          </Pressable>
        </View>
        <View style={Styles.BarChart}>
          <BarChart
            width={340}
            data={earningData}
            barWidth={22}
            isAnimated={true}
            height={180}
            maxValue={1000}
            initialSpacing={3}
            noOfSections={4}
            frontColor="lightgray"
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
        <View
          style={[
            GlobalStyle.row,
            {alignItems: 'center', alignContent: 'center', marginVertical: 10},
          ]}>
          <CText style={Styles.mainHeading}>Calendar</CText>
        <Pressable onPress={()=>{
          let end = new Date(date);
          end.setMonth(end.getMonth() + 1);
          setDate(end);
        }}>
          <ProgressiveImage
            source={leftright}
            resizeMode="contain"
            style={{width: 60, height: 60, marginTop: 10}}
          />
          </Pressable>
        </View>
        <View style={Styles.Calender}>
          {/* <DatePicker
            options={{
             
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
          /> */}
          <Calendar 
          ref={calendarRef}
          renderHeader={()=>
            {
            return(
              <View style={{width:"1000%", height:200}}>
            <Text style={{ color: 'red', fontSize: 25 }}>CalendarBody's headerComponent</Text>
            </View>
            )
          }}
          headerComponentStyle={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            height:300,
          }}
          headerComponent={()=>{
            return(
              <View style={{width:"1000%", height:200}}>
            <Text style={{ color: '#aaa', fontSize: 25 }}>CalendarBody's headerComponent</Text>
            </View>
            )
          }}
          date={date}
          theme={{ palette: {
            primary: {
              main:  "#DF525B",
              fontSize:30
              // contrastText: '#DF525B60',
            },
            typography: {
              fontFamily: "bold"
            },
            // gray: {
            //   '100': '#333',
            //   '200': '#666',
            //   '300': '#888',
            //   '500': '#aaa',
            //   '800': '#ccc',
            // },
          },}}
          swipeEnabled={true}  events={events} height={360}   mode="month" style={{ height: 500,width: '95%' }}  startAccessor="start"
  endAccessor="end"/>
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
