import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {COLORS} from '../../utils/colours';

import ChatRoomListItem from '../chatroomListItem';
import {useNavigation} from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

import GlobalStyles from '../../utils/globalStyles';
import {Dimensions} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const OpenChatroom = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [timestamp, setTimestamp] = useState();
  const [inputText, setInputText] = useState();

  const scrollRef = useRef();

  const deviceWidth = Dimensions.get('window').width;

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

    getMessages();
  }, []);

  async function getMessages() {
    try {
      const subscriber = firestore()
        .collection('chatrooms')
        .doc(chatroomName)
        .collection('messages')
        .orderBy('created')
        //.orderBy('date', 'desc')
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
          console.log('CHAATS: ' + chats);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function addMessage(text) {
    getTimestamp();
    try {
      firestore()
        .collection('chatrooms')
        .doc(chatroomName)
        .collection('messages')
        .add({
          sender: auth().currentUser.email,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          text: text,
          avatar: auth().currentUser.photoURL,
        })
        .then(() => {
          console.log('User added!');
        });

      firestore()
        .collection('chatrooms')
        .doc(chatroomName)
        .update({LastMessage: firebase.firestore.FieldValue.serverTimestamp()});

      setInputText('');

      /* scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      }); */
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

  const isMyMessage = (email) => {
    return auth().currentUser.email === email;
  };

  //const messageClass = auth().currentUser.email === auth.currentUser.uid ? 'sent' : 'received';

  const messageStyle = 'TEST';

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <View style={styles.messagesView}>
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() =>
            scrollRef.current.scrollToEnd({animated: true})
          }>
          {messages.map((chat, i) => (
            <View>
              <View>
                <Text>HEJ</Text>
              </View>
              <View
                style={[
                  isMyMessage(chat.data().sender)
                    ? styles.messageSent
                    : styles.messageRecieved,
                ]}>
                <Text>{chat.id}</Text>
                <Text>{chat.data().sender}</Text>
                <Text>{chat.data().text}</Text>

                {/* <Text>{chat.data().created.toDate()}</Text> */}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.keyboardView}>
        <TouchableOpacity
          onPress={() => openChatroom(chats)}
          style={styles.cameraIcon}>
          <FontAwesomeIcon name="camera" size={30} color={COLORS.lightBlue} />
        </TouchableOpacity>

        <TextInput
          style={styles.textInputField}
          value={inputText}
          onChangeText={(text) => {
            setInputText({text}), console.log(text), console.log(inputText);
          }}
          //onSubmitEditing={addMessage('Christian Høj')}
        />
        <TouchableOpacity
          onPress={() => addMessage(inputText.text)}
          style={styles.textInputButton}>
          <FontAwesomeIcon name="send-o" size={30} color={COLORS.lightBlue} />
        </TouchableOpacity>
        {/*  <Button
          style={styles.textInputButton}
          title="Send"
          onPress={() => addMessage('Christian Høj')}
        /> */}
      </View>
    </SafeAreaView>
  );
};
export default OpenChatroom;

const styles = StyleSheet.create({
  messagesView: {
    marginBottom: 50,
    flex: 12,
  },

  scrollView: {
    flex: 1,
  },
  messageRecieved: {
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightBlue,
    marginRight: 100,
    marginLeft: 10,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  messageSent: {
    backgroundColor: COLORS.green,
    alignItems: 'flex-end',
    marginRight: 10,
    marginLeft: 100,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  listItem: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemInner: {
    flex: 0.5,
    flexDirection: 'column',
  },
  keyboardView: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: 5,

    //width: Dimensions.get('window').width,
  },
  cameraIcon: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  textInputField: {
    /* height: 40, */
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  textInputButton: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
