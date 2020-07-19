import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

export const DetailPanel = ({
  date = new Date(),
  open,
  close,
  high,
  low,
  vol,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.detailPanel}>
        <ValuePill name="วันที่" value={format(date, 'd MMMM yyyy')} />
        <ValuePill name="เปิด" value={formatter.format(open)} />
        <ValuePill name="ปิด" value={formatter.format(close)} />
        <ValuePill name="สูงสุด" value={formatter.format(high)} />
        <ValuePill name="ต่ำสุด" value={formatter.format(low)} />
        <ValuePill name="มูลค่า" value={formatter.format(vol)} />
      </View>
    </SafeAreaView>
  );
};

const formatter = new Intl.NumberFormat();

const ValuePill = ({name, value}) => (
  <View style={styles.valuePill}>
    <Text style={styles.pillName}>{name}: </Text>
    <Text style={styles.pillValue}>{value}</Text>
  </View>
);

DetailPanel.propsTypes = {
  open: PropTypes.number.isRequired,
  close: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  vol: PropTypes.number.isRequired,
};

ValuePill.propsTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  detailPanel: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  valuePill: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#FBD1A7',
    borderRadius: 5,
    elevation: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  pillName: {
    fontWeight: 'bold',
  },
});
