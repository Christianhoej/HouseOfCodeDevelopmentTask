import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  NativeEventEmitter,
  NativeModules,
  BackHandler,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  color,
  SafeAreaView,
} from 'react-native';

export default class OpenChatRoom extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false,
      //title: '',
    };
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('homeDidMount');
  }
  render() {
    return (
      <SafeAreaView s>
        <Text>OpenChatRoom</Text>
      </SafeAreaView>
    );
  }
}
