import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';

import auth from '@react-native-firebase/auth';

import globalStyles from '../../utils/globalStyles'

const Splash = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     auth().onAuthStateChanged(function(user) {
       if (user) {
        // User is signed in.
        navigation.replace('Home');
      } else {
        // No user is signed in.
        navigation.replace('Login');
      } 
      }); 

    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
       <Image
        style={globalStyles.logoContainer}
        //source={require('../files/Crowdship_logo.png')}
        source={{uri: 'https://i.ibb.co/pRkc665/Ho-C-logo-big.jpg'}}
      />
        <LottieView
          source={require('../../files/loader.json')}
          autoPlay
          //loop
        />
    </SafeAreaView>
  );
};

export default Splash;

