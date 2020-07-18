import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Button,
  Platform,
  Alert,
} from 'react-native';
import Svg from 'react-native-svg';

import { VictoryChart, VictoryLine, VictoryScatter } from 'victory-native';

import Tts from 'react-native-tts';

import { getGraph, getGraphweek, getGraphmonth } from '../service/graph';
import { ButtonGraph } from './ButtonGraph';
import { speak } from '../service/speech';

export class GraphPage extends Component {
  constructor(props) {
    super(props);
    const symbol1 = props.navigation.getParam('symbol', '-');
    this.state = {
      check: true,
      symbol: symbol1, //ชื่อหุ้นที่ส่งมา
      symbolData: [],
      displayData: [],
    };
    this.updateGraph.bind(this);
  }

  componentDidMount() {
    this.updateGraph(this.state.symbol);
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => { },
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

  updateGraph(symbolName) {
    // TODO: check symbol here before get graph
    getGraph(symbolName).then((data) => {
      const chartData = data.map((d) => {
        return { x: d.date, y: d.high };
      });
      this.setState(() => {
        this.setState({ symbol: symbolName });
        // this.symbol : symbolName,
        return { symbolData: data, chartData: chartData };
      });
    });
  }

  updateGraphweek(symbolName) {
    // TODO: check symbol here before get graph

    getGraphweek(symbolName).then((data) => {
      const chartData = data.map((d) => {
        // console.log(chartData);
        this.setState({ symbol: symbolName });
        // console.log(d);
        return { x: d.date, y: d.high };
      });

      this.setState(() => {
        // this.setState({ symbol: symbolName });
        // this.symbol = symbolName
        // console.log("symbo : " + symbolName);
        return { symbolData: data, chartData: chartData };
      });
    });
  }

  updateGraphmonth(symbolName) {
    // TODO: check symbol here before get graph

    getGraphmonth(symbolName).then((data) => {
      const chartData = data.map((d) => {
        // console.log(chartData);
        this.setState({ symbol: symbolName });
        return { x: d.date, y: d.high };
      });

      this.setState(() => {
        // this.setState({ symbol: symbolName });
        // this.symbol = symbolName
        // console.log("symbo : " + symbolName);
        return { symbolData: data, chartData: chartData };
      });
    });
  }

  getX() {
    return [-250, -200, -150, -100, -50, 50, 100, 150, 200, 250]
  }


  //ขนาดหน้าจอโทรศัพท์ที่ใช้เทส width:731, height:411
  render() {
    const firstPoint = this.state.symbolData[0];
    console.log("ticker", firstPoint?.ticker);
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
                        : { style: { fill: '#030303' } };
                    },
                  },
                ];
              },
            },
          },
        ]}
        padding={{ top: 22, bottom: 30, left: 55, right: 11 }}
        width={650}
        height={185}>
        <VictoryLine
          name="line"
          data={this.state.chartData}
          style={{
            data: { stroke: 'tomato' },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          interpolation="linear"
        />

        <VictoryScatter
          name="scatter"
          data={this.state.chartData}
          size={5}
          style={{
            data: { fill: '#c43a31' },
            // labels: {
            //   fill: ({ datum }) => datum.x === '#000000',
            // },
          }}
          labels={({ datum }) => datum.y}
        />
      </VictoryChart>
    );
    return (
      <View style={styles.setBg}>
        <View style={styles.setBtnDate}>
          <View>
            <Button
              color="##797D7F"
              onPress={() => {
                speak('This is button Day');
                console.log(this.state.symbol);
                this.updateGraph(this.state.symbol);
                this.speechFirstData();
              }}
              title="DAY"
            />
          </View>

          <View style={styles.btnDateleft}>
            <Button
              color="#797D7F"
              onPress={() => {
                speak('This is button Week');
                this.updateGraphweek(this.state.symbol);
              }}
              title="WEEK"
            />
          </View>

          <View style={styles.btnDateleft}>
            <Button
              color="#797D7F"
              onPress={() => {
                speak('This is button Month');
                this.updateGraphmonth(this.state.symbol);
              }}
              title="MONTH"
            />
          </View>
        </View>
            
        {/* width="600" height="205" */}
        <View {...this._panResponder.panHandlers}>
          {Platform.OS === 'ios' ? (
            chart
          ) : (
              <Svg width="650" height="185">
                {chart}
              </Svg>
            )}
        </View>

        <View>
          <View style={styles.cardview}>
            <View style={styles.displayincard}>
              <Text style={styles.txtcard1}>เปิด : {firstPoint?.open}</Text>
              <Text style={styles.txtcard2}>สูงสุด : {firstPoint?.high}</Text>
              <Text style={styles.txtcard3}>ล่าสุด : </Text>
            </View>

            <View style={styles.displayincard}>
              <Text style={styles.txtcard4}>ราคาปิด : {firstPoint?.close}</Text>
              <Text style={styles.txtcard5}>ต่ำสุด : {firstPoint?.low}</Text>
              <Text style={styles.txtcard6}>VOL : {firstPoint?.vol}</Text>
            </View>
            
            <View style={styles.displaynamebank}>
              {/* <Text>{this.state.symbol}</Text> */}
              <Text style={styles.txtcard7}>{firstPoint?.ticker}</Text>
            </View> 
          </View>
          <ButtonGraph triggerGraphUpdate={this.updateGraph.bind(this)} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setBg: {
    backgroundColor: '#D0D3D4',
  },
  setBtnDate: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 30,
    justifyContent: 'center',
  },
  btnDateleft: {
    marginLeft: 5,
  },
  cardview: {
    marginLeft: 6,
    width: 670,
    height: 80,
    backgroundColor: '#F7F9F9',
    borderRadius: 10,
    elevation: 5,
  },
  displayincard: {
    flexDirection: 'row',
    //justifyContent: 'space-around',
  },
  displaynamebank: {
    alignItems: 'center',
  },
  txtcard1: {
    fontSize: 20,
    marginLeft: 75,
    marginTop: 2,
  },
  txtcard2: {
    fontSize: 20,
    marginLeft: 120,
    marginTop: 2,
  },
  txtcard3: {
    fontSize: 20,
    marginLeft: 120,
    marginTop: 2,
  },
  txtcard4: {
    fontSize: 20,
    marginLeft: 75,
  },
  txtcard5: {
    fontSize: 20,
    marginLeft: 83,
  },
  txtcard6: {
    fontSize: 20,
    marginLeft: 110,
  },
  txtcard7: {
    fontSize: 20,
    marginLeft: 0
  },
});
