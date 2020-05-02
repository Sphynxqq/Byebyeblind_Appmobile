import React from 'react';
import {View, Alert} from 'react-native';
import Tts from 'react-native-tts';
import Voice from 'react-native-voice';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {GraphPage} from './GraphPage';
import {FavoritePage} from './FavoritePage';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.speech();

    this.state = {
      check: true,
      name: [],
    };
  }

  componentDidMount() {
    console.log('start');
    fetch('http://10.90.3.75/ticker_name')
      .then(response => response.json())
      .then(ticker_name => {
        this.state.name = Object.keys(ticker_name).map(key => ticker_name[key]);
        console.log(this.state.name[0].TICKER);
      });

    Voice.onSpeechResults = res => {
      const key = res.value[0];
      this.speech2(res.value[0]);
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
              if (key != 'favorite') {
                this.stock_check(key);
                alert(this.state.check);
                if (this.state.check == true) {
                  this.props.navigation.navigate('Graph', {key});
                } else {
                  this.speech3();
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
  }

  stock_check(key) {
    for (let i = 0; i < this.state.name.length; i++) {
      if (this.state.name[i].TICKER === key) {
        console.log('check : ' + this.state.name[i].TICKER);
        this.setState({check: true});
        break;
      } else {
        this.setState({check: false});
      }
    }
  }

  speech() {
    Tts.speak('Welcome to Bye Bye Blind', {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.0,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }
  speech2(res) {
    Tts.speak(res + 'Confirm', {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.0,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }
  speech3() {
    Tts.speak('We dont have a stock', {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.0,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }

  render() {
    return (
      <View>
        <GraphPage />
        {/* <FavoritePage/> */}
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
