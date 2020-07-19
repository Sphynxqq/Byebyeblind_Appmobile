import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {PeriodSelector} from './PeriodSelector';

export const TopBar = (props) => {
  return (
    <SafeAreaView style={styles.topBar}>
      <View style={styles.symbolPill}>
        <Text style={styles.symbolText}>{props.symbol.toUpperCase()}</Text>
      </View>
      <PeriodSelector {...props} />
    </SafeAreaView>
  );
};

TopBar.propsTypes = {
  symbol: PropTypes.string.isRequired,
  currentView: PropTypes.string.isRequired,
  setDayView: PropTypes.func.isRequired,
  setWeekView: PropTypes.func.isRequired,
  setMonthView: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  symbolPill: {
    backgroundColor: '#000000',
    borderRadius: 5,
    padding: 5,
  },
  symbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
