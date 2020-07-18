import React, {Component} from 'react';
import {View, PanResponder, Platform, ScrollView} from 'react-native';

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
      viewMode: 'day',
    };

    this.setDayView = this.setDayView.bind(this);
    this.setWeekView = this.setWeekView.bind(this);
    this.setMonthView = this.setMonthView.bind(this);
    this.mapToDisplayData = this.mapToDisplayData.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.jump = this.jump.bind(this);
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

  render() {
    const firstPoint = this.state.symbolData[0];
    const chart =
      this.state.displayData.length > 0 ? (
        <StockChart
          stockData={this.state.displayData}
          viewMode={this.state.viewMode}
        />
      ) : (
        <Text>No Data</Text>
      );

    console.log(this.state.endDate);
    console.log(this.state.displayData);

    return (
      <View
        style={{
          backgroundColor: '#fffff0',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          alignContent: 'stretch',
          width: '100%',
          height: '100%',
        }}>
        <PeriodSelector
          setDayView={this.setDayView}
          setWeekView={this.setWeekView}
          setMonthView={this.setMonthView}
        />

        <View style={{flex: 1}}>
          {Platform.OS === 'ios' ? chart : <Svg>{chart}</Svg>}
        </View>

        <DetailPanel {...firstPoint} symbol={this.state.symbol} />
        <ButtonGraph previous={this.previous} next={this.next} />
      </View>
    );
  }
}
