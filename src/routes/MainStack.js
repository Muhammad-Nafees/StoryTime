import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PopUpStart from "../screens/AuthScreens/splashScreens/PopUpStart";
import SplashScreen from "../screens/AuthScreens/splashScreens/SplashScreen";
import Home from "../screens/HomeScreens/Home";
import Navigations from "./Navigations";



const MainStack = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Navigations />
        </NavigationContainer>
    )

}

export default MainStack;
