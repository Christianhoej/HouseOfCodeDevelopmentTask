import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {BackHandler, ToastAndroid} from 'react-native';

import Home from './app/components/screens/Home';
import Login from './app/components/screens/Login';
import OpenChatRoom from './app/components/screens/OpenChatRoom';
import Splash from './app/components/screens/Splash';

import {GoogleSignin} from '@react-native-community/google-signin';
import GlobalStyles from './app/utils/globalStyles'

GoogleSignin.configure({
  webClientId:
    '964356098523-ac55ib61bkin6216ple2vcm697h32aea.apps.googleusercontent.com',
});

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

var backPressedOnce = false;

BackHandler.addEventListener('hardwareBackPress', function () {
  if (backPressedOnce == true) {
    return false;
  } else {
    backPressedOnce = true;
    ToastAndroid.show(
      'Tryk tilbage igen for at lukke appen',
      ToastAndroid.SHORT,
    );

    setTimeout(function () {
      backPressedOnce = false;
    }, 2000);
    return true;
  }
});

const App = () => {
  return (
    <NavigationContainer>
      {
        <Stack.Navigator >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{cardStyleInterpolator: forFade}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OpenChatRoom"
            component={OpenChatRoom}
            options={{title: ''}}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};
export default App;
