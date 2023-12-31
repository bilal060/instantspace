import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddNewManager, Chats, Managers, Messages, NewSpace} from '../../pages/Protected/Owner';
const Stack = createStackNavigator();

const StackScreenOptions = {
  headerShown: false,
};

function OwnerStack() {
  return (
    <Stack.Navigator
      initialRouteName="Managers"
      screenOptions={StackScreenOptions}>
      <Stack.Screen name="Managers" component={Managers} />
      <Stack.Screen name="AddNewManager" component={AddNewManager} />
      <Stack.Screen name="NewSpace" component={NewSpace} />
    <Stack.Screen name="Messages" component={Messages} />
   
     
    </Stack.Navigator>
  );
}

export default OwnerStack;
