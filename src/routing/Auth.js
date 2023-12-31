/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
  NewDesignSpace,
  ManagerRegister
} from '../pages/Auth';
import Welcome from '../pages/Welcome';
import {
  Linking,
  Alert,
} from 'react-native';
import { navigate } from './Ref';
import { userLogout } from '../redux/actions/Auth.action';
import {useNavigation} from '@react-navigation/native';

export const Stack = createStackNavigator();

function Auth({initial, IsLink}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  const [initialRouteName, updateInitialRouteName] = useState('Welcome');


  const getAndCheck = async () => {
    let val = await getValueIntoAsyncStorage(WELCOME_SCREEN);
   if
   (IsLink == true)
   {
    updateInitialRouteName("ManagerRegister");
   }
   else if (val === 'hide') {
      updateInitialRouteName(initial ? 'Welcome' : 'sign_in');
    } else {
      // updateInitialRouteName(initial ? 'Welcome' : 'sign_in');
    }
  };

  useEffect(() => {
    (async () => {
      await getAndCheck();
    })();
  }, []);

  const handleDeepLink = async ({url}) => {
    // add your code here
  
     const myArray = url.split("/");
    //  console.log("dtatatatatat")
    //  console.log(myArray)
      // dispatch(userLogout())
      // Alert.alert()
       navigation.navigate("ManagerRegister",{myArray: myArray})
    //  console.log(JSON.stringify(myArray))
  }
  
    useEffect(() => {
      
       
      const linkingEvent = Linking.addEventListener('url', handleDeepLink);
      Linking.getInitialURL().then(url => {
         if (url) {
            handleDeepLink({url});
         }
      });
      return () => {
        linkingEvent.remove()
      };
     
    
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
          <Stack.Screen name="ManagerRegister" component={ManagerRegister} />
        </Stack.Navigator>
      );
    } else {
      return <CLoading showAnimation={true} loading={true} />;
    }
  };

  return Layout(initialRouteName);
}

export default React.memo(Auth);
