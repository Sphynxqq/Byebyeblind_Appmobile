import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {speak} from '../service/speech';
import Voice from 'react-native-voice';

Voice.onSpeechResults = (res) => {
  const key = res.value[0];
  speak(res.value[0] + ' Confirm');
  Alert.alert(
    'ยืนยัน',
    res.value[0],
    [
      {
        text: 'ยกเลิก',
        onPress: () => {
          return null;
        },
      },
      {
        text: 'ตกลง',
        onPress: async () => {
          if (key !== 'favorite') {
            this.stock_check(key);
            alert(this.state.check);
            if (this.state.check === true) {
              this.props.navigation.navigate('Graph', {key});
            } else {
              speak('We dont have a stock');
            }
          } else {
            this.props.navigation.navigate('Favorite', {key});
          }
        },
      },
    ],
    {cancelable: false},
  );
};
export class ButtonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDaygraph: 0,
    };
  }

  nextDaygraph = () => {
    this.setState({
      showDaygraph: this.state.showDaygraph + 1,
    });
  };

  beforeDaygraph = () => {
    this.setState({
      showDaygraph: this.state.showDaygraph - 1,
    });
  };

  render() {
    return (
      <View style={styles.seticonbtn}>
        <TouchableOpacity
          onPress={() => {
            speak('This is button Voice');
            this.props.triggerGraphUpdate('acc');
            // Voice.start('en-US');
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
            speak('This is button Previous day');
            //this.setState({showDaygraph: this.state.showDaygraph - 1});
            this.beforeDaygraph();
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
            speak('This is button Next day');
            //this.setState({showDaygraph: this.state.showDaygraph + 1});
            this.nextDaygraph();
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
            // alert('You tapped the button Favorite');
            Voice.start('en-US');
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
  }
}

const styles = StyleSheet.create({
  seticonbtn: {
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
