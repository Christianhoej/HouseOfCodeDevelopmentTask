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

import GlobalStyles from '../../utils/globalStyles';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [openedChatroom, setopenedChatroom] = useState([]);
  const [user, setuser] = useState(auth().currentUser);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        console.log("ONVALUECHANGE" + onValueChange);
    } catch (error) {
      console.log('FEJL I CHATROOMS');
    }
    // Stop listening for updates when no longer required
    return;
  }, []);

  const openChatroom = (openedChatroom) => {
    //let room = event.target;
    setopenedChatroom(openedChatroom)
    console.log('ROOM' + openedChatroom.name);
    navigation.navigate('OpenChatRoom', {chatroomName: openedChatroom.name});
  };

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <Text>HEJ</Text> */}
        {chatrooms.map((chats, i) => (
          <SafeAreaView style={styles.listItem}>
            <View style={styles.listItemInner}>
              <Text>{chats.name}</Text>
              <Text>{chats.description}</Text>
            </View>
            <View style={styles.icon}>
              <Button title="Go to chatroom" onPress={() => openChatroom(chats)} />

              {/* <Image
            
            source={require('../files/baseline_chevron_right_black_18dp.png')}
            //source={{ uri: 'https://i.ibb.co/1fg7ycM/Crowdship-logo.png' }}
          /> */}
            </View>
          </SafeAreaView>
        ))}

<Button title="Log out" onPress={() => logout()} />
        {/* <ChatRoomListItem key={chats.name} name={chats.name} description={chats.description}/> */}
      </ScrollView>

      {/* <Button
        title="Go to chatroom"
        onPress={() => navigation.navigate('OpenChatRoom')}
      />
      
      <Button
        title="Add Chatroom"
        onPress={() => addChatroom('Football', "Let's talk about football!")}
      /> */}
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
  listItem: {
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
  },
});
