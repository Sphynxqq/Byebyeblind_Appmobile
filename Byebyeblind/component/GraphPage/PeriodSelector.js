import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, View, SafeAreaView} from 'react-native';
import {speak} from '../../service/speech';

export const PeriodSelector = (props) => {
  return (
    <SafeAreaView style={styles.periodSelector}>
      <View style={styles.periodBtn}>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Day');
            props.setDayView();
          }}
          title="DAY"
        />
      </View>

      <View style={styles.periodBtn}>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Week');
            props.setWeekView();
          }}
          title="WEEK"
        />
      </View>

      <View style={styles.periodBtn}>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Month');
            props.setMonthView();
          }}
          title="MONTH"
        />
      </View>
    </SafeAreaView>
  );
};

PeriodSelector.propsTypes = {
  setDayView: PropTypes.func.isRequired,
  setWeekView: PropTypes.func.isRequired,
  setMonthView: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  periodBtn: {
    marginLeft: 5,
  },
});
