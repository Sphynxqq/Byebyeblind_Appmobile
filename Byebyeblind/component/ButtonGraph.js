import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {speak} from '../service/speech';
import Voice from 'react-native-voice';

export const ButtonGraph = (props) => {
  return (
    <View style={styles.seticonbtn}>
      <TouchableOpacity
        onPress={() => {
          speak('This is button Voice');
        }}
        style={styles.setbtnvoice}>
        <Image
          style={styles.sizeImgbtn}
          source={require('../assets/microphone.png')}
        />
        <Text style={styles.btnfont}>Voice</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          speak('Previous');
          props.previous();
        }}>
        <View style={styles.setbtnleftandright}>
          <Image
            style={styles.sizeImgbtn}
            source={require('../assets/left.png')}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          speak('Next');
          props.next();
        }}>
        <View style={styles.setbtnleftandright}>
          <Image
            style={styles.sizeImgbtn}
            source={require('../assets/right.png')}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          speak('This is button Favorite');
          // Voice.start('en-US');
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
  );
};

const styles = StyleSheet.create({
  seticonbtn: {
    flexBasis: 100,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  setbtnvoice: {
    width: 130,
    height: 65,
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
    height: 65,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
  setbtnleftandright: {
    width: 60,
    height: 65,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
  },
});

ButtonGraph.propsTypes = {
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};
