import React from 'react'
import { View, Text } from 'react-native'

// pages
import Login from '../../screens/Login/Login';
// import History from '../../screens/History/History';
import Home from '../../screens/Home/Home';


import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler';
import Index from '../../screens/Index';

const Stack = createStackNavigator();
const MainNavigators = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode='none'>
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigators