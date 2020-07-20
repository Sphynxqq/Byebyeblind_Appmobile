import format from 'date-fns/format';
import React, { Component } from 'react';
import { View, SafeAreaView, PanResponder } from 'react-native';
import Svg from 'react-native-svg';

import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import getWeekOfMonth from 'date-fns/getWeekOfMonth';

import { Text } from 'victory-native';

import {
  getDayGraph,
  getWeekGraph,
  getMonthGraph,
  isSymbolExist,
} from '../../service/graphService';
import { speak, VoiceListener } from '../../service/speech';
import { ButtonGraph } from './ButtonGraph';
import { DetailPanel } from './DetailPanel';
import { Chart } from './Chart';
import { TopBar } from './TopBar';
import { checkFav, addFav, delFav } from '../../service/favorite';

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
      detailDisplayIndex: null,
    };

    this.setDayView = this.setDayView.bind(this);
    this.setWeekView = this.setWeekView.bind(this);
    this.setMonthView = this.setMonthView.bind(this);
    this.mapToDisplayData = this.mapToDisplayData.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.jump = this.jump.bind(this);
    this.setChartDimension = this.setChartDimension.bind(this);
    this.onScatterClick = this.onScatterClick.bind(this);
    this.onVoice = this.onVoice.bind(this);
    this.onFavorite = this.onFavorite.bind(this);
  }

  componentDidMount() {
    this.setDayView();
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (ev, gs) => true,
      onMoveShouldSetPanResponderCapture: (ev, gs) => true,
      onPanResponderMove: (ev, gs) => { },
    });
  }

  mapToDisplayData(symbolData, viewMode) {
    const displayData = symbolData.map((d) => {
      return { x: d.date, y: d.high };
    });

    this.setState(() => ({ symbolData, displayData, viewMode }));
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

  updateGraph() {
    if (this.state.viewMode === 'day') {
      this.setDayView();
    } else if (this.state.viewMode === 'week') {
      this.setWeekView();
    } else if (this.state.viewMode === 'month') {
      this.setMonthView();
    }
  }

  jump(amount) {
    this.setState(
      () => {
        if (this.state.viewMode === 'day') {
          return { endDate: addMonths(this.state.endDate, amount) };
        } else if (this.state.viewMode === 'week') {
          return { endDate: addWeeks(this.state.endDate, amount) };
        } else if (this.state.viewMode === 'month') {
          return { endDate: addDays(this.state.endDate, amount) };
        }
      },
      () => this.updateGraph(),
    );
  }

  previous() {
    this.jump(-1);
  }

  next() {
    this.jump(1);
  }

  async onVoice() {
    await VoiceListener.stop();
    VoiceListener.setCallback((text) => {


      if (text === 'favorite') {
        this.props.navigation.navigate('favorite', '01');
      } else {
        isSymbolExist(text).then((exist) => {
          if (exist) {
            this.setState(
              () => ({ symbol: text }),
              () => this.setDayView(),
            );
          } else {
            speak('Symbol does not exist');
          }
        });

      }
    });
    await VoiceListener.start();

    // this.setState(
    //   () => ({symbol: 'TEST'}),
    //   () => this.setDayView(),
    // );
  }

  async onFavorite() {
    checkFav('1', this.state.symbol).then((exist) => {
      console.log("exit : " + exist);
      if (exist) {
        delFav('1', this.state.symbol);
      } else {
        addFav('1', this.state.symbol);
      }
    });
  }

  setChartDimension(event) {
    const { width: chartWidth, height: chartHeight } = event.nativeEvent.layout;
    this.setState(() => ({ chartWidth, chartHeight }));
  }

  onScatterClick(index) {
    const data = this.state.symbolData[index];
    let speakText;
    if (this.state.viewMode === 'day') {
      speakText = `${format(data.date, 'MMMM d, yyyy')}. Price, ${
        data.high
        } Baht`;
    } else if (this.state.viewMode === 'week') {
      speakText = `Week ${getWeekOfMonth(data.date)} of ${format(
        data.date,
        'MMMM, yyyy',
      )}. Price, ${data.high} Baht`;
    } else if (this.state.viewMode === 'month') {
      speakText = `${format(data.date, 'MMMM, yyyy')}. Price, ${
        data.high
        } Baht`;
    }
    speak(speakText);
    this.setState(() => ({ detailDisplayIndex: index }));
  }

  render() {
    const detailDisplay = this.state.symbolData[
      this.state.detailDisplayIndex ?? this.state.symbolData.length - 1
    ];

    const chart =
      this.state.displayData.length > 0 ? (
        <Chart
          stockData={this.state.displayData}
          viewMode={this.state.viewMode}
          width={this.state.chartWidth}
          height={this.state.chartHeight}
          onScatterClick={this.onScatterClick}
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
          currentView={this.state.viewMode}
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
          <Svg>{chart}</Svg>
        </SafeAreaView>

        <DetailPanel {...detailDisplay} viewMode={this.state.viewMode} />
        <ButtonGraph
          previous={this.previous}
          next={this.next}
          onVoice={this.onVoice}
          onFavorite={this.onFavorite}
        />
      </View>
    );
  }
}
