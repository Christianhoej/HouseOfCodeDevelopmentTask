import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import ChatRoomListItem from '../chatroomListItem';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import GlobalStyles from '../../utils/globalStyles';

const OpenChatroom = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [timestamp, setTimestamp] = useState();
  const [inputText, setInputText] = useState();

  //  const navigation = useNavigation();
  const {chatroomName} = route.params;
  function getTimestamp() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setTimestamp(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }

  useEffect(() => {
    console.log('ROOMNAME: ' + chatroomName);
    try {
      
    
    const subscriber = firestore()
      .collection('chatrooms')
      .doc(chatroomName)
      .collection('messages')
      .orderBy('date', 'desc')
      //.get()
      .onSnapshot((querySnapshot) => {
        console.log('Total messages: ', querySnapshot.size);
        console.log('Messages: ', querySnapshot);
        let chats = [];
        querySnapshot.forEach((documentSnapshot) => {
          console.log(
            'Message ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          console.log(documentSnapshot.data().Description);

          chats.push(documentSnapshot);
        });
        setMessages(chats);
        console.log('CHAATS: ' + messages);
      });
    } catch (error) {
      console.log(error);
    }
    /* .get().then(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      }); */

    // Stop listening for updates when no longer required
    //return () => subscriber();
  }, []);

  function addMessage(text) {
    getTimestamp();
    try {
      
    
    firestore()
      .collection('chatrooms')
      .doc(chatroomName)
      .collection('messages')
      .add({
        sender: "Hej@hej.dk",//auth().currentUser.email,
        date: timestamp,
        text: 'TEST2222',
        avatar: auth().currentUser.photoURL,
      })
      .then(() => {
        console.log('User added!');
      });

    setInputText('');
  } catch (error) {
      console.log(error);
  }
  }

  const cloudinaryUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'ogcodes');
    data.append('cloud_name', 'ogcodes');
    fetch('	https://api.cloudinary.com/v1_1/christianhoej/houseofcode/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //setPhoto(data.secure_url)
      })
      .catch((err) => {
        Alert.alert('An Error Occured While Uploading');
      });
  };

  //const messageClass === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <ScrollView style={GlobalStyles.screenContainer}>
        {messages.map((chat, i) => (
          <SafeAreaView style={styles.listItem}>
            <View style={styles.listItemInner}>
              {/* <Text>{chat.id}</Text>
              <Text>{chat.data().sender}</Text> */}
               {chat.data().sender === auth().currentUser.email &&
              <>
              <Text style={{ backgroundColor: 'red'}}>{chat.data().sender}</Text>
              <Text>{chat.data().text}</Text>
              <Text>{chat.id}</Text>
              </>}
              
              {!chat.data().sender === auth().currentUser.email &&
              <>
                <Text style={{ backgroundColor: 'blue'}}>{chat.data().sender}</Text>
              <Text>{chat.data().text}</Text>
              </>
              } 
            </View>
          </SafeAreaView>
        ))}
        <Button
          title="Add Message"
          onPress={() => addMessage('Christian Høj')}
        />
      </ScrollView>
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          value={inputText}
          onChangeText={(text) => {
            setInputText({text}), console.log(text), console.log(inputText);
          }}
        />
      </View>
    </>
  );
};
export default OpenChatroom;

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 20,
  },
  messageSent: {},

  messageRecieved: {},

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
