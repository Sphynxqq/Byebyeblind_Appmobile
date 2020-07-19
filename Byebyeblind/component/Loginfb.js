import React, {Component} from 'react';;
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  ImageBackground,
  Alert,
  Button,,
} from 'react-native';
import {Dimensions} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

export class Loginfb extends Component {
  render() {
    return (
      <View>
        <LoginButton
          style={stylefb.loginfb}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                console.log(data.accessToken.toString());;
              });;
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    );
  }
}

const stylefb = StyleSheet.create({
  loginfb: {
    width: 250,
    height: 35,
    marginTop: 20,
    marginBottom: 20,
  },
});
