/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {CText, ProgressiveImage, RadioButton} from '../index';
import Style from './TruckCard.style';
import {
  CallColoured,
  FocusedBooking,
  threeDots,
  LocationColored,
  Profile,
  SpaceImg,
  bookingIcon,
  docIcon,
  fuelIcon,
  lengthIcon,
  plugIcon,
  rateIcon,
  Camera,
  TruckName,
  TruckType,
  TruckNo,
} from '../../assets/images';
import GlobalStyle from '../../assets/styling/GlobalStyle';
import ToggleSwitch from '../cToggleSwitch/CToggleSwitch';
import {BASE_URL_IMG} from '../../config/webservices';

const SpaceCard = ({
  name = 'The New AXOR - Distribution',
  phone = '+1 012 3456 789',
  address = 'Belmont, North Carolina',
  mainContainer,
  onPress,
  imgData,
  img,
  mapView,
  imgStyles,
  truckName = 'Mercedes',
  truckType = 'Axor',
  truckNo = 'LER043602G351',
  truckLic = 'KJQ5467',
}) => {
  const renderItem = ({item}) => {
    return (
      <ProgressiveImage
        resizeMode="cover"
        source={{uri: `${BASE_URL_IMG}${item}`}}
        style={{
          width: 50,
          height: 50,
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 5,
        }}
      />
    );
  };
  const renderFooter = () => {
    return (
      <ProgressiveImage
        resizeMode="cover"
        source={Camera}
        style={{
          width: 50,
          height: 50,
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 5,
        }}
      />
    );
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[Style.spaceContainer, mainContainer]}>
      {!img ? (
        <ProgressiveImage
          resizeMode="cover"
          source={SpaceImg}
          style={[{width: '100%', height: '50%'}, imgStyles]}
        />
      ) : (
        <ProgressiveImage
          resizeMode="cover"
          source={{uri: img}}
          style={[{width: '100%', height: '50%'}, imgStyles]}
        />
      )}
      <View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E7E6E9',
            padding: 4,
          }}>
          <CText style={Style.ProfileName}>{name}</CText>
          <View
            style={[
              GlobalStyle.row,
              {alignItems: 'center', marginVertical: 5, marginTop: 10},
            ]}>
            <View style={[GlobalStyle.row, {width: '65%'}]}>
              <ProgressiveImage
                source={TruckName}
                resizeMode="contain"
                style={{width: 16, height: 16}}
              />
              <CText style={GlobalStyle.contact}>{truckName}</CText>
            </View>

            {!mapView && (
              <View
                style={[GlobalStyle.row, {width: '45%', alignItems: 'center'}]}>
                <ProgressiveImage
                  source={TruckType}
                  resizeMode="contain"
                  style={{width: 16, height: 16}}
                />
                <CText style={[Style.place, {flex: 1, paddingLeft: 10}]}>
                  {truckType}
                </CText>
              </View>
            )}
          </View>

          <View
            style={[GlobalStyle.row, {alignItems: 'center', marginTop: 10}]}>
            <View
              style={[GlobalStyle.row, {width: '65%', alignItems: 'center'}]}>
              <ProgressiveImage
                source={TruckNo}
                resizeMode="contain"
                style={{width: 16, height: 16}}
              />
              <CText numberOfLines={1} style={GlobalStyle.contact}>
                {truckNo}
              </CText>
            </View>
            <View
              style={[GlobalStyle.row, {width: '45%', alignItems: 'center'}]}>
              <ProgressiveImage
                source={TruckNo}
                resizeMode="contain"
                style={{width: 16, height: 16}}
              />
              <CText numberOfLines={1} style={GlobalStyle.contact}>
                {truckLic}
              </CText>
            </View>
          </View>
          <View
            style={[
              GlobalStyle.row,
              {alignItems: 'center', marginVertical: 4},
            ]}></View>
        </View>
        {!mapView && (
          <View
            style={[GlobalStyle.row, {marginHorizontal: 10, marginTop: 10}]}>
            <>
              <ToggleSwitch size={'small'} isOn={true} label="Available" />
            </>
            <View style={[GlobalStyle.row, {marginHorizontal: 10}]}>
              <ProgressiveImage
                source={threeDots}
                resizeMode="contain"
                style={{width: 17, height: 17, marginLeft: 7}}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(SpaceCard);
