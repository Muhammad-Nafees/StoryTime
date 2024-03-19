import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Typography from '../reuseable-components/Typography';

const PaymentButton = ({label, onpress}) => {
  return (
    <View style={styles.btncontainer}>
      <TouchableOpacity style={styles.btn} onPress={onpress}>
        <Typography style={styles.btnText}>{label}</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentButton;

const styles = StyleSheet.create({
  btncontainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 293,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#395E66',
    backgroundColor: '#395E66',
  },
  btnText: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.02,
    color: '#FFF',
    fontWeight: 600,
  },
});
