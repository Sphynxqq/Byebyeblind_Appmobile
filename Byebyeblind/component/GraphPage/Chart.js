import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
  VictoryAxis,
} from 'victory-native';

import {asPeriodFormat} from './DateTools';

export const Chart = (props) => {
  /** Hack to force update VictoryChart event listener **/
  const [_, setDummy] = useState(0);
  useEffect(() => {
    setDummy(Math.random());
  }, [props.viewMode]);

  return (
    <VictoryChart
      height={props.height}
      width={props.width}
      standalone={false}
      events={[
        {
          childName: 'scatter',
          target: 'data',
          eventHandlers: {
            onPress: () => {
              return [
                {
                  childName: 'scatter',
                  mutation: (event) => {
                    props.onScatterClick(event.index);
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

      <VictoryLabel x={25} y={10} text={'Price'} />
      <VictoryAxis
        scale="linear"
        tickFormat={(d) => asPeriodFormat(props.viewMode, d)}
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
  onScatterClick: PropTypes.func.isRequired,
};
