/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
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

const Payment = ({navigation}) => {
  const type = useRef(null);
  const sort = useRef(null);

  const headerProps = {
    headerTitle: 'My Payments',
    backButtonIcon: false,
    ProgressiveImageHeader: true,
    headerRight: true,
    headerRightImg: false,
    headerRightImg: Notification,
    backGroundColor: 'red',
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
  const renderBooking = ({item}) => {
    return <BookingCard item={item} Active />;
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
          <CText style={Styles.mainHeading}>Payment History</CText>
        </View>
        <CInput
          ref={type}
          placeholder={'Sort By'}
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
          placeholder={'Select Space Type'}
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
          // numColumns={2}
          //   horizontal
          contentContainerStyle={[GlobalStyle.list]}
          data={[1, 22, 3]}
          // loading={reduxState.loading}
          renderItem={renderBooking}
          keyExtractor={(item, index) => index.toString()}
          emptyOptions={{
            // icon: require('../../assets/images/empty.png'),
            text: 'Store not found',
          }}
          // onRefreshLoading={reduxState.loading}
          // onRefreshHandler={() => onRefreshHandler()}
          // onEndReached={onEndReached}
          // onEndReachedThreshold={0.1}
          // maxToRenderPerBatch={10}
          // windowSize={10}
        />
      </View>
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({});
