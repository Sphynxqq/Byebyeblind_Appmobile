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
import Svg from 'react-native-svg';

import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryCursorContainer,
  round,
} from 'victory-native';

import Tts from 'react-native-tts';

import Voice from 'react-native-voice';

function generateSampleData_DAY() {
  const data = [];
  const tNow = new Date();
  while (tNow.getHours() > 0) {
    data.push({x: new Date(tNow), y: Math.floor(Math.random() * 500)});
    tNow.setHours(tNow.getHours() - 1);
  }

  return data;
}

function generateSampleData_WEEK() {
  const data = [];
  const tNow = new Date();
  while (tNow.getDay() > 0) {
    data.push({x: new Date(tNow), y: Math.floor(Math.random() * 500)});
    tNow.setDate(tNow.getDate() - 1);
  }

  return data;
}

function generateSampleData_1MONTH() {
  const data = [];
  const tNow = new Date();
  let d = 30;
  while (d--) {
    data.push({x: new Date(tNow), y: Math.floor(Math.random() * 500)});
    tNow.setDate(tNow.getDate() - 1);
  }

  return data;
}

export class GraphPage extends Component {
  constructor() {
    super();
    this.state = {
      check: true,
      name: [],
      open7up: [],
      contentOpen: 0,
      contentHigh: 0,
      contentLow: 0,
      contentClose: 0,
      contentVol: 0,
      open7upmore: [],
      high7upmore: [],
      low7upmore: [],
      close7upmore: [],
      vol7upmore: [],
      volGraph: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const Data = navigation.getParam('key', 'Empty');
    this.setState({Keyword: Data});

    fetch('http://192.168.1.37:3000/7up')
      .then((response) => response.json())
      .then((open) => {
        this.state.open7up = Object.keys(open).map((key) => open[key]);
        this.setState({contentOpen: this.state.open7up[0].OPEN});
        console.log(this.state.open7up[0].OPEN);
      });

    fetch('http://192.168.1.37:3000/7upmore')
      .then((response) => response.json())
      .then((high) => {
        this.state.high7upmore = Object.keys(high).map((key) => high[key]);

        this.setState({contentHigh: this.state.high7upmore[0].HIGH});
        console.log('HIGH : ' + this.state.high7upmore[0].HIGH);
      });

    fetch('http://192.168.1.37:3000/7upmore')
      .then((response) => response.json())
      .then((low) => {
        this.state.low7upmore = Object.keys(low).map((key) => low[key]);
        this.setState({contentLow: this.state.low7upmore[0].LOW});
        console.log('LOW : ' + this.state.low7upmore[0].LOW);
      });

    fetch('http://192.168.1.37:3000/7upmore')
      .then((response) => response.json())
      .then((close) => {
        this.state.close7upmore = Object.keys(close).map((key) => close[key]);
        this.setState({contentClose: this.state.close7upmore[0].CLOSE});
        console.log('CLOSE : ' + this.state.close7upmore[0].CLOSE);
      });

    fetch('http://192.168.1.37:3000/7upmore')
      .then((response) => response.json())
      .then((vol) => {
        this.state.vol7upmore = Object.keys(vol).map((key) => vol[key]);
        this.setState({contentVol: this.state.vol7upmore[0].VOL});
        console.log('VOL : ' + this.state.vol7upmore[0].VOL);
        // for (let i = 0; i < 8; i++) {
        //     this.state.volGraph.push(this.state.vol7upmore[i].VOL);
        //     console.log("vol7upmore[i] : " + this.state.volGraph[i]);
        // }
      });
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      // onStartShouldSetResponder: (ev, gs) => true,
      // onResponderGrant: (ev, gs) => true,
      // onResponderMove: (ev, gs) => ture,
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => {
        // The X,Y position of the touch, relative to the root element
        // console.log(`page_x: ${ev.nativeEvent.pageX}`);
        // console.log(`page_y: ${ev.nativeEvent.pageY}`);
        // The X,Y position of the touch, relative to the element
        // console.log(`location_x: ${ev.nativeEvent.locationX}`);
        // console.log(`location_y: ${ev.nativeEvent.locationY}`);
        // The node id of the element receiving the touch event
        // console.log(`target: ${ev.nativeEvent.target}`);
      },
    });
  }

  speechFristData(data) {
    console.log('This in speechFristData and data X is : ', data[0].x);
    console.log('This in speechFristData and data Y is : ', data[0].y);
    Tts.speak('Today is' + data + 'And Vaule is' + data, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.0,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  }

  //ขนาดหน้าจอโทรศัพท์ที่ใช้เทส width:731, height:411
  render() {
    const chart = (
      <VictoryChart
        events={[
          {
            childName: 'line',
            target: 'data',
            eventHandlers: {
              onPress: () => {
                console.log('touch line');
                return [
                  {
                    childName: 'line',
                    mutation: (props) => {
                      const fill = props.style.fill;
                      return fill === '#030303'
                        ? null
                        : {style: {fill: '#030303'}};
                    },
                  },
                ];
              },
            },
          },
        ]}
        events={[
          {
            childName: 'scatter',
            target: 'data',
            eventHandlers: {
              onPress: () => {
                console.log('touch scatter');
                return [
                  {
                    childName: 'scatter',
                    mutation: (props) => {
                      const fill = props.style.fill;
                      return fill === '#030303'
                        ? null
                        : {style: {fill: '#030303'}};
                    },
                  },
                ];
              },
            },
          },
        ]}
        padding={{top: 22, bottom: 10, left: 45, right: 11}}
        width={700}
        height={205}>
        <VictoryLine
          name="line"
          data={this.state.data}
          style={{
            data: {stroke: 'tomato'},
          }}
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          interpolation="linear"
        />

        <VictoryScatter
          name="scatter"
          data={this.state.data}
          size={5}
          style={{
            data: {fill: '#c43a31'},
            labels: {
              fill: ({datum}) => datum.x === '#FFFFFF',
            },
          }}
          labels={({datum}) => datum.y}
        />
      </VictoryChart>
    );
    return (
      <View style={styles.setBg}>
        <View style={styles.setBtnDate}>
          <Button
            color="#FBD1A7"
            onPress={() => {
              const data = generateSampleData_DAY();
              this.setState(() => ({data}));
              this.speechFristData({data});
            }}
            title="DAY"
          />

          <Button
            color="#FBD1A7"
            onPress={() => {
              this.setState(() => ({data: generateSampleData_WEEK()}));
            }}
            title="WEEK"
          />

          <Button
            color="#FBD1A7"
            onPress={() => {
              this.setState(() => ({data: generateSampleData_1MONTH()}));
            }}
            title="MONTH"
          />
        </View>

        <View
          {...this._panResponder.panHandlers}
          //     onStartShouldSetResponder={(ev) => true}
          //     // onMoveShouldSetResponder={(ev) => false}
          //     onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
          //     // onResponderReject={this.onTouchEvent.bind(this, "onResponderReject")}
          //     onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
          // // onResponderRelease={this.onTouchEvent.bind(this, "onResponderRelease")}
          // // onResponderTerminationRequest={(ev) => true}
          // // onResponderTerminate={this.onTouchEvent.bind(this, "onResponderTerminate")}
        >
          {Platform.OS === 'ios' ? (
            chart
          ) : (
            <Svg width="700" height="205">
              {chart}
            </Svg>
          )}
        </View>

        <View>
          <View style={styles.cardview}>
            <View style={styles.displayincard}>
              <Text>เปิด {this.state.contentOpen}</Text>
              <Text>สูงสุด {this.state.contentHigh}</Text>
              <Text>ล่าสุด</Text>
            </View>

            <View style={styles.displayincard}>
              <Text>ราคาปิด {this.state.contentClose}</Text>
              <Text>ต่ำสุด {this.state.contentLow}</Text>
              <Text>VOL {this.state.contentVol}</Text>
            </View>

            <View style={styles.displaynamebank}>
              <Text>{this.state.Keyword}</Text>
            </View>
          </View>

          <View style={styles.seticonbtn}>
            <TouchableOpacity
              onPress={() => {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setBg: {
    backgroundColor: '#01273C',
  },
  setBtnDate: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  cardview: {
    marginLeft: 30,
    width: 670,
    height: 55,
    backgroundColor: '#FBD1A7',
    borderRadius: 10,
    elevation: 5,
  },
  displayincard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  displaynamebank: {
    alignItems: 'center',
  },
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
