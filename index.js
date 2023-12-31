/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/**
 * @format
 */

import App from './App';
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {AppRegistry, LogBox, StatusBar, View, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {store} from './src/redux/store';
import {navigationRef} from './src/routing/Ref';
import {themes} from './src/theme/colors';
import {interceptor} from './src/utils/interceptor';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Welcome from './src/pages/Welcome';
import { CompanyProfile, Login } from './src/pages/Auth';

// import { DeepLinking } from 'react-native-deep-linking';

LogBox.ignoreAllLogs();
interceptor();

const theme = {
  colors: {
    background: themes.light.colors.tertiary,
  },
};



const linking = {
  prefixes: ['invitemanager://'],
  config: {
    initialRouteName: 'CompanyProfile',
    screens: {
      Home: {
        path: 'home'
      },
      CompanyProfile: {
        path: 'companyProfile/:id/:name'
      }
    
    }
  }
};

const Container = () => {
   const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer linking={linking} theme={theme} ref={navigationRef}>
         <App /> 
        <Toast />
       
       
      </NavigationContainer>
    </>
  );
};

function dpoApp() {
  useEffect(async () => {
    GoogleSignin.configure({
      webClientId:
        '332080344949-p588iqkva5d7uqh9nncrvjqs23luupag.apps.googleusercontent.com',
    });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        animated={true}
        barStyle={'dark-content'}
      />
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Container />
      </SafeAreaProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => dpoApp);
