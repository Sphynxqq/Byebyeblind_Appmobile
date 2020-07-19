import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {speak} from '../../service/speech';

export const PeriodSelector = (props) => {
  return (
    <View style={styles.periodSelector}>
      <TouchableOpacity
        style={
          props.currentView === 'day'
            ? styles.currentPeriodBtn
            : styles.periodBtn
        }
        onPress={() => {
          speak('Day view');
          props.setDayView();
        }}>
        <Text>DAY</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          props.currentView === 'week'
            ? styles.currentPeriodBtn
            : styles.periodBtn
        }
        onPress={() => {
          speak('Week view');
          props.setWeekView();
        }}>
        <Text>WEEK</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          props.currentView === 'month'
            ? styles.currentPeriodBtn
            : styles.periodBtn
        }
        onPress={() => {
          speak('Month view');
          props.setMonthView();
        }}>
        <Text>MONTH</Text>
      </TouchableOpacity>
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
    padding: 5,
  },
  periodBtnText: {
    fontSize: 20,
  },
  currentPeriodBtn: {
    backgroundColor: '#FF0000',
    color: '#FFFFFF',
    marginLeft: 5,
    borderRadius: 5,
    padding: 5,
  },
});
