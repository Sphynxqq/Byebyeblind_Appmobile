import React from 'react';
import PropTypes from 'prop-types';
import {VictoryChart, VictoryLine, VictoryScatter} from 'victory-native';

export const StockChart = (props) => {
  return (
    <VictoryChart
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
    </VictoryChart>
  );
};

StockChart.propsTypes = {
  stockData: PropTypes.array.isRequired,
};
