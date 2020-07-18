import React, {Component} from 'react';
import {StyleSheet, View, PanResponder, Platform} from 'react-native';

import Svg from 'react-native-svg';
import Tts from 'react-native-tts';

import {
  getDayGraph,
  getWeekGraph,
  getMonthGraph,
} from '../service/graphService';
import {ButtonGraph} from './ButtonGraph';
import {DetailPanel} from './elements/DetailPanel';
import {PeriodSelector} from './elements/PeriodSelector';
import {StockChart} from './elements/StockChart';

export class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      symbol: props.navigation.getParam('symbol', '-'),
      symbolData: [],
      displayData: [],
      endDate: new Date(),
    };

    this.setDayView = this.setDayView.bind(this);
    this.setWeekView = this.setWeekView.bind(this);
    this.setMonthView = this.setMonthView.bind(this);
    this.mapToDisplayData = this.mapToDisplayData.bind(this);
  }

  componentDidMount() {
    this.setDayView();
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => {},
    });
  }

  mapToDisplayData(data) {
    const chartData = data.map((d) => {
      return {x: d.date, y: d.high};
    });

    this.setState(() => ({symbolData: data, chartData: chartData}));
  }

  setDayView() {
    // TODO: check symbol here before get graph

    getDayGraph(this.state.symbol, this.state.endDate).then(this.mapToDisplayData);
  }

  setWeekView() {
    // TODO: check symbol here before get graph

    getWeekGraph(this.state.symbol, this.state.endDate).then(this.mapToDisplayData);
  }

  setMonthView() {
    // TODO: check symbol here before get graph

    getMonthGraph(this.state.symbol, this.state.endDate).then(this.mapToDisplayData);
  }

  render() {
    const firstPoint = this.state.symbolData[0];
    const chart = <StockChart stockData={this.state.chartData} />;

    return (
      <View style={styles.setBg}>
        <PeriodSelector
          setDayView={this.setDayView}
          setWeekView={this.setWeekView}
          setMonthView={this.setMonthView}
        />
        <View>{Platform.OS === 'ios' ? chart : <Svg>{chart}</Svg>}</View>

        <View>
          <DetailPanel {...firstPoint} symbol={this.state.symbol} />
          <ButtonGraph triggerGraphUpdate={this.setDayView} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setBg: {
    backgroundColor: '#fffff0',
  },
});
