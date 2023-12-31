/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import  React,{useEffect , useState} from 'react';
import {
  Linking,
  Alert,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabBar} from '../containers';
import HomeStack from './Stacks/HomeStack';
import {useNavigation} from '@react-navigation/native';
import {
  AddCard,
  AddNewManager,
  AddVechieal,
  AllBooking,
  Chats,
  EditProfile,
  Explore as ExploreScreen,
  Faqs,
  Langugae,
  Managers,
  Messages,
  MyProfile,
  Payment,
  Privacy,
  SpaceDetails,
  Home,
  MySpace,
  Change,
  MyVechiles,
  NewSpace,
  NewDesignSpace
} from '../pages/Protected/Owner';
import ChatStack from './Stacks/Chat';
import ProfileStack from './Stacks/MyProfile';
import SpaceStack from './Stacks/SpaceStack';
import {customerRoutes, truckDriverRoutes} from '../utils/constant';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import { ManagerRegister } from '../pages/Auth';
import { navigate } from './Ref';
import {useDispatch} from 'react-redux';
import { userLogout } from '../redux/actions/Auth.action';

// import {
//     HomeStack,
//     CartStack,
//     LocationStack,
//     ProfileStack,
//     StoreStack,
//     OrderTraking
// } from "./stacks";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const Root = ({initial}) => {
  const navigation = useNavigation();
  const [isInitialStart, setInitialStart] = useState(true);
  const dispatch = useDispatch();


  const handleDeepLink = async ({url}) => {
    // add your code here
   
 
    const myArray = url.split("/");
     dispatch(userLogout())
    //  navigation.navigate("ManagerRegister",{myArray: myArray})
    
  }


  useEffect(() => {
    
  
    const linkingEvent = Linking.addEventListener('url', handleDeepLink);
    Linking.getInitialURL().then(url => {
       if (url) {
          handleDeepLink({url});
          linkingEvent.remove();
       }
    });
    return () => {
      linkingEvent.remove();
    };
   

  }, []);
  const TruckDriverStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Booking" component={AllBooking} />
        <Stack.Screen name="Profile" component={MyProfile} />
      </Stack.Navigator>
    );
  };

  const StorageOwnerStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={MyProfile} />
      </Stack.Navigator>
    );
  };

  const CustomerStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Profile" component={MyProfile} />
      </Stack.Navigator>
    );
  };

  const ManagerStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Booking" component={AllBooking} />
        <Stack.Screen name="Profile" component={MyProfile} />
      </Stack.Navigator>
    );
  };

  const reduxState = useSelector(({auth, language}) => {
    // console.log(auth?.user?.role);
    return {
      userRole: auth?.user?.role,
    };
  });

  const GetScreen = () => {
  //  Alert.alert(reduxState?.userRole.toString());
    if (reduxState?.userRole == 'Storage Owner') {
      return <StorageOwnerStack />;
    } else if (reduxState?.userRole == 'Customer') {
      return <CustomerStack />;
    } else if (reduxState?.userRole == 'Truck Driver') {
      return <TruckDriverStack />;
    }
    else if (reduxState?.userRole == 'Manager') {
      // Alert.alert("call maanget stack")
      return <ManagerStack />;
    }
    // return <TruckDriverStack />;
  };


  return (
    <Stack.Navigator
      // initialRouteName={!initial ? "Home" : "Cart"}

      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={GetScreen} />
      <Stack.Screen name="Profile" component={MyProfile} />
      <Stack.Screen name="FAQs" component={Faqs} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="Booking" component={AllBooking} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Langugae" component={Langugae} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="MySpace" component={MySpace} />
      <Stack.Screen name="SpaceDetails" component={SpaceDetails} />
      <Stack.Screen name="AddVechile" component={AddVechieal} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Managers" component={Managers} />
      <Stack.Screen name="MyVechiles" component={MyVechiles} />
      <Stack.Screen name="AddNewManager" component={AddNewManager} />
      <Stack.Screen name="NewSpace" component={NewSpace} />
      <Stack.Screen name="NewDesignSpace" component={NewDesignSpace} />
     {/* <Stack.Screen name="ManagerRegister" component={ManagerRegister} />  */}
      {/* <Stack.Screen name="Messages" component={Messages} /> */}
    </Stack.Navigator>
  );
};

export default Root;
