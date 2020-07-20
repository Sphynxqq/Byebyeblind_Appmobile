import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { speak, VoiceListener } from '../service/speech';
import { isSymbolExist } from '../service/graphService';
import { getFav } from '../service/favorite';
import { GraphPage } from './GraphPage';




export class FavoritePage extends Component {

  constructor(props) {
    super(props);
    this.onPressMicButton = this.onPressMicButton.bind(this);
    console.log("FavoritePage");
    this.state = {
      data: [],
      u_id: '1',
    };

    this.setFavView = this.setFavView.bind(this);
    this.renderListFooter = this.renderListFooter.bind(this);
    this.onPressMicButton = this.onPressMicButton.bind(this);
    this.go_graph = this.go_graph.bind(this);

  }

  async onPressMicButton() {
    await VoiceListener.stop();

    VoiceListener.setCallback((speechText) => {
      console.log('Home page', speechText);
      if (speechText === 'favorite') {
        this.props.navigation.navigate('Favorite', '1');
      } else {
        this.go_graph(speechText);
      }
    });

    await VoiceListener.start();
  }

  componentDidMount() {
    this.setFavView();
  }

  setFavData(data) {
    this.setState(() => ({ data }));
    console.log(this.state.data);
  }

  setFavView() {
    getFav(this.state.u_id).then((data) =>
      this.setFavData(data),
    );
  }



  go_graph(symbol) {
    isSymbolExist(symbol).then((exist) => {
      if (exist) {
        this.props.navigation.navigate('Graph', { symbol });
      } else {
        alert('Symbol does not exist');
      }
    });
    // this.props.navigation.navigate('Graph', {symbol});
  }

  // this.onPressMicButton()
  renderListFooter() {
    return (
      <View style={styles.seticonbtn}>
        <TouchableOpacity
          onPress={() => {
            this.onPressMicButton()
          }}
          style={styles.bigBtn}>
          <Image
            style={styles.sizeImgbtn}
            source={require('../assets/microphone.png')}
          />
          {/* <Text style={styles.btnfont}>Voice</Text> */}
        </TouchableOpacity>


      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={{ backgroundColor: '#fffff0', alignItems: 'center' }}>
        <View style={styles.createcard}>
        
          <TouchableOpacity onPress={() => {
            this.go_graph(item.TICKER);
          }}>
            <View style={styles.displayIncard}>
              {/* <Image
                            style={styles.sizeImgcard}
                            source={require('../assets/bangkokbank.png')}
                        /> เอาค่ามาใส่ตรงนี้ vvvv*/}
              <Text style={styles.fontcard}>{item.TICKER}</Text>
              {/* <Text style={styles.fontnumbercard}>168 ฿</Text> */}
            </View> 
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'column' }}>
        <FlatList
          data={this.state.data} // รับค่าจาก database
          ListFooterComponent={this.renderListFooter}
          renderItem={({ item }) => this.renderItem(item)}
        />

        {/* <TouchableOpacity onPress={(evt) => this.handlePress(evt)}>
                    <FlatList data={[1, 2, 3, 4]}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={({ item }) => this.renderItem(item)}
                    />
                </TouchableOpacity> */}
      </View>
    );
  }

  handlePress(evt) {
    console.log(`X is = ${evt.nativeEvent.locationX}`);
    console.log(`Y is = ${evt.nativeEvent.locationY}`);
    console.log(`page_x: ${evt.nativeEvent.pageX}`);
    console.log(`page_y: ${evt.nativeEvent.pageY}`);
    console.log(`location_x: ${evt.nativeEvent.locationX}`);
    console.log(`location_y: ${evt.nativeEvent.locationY}`);
    console.log(`target: ${evt.nativeEvent.target}`);
  }
}

const styles = StyleSheet.create({
  setbtnvoice: {
    width: 130,
    height: 70,
    backgroundColor: '#FBD1A7',
    marginTop: 10,
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: 'row',
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
  seticonbtn: {
    //flexDirection: 'row',
    width: 100,
    height: 100,
    backgroundColor: '#FBD1A7',
    borderRadius: 50,
    justifyContent: 'center',
  },
  sizeImgbtn: {
    width: 60,
    height: 60,
    marginLeft: 20,
    marginTop: 8,
  },
  btnfont: {
    width: 130,
    height: 70,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 2,
  },
  createcard: {
    width: 400,
    height: 90,
    backgroundColor: '#FBD1A7',
    borderRadius: 20,
    marginTop: 10,
  },
  displayIncard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 500,
    height: 90,
    marginLeft: 110
  },
  sizeImgcard: {
    width: 70,
    height: 70,
    marginLeft: 20,
  },
  fontcard: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 60,
  },

  fontnumbercard: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 40,
  },
});
