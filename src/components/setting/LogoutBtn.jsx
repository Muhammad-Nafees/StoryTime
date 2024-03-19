import React, { useState } from 'react';
import Typography from '../reuseable-components/Typography';
import { Red02, White } from '../../screens/Styles/Style';
import { SCREEN_WIDTH, SPACING } from '../../constants/Constant';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogout } from '../../hooks/useLogout';
import { Inter_SemiBold } from '../../constants/GlobalFonts';

const LogoutBtn = () => {
  const { handleLogout } = useLogout()
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutPress = async () => {
    try {
      setIsLoggingOut(true);
      await AsyncStorage.setItem('isLoggedOut', 'true')
      await handleLogout()
    } catch (error) {
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogoutPress} activeOpacity={0.3} style={styles.btn}>
      {isLoggingOut ? (
        <ActivityIndicator color={White} />
      ) : (
        <Typography style={styles.txt}>Log out</Typography>
      )}
    </TouchableOpacity>
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Red02,
    width: SCREEN_WIDTH - 85,
    alignSelf: 'center',
    marginBottom: SPACING * 2,
  },
  txt: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
    fontFamily:Inter_SemiBold.Inter_SemiBold
    
  },
});
