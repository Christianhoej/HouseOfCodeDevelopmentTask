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
  Image,
} from 'react-native';

import {COLORS} from '../utils/colours';

import GlobalStyles from '../utils/globalStyles';
import firestore from '@react-native-firebase/firestore';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const RecievedMessage = (props, cssGroup) => {
  const [date, setDate] = useState();

  useEffect(() => {
    getDate(props.chat.data().created)
  }, []);

  async function getDate(timestamp){
    var newDate = timestamp.toDate().toString()
    setDate(newDate)
    return
  }
  return (
    <View style={styles.messageRecieved}>
      <View style={GlobalStyles.iconView}>
        <Image
          source={{
            uri: props.chat.data().avatar,
          }}
          style={GlobalStyles.avatar}
        />
      </View>

      <View style={styles.messageItem}>
        {/* <Text>{props.chat.id}</Text> */}
        <Text style={GlobalStyles.dateText}>{props.chat.data().sender}</Text>
        <Text style={styles.messageText}>{props.chat.data().text}</Text>
        <Text style={GlobalStyles.dateText}>{date}</Text>

      </View>
    </View>
  );
};
export default RecievedMessage;

const styles = StyleSheet.create({
  messageRecieved: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 100,
    alignItems: 'flex-start',
  },
  messageItem: {
    flex: 5,
    marginTop: 10,
    alignItems: 'flex-start'
  },

  messageText: {
    backgroundColor: COLORS.lightBlue,
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 10,
  },
 
});
