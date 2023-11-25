import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PopUpStart from "../screens/AuthScreens/SplashScreens/PopUpStart";
import SplashScreen from "../screens/AuthScreens/SplashScreens/SplashScreen";
import Home from "../screens/HomeScreens/Home";



const MainStack = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default MainStack;
