import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';

export const StockChart = (props) => {
  return (
    <VictoryChart
      height={props.height}
      width={props.width}
      events={[
        {
          childName: ['line', 'scatter'],
          target: 'data',
          eventHandlers: {
            onPress: () => {
              return [
                {
                  childName: ['line', 'scatter'],
                  mutation: (props) => {
                    // todo: check and announce if user is on line
                  },
                },
              ];
            },
          },
        },
      ]}>
      <VictoryLine
        name="line"
        data={props.stockData}
        style={{
          data: {stroke: 'tomato'},
        }}
        interpolation="linear"
      />

      <VictoryScatter
        name="scatter"
        data={props.stockData}
        style={{
          data: {fill: '#c43a31'},
          labels: {
            fill: ({datum}) => datum.x === '#FFFFFF',
          },
        }}
        labels={({datum}) => datum.y}
      />

      <VictoryLabel x={25} y={10} text={'High'} />
      <VictoryAxis
        scale="linear"
        tickFormat={(d) => {
          const date = new Date(d);
          return format(date, 'd MMM yy');
        }}
        label="Time"
      />

      <VictoryAxis dependentAxis scale="linear" />
    </VictoryChart>
  );
};

StockChart.propsTypes = {
  stockData: PropTypes.array.isRequired,
  viewMode: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
