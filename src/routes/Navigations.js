import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import PopUpStart from "../screens/AuthScreens/splashScreens/PopUpStart";
import SplashScreen from "../screens/AuthScreens/splashScreens/SplashScreen";
import Home from "../screens/HomeScreens/Home";
import  {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { View } from "react-native-reanimated/lib/typescript/Animated";


const Navigations = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}

const BottomTavNavigator=()=>{
     
      const Tab = createBottomTabNavigator()

     return(
            <Tab.Navigator>
                 <Tab.Screen name=""/>
            </Tab.Navigator>
     )
}

export default Navigations;
