import React, {Component, useEffect, useState} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import ChatRoomListItem from '../chatroomListItem';

import GlobalStyles from '../../utils/globalStyles'


const Home = ({navigation}) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [user, setuser] = useState(auth().currentUser);

  async function logout() {
    try {
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    } catch (error) {
      console.log('Logout fejl');
    }
  }

  function addChatroom(name, description) {
    var postRef = database().ref('/chatrooms').push({
      name: name,
      description: description,
    });
  }

  //https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/
  useEffect(() => {
    try {
      const onValueChange = database()
        .ref(`/chatrooms`)
        .on('value', (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          setChatrooms(chats);
        });
    } catch (error) {
      console.log('FEJL I CHATROOMS');
    }
    // Stop listening for updates when no longer required
    return;
  }, []);
  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View>
        {/* <Text>HEJ</Text> */}
      {chatrooms.map((chats) => (
        <ChatRoomListItem key={chats.name} name={chats.name} description={chats.description}/>
      ))}
      </View>
      {/* <Button
        title="Go to chatroom"
        onPress={() => navigation.navigate('OpenChatRoom')}
      />
      <Button title="Log UUUD" onPress={() => logout()} />
      <Button
        title="Add Chatroom"
        onPress={() => addChatroom('Football', "Let's talk about football!")}
      /> */}
    </SafeAreaView>
  );
};
export default Home;
