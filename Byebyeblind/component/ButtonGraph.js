import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { speak } from '../service/speech';
import Voice from 'react-native-voice';
import { checkFav, addFav, delFav } from '../service/favorite';
import { getGraphNextDay } from '../service/graph';
import { isSymbolExist } from '../service/graph';

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
          console.log("logtestttttttt");
          console.log("key : " + res.value[0]);
          if (key !== 'favorite') {
            isSymbolExist(res.value[0]).then((exist) => {
              if (exist) {
                console.log("change : " + res.value[0]);
                ButtonGraph.up(res.value[0]);
              } else {
                speak('Symbol does not exist');
              }
            });
          } else {
            this.props.navigation.navigate('Favorite', '01');
          }
        },
      },
    ],
    { cancelable: false },
  );
};

export class ButtonGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDaygraph: 0,
      check: true,
      name: [],
      key: 0,
      check2: [],

    };
  }

  nextDaygraph = () => {
    this.setState({
      showDaygraph: this.state.showDaygraph + 1,
    });
    return this.state.showDaygraph;
  };

  beforeDaygraph = () => {
    this.setState({
      showDaygraph: this.state.showDaygraph - 1,
    });
    return this.state.showDaygraph;
  };

  up(key) {
    this.props.triggerGraphUpdate(key);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={styles.seticonbtn}>
        <TouchableOpacity
          onPress={() => {
            speak('This is button Voice');
            // this.props.triggerGraphUpdate('acc');
            Voice.start('en-US');
            // this.props.navigation.navigate('Home');
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
            this.beforeDaygraph();
            getGraphNextDay('7up', this.state.showDaygraph);
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
            this.nextDaygraph();
            getGraphNextDay('7up', this.state.showDaygraph);
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
            speak('This is Favorite button');
            checkFav('01', 'AP').then((exist) => {
              console.log(exist);
              if (exist) {
                console.log("have")
                delFav('01', '7UP')
              } else {
                console.log("dont have")
                addFav('01', 'AP')
              }
            });

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
    height: 60,
    backgroundColor: '#797D7F',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    elevation: 5,
    marginLeft: 6
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
    height: 60,
    backgroundColor: '#797D7F',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    elevation: 5,
    marginRight: 6
  },
  setbtnleftandright: {
    width: 60,
    height: 60,
    backgroundColor: '#797D7F',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
    elevation: 5,
  },
});
