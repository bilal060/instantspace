import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import GlobalStyle from '../../assets/styling/GlobalStyle';
import ProgressiveImage from '../progressiveImage/ProgressiveImage';
import { CallColoured, LocationColored, Profile } from '../../assets/images';
import CText from '../cText/CText';
import { BASE_URL_IMG } from '../../config/webservices';

const ProfileCard = ({name , address , phone , active , profieContainer , photo}) => {
  return (
    <View style={[GlobalStyle.row , profieContainer ]}>
      <View>
      {!photo || photo == undefined ? (
            <ProgressiveImage source={Profile} resizeMode="contain" style={{width:55 , height:55 }} />
      ) : (
        <Image
        resizeMode="contain"
      source={{uri:  BASE_URL_IMG + photo}}
      // rec={true}
      style={{width:55 , height:55 }}
    />
    )}
      </View>
      <View style={{flex:1 , paddingHorizontal:10 , height:80  , borderBottomWidth:1 ,borderBottomColor:"#E7E6E9"  }}>
        <CText style={GlobalStyle.ProfileName}>{name}</CText>
        <View style={[GlobalStyle.row , {flex:1 , alignItems:"center" , width:200}]}>
            <Image source={LocationColored} resizeMode="contain" style={{width:15 , height:15 ,        tintColor: '#DF525B', }} />
            <CText numberOfLines={1} style={GlobalStyle.contact}>{address}</CText>
        </View>
        <View style={[GlobalStyle.row , {flex:1 , alignItems:"center", width:200 , paddingBottom:10 ,       tintColor: '#DF525B', }]}>
          <Image source={CallColoured} resizeMode="contain" style={{width:15 , height:15 ,        tintColor: '#DF525B',}} />
            <CText style={GlobalStyle.contact}>{phone}</CText>
        </View>
      </View>
      <View style={{ paddingHorizontal:10 , height:80  , borderBottomWidth:1 , alignSelf:"flex-end", borderBottomColor:"#E7E6E9"   }}>
        <CText style={active  ? GlobalStyle.activeCard : GlobalStyle.unActiveCard}>{active ? "Active" :"Unavaible" }</CText>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({});
