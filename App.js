/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Button, Alert, AppState , Linking} from 'react-native';

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
import NewDesignSpace from './src/pages/Protected/Owner/NewDesignSpace/index'
import { navigate } from './src/routing/Ref';
import { userLogout } from './src/redux/actions/Auth.action';
// yaha import kro welcome Screen
const App = () => {
 
  const [isLink , setisLink]= useState("false")
  // console.log(data.spaceName);
  let accuracy = 50;
  notifee.registerForegroundService(() => {
    return new Promise(async () => {
      const interval = setInterval(async () => {
        // console.log(Date.now(), accuracy)

        // @a dispatch add coordinates to the coordinates array in the redux store (if accuracy is lower than 10m)
       // console.log(accuracy);
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

  const handleDeepLink = async ({url}) => {
    // add your code here
    // Alert.alert("111")
     const myArray = url.split("/");

     if (reduxState?.isLoggedin == false) {
           
      setisLink("true");

      // console.log(myArray)
        dispatch(userLogout())
         navigate("ManagerRegister",{myArray: myArray});

     
      // navigate("ManagerRegister",{myArray: myArray})
     }
     else{
      setisLink("true");
      dispatch(userLogout())
      navigate("ManagerRegister",{myArray: myArray});
      
     }
    //  console.log(JSON.stringify(myArray))
  }
  
    // useEffect(() => {
      
       
    //   const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    //   Linking.getInitialURL().then(url => {
    //      if (url) {
    //         handleDeepLink({url});
    //      }
    //      else{
    //       return renderRoot();
    //      }
    //   });
    //   return () => {
    //     linkingEvent.remove()
    //   };
     
    
    // }, []);

    // useEffect(() => {
    //   const getUrlAsync = async () => {
    //     // Get the deep link used to open the app
    //     const initialUrl = await Linking.getInitialURL();
    //     Alert.alert(initialUrl.toString())
    //     // setLinkedURL(decodeURI(initialUrl));
    //   };
  
    //   getUrlAsync();
    // }, []);





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
    // Alert.alert("call ")
    Socket.on('connect', () => {
     
    // Socket.emit('addNewUser', userId);
    });
    
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });
    // Socket.emit('join', {userId});
  }, []);

 

  const renderRoot = () => {

    if (!reduxState?.isLoggedin) {
     return <Auth IsLink ={isLink} />;
    } 
   
    else {
      // Alert.alert("djbdbfbfdb")
        return <TruckDriverRoot />;
   
    }
    
  };

   return renderRoot();
};

export default App;

const styles = StyleSheet.create({});
