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
import {speak} from '../../service/speech';

export const Chart = (props) => {
  return (
    <VictoryChart
      height={props.height}
      width={props.width}
      events={[
        {
          childName: ['scatter'],
          target: 'data',
          eventHandlers: {
            onPress: () => {
              return [
                {
                  childName: ['scatter'],
                  mutation: (event) => {
                    const {datum} = event;
                    const speakText = `${format(
                      datum.x,
                      'MMMM do, yyyy',
                    )}.  High, ${datum.y}`;
                    speak(speakText);
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
        size={8}
        style={{
          data: {fill: '#c43a31'},
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

Chart.propsTypes = {
  stockData: PropTypes.array.isRequired,
  viewMode: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};
