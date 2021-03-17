import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {COLORS} from '../utils/colours';
import GlobalStyles from '../utils/globalStyles';

const Message = (props, cssGroup) => {
  const [date, setDate] = useState();

  useEffect(() => {
    getDate(props.chat.data().created);
  }, []);

  async function getDate(timestamp) {
    try {
      var newDate = timestamp.toDate().toString();
      setDate(newDate);
      return;
    } catch (error) {
      setDate(firebase.firestore.FieldValue.serverTimestamp());
      console.log(error);
    }
  }
  return (
    <View style={styles.messageSent}>
      <View style={styles.messageItem}>
        <Text style={GlobalStyles.dateText}>{props.chat.data().sender}</Text>
        <Text style={styles.messageText}>{props.chat.data().text}</Text>
        <Text style={GlobalStyles.dateText}>{date}</Text>
      </View>
      <View style={GlobalStyles.iconView}>
        <Image
          source={{
            uri: props.chat.data().avatar,
          }}
          style={GlobalStyles.avatar}
        />
      </View>
    </View>
  );
};
export default Message;

const styles = StyleSheet.create({
  messageSent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 100,
    alignItems: 'flex-end',
  },
  messageItem: {
    alignItems: 'flex-end',
    flex: 5,
    marginTop: 10,
  },
  messageText: {
    backgroundColor: COLORS.green,
    alignItems: 'flex-end',
    padding: 10,
    borderRadius: 10,
  },
});
