import React, {Component} from 'react';
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

import {VictoryChart, VictoryLine, VictoryScatter} from 'victory-native';

import Tts from 'react-native-tts';

import {getGraph, getGraphweek, getGraphmonth} from '../service/graph';
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
      checkDataGraph: [],
    };
    this.updateGraph.bind(this);
  }

  componentDidMount() {
    //this.updateGraph('7UP');

    //DEMO DATA
    getGraph('7up').then((data) => {
      const chartData = data.map((d) => {
        return {x: d.date, y: d.close};
      });

      this.setState(() => {
        return {symbolData: data, chartData: chartData};
      });
    });

    //State Check Show Data
    getGraph('7up').then((data) => {
      const lengthData = data.map((d) => {
        return {dataShow: d.date};
      });

      this.setState(() => {
        return {checkDataGraph: lengthData};
      });
    });
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => {},
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
        return {x: d.date, y: d.vol};
      });
      this.setState(() => {
        this.setState({symbol: symbolName});
        // this.symbol : symbolName,
        return {symbolData: data, chartData: chartData};
      });
    });
  }

  updateGraphweek(symbolName) {
    // TODO: check symbol here before get graph

    getGraphweek(symbolName).then((data) => {
      const chartData = data.map((d) => {
        // console.log(chartData);
        this.setState({symbol: symbolName});
        // console.log(d);
        return {x: d.positionX, y: d.vol};
      });

      this.setState(() => {
        // this.setState({ symbol: symbolName });
        // this.symbol = symbolName
        // console.log("symbo : " + symbolName);
        return {symbolData: data, chartData: chartData};
      });
    });
  }

  updateGraphmonth(symbolName) {
    // TODO: check symbol here before get graph

    getGraphmonth(symbolName).then((data) => {
      const chartData = data.map((d) => {
        // console.log(chartData);
        this.setState({symbol: symbolName});
        return {x: d.date, y: d.vol};
      });

      this.setState(() => {
        // this.setState({ symbol: symbolName });
        // this.symbol = symbolName
        // console.log("symbo : " + symbolName);
        return {symbolData: data, chartData: chartData};
      });
    });
  }

  getX() {
    return [-250, -200, -150, -100, -50, 50, 100, 150, 200, 250];
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
          <View>
            <Button
              color="#FBD1A7"
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
              color="#FBD1A7"
              onPress={() => {
                speak('This is button Week');
                this.updateGraphweek(this.state.symbol);
              }}
              title="WEEK"
            />
          </View>

          <View style={styles.btnDateleft}>
            <Button
              color="#FBD1A7"
              onPress={() => {
                speak('This is button Month');
                this.updateGraphmonth(this.state.symbol);
              }}
              title="MONTH"
            />
          </View>
        </View>

        <View {...this._panResponder.panHandlers}>
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
          <ButtonGraph triggerGraphUpdate={this.updateGraph.bind(this)} />
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
    justifyContent: 'center',
  },
  btnDateleft: {
    marginLeft: 5,
  },
  cardview: {
    marginLeft: 30,
    width: 670,
    height: 60,
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
