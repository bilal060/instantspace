/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabBar} from '../containers';
import HomeStack from './Stacks/HomeStack';
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
} from '../pages/Protected/Owner';
import ChatStack from './Stacks/Chat';
import ProfileStack from './Stacks/MyProfile';
import SpaceStack from './Stacks/SpaceStack';
import {customerRoutes, truckDriverRoutes} from '../utils/constant';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

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

  const reduxState = useSelector(({auth, language}) => {
    // console.log(auth?.user?.role);
    return {
      userRole: auth?.user?.role,
    };
  });

  const getScreen = () => {
    console.log(reduxState?.userRole);
    if (reduxState?.userRole == 'Storage Owner') {
      return <StorageOwnerStack />;
    } else if (reduxState?.userRole == 'Customer') {
      return <CustomerStack />;
    } else if (reduxState?.userRole == 'Truck Driver') {
      return <TruckDriverStack />;
    }
    // return <TruckDriverStack />;
  };

  return (
    <Stack.Navigator
      // initialRouteName={!initial ? "Home" : "Cart"}

      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={getScreen} />
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

      {/* <Stack.Screen name="Messages" component={Messages} /> */}
    </Stack.Navigator>
  );
};

export default Root;
