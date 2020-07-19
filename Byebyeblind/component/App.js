import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {speak, VoiceListener} from '../service/speech';
import {isSymbolExist} from '../service/graphService';

import {GraphPage} from './GraphPage';
import {FavoritePage} from './FavoritePage';

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

    this.onPressMicButton = this.onPressMicButton.bind(this);
  }

  async onPressMicButton() {
    await VoiceListener.stop();

    VoiceListener.setCallback((speechText) => {
      console.log('Home page', speechText);
      if (speechText === 'favorite') {
      } else {
        this.go_graph(speechText);
      }
    });

    await VoiceListener.start();
  }

  componentDidMount() {
    VoiceListener.stop();

    VoiceListener.setCallback((speechText) => {
      console.log('Home page', speechText);
      this.go_graph(speechText);
    });
  }

  go_graph(symbol) {
    isSymbolExist(symbol).then((exist) => {
      if (exist) {
        this.props.navigation.navigate('Graph', {symbol});
      } else {
        alert('Symbol does not exist');
      }
    });
    // this.props.navigation.navigate('Graph', {symbol});
  }

  render() {
    console.disableYellowBox = true;

    return (
      <SafeAreaView style={styles.bgcolor}>
        <View style={styles.setflex}>
          <Text style={styles.fontHomepage}>Bye Bye Blind</Text>

          <View style={styles.voiceBtn}>
            <TouchableOpacity onPress={this.onPressMicButton}>
              {/*<TouchableOpacity onPress={() => this.go_graph('7up')}>*/}
              <Image source={require('../assets/iconmicro.png')} />
            </TouchableOpacity>
          </View>

          {/* <Loginfb /> */}
        </View>
      </SafeAreaView>
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
    backgroundColor: '#fffff0',
    flex: 1,
  },
  setflex: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fffff0',
  },

  fontHomepage: {
    fontSize: 50,
    color: '#000000',
    fontWeight: '700',
  },

  voiceBtn: {
    marginTop: 25,
  },
});
