import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Typography from '../reuseable-components/Typography';
import { Inter_SemiBold } from '../../constants/GlobalFonts';

const SupportButton = ({title, onpress, input, loading}) => {
  return (
    <View style={styles.bottomTextContainer}>
      <TouchableOpacity
        disabled={input === ''}
        style={[styles.message_button, input === '' && styles.disabled_button]}
        onPress={onpress}>
        {!loading ? (
          <Typography style={styles.button_text}>{title}</Typography>
        ) : (
          <View style={styles.loading}>
            <ActivityIndicator color="white" size="large" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SupportButton;

const styles = StyleSheet.create({
  bottomTextContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
  },
  message_button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 293,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#395E66',
    backgroundColor: '#395E66',
  },
  button_text: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.02,
    color: '#FFF',
    fontWeight: '600',
    fontFamily:Inter_SemiBold.Inter_SemiBold
  },
  disabled_button: {
    // opacity: 0.5,
    backgroundColor: 'rgba(57, 94, 102, 0.6)',
    borderColor: 'rgba(57, 94, 102, 0.6)',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
