import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Chats, EditProfile, Faqs, Home, Langugae, Messages, MyProfile, MySpace, Privacy, SpaceDetails} from '../../pages/Protected/Owner'
const Stack = createStackNavigator();

const StackScreenOptions = {
  headerShown: false,
  tabBarVisible: true
};

function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="MYProfile"
      screenOptions={StackScreenOptions}>
    <Stack.Screen name="MYProfile" component={MyProfile} />
    <Stack.Screen name="FAQs" component={Faqs} />
    <Stack.Screen name="Privacy" component={Privacy} />
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="Langugae" component={Langugae} />

      
     
      

    </Stack.Navigator>
  );
}
export default ProfileStack;
 