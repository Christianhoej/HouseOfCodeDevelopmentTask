import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import GlobalStyles from '../utils/globalStyles';
import { useNavigation } from '@react-navigation/native';


const chatRoomListItem = (props) => {
    const navigation = useNavigation();
  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.listItem}>
      <View style={styles.listItemInner}>
        <Text>{props.name}</Text>
        <Text>{props.description}</Text>
      </View>
      <View style={styles.icon}>
      <Button
        title="Go to chatroom"
        onPress={() => navigation.navigate('OpenChatRoom', {chatroomName: "test"})}
      />
              
      {/* <Image
            
            source={require('../files/baseline_chevron_right_black_18dp.png')}
            //source={{ uri: 'https://i.ibb.co/1fg7ycM/Crowdship-logo.png' }}
          /> */}
      </View>
    </SafeAreaView>
  );
};
export default chatRoomListItem;

const styles = StyleSheet.create({
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
