/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Home from './app/screens/Home'
import Login from './app/screens/Login'
import OpenChatRoom from './app/screens/OpenChatRoom'
import Splash from './app/screens/Splash'

import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  //webClientId: '964356098523-cbg8qpuibb6r1u62idps2pai9u3d4ko7.apps.googleusercontent.com',
  webClientId: '964356098523-ac55ib61bkin6216ple2vcm697h32aea.apps.googleusercontent.com',
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OpenChatRoom" component={OpenChatRoom} />


        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
export default App;
