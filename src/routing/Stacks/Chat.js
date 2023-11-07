import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Chats,
  Home,
  Messages,
  MySpace,
  SpaceDetails,
} from '../../pages/Protected/Owner';
const Stack = createStackNavigator();
import {useNavigationState} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const StackScreenOptions = {
  headerShown: false,
  tabBarVisible: true,
};


function ChatStack() {

  const route = useRoute();
  const currentScreenName = route.name;
  console.log("🚀 ~ file: Chat.js:37 ~ ChatStack ~ currentScreenName:", currentScreenName)

  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={StackScreenOptions}>
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen
        name="Messages"
        component={Messages}
      />
    </Stack.Navigator>
  )

}
export default ChatStack;
