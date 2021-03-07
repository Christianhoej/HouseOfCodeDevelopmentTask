import React, {Component, useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const Home = ({navigation}) => {
  const [chatrooms, setChatrooms] = useState();

  async function logout() {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      console.log('Logout fejl');
    }
  }

  //https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/
  useEffect(() => {
    const onValueChange = database()
      .ref(`/chat1`)
      .on('child_added', snapshot => {
        console.log('User data: ', snapshot.val());
      });
      setChatrooms()
    // Stop listening for updates when no longer required
    return
  },);

  return (
    <View>
      <Text>{chatrooms}</Text>
      <Button
        title="Go to chatroom"
        onPress={() => navigation.navigate('OpenChatRoom')}
      />
      <Button title="Log ud" onPress={() => logout()} />
    </View>
  );
};
export default Home;
