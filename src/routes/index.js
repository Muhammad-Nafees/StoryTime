import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { login_user } from './path/to/your/thunks'; // Import your thunk to log in user
import { setAccessToken } from '../../store/slices/authSlice';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Routes = () => {

    const dispatch = useDispatch();
    const userToken = useSelector((state) => state?.authSlice?.accessToken);

    useEffect(() => {
        const authenticateUser = async () => {

            try {
                const accessToken = await AsyncStorage.getItem('isLoggedIn');
                if (accessToken) {
                    dispatch(setAccessToken(accessToken));
                }
            } catch (error) {
                console.error('Error authenticating user:', error);
            }
        };
        authenticateUser();
    }, [dispatch]);


    return userToken ? <MainStack /> : <AuthStack />;
};

export default Routes;
