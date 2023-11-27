import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PopUpStart from "../screens/AuthScreens/splashScreens/PopUpStart";
import SplashScreen from "../screens/AuthScreens/splashScreens/SplashScreen";
import Login from "../screens/AuthScreens/Login";
import Register from "../screens/AuthScreens/Register";
import RegisterUserInformation from "../screens/AuthScreens/RegisterUserInformation";
import RegisterPassword from "../screens/AuthScreens/RegisterPassword";
import ForgetEmail from "../screens/AuthScreens/forgetscreens/ForgetEmail";
import ForgetPhoneNumber from "../screens/AuthScreens/forgetscreens/ForgetPhoneNumber";
import OtpForget from "../screens/AuthScreens/forgetscreens/OtpForget";
import ForgetConfirmPassword from "../screens/AuthScreens/forgetscreens/ForgetConfirmPassword";


const AuthStack = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Popupstart">
                <Stack.Screen name="Popupstart" component={PopUpStart} options={{ headerShown: false }} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterUserInformation" component={RegisterUserInformation} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterPassword" component={RegisterPassword} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetEmail" component={ForgetEmail} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetPhoneNumber" component={ForgetPhoneNumber} options={{ headerShown: false }} />
                <Stack.Screen name="OtpForget" component={OtpForget} options={{ headerShown: false }} />
                <Stack.Screen name="ForgetConfirmPassword" component={ForgetConfirmPassword} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AuthStack;
