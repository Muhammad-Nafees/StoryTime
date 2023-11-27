import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PopUpStart from "../screens/AuthScreens/splashScreens/PopUpStart";
import SplashScreen from "../screens/AuthScreens/splashScreens/SplashScreen";
import Home from "../screens/HomeScreens/Home";



const Navigations = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}

export default Navigations;
