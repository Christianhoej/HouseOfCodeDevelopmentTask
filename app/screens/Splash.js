import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

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
    <View>
      <Text>HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEJ</Text>
    </View>
  );
};

export default Splash;
