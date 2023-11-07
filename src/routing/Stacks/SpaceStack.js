import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, MySpace, SpaceDetails , AddVechieal, AddCard} from '../../pages/Protected/Owner'
const Stack = createStackNavigator();

const StackScreenOptions = {
  headerShown: false,
};

function SpaceStack() {
  return (
    <Stack.Navigator
      initialRouteName="MySpace"
      screenOptions={StackScreenOptions}>
      <Stack.Screen name="MySpace" component={MySpace} />
      <Stack.Screen name="SpaceDetails" component={SpaceDetails} />
      <Stack.Screen name="AddVechile" component={AddVechieal} />
      <Stack.Screen name="AddCard" component={AddCard} />


      
     
      

    </Stack.Navigator>
  );
}

export default SpaceStack;
