import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, NewSpace, TruckHome} from '../../pages/Protected/Owner';
import ProfileStack from './MyProfile';
const Stack = createStackNavigator();

const StackScreenOptions = {
  headerShown: false,
};

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={StackScreenOptions}>
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="TruckHome" component={TruckHome} /> */}

      <Stack.Screen name="Profile" component={ProfileStack} />
      <Stack.Screen name="NewSpace" component={NewSpace} />
    </Stack.Navigator>
  );
}

export default HomeStack;
