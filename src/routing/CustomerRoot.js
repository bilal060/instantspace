/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {TabBar} from '../containers';
import HomeStack from './Stacks/HomeStack';
import {
  AllBooking,
  Chats,
  Explore as ExploreScreen,
  Messages,
  Payment,
} from '../pages/Protected/Owner';
import ChatStack from './Stacks/Chat';
import ProfileStack from './Stacks/MyProfile';
import {Home} from '../pages/Protected';
import SpaceStack from './Stacks/SpaceStack';
import {customerRoutes} from '../utils/constant';

// import {
//     HomeStack,
//     CartStack,
//     LocationStack,
//     ProfileStack,
//     StoreStack,
//     OrderTraking
// } from "./stacks";

const Tab = createBottomTabNavigator();

const Root = ({initial}) => {
  return (
    <Tab.Navigator
      // initialRouteName={!initial ? "Home" : "Cart"}
      tabBar={props => <TabBar {...props} customerRoutes={customerRoutes} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen name="Home" component={ExploreScreen} />
      <Tab.Screen name="Booking" component={AllBooking} />
      <Tab.Screen name="Payment" component={Payment} />

      <Tab.Screen name="Chats" component={ChatStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />

      <Tab.Screen
        name="MySpace"
        component={SpaceStack}
        options={{
          tabBarVisible: false, // Hide the tab bar for this screen
        }}
      />
    </Tab.Navigator>
  );
};

export default Root;
