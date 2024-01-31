/* eslint-disable no-dupe-keys */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {memo, useState} from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
import {CText, ProgressiveImage, RadioButton} from '../index';
import Style from './SpaceCard.style';
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
  isCustomer,
  Rectangle,
} from '../../assets/images';
import GlobalStyle from '../../assets/styling/GlobalStyle';
import ToggleSwitch from '../cToggleSwitch/CToggleSwitch';
import {BASE_URL_IMG} from '../../config/webservices';
import {Rating, AirbnbRating} from 'react-native-ratings';

const SpaceCard = ({
  name = 'Belmont, North Carolina',
  phone = '+1 012 3456 789',
  address = 'Belmont, North Carolina',
  capacity,
  mainContainer,
  onPress,
  imgData,
  ratePrize = '0',
  img,
  mapView,
  imgStyles,
}) => {
  // console.log(img);
  const renderItem = ({item}) => {
    return (
      <ProgressiveImage
        resizeMode="cover"
        source={{uri: `${BASE_URL_IMG}${item?.replace(/\\/g, '/')}`}}
        style={{
          width: 50,
          height: 50,
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 9,
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
          width: 52.6,
          height: 52.6,
          marginHorizontal: 5,
          marginVertical: 5,
          borderRadius: 5,
        }}
      />
    );
  };

  const [isOn, setIsOn] = useState(false);
  return (
    <TouchableOpacity
      // disabled={true}
      onPress={onPress}
      style={[Style.spaceContainer, mainContainer]}>
      {!img || img == undefined ? (
        <ProgressiveImage
          resizeMode="cover"
          source={SpaceImg ? SpaceImg : img}
          // source={{uri: img}}
          rec={true}
          style={[{width: '100%', height: 150}, imgStyles]}
        />
      ) : (
        // <ProgressiveImage
        //   resizeMode="cover"
        //   source={{uri: BASE_URL_IMG +  img}}
        //   rec={true}
        //   style={[{width: '100%', height: 150}, imgStyles]}
        // />
        <Image
        resizeMode="cover"
      source={{uri:  img}}
      // rec={true}
      style={[{width: '100%', height: 150}, imgStyles]}
    />
      )}
      <View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#E7E6E9',
            padding: 4,
            //  backgroundColor: 'red',
          }}>
          {imgData && (
            <FlatList
              data={imgData}
              nestedScrollEnabled
              renderItem={renderItem}
              ListFooterComponent={renderFooter}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
          <CText style={Style.ProfileName}>{name}</CText>
          <View
            style={[GlobalStyle.row, {alignItems: 'center', marginTop: 10}]}>
            <View style={[GlobalStyle.row, {width: '45%'}]}>
              <Image
                source={CallColoured}
                resizeMode="contain"
                style={{width: 12, height: 12, tintColor: '#DF525B'}}
              />
              <CText style={GlobalStyle.contact}>{phone}</CText>
            </View>

            {!mapView && (
              <View
                style={[GlobalStyle.row, {width: '45%', alignItems: 'center'}]}>
                <Image
                  source={rateIcon}
                  resizeMode="contain"
                  style={{width: 12, height: 12, tintColor: '#DF525B'}}
                />
                <CText style={[GlobalStyle.contact, {flex: 0}]}>Rate :</CText>
                <CText style={[Style.place, {flex: 1, Left: '10%'}]}>
                  {'$ ' + ratePrize}
                </CText>
              </View>
            )}
          </View>
          {mapView && (
            <View
              style={[GlobalStyle.row, {width: '45%', alignItems: 'center'}]}>
              <Image
                source={rateIcon}
                resizeMode="contain"
                style={{width: 12, height: 12, tintColor: '#DF525B'}}
              />
              <CText style={[GlobalStyle.contact, {flex: 0}]}>Rate :</CText>
              <CText style={[Style.place, {flex: 1, Left: '10%'}]}>
                {'$ ' + ratePrize}
              </CText>
            </View>
          )}

          <View
            style={[
              GlobalStyle.row,
              {alignItems: 'center', marginVertical: 5},
            ]}>
            <Image
              source={LocationColored}
              resizeMode="contain"
              style={{width: 12, height: 12, tintColor: '#DF525B'}}
            />
            <CText numberOfLines={1} style={GlobalStyle.contact}>
              {address}
            </CText>
          </View>
          <View
            style={[
              GlobalStyle.row,
              {alignItems: 'center', marginVertical: 4},
            ]}>
            <View
              style={[GlobalStyle.row, {width: '55%', alignItems: 'center'}]}>
              <Image
                source={bookingIcon}
                resizeMode="contain"
                style={{width: 12, height: 12, tintColor: '#DF525B'}}
              />
              <CText style={[GlobalStyle.contact, {flex: 0}]}>Capacity :</CText>
              <CText
                numberofLines={1}
                style={[
                  Style.place,
                  {
                    Left: '10%',
                    width: '80%',
                  },
                ]}>
                {capacity}
              </CText>
            </View>
          </View>
        </View>
        {!mapView && (
          <View
            style={[
              GlobalStyle.row,
              {marginHorizontal: 10, top:"5%"},
            ]}>
            <>
              {isCustomer ? (
                <ToggleSwitch
                  size={'true'}
                  isOn={isOn}
                  label="Available"
                  onPress={() => setIsOn(!isOn)}
                  containerStyle={{width: 10, height: 10}}
                />
              ) : (
                <>
                  {/* <Rating
                    type="star"
                    isDisabled={true}
                    selectedColor="#DF525B"
                    ratingCount={1}
                    count={1}
                    minValue={1}
                    defaultRating={5}
                    imageSize={20}
                   
                  />
                  <CText style={[GlobalStyle.contact]}>4.0</CText> */}
                  <ToggleSwitch
                    size={'true'}
                    isOn={isOn}
                    label="Available"
                    onPress={() => setIsOn(!isOn)}
                  />
                </>
              )}
            </>
            <View
              style={[
                GlobalStyle.row,
                {marginHorizontal: 10, marginVertical: 6},
              ]}>
              <Image
                source={plugIcon}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 7,
                  tintColor: '#DF525B',
                }}
              />
              <Image
                source={lengthIcon}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 7,
                  tintColor: '#DF525B',
                }}
              />
              <Image
                source={docIcon}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 7,
                  tintColor: '#DF525B',
                }}
              />
              <Image
                source={fuelIcon}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 7,
                  tintColor: '#DF525B',
                }}
              />

              <Image
                source={threeDots}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 7,
                  tintColor: '#171D25',
                  left: 2.4,
                }}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SpaceCard;
