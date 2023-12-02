import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/HomeScreens/Home";
import Profile from "../screens/HomeScreens/Profile";
import Categories from "../screens/HomeScreens/Categories";
import { Image, View } from "react-native";
import PlayStoryTime from "../screens/HomeScreens/PlayStoryTime";

const Navigations = () => {

    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName="BottomTavNavigator">
            <Stack.Screen name="BottomTavNavigator" component={BottomTavNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="PlayStoryTime" component={PlayStoryTime} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}


const BottomTavNavigator = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,

                tabBarIcon: () => {
                    return null,
                        <View>
                            <Image style={{ width: 20, height: 20, resizeMode: "center" }} source={require("../assets/home-icon-bottom.png")} />
                        </View>
                }
            }} />
            <Tab.Screen name="Categories" component={Categories} options={{
                headerShown: false,
                headerShown: false,

                tabBarIcon: ({ focused }) => {
                    return null,
                        <View>
                            <Image style={{ width: 20, height: 20, resizeMode: "center" }} source={require("../assets/categories-icon-bottom.png")} />
                        </View>
                }
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                headerShown: false,

                tabBarIcon: () => {
                    return null,
                        <View>
                            <Image style={{ width: 20, height: 20, resizeMode: "center" }} source={require("../assets/profile-icon-bottom.png")} />
                        </View>
                }
            }} />
        </Tab.Navigator>
    )
}

export default Navigations;
