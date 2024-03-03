import React, { useState } from 'react';
import Typography from './Typography';
import { Red02, White } from '../screens/Styles/Style';
import { useDispatch, useSelector } from 'react-redux';
import { SCREEN_WIDTH, SPACING } from '../constants/Constant';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { logout_user } from '../../services/api/auth_mdule/auth';
import { logout } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../constants/NavigationsString';
import { useLogout } from '../hooks/useLogout';

const LogoutBtn = () => {
  const {handleLogout} = useLogout()
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutPress = async () => {
    try {
      setIsLoggingOut(true);
      await handleLogout()
    } catch (error) {
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogoutPress} activeOpacity={0.3} style={styles.btn}>
      {isLoggingOut ? (
        <ActivityIndicator color={White}  />
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
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: Red02,
    width: SCREEN_WIDTH - 70,
    alignSelf: 'center',
    marginBottom: SPACING * 2,
  },
  txt: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
});
