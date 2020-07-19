import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, View} from 'react-native';

import {speak} from '../../service/speech';

export const PeriodSelector = (props) => {
  return (
    <View style={styles.periodSelector}>
      <View
        style={
          props.currentView === 'day'
            ? styles.currentPeriodBtn
            : styles.periodBtn
        }>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Day view');
            props.setDayView();
          }}
          title="DAY"
        />
      </View>

      <View
        style={
          props.currentView === 'week'
            ? styles.currentPeriodBtn
            : styles.periodBtn
        }>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Week view');
            props.setWeekView();
          }}
          title="WEEK"
        />
      </View>

      <View
        style={
          props.currentView === 'month'
            ? styles.currentPeriodBtn
            : styles.periodBtn
        }>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Month view');
            props.setMonthView();
          }}
          title="MONTH"
        />
      </View>
    </View>
  );
};

PeriodSelector.propsTypes = {
  setDayView: PropTypes.func.isRequired,
  setWeekView: PropTypes.func.isRequired,
  setMonthView: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  periodBtn: {
    marginLeft: 5,
    borderRadius: 5,
  },
  currentPeriodBtn: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    marginLeft: 5,
    borderRadius: 5,
  },
});
