import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Typography from '../Typography';

const PaymentInput = ({
  label,
  numeric,
  placeholderText,
  onchange,
  keyValue,
}) => {
  // console.log('🚀 ~ PaymentInput ~ key:', keyValue);
  return (
    <View style={styles.inputCOntainer}>
      <Typography style={styles.label}>{label}</Typography>
      <TextInput
        placeholder={placeholderText}
        placeholderTextColor="#AAAAAA"
        style={styles.inputfield}
        keyboardType={numeric && 'numeric'}
        onChangeText={e => onchange(e, keyValue)}
      />
    </View>
  );
};

export default PaymentInput;

const styles = StyleSheet.create({
  inputCOntainer: {},
  label: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 24,
    color: '#395E66',
  },
  inputfield: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 23.5,
    color: '#AAAAAA',
    fontSize: 12,
  },
});
