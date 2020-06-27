import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import Voice from 'react-native-voice';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {isSymbolExist} from '../service/graph';
import {speak} from '../service/speech';
import {GraphPage} from './GraphPage';
import {FavoritePage} from './FavoritePage';
// import {Loginfb} from './Loginfb';

class HomeScreen extends React.Component {
  constructor() {
    super();
    speak('Welcome to Bye Bye Blind');

    this.state = {
      check: true,
      name: [],
      key: 0,
      check2: [],
    };
  }

  componentDidMount() {
    console.log('start');

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
                // this.stock_check(key);
                // alert(this.state.check);
                isSymbolExist(symbol).then((exist) => {
                  if (exist) {
                    this.props.navigation.navigate('Graph', {symbol});
                  } else {
                    speak('Symbol does not exist');
                  }
                });
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

  go_graph(symbol) {
    // isSymbolExist(symbol).then((exist) => {
    //   if (exist) {
    //     this.props.navigation.navigate('Graph', {symbol});
    //   } else {
    //     alert('Symbol does not exist');
    //   }
    // });
    this.props.navigation.navigate('Graph', {symbol});
  }

  // stock_check(key) {
  //   fetch('http://10.0.216.157:3000/checkstock' + key)
  //     .then((response) => response.json())
  //     .then((check) => {
  //       this.state.check2 = Object.keys(check).map((key) => check[key]);
  //       console.log(this.state.check2[0].CHECK);
  //     });

  //   console.log('stock check');
  //   for (let i = 0; i < this.state.name.length; i++) {
  //     console.log(this.state.name[i].TICKER);
  //     if (this.state.name[i].TICKER === key) {
  //       console.log('check : ' + this.state.name[i].TICKER);
  //       this.setState({check: true});
  //       break;
  //     } else {
  //       this.setState({check: false});
  //     }
  //   }
  // }

  render() {
    return (
      <View style={styles.bgcolor}>
        <View style={styles.setflex}>
          <Text style={styles.fontHomepage}>Bye Bye Blind</Text>

          <View style={styles.voiceBtn}>
            {/* <TouchableOpacity onPress={() => Voice.start('en-US')}> */}
            <TouchableOpacity onPress={() => this.go_graph('7up')}>
              <Image source={require('../assets/iconmicro.png')} />
            </TouchableOpacity>
          </View>

          {/* <Loginfb /> */}
        </View>
      </View>
    );
  }
}

const RootStack = createSwitchNavigator(
  {
    Home: HomeScreen,
    Graph: GraphPage,
    Favorite: FavoritePage,
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  bgcolor: {
    backgroundColor: '#01273C',
    flex: 1,
  },
  setflex: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#01273C',
  },

  fontHomepage: {
    fontSize: 50,
    color: '#ffffff',
    fontWeight: '700',
  },

  voiceBtn: {
    marginTop: 25,
  },
});
