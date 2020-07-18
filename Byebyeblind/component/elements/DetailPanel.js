import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';

export const DetailPanel = (props) => {
  return (
    <View style={styles.detailPanel}>
      <View style={styles.detailItem}>
        <Text>เปิด {props.open}</Text>
        <Text>สูงสุด {props.high}</Text>
        <Text>ล่าสุด</Text>
      </View>

      <View style={styles.detailItem}>
        <Text>ราคาปิด {props.close}</Text>
        <Text>ต่ำสุด {props.low}</Text>
        <Text>VOL {props.vol}</Text>
      </View>

      <View style={styles.displaynamebank}>
        <Text>{props.symbol}</Text>
      </View>
    </View>
  );
};

DetailPanel.propsTypes = {
  open: PropTypes.number.isRequired,
  close: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  vol: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  detailPanel: {
    marginLeft: 30,
    width: 670,
    height: 60,
    backgroundColor: '#FBD1A7',
    borderRadius: 10,
    elevation: 5,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  displaynamebank: {
    alignItems: 'center',
  },
});
