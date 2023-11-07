import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, PackageCard} from '../../../../containers';
import {
  CButton,
  CheckBox,
  CList,
  CPagination,
  CText,
  ProgressiveImage,
  RadioButton,
} from '../../../../components';
import Styles from '../Service.style';
import {themes} from '../../../../theme/colors';
import {
  featureData,
  serviceData,
} from '../../../../utils/asyncStorage/Constants';
import {ServiceImg} from '../../../../assets/images';
import DatePicker from 'react-native-modern-datepicker';
import {FlatList} from 'react-native-gesture-handler';

const BookingDetails = ({navigation}) => {
  const headerProps = {
    ProgressiveImageHeader: false,
    headerLeft: true,
    backBtnColor: themes.light.colors.fontLowColor,
    headerTransparentStyle: Styles.headerTransparentStyle,
    headerTitleStyle: Styles.headerTitleStyle,
    headerTitle: 'Book a Cleaner',
    headerRight: true,
  };

  const timeSlot = ['09 :00', '10 :00', '11 :00', '12 :00', '01 :00'];

  const renderTimeSlot = ({item, index}) => {
    return (
      <View style={Styles.timeSlotView}>
        <View>
          <CText style={Styles.timeSlot}>{`Time Slot ${index}`}</CText>
          <CText style={Styles.time}>{` ${item}`}</CText>
        </View>
        <View>
          <RadioButton />
        </View>
      </View>
    );
  };

  return (
    <Container
      scrollView
      bottomSpace
      edges={['left', 'right']}
      headerProps={headerProps}>
      <View style={Styles.container}>
        <CPagination />
        <View style={{paddingHorizontal: 30, paddingVertical: 25}}>
          <CText style={Styles.heading}>Ensuite / Studio</CText>
          <CText style={Styles.subheading}>
            Check out our availability and book the date and time that works for
            you
          </CText>
          <View style={Styles.sheduleCard}>
            <CText style={Styles.selectText}>Select a Date and Time</CText>

            <CText style={Styles.selectTimeText}>Time Zone</CText>
            <CText style={Styles.selectTimeZoneText}>
              Greenwich Mean Time (GMT)
            </CText>

            <CText style={Styles.selectText}>Preferred Date</CText>

            <DatePicker
              options={{
                backgroundColor: '#FFFFF',
                textHeaderColor: '#707070',
                textDefaultColor: '#707070',
                selectedTextColor: '#fff',
                mainColor: '#7BB564',
                textSecondaryColor: '#707070',
                borderColor: 'rgba(122, 146, 165, 0.1)',
              }}
              current="2020-07-13"
              selected="2020-07-23"
              mode="calendar"
              minuteInterval={30}
              style={{borderRadius: 10}}
            />

            <CText style={[Styles.selectText, {paddingBottom: 0}]}>
              Select Time Slot
            </CText>
            <CText style={Styles.subheading}>
              Available time Slots on your Preferred date
            </CText>
            <FlatList data={timeSlot} renderItem={renderTimeSlot} />

            <CButton title={'Next'} iconType="left" onPress={()=> navigation.navigate('OrderSummary')} />

            
          </View>
        </View>
      </View>
    </Container>
  );
};

export default BookingDetails;

const styles = StyleSheet.create({});
