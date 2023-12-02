import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
    PopUpStart,
    SplashScreen,
    Login,
    Register,
    RegisterUserInformation,
    RegisterPassword,
    ForgetEmail,
    ForgetPhoneNumber,
    OtpForget,
    ForgetConfirmPassword
} from "../screens/index"
import NavigationsString from "../constants/NavigationsString";
import FrameContent from "../components/FrameContent";

const AuthStack = () => {

    const {
        POPUP_START,
        SPLASH_SCREEN,
        LOGIN,
        REGISTER,
        REGISTER_USER_INFO,
        REGISTER_PASSWORD,
        FORGET_EMAIL,
        FORGET_PHONE_NO,
        OTP_FORGET,
        FORGET_CONFIRM_PASSWORD,
        FRAME_CONTENT
    } = NavigationsString
    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={POPUP_START}>
                <Stack.Screen name={POPUP_START} component={PopUpStart} options={{ headerShown: false }} />
                <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name={LOGIN} component={Login} options={{ headerShown: false }} />
                <Stack.Screen name={REGISTER} component={Register} options={{ headerShown: false }} />
                <Stack.Screen name={REGISTER_USER_INFO} component={RegisterUserInformation} options={{ headerShown: false }} />
                <Stack.Screen name={REGISTER_PASSWORD} component={RegisterPassword} options={{ headerShown: false }} />
                <Stack.Screen name={FORGET_EMAIL} component={ForgetEmail} options={{ headerShown: false }} />
                <Stack.Screen name={FORGET_PHONE_NO} component={ForgetPhoneNumber} options={{ headerShown: false }} />
                <Stack.Screen name={OTP_FORGET} component={OtpForget} options={{ headerShown: false }} />
                <Stack.Screen name={FORGET_CONFIRM_PASSWORD} component={ForgetConfirmPassword} options={{ headerShown: false }} />
                <Stack.Screen name={FRAME_CONTENT} component={FrameContent} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AuthStack;
