import React, {Component} from 'react';

import {View, Text, Button} from 'react-native';

import auth from '@react-native-firebase/auth';


const Home = ({navigation}) => {

  async function logout() {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      console.log('Logout fejl');
    }
  }


  return (
    <View>
      <Text>Home2</Text>
      <Button
        title="Go to chatroom"
        onPress={() => navigation.navigate('OpenChatRoom')}
      />
      <Button title="Log ud" onPress={() => logout()} />
    </View>
  );
};
export default Home;
