import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setAccessToken } from '../../store/slices/authSlice';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state?.authSlice?.accessToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const authenticateUser = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('isLoggedIn');
        if (isMounted) {
          dispatch(setAccessToken(accessToken));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error authenticating user:', error);
        setLoading(false);
      }
    };

    authenticateUser();

    // Cleanup function to avoid state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (loading) {
    // You can render a loading indicator here if needed
    return null;
  }

  return userToken ? <MainStack /> : <AuthStack />;
};

export default Routes;
