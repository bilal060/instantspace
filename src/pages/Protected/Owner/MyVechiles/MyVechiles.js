/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useLayoutEffect, useEffect} from 'react';
import {Container} from '../../../../containers';
import {
  BookingCard,
  CInput,
  CList,
  CText,
  ProgressiveImage,
  SpaceCard,
  TruckCard,
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
  MapViewImage,
  MarkerImage,
  Marketplace,
  Notification,
  Profile,
  Services,
  filterIcon,
} from '../../../../assets/images';
import Styles from './MyVechiles.style';
import GlobalStyle from '../../../../assets/styling/GlobalStyle';
import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import DatePicker from 'react-native-modern-datepicker';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllSpaces,
  getAllVechiles,
  getSpacsss,
} from '../../../../redux/actions/Root.Action';
import {BASE_URL, BASE_URL_IMG} from '../../../../config/webservices';
import MapView, {Marker} from 'react-native-maps';

const MyVechiles = ({navigation, route}) => {
  console.log(
    '🚀 ~ file: MyVechiles.js:39 ~ MyVechiles ~ route:',
    route?.params,
  );
  const fullName = useRef(null);
  const dispatch = useDispatch();
  const reduxState = useSelector(({auth, language, root}) => {
    console.log('rootrootroot', root?.spaces, auth);
    return {
      spaces: root?.spaces,
      userRole: auth?.user?.role,
      loading: root?.spacesLoading,
      userId: auth?.user?._id,
    };
  });

  const isCustomer = reduxState?.userRole === 'Customer';
  const [vehicles, setVehicales] = useState([]);

  const [account, setAccount] = useState('Grid View');
  const headerProps = {
    headerTitle: 'My Vehicles',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    rightPress: () => navigation.navigate('AddVechile'),
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
      <TruckCard
        mainContainer={Styles.mainContainer}
        name={item?.description}
        phone={item?.contact}
        ratePrize={item?.rate_day}
        address={item?.location?.address}
        img={`${BASE_URL_IMG}${item?.images?.[0]}`}
        onPress={() => navigation.navigate('SpaceDetails', {item})}
      />
    );
  };
  const renderVerticalItem = ({item}) => {
    var convertedFilePath = `${BASE_URL_IMG}${item?.images?.[0]}`.replace(
      /\\/g,
      '/',
    );

    return (
      <TruckCard
        name={item?.description}
        phone={item?.contact}
        ratePrize={item?.rate_day}
        address={item?.location?.address}
        img={convertedFilePath}
        imgStyles={{width: 100, height: '100%'}}
        onPress={() => navigation.navigate('SpaceDetails', {item})}
      />
    );
  };

  useEffect(() => {
    dispatch(getAllVechiles(reduxState?.userId, callBack));
  }, []);

  const callBack = res => {
    setVehicales(res?.vehicles);
  };

  return (
    <Container
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}
      scrollView>
      <View style={Styles.container}>
        <View style={[GlobalStyle.row, {alignItems: 'center'}]}>
          <CText style={Styles.mainHeading}>My Vehicles</CText>

          <View style={[GlobalStyle.row]}>
            <CText style={Styles.subHeading}>Total Spaces:</CText>
            <CText style={Styles.spaceTotal}>{vehicles?.length}</CText>
          </View>
        </View>

        <CList
          style={Styles.spacelist}
          // numColumns={2}
          //   horizontal
          // contentContainerStyle={[GlobalStyle.list, ]}
          data={vehicles}
          loading={reduxState.loading}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            // icon: require('../../assets/images/empty.png'),
            text: 'Vehicles not found',
          }}
          onRefreshLoading={reduxState.loading}
          // onRefreshHandler={() => allSpaces()}
          // onEndReached={onEndReached}
          // onEndReachedThreshold={0.1}
          // maxToRenderPerBatch={10}
          // windowSize={10}
        />
      </View>
    </Container>
  );
};

export default MyVechiles;

const styles = StyleSheet.create({});
