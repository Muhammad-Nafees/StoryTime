import React, {useState} from 'react';
import Typography from './Typography';
import {Red02} from '../screens/Styles/Style';
import { useDispatch, useSelector } from 'react-redux';
import {SCREEN_WIDTH, SPACING} from '../constants/Constant';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import { logout_user } from '../../services/api/auth_mdule/auth';
import { logout } from '../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutBtn = () => {
    const dispatch = useDispatch()
    const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const responseData = await logout_user();
      const data = responseData?.data;
    await AsyncStorage.removeItem('isLoggedIn');
      dispatch(logout())
    } catch (error) {
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleLogout} activeOpacity={0.3} style={styles.btn}>
      {isLoggingOut ? (
        <ActivityIndicator />
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
