import React, {Component} from 'react';
import {View, SafeAreaView, PanResponder, Dimensions} from 'react-native';

import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';

import Svg from 'react-native-svg';
import Tts from 'react-native-tts';
import {Text} from 'victory-native';

import {
  getDayGraph,
  getWeekGraph,
  getMonthGraph,
} from '../../service/graphService';
import {ButtonGraph} from './ButtonGraph';
import {DetailPanel} from './DetailPanel';
import {PeriodSelector} from './PeriodSelector';
import {Chart} from './Chart';
import {TopBar} from './TopBar';

export class GraphPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      symbol: props.navigation.getParam('symbol', '-'),
      symbolData: [],
      displayData: [],
      endDate: new Date(),
      viewMode: 'day',
      chartWidth: 100,
      chartHeight: 100,
    };

    this.setDayView = this.setDayView.bind(this);
    this.setWeekView = this.setWeekView.bind(this);
    this.setMonthView = this.setMonthView.bind(this);
    this.mapToDisplayData = this.mapToDisplayData.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.jump = this.jump.bind(this);
    this.setChartDimension = this.setChartDimension.bind(this);
  }

  componentDidMount() {
    this.setDayView();
    Dimensions.addEventListener('change', () => {});
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => {},
    });
  }

  mapToDisplayData(symbolData, viewMode) {
    const displayData = symbolData.map((d) => {
      return {x: d.date, y: d.high};
    });

    this.setState(() => ({symbolData, displayData, viewMode}));
  }

  setDayView() {
    getDayGraph(this.state.symbol, this.state.endDate).then((data) =>
      this.mapToDisplayData(data, 'day'),
    );
  }

  setWeekView() {
    getWeekGraph(this.state.symbol, this.state.endDate).then((data) =>
      this.mapToDisplayData(data, 'week'),
    );
  }

  setMonthView() {
    getMonthGraph(this.state.symbol, this.state.endDate).then((data) =>
      this.mapToDisplayData(data, 'month'),
    );
  }

  jump(amount) {
    if (this.state.viewMode === 'month') {
      this.setState(
        () => ({endDate: addMonths(this.state.endDate, amount)}),
        () => this.setMonthView(),
      );
    } else if (this.state.viewMode === 'week') {
      this.setState(
        () => ({endDate: addWeeks(this.state.endDate, amount)}),
        () => this.setWeekView(),
      );
    } else {
      this.setState(
        () => ({endDate: addDays(this.state.endDate, amount)}),
        () => this.setDayView(),
      );
    }
  }

  previous() {
    this.jump(-1);
  }

  next() {
    this.jump(1);
  }

  setChartDimension(event) {
    const {width: chartWidth, height: chartHeight} = event.nativeEvent.layout;
    this.setState(() => ({chartWidth, chartHeight}));
  }

  render() {
    const firstPoint = this.state.symbolData[0];
    const chart =
      this.state.displayData.length > 0 ? (
        <Chart
          stockData={this.state.displayData}
          viewMode={this.state.viewMode}
          width={this.state.chartWidth}
          height={this.state.chartHeight}
        />
      ) : (
        <Text>No Data</Text>
      );

    return (
      <View
        style={{
          backgroundColor: '#fffff0',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          paddingRight: 5,
          paddingLeft: 5,
        }}>
        <TopBar
          symbol={this.state.symbol}
          setDayView={this.setDayView}
          setWeekView={this.setWeekView}
          setMonthView={this.setMonthView}
        />

        <SafeAreaView
          style={{
            flex: 1,
            width: '100%',
          }}
          onLayout={this.setChartDimension}>
          {chart}
        </SafeAreaView>

        <DetailPanel {...firstPoint} />
        <ButtonGraph previous={this.previous} next={this.next} />
      </View>
    );
  }
}
