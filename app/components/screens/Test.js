import React, {Component, useEffect, useState, useRef } from 'react';
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore';

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
    const subscriber = firestore()
      .collection('chatrooms')
      .doc('Random Room')
      .collection("messages")
      .get()
      .then(querySnapshot => {
        console.log('Total messages: ', querySnapshot.size);
    
        querySnapshot.forEach(documentSnapshot => {
          console.log('Message ID: ', documentSnapshot.id, documentSnapshot.data());
          console.log(documentSnapshot.data().text);
        });
      });
      /* .get().then(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      }); */

    // Stop listening for updates when no longer required
    //return () => subscriber();
  }, []);

  const openChatroom = (openedChatroom) => {
    //let room = event.target;
    setopenedChatroom(openedChatroom)
    console.log('ROOM' + openedChatroom.name);
    navigation.navigate('OpenChatRoom', {chatroomName: openedChatroom.name});
  };

  const dummy = useRef();
  const chatroomsRef = firestore().collection('chatrooms').doc('Football');
  //const query = chatroomsRef.orderBy('createdAt', 'desc').limit(50);

  /* const [chatrooms2] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState(''); */

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
{/*       <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

     <View>
        {chatrooms2 && chatrooms2.map(msg => <ChatMessage key={msg.id} chatrooms2={msg} />)}
      </View>
      </ScrollView> */}

    

 
    </SafeAreaView>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL } = props.chatrooms2;

  //const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <View >
      
      <Text>{text}</Text>
    </View>
  </>)
}
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
