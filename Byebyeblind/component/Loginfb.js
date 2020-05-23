import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
// import {LoginButton, AccessToken} from 'react-native-fbsdk';

export class Loginfb extends Component {
  render() {
    return (
      <View>
        {/* <LoginButton
          publishPermissions={['email']}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Login failed with error: ' + error.message);
            } else if (result.isCancelled) {
              alert('Login was cancelled');
            } else {
              alert(
                'Login was successful with permissions: ' +
                  result.grantedPermissions,
              );
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginfb: {
    width: 250,
    height: 35,
    marginTop: 20,
    marginBottom: 20,
  },
});

{
  /* <LoginButton
  style={styles.loginfb}
  onLoginFinished={(error, result) => {
    if (error) {
      console.log('login has error: ' + result.error);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
        console.log(data.accessToken.toString());
      });
    }
  }}
  onLogoutFinished={() => console.log('logout.')}
/>; */
}
