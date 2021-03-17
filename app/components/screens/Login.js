import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import {COLORS} from '../../utils/colours'
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import globalStyles from '../../utils/globalStyles';

const Login = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const googleText = "Sign in with Google"
  const facebookText = "Sign in with Facebook"

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  async function onGoogleButtonPress() {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Google fejl');
    }
  }

  async function onFacebookButtonPress() {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
        console.log('User cancelled the login process');
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
        console.log('Something went wrong obtaining access token');
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      console.log('DATA' + facebookCredential);
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log('Facebook fejl');
      console.log(error);
      Alert.alert('An Error Occured At Login');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <Image
        style = {globalStyles.logoContainer}
        source={{uri: 'https://i.ibb.co/pRkc665/Ho-C-logo-big.jpg'}}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress()}
          style={styles.buttonStyle}
        >
        <Text style={globalStyles.buttonText}>{googleText}</Text>
        </TouchableOpacity>
      
      <TouchableOpacity
        title="Facebook Sign-In"
        onPress={() => onFacebookButtonPress()}
        style={styles.buttonStyle}>
        <Text style={globalStyles.buttonText}>{facebookText}</Text>
      </TouchableOpacity>
      </View>
      <View>
        <Image
          style={globalStyles.logoContainer}
          source={{uri: 'https://i.ibb.co/pRkc665/Ho-C-logo-big.jpg'}}
        />
      </View>
    </SafeAreaView>
  );
};
export default Login;

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonStyle: {
    fontSize: 50,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: COLORS.lightBlue
  }
  
});
