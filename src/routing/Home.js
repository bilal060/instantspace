/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {CLoading} from '../components';
import {createStackNavigator} from '@react-navigation/stack';
import {getValueIntoAsyncStorage} from '../utils/asyncStorage/Functions';
import {WELCOME_SCREEN} from '../utils/asyncStorage/Constants';
import {
  ChangePassword,
  CompanyProfile,
  Forgot,
  Information,
  Login,
  Register,
  VerifyOtp,
} from '../pages/Auth';
import Welcome from '../pages/Welcome';
import {
  AllBooking,
  Chats,
  Explore,
  MyProfile,
  MySpace,
  Payment,
} from '../pages/Protected/Owner';

export const Stack = createStackNavigator();

function Home({initial}) {
  const dispatch = useDispatch();

  const [initialRouteName, updateInitialRouteName] = useState('Welcome');

  const getAndCheck = async () => {
    let val = await getValueIntoAsyncStorage(WELCOME_SCREEN);
    if (val === 'hide') {
      updateInitialRouteName(initial ? 'Welcome' : 'sign_in');
    } else {
      updateInitialRouteName(initial ? 'Welcome' : 'sign_in');
    }
  };

  useEffect(() => {
    (async () => {
      await getAndCheck();
    })();
  }, []);

  /** Layout */
  const Layout = initialRouteName => {
    if (initialRouteName !== null) {
      return (
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Explore} />
          <Stack.Screen name="Booking" component={AllBooking} />

          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="Profile" component={MyProfile} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="MySpace" component={MySpace} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
          <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
        </Stack.Navigator>
      );
    } else {
      return <CLoading showAnimation={true} loading={true} />;
    }
  };

  return Layout(initialRouteName);
}

export default React.memo(Home);
