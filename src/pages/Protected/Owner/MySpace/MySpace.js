/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';
import {Container} from '../../../../containers';
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
  Cart,
  Events,
  FGirdView,
  FMapView,
  GirdView,
  Google,
  Hub,
  LocationColored,
  MapViewImage,
  MarkerImage,
  Marketplace,
  Notification,
  Profile,
  Services,
  filterIcon,
} from '../../../../assets/images';
import Styles from './MySpace.style';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import DatePicker from 'react-native-modern-datepicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllSpaces,
  getSpacesByCategories,
  getSpacesByCategory,
  getSpacsss,
  getuserSpaces,
  getwarehouseByCategory,
} from '../../../../redux/actions/Root.Action';
import {BASE_URL, BASE_URL_IMG} from '../../../../config/webservices';
import MapView, {Marker, Callout} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';

const MySpace = ({navigation, route}) => {
  // console.log('🚀 ~ file: MySpace.js:39 ~ MySpace ~ route:', route?.params);

  // const {name, _id} = route?.params;

  // console.log('🚀 ~ file: MySpace.js:43 ~ name:', name);
  const fullName = useRef(null);
  const dispatch = useDispatch();
  const reduxState = useSelector(({auth, language, root}) => {
    // Alert.alert('11');
    // console.log('rootrootroot', root?.spaces, auth);
    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.spacesLoading,
      userId: auth?.user?._id,
    };
  });

  const isCustomer = reduxState?.userRole === 'Customer';
  // console.log('🚀 ~ file: MySpace.js:54 ~ MySpace ~ isCustomer:', isCustomer);
  const [spaces, setSpaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [paganation, setpaganation] = useState(0);
  const [isLoader, setisLoader] = useState(false);
  const [checkpagnation, setcheckpagnation] = useState(true);

  const [account, setAccount] = useState('Grid View');
  const headerProps = {
    headerTitle: route?.params?.name || 'My Spaces',
    backButtonIcon: true,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',
    
    isShowLinerar: true,
    rightPress: () => navigation.navigate('Profile'),
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
    var convertedFilePath = `${BASE_URL_IMG}${item?.images?.[0]}`.replace(
      /\\/g,
      '/',
    );

    // console.log(item);

    return (
      <SpaceCard
        mainContainer={Styles.mainContainer}
        name={item?.description}
        phone={item?.contact}
        capacity={item?.space ? item?.space : item?.capacity}
        ratePrize={item?.rate_day}
        address={item?.address}
        img={convertedFilePath}
        onPress={() => navigation.navigate('SpaceDetails', {item})}
        isCustomer={isCustomer}
      />
    );
  };
  const renderVerticalItem = ({item}) => {
    var convertedFilePath = `${BASE_URL_IMG}${item?.images?.[0]}`.replace(
      /\\/g,
      '/',
    );

    return (
      <SpaceCard
        mainContainer={Styles.mainContainer2}
        name={item?.description}
        phone={item?.contact}
        capacity={item?.capacity}
        ratePrize={item?.rate_day}
        address={item?.address}
        img={convertedFilePath}
        mapView
        imgStyles={{width: 100, height: '100%'}}
        onPress={() => navigation.navigate('SpaceDetails', {item})}
        isCustomer={isCustomer}
      />
    );
  };
  const renderBooking = ({item}) => {
    return <BookingCard />;
  };
  const data = [
    {name: 'Grid View', image: GirdView, activeImg: FGirdView},
    {name: 'Map View', image: FMapView, activeImg: MapViewImage},
  ];

  useEffect(() => {
    allSpaces();
  }, []);
  const allSpaces = () => {
    if (isCustomer) {
      // Alert.alert('123');
      if (route?.params?._id) {
        if (route?.params?._id == '6470b05d2490274856cf6475') {
          dispatch(getwarehouseByCategory(route?.params?._id, callBack));
        } else {
          dispatch(getSpacesByCategory(route?.params?._id, callBack));
        }
      } else {
        dispatch(getAllSpaces(1, callBack));
      }
    } else {
      // Alert.alert('12333');
      // dispatch(getSpacsss(reduxState?.userId, callBack));
      if (route?.params?._id) {
        if (route?.params?._id == '6470b05d2490274856cf6475') {
          // Alert.alert(route?.params?._id)
          // dispatch(getwarehouseByCategory(route?.params?._id, callBack));
          dispatch(getSpacesByCategory(route?.params?._id, callBack));
        } else {
          // console.log(route?.params?._id);

          dispatch(getSpacesByCategory(route?.params?._id, callBack));
        }
      } else {
        // Alert.alert('dhdhd');
        // console.log('feffsf');
        dispatch(getAllSpaces(1, callBack));
      }
    }
  };
  const callBack = res => {
    // console.log(res?.description);
    // Alert.alert(res?.length.toString())
    if(res?.length <=0)
    {
      setcheckpagnation(false);
    }
       setSpaces([ ...spaces, ...res]);
    
       setisLoader(false);
  };

  function onEndReached() {
    if (route?.params?._id) {
      // dispatch(getSpacesByCategory(route?.params?._id, callBack));
    } else {
      setisLoader(true);
      dispatch(getuserSpaces(paganation, callBack));
    }
  }

  useEffect(() => {
    if (paganation > 1 &&  checkpagnation == true) {
      //  Alert.alert(paganation.toString())
          onEndReached();
    }
  }, [paganation]);

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
        {isCustomer && (
          <CText
            style={[Styles.mainHeading, {marginBottom: 30, marginTop: -20}]}>
            My Spaces
          </CText>
        )}

        {!isCustomer ? (
          <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
            <CText style={Styles.mainHeading}>My Spaces</CText>

            <View style={[GlobalStyle.row]}>
              <CText style={Styles.subHeading}>Total Spaces:</CText>
              <CText style={Styles.spaceTotal}>{spaces?.length}</CText>
            </View>
          </View>
        ) : (
          <View style={Styles.typesView}>
            {data?.map(e => (
              <LinearGradient colors=  {e?.name ? ['#FB7C5F', '#DF525B']  : ['#f1f6f7','#f1f6f7']} style={
                account === e?.name ? Styles.activeUser : Styles.unactiveUser
              }>
              <TouchableOpacity
                onPress={() => setAccount(e.name)}
                style={
                    account === e?.name ? Styles.activeUser : Styles.unactiveUser
                }>
                  

                <ProgressiveImage
                  resizeMode={'contain'}
                  style={{
                    ...GlobalStyle.inputIcon,
                    ...Styles.inputIcon,
                  }}
                  source={account == e.name ? e?.activeImg : e?.image}
                />
                <CText
                  style={
                    account === e.name ? Styles.activeText : Styles.unActiveText
                  }>
                  {e?.name}
                </CText>
             
              </TouchableOpacity>
              </LinearGradient>
            ))}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute', //Here is the trick
            bottom: 60,
            width: '100%',
            left: 34,
            zIndex: 1000,
            elevation: 1000,
          }}>
          {isLoader && <ActivityIndicator color={'#ED675D'} size={'large'} />}
        </View>

        {account === 'Grid View' ? (
          <CList
            style={Styles.spacelist}
            data={spaces}
            // loading={reduxState.loading}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            emptyOptions={{
              // icon: require('../../assets/images/empty.png'),
              text: 'Spaces not found',
            }}
            // onRefreshLoading={reduxState.loading}
            // onRefreshHandler={() => allSpaces()}
            onEndReached= {()=>setpaganation(paganation + 1)}
             onEndThreshold={0.1}
            // maxToRenderPerBatch={10}
            // windowSize={10}
          />
        ) : (
          <>
            {spaces.map(item => {
              // console.log('🚀 ~ file: MySpace.js:231 ~ MySpace ~ item:', item);
              var convertedFilePath2 =
                `${BASE_URL_IMG}${item?.images?.[0]}`.replace(/\\/g, '/');
            
              return (
                <MapView
                  initialRegion={{
                    latitude: item?.location?.coordinates?.[1],
                    longitude: item?.location?.coordinates?.[0],
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                  }}
                  minZoomLevel={5}
                  style={{flex: 1, height: 400}}>
                  <Marker
                    onPress={evt => setSelectedPlace(item)}
                    calloutVisible={
                      selectedPlace && selectedPlace.id === item.id
                    }
                    coordinate={{
                      latitude: item?.location?.coordinates?.[1],

                      longitude: item?.location?.coordinates?.[0],
                      latitudeDelta: 0.04,
                      longitudeDelta: 0.05,
                    }}>
                    <ProgressiveImage
                      resizeMode={'contain'}
                      style={{
                        ...GlobalStyle.inputIcon,
                        width: 30,
                        height: 30,
                      }}
                      source={MarkerImage}
                    />
                    <Callout
                      onPress={() =>
                        navigation.navigate('SpaceDetails', {item})
                      }
                      style={{width: 200, height: 130}}>
                      <View
                        style={{
                          width: 100,
                          height: 70,
                        }}>
                        {item?.images?.[0] && (
                          <ProgressiveImage
                            resizeMode="contain"
                            style={{
                              width: 100,
                              height: 70,
                            }}
                            source={Profile}
                          />
                        )}
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <CText numberOfLines={1} style={Styles.addCardText}>
                          Address :
                        </CText>
                        <CText numberOfLines={1} style={Styles.cardText}>
                          {item?.address}
                        </CText>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <CText numberOfLines={1} style={Styles.addCardText}>
                          Space Name :
                        </CText>
                        <CText numberOfLines={1} style={Styles.cardText}>
                          {item?.description}
                        </CText>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <CText numberOfLines={1} style={Styles.addCardText}>
                          Price :
                        </CText>
                        <CText numberOfLines={1} style={Styles.cardText}>
                          {item?.rate_hour}
                        </CText>
                      </View>

                      {/* <View style={{flexDirection: 'row'}}>
                          <CText numberOfLines={2} style={Styles.addCardText}}>
                            Address:
                          </CText>
                          <CText numberOfLines={2} style={Styles.addCardText}}>
                            {item?.address}
                          </CText>
                        </View>

                        {/* <Image
                  resizeMode="cover"
                  style={{ width: 100, height: 100 }}
                  source={item.image}
                /> */}
                    </Callout>
                  </Marker>
                </MapView>
              );
            })}
            {/* {selectedPlace && (
                <View style={{position: 'absolute', bottom: 20, left: 20 , backgroundColor:"red"}}>
                  {/* <Image
                    resizeMode="cover"
                    style={{width: 100, height: 100}}
                    source={selectedPlace?.image}
                  /> */}

            {/* <CList
              style={Styles.spacelist}
              // numColumns={2}
              //   horizontal
              // contentContainerStyle={[GlobalStyle.list, ]}
              data={spaces}
              loading={reduxState.loading}
              renderItem={renderVerticalItem}
              keyExtractor={(item, index) => index.toString()}
              emptyOptions={{
                // icon: require('../../assets/images/empty.png'),
                text: 'Spaces not found',
              }}
              onRefreshLoading={reduxState.loading}
              onRefreshHandler={() => allSpaces()}
              // onEndReached={onEndReached}
              // onEndReachedThreshold={0.1}
              // maxToRenderPerBatch={10}
              // windowSize={10}
            /> */}
          </>
        )}
      </View>
    </Container>
  );
};

export default MySpace;

const styles = StyleSheet.create({});
