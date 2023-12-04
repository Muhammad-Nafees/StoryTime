import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/HomeScreens/Home";
import Profile from "../screens/HomeScreens/Profile";
import Categories from "../screens/HomeScreens/Categories";
import { Image, View } from "react-native";
import PlayStoryTime from "../screens/HomeScreens/PlayStoryTime";
import NavigationsString from "../constants/NavigationsString";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Img_Paths } from "../assets/Imagepaths";

const Navigations = () => {
    const Stack = createStackNavigator()
    const { PLAY_STORY_TIME } = NavigationsString

    return (
        <Stack.Navigator initialRouteName="BottomTavNavigator">
            <Stack.Screen name="BottomTavNavigator" component={BottomTavNavigator} options={{ headerShown: false }} />
            <Stack.Screen name={PLAY_STORY_TIME} component={PlayStoryTime} options={{ headerShown: false }} />
        </Stack.Navigator>
    )

}


const BottomTavNavigator = () => {

    const { HOME, CATEGORIES, PROFILE } = NavigationsString
    const { HOME_FOCUSED } = Img_Paths
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: () => null,
            tabBarStyle: { height: responsiveHeight(10) }
        }}>
            <Tab.Screen name={HOME} component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            {
                                focused ? (
                                    <Image
                                        style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center" }}
                                        source={HOME_FOCUSED}
                                    />
                                ) :
                                    (
                                        <Image
                                            style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center" }}
                                            source={require("../assets/home-icon-bottom.png")}
                                        />
                                    )
                            }
                        </View>
                    ),
                }}
            />

            <Tab.Screen name={CATEGORIES} component={Categories} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        {
                            focused ? (
                                <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center" }} source={require("../assets/book_focused.png")} />
                            ) : (
                                <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center" }} source={require("../assets/categories-icon-bottom.png")} />
                            )
                        }
                    </View>
                )
            }}
            />

            <Tab.Screen name={PROFILE} component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        {
                            focused ?

                                <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center", tintColor: "red" }} source={require("../assets/profile-icon-bottom.png")} />
                                :
                                <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center" }} source={require("../assets/profile-icon-bottom.png")} />

                        }
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

export default Navigations;
