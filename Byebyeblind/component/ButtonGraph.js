import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Button,
  Platform,
} from 'react-native';
import {speak} from '../service/speech';

export class ButtonGraph extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={styles.seticonbtn}>
          <TouchableOpacity
            onPress={() => {
              speak('This is button Voice');
              alert('You tapped the button Voice');
            }}>
            <View style={styles.setbtnvoice}>
              <Image
                style={styles.sizeImgbtn}
                source={require('../assets/microphone.png')}
              />
              <Text style={styles.btnfont}>Voice</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              speak('This is button Favorite');
              alert('You tapped the button Favorite');
            }}>
            <View style={styles.setbtnfavorite}>
              <Image
                style={styles.sizeImgbtn}
                source={require('../assets/star.png')}
              />
              <Text style={styles.btnfont}>Favorite</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  seticonbtn: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
  },
  setbtnvoice: {
    width: 130,
    height: 70,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
  sizeImgbtn: {
    width: 45,
    height: 45,
    marginLeft: 5,
    marginTop: 10,
  },
  btnfont: {
    width: 130,
    height: 70,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 2,
  },
  setbtnfavorite: {
    width: 130,
    height: 70,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    marginLeft: 400,
  },
});
