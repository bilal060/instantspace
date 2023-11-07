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

export const Stack = createStackNavigator();

function Auth({initial}) {
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
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Information" component={Information} />
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

export default React.memo(Auth);
