import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Platform, StatusBar, Alert} from 'react-native';
import {CIcon, CLoading, CText, ProgressiveImage} from '../../components';
import Styles from './TabBar.style';
import {SafeAreaView} from '../index';
import {MappedElement} from '../../utils/methods';
import {TouchableOpacity} from 'react-native';
import {
  Add,
  Booking,
  Chat,
  Explore,
  FocusedBooking,
  FocusedChat,
  FocusedExplore,
  FocusedHome,
  FocusedMessage,
  FocusedOctions,
  Focusedplace,
  FocusedSetting,
  FocusedUser,
  FPaymentHistory,
  Home,
  Message,
  Octicons,
  PaymentHistory,
  Place,
  Profile,
  Setting,
  User,
} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {
  ManagerRoutes,
  customerRoutes,
  storageOwnerRoutes,
  truckDriverRoutes,
} from '../../utils/constant';
import {useRoute} from '@react-navigation/native';
import {Image} from 'react-native-animatable';

const TabBar = ({state}) => {
  // Alert.alert('call tabbbar');
  // console.log(reduxState?.userRole);
  const [currentState, setState] = useState(1);
  const navigation = useNavigation();
  const routes = useRoute();

  const reduxState = useSelector(({auth, language}) => {
    return {
      isLoggedin: auth?.isLoggedIn,
      language: language?.language?.lan,
      userRole: auth?.user?.role,
      user: auth?.user,
    };
  });
  const returnRoutes = () => {
    // console.log('call');
    // Alert.alert(reduxState?.userRole);
    // console.log(reduxState?.userRole);
    if (reduxState?.userRole === 'Storage Owner') {
      return storageOwnerRoutes;
    } else if (reduxState?.userRole === 'Customer') {
      return customerRoutes;
    } else if (reduxState?.userRole === 'Truck Driver') {
      return truckDriverRoutes;
    }
    else if (reduxState?.userRole === 'Manager') {
      return ManagerRoutes;
    }
  };

  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom']}
      style={Styles.tabContainer}>
      <View style={Styles.tabInnerContainer}>
        <MappedElement
          data={returnRoutes()}
          renderElement={(route, i) => {
            return (
              <TouchableOpacity
                onPress={() => (
                  setState(route?.id), navigation.navigate(route?.navigate)
                )}
                key={i}
                style={Styles.tab}>
                <Image
                  source={
                    route?.navigate === routes?.name ? route?.img : route.img
                  }
                  style={{
                    width: 50,
                    height: 50,
                    tintColor:
                      route?.navigate === routes?.name ? '#DF525B' : '',
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          }}
        />
        {reduxState?.userRole == 'Storage Owner' && (
          <TouchableOpacity
            style={Styles.addBtnn}
            onPress={() => {
              // navigation.navigate('NewSpace');
              navigation.navigate('NewDesignSpace');  
            }}>
            <ProgressiveImage
              source={Add}
              style={{width: 32, height: 32}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TabBar;
