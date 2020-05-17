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
  Alert,
} from 'react-native';
import Svg from 'react-native-svg';

import {VictoryChart, VictoryLine, VictoryScatter} from 'victory-native';

import Tts from 'react-native-tts';

import Voice from 'react-native-voice';
import {getGraph} from '../service/graph';
import {ButtonGraph} from './ButtonGraph';
import {speak} from '../service/speech';

export class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      symbol: props.navigation.getParam('symbol', '-'),
      symbolData: [],
      displayData: [],
    };
  }

  componentDidMount() {
    getGraph('7up').then((data) => {
      const chartData = data.map((d) => {
        return {x: d.date, y: d.close};
      });

      this.setState(() => {
        return {symbolData: data, chartData: chartData};
      });
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

  speechFirstData() {
    const firstData = this.state.symbolData[0] ?? {};
    console.log(
      'Today is ' +
        (firstData.date ?? new Date()) +
        'And Vaule is ' +
        (firstData.close ?? 0),
    );

    Tts.speak(
      'Today is ' +
        (firstData.date ?? new Date()) +
        'And Vaule is ' +
        (firstData.close ?? 0),
      {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 1.0,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      },
    );
  }

  //ขนาดหน้าจอโทรศัพท์ที่ใช้เทส width:731, height:411
  render() {
    const firstPoint = this.state.symbolData[0];

    const chart = (
      <VictoryChart
        events={[
          {
            childName: ['line', 'scatter'],
            target: 'data',
            eventHandlers: {
              onPress: () => {
                console.log('touch event');
                return [
                  {
                    childName: ['line', 'scatter'],
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
          data={this.state.chartData}
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
          data={this.state.chartData}
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
              speak('This is button Day');
              Alert.alert(
                'ยืนยัน',
                'Day',
                [
                  {
                    text: 'ยกเลิก',
                    onPress: () => {
                      console.log('ยกเลิก');
                    },
                  },
                  {
                    text: 'ตกลง',
                    onPress: async () => {
                      console.log('ตกลง');
                    },
                  },
                ],
                {cancelable: false},
              );
              this.speechFirstData();
            }}
            title="DAY"
          />

          <Button
            color="#FBD1A7"
            onPress={() => {
              speak('This is button Week');
              Alert.alert(
                'ยืนยัน',
                'Week',
                [
                  {
                    text: 'ยกเลิก',
                    onPress: () => {
                      console.log('ยกเลิก');
                    },
                  },
                  {
                    text: 'ตกลง',
                    onPress: async () => {
                      console.log('ตกลง');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            title="WEEK"
          />

          <Button
            color="#FBD1A7"
            onPress={() => {
              speak('This is button Month');
              Alert.alert(
                'ยืนยัน',
                'Month',
                [
                  {
                    text: 'ยกเลิก',
                    onPress: () => {
                      console.log('ยกเลิก');
                    },
                  },
                  {
                    text: 'ตกลง',
                    onPress: async () => {
                      console.log('ตกลง');
                    },
                  },
                ],
                {cancelable: false},
              );
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
              <Text>เปิด {firstPoint?.open}</Text>
              <Text>สูงสุด {firstPoint?.high}</Text>
              <Text>ล่าสุด</Text>
            </View>

            <View style={styles.displayincard}>
              <Text>ราคาปิด {firstPoint?.close}</Text>
              <Text>ต่ำสุด {firstPoint?.low}</Text>
              <Text>VOL {firstPoint?.vol}</Text>
            </View>

            <View style={styles.displaynamebank}>
              <Text>{this.state.symbol}</Text>
            </View>
          </View>
          <ButtonGraph />
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
});
