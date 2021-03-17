import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
    wait(2000).then(() => {
      setRefreshing(false), getChatrooms();
    });
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
  console.disableYellowBox = true;
  /*  function addChatroom(name, description) {
    var postRef = database().ref('/chatrooms').push({
      name: name,
      description: description,
    });
  } */

  useEffect(() => {
    getChatrooms();
  }, []);

  async function getChatrooms() {
    const subscriber = firestore()
      .collection('chatrooms')
      .orderBy('LastMessage', 'desc')
      .onSnapshot((querySnapshot) => {
        console.log('Total chatrooms: ', querySnapshot.size);
        console.log('chatrooms: ', querySnapshot);
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
        setChatrooms(chats);
      });
  }
  const openChatroom = (openedChatroom) => {
    setopenedChatroom(openedChatroom);
    console.log('ROOM' + openedChatroom.name);
    navigation.navigate('OpenChatRoom', {chatroomName: openedChatroom.id});
  };

  return (
    <SafeAreaView style={GlobalStyles.screenContainer}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {chatrooms.map((chats, i) => (
          <>
            <TouchableOpacity
            key={i}
              onPress={() => openChatroom(chats)}
              style={styles.listItem}>
              <View style={styles.listItemInner}>
                <Text style={styles.chatroomTitle} key={chats.id}>{chats.id}</Text>
                <Text key={chats.data().Description}>{chats.data().Description}</Text>
              </View>
              <View style={styles.icon}>
                <FontAwesomeIcon name="chevron-right" size={20} />
              </View>
            </TouchableOpacity>
            <View style={styles.border}></View>
          </>
        ))}
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listItemInner: {
    flex: 0.9,
    flexDirection: 'column',
  },
  icon: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  chatroomTitle: {
    fontSize: 27,
  },
  border: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});
