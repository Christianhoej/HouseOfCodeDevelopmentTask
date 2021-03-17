import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import globalStyles from '../../utils/globalStyles';

const Splash = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    });

    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <Image
        style={styles.image}
        source={{uri: 'https://i.ibb.co/pRkc665/Ho-C-logo-big.jpg'}}
      />
      <LottieView
        source={require('../../files/loader.json')}
        autoPlay
        style={styles.lottie}
      />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  image: {
    flex: 0.2,
    marginTop: 100,
  },
  lottie: {
    flex: 5,
  },
});
