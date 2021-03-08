import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import ChatRoomListItem from '../chatroomListItem';
import { useNavigation } from '@react-navigation/native';


import GlobalStyles from '../../utils/globalStyles';





const OpenChatroom = ({route, navigation}) => {
  const [chats, setChats] = useState([]);
  const [date, setDate] = useState();

//  const navigation = useNavigation();
  const { chatroomName } = route.params;
  function getTimestamp() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setDate(
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }

  useEffect(() => {
    try {
      const onValueChange = database()
        .ref('/chatrooms/' + chatroomName)
        .on('value', (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          setChats(chats);
        });
    } catch (error) {
      console.log('FEJL I CHATROOMS');
    }
    // Stop listening for updates when no longer required
    return;
  }, []);

  function addMessage(name, text, avatar) {
    getTimestamp()
    var postRef = database().ref('/chatrooms/' + chatroomName).push({
      name: name,
      text: text,
      avartar: avatar,
      date: date
    });
  }

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      {chats.map((chat, i) => (
          <SafeAreaView style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text>{chat.name}</Text>
              <Text>{chat.text}</Text>
            </View>

          </SafeAreaView>
        ))}
      <Button
        title="Add Message"
        onPress={() => addMessage('Christian Høj', "I like FC Barcelona", "No Avatar")}
      />
    </SafeAreaView>
  );
};
export default OpenChatroom;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
  /* listItem: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listItemInner: {
    flex: 0.5,
    flexDirection: 'column',
    backgroundColor: '#00a3da',
  },
  icon: {
    flex: 0.5,
    alignItems: 'flex-end',
    backgroundColor: '#0342da',
  }, */
});
