import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, View} from 'react-native';
import {speak} from '../../service/speech';

export const PeriodSelector = (props) => {
  return (
    <View style={styles.setBtnDate}>
      <View>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Day');
            props.setDayView();
          }}
          title="DAY"
        />
      </View>

      <View style={styles.btnDateleft}>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Week');
            props.setWeekView();
          }}
          title="WEEK"
        />
      </View>

      <View style={styles.btnDateleft}>
        <Button
          color="#FBD1A7"
          onPress={() => {
            speak('Month');
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
};

const styles = StyleSheet.create({
  setBtnDate: {
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  btnDateleft: {
    marginLeft: 5,
  },
});
