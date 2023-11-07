/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Button, Alert, AppState} from 'react-native';

import React, {useEffect, useState} from 'react';
import TruckDriverRoot from './src/routing/TruckDriverRoot';

import Auth from './src/routing/Auth';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {getCountries} from './src/redux/actions/Global.action';
import {changeLanguage} from './src/redux/actions/Language.action';
import {useTranslation} from 'react-i18next';
import i18n from './src/utils/i18n/i18n';
import {Socket} from './src/utils/methods';
import {getValueIntoAsyncStorage} from './src/utils/asyncStorage/Functions';
import {USERLOGIN} from './src/utils/asyncStorage/Constants';
import AUTH from './src/redux/constants/Auth.constant';
import {data} from './AppClub';
import notifee from '@notifee/react-native';
// yaha import kro welcome Screen

const App = () => {
  // console.log(data.spaceName);
  let accuracy = 50;
  notifee.registerForegroundService(() => {
    return new Promise(async () => {
      const interval = setInterval(async () => {
        // console.log(Date.now(), accuracy)

        // @a dispatch add coordinates to the coordinates array in the redux store (if accuracy is lower than 10m)
        console.log(accuracy);
        notifee.hideNotificationDrawer();
        if (accuracy > 0) {
          accuracy -= 1;
        } else {
          // @a stop foreground service
          // accuracy = 100;
          clearInterval(interval);
          await notifee.stopForegroundService();
        }
      }, 1000);
    });
  });
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleLanguageChange = languageCode => {
    i18n.changeLanguage(languageCode);
  };
  async function getUserData() {
    const data = await getValueIntoAsyncStorage(USERLOGIN);

    if (data != null) {
      dispatch({
        type: AUTH.LOGIN_USER_API,
        loading: false,
        user: JSON.parse(data),
        isLoggedIn: true,
      });
    }
  }
  useEffect(() => {
    getUserData();
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    dispatch(getCountries());
    handleLanguageChange('en');
    dispatch(changeLanguage({lan: 'en'}));
  }, []);

  const reduxState = useSelector(({auth, language}) => {
    // console.log('123');
    // console.log(auth);
    return {
      isLoggedin: auth?.isLoggedIn,
      language: language?.language?.lan,
      userRole: auth?.user?.role,
      user: auth?.user,
    };
  });

  const userId = reduxState?.user?._id;
  useEffect(() => {
    Socket.emit('join', {userId});
  }, []);

  const renderRoot = () => {
    if (!reduxState?.isLoggedin) {
      return <Auth />;
    } else {
      return <TruckDriverRoot />;
    }
  };

  return renderRoot();
};

export default App;

const styles = StyleSheet.create({});
