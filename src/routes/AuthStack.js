import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PopUpStart from "../screens/AuthScreens/SplashScreens/PopUpStart";
import SplashScreen from "../screens/AuthScreens/SplashScreens/SplashScreen";
import Login from "../screens/AuthScreens/Login";
import Register from "../screens/AuthScreens/Register";


const AuthStack = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Popupstart">
                <Stack.Screen name="Popupstart" component={PopUpStart} options={{ headerShown: false }} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default AuthStack;
