import React, {Component, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import GlobalStyles from '../utils/globalStyles'

const chatRoomListItem = (props) => {

  

  useEffect(() => {
    
  }, []);


  return (
    <SafeAreaView >
        <View style={styles.listItem}>
        <Text>{props.name}</Text>
        <Text>{props.description}</Text>
        </View>
      
    </SafeAreaView>
  );
};
export default chatRoomListItem;

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#00a3da',
        marginTop: 20 ,
    },

  });