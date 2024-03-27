
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { logout_user } from '../../services/api/auth_mdule/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogout = () =>{
    const dispatch = useDispatch()

    const handleLogout = async () => {
    
        try {
          const responseData = await logout_user();
          const data = responseData?.data;
          await AsyncStorage.removeItem('isLoggedIn');
          await AsyncStorage.removeItem('userData');
          dispatch(logout())
        } catch (error) {
    
        }
    };

    return {handleLogout}
}
