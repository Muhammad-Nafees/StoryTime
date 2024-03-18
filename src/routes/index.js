import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAccessToken, login } from '../../store/slices/authSlice';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state?.authSlice?.accessToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('isLoggedIn');
        const userData = await AsyncStorage.getItem('userData');

        dispatch(setAccessToken(accessToken));
        dispatch(login(JSON.parse(userData)));

        setLoading(false);
      } catch (error) {
        console.error('Error authenticating user:', error);
        setLoading(false);
      }
    };

    authenticateUser();

  }, [dispatch]);

  if (loading) {
    // You can render a loading indicator here if needed
    return null;
  }

  return userToken ? <MainStack /> : <AuthStack />;
};

export default Routes;
