import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/HomeScreens/Home";
import Profile from "../screens/HomeScreens/Profile";
import Categories from "../screens/HomeScreens/catagoriesaddMembers/Categories";
import { Image, View } from "react-native";
import PlayStoryTime from "../screens/HomeScreens/PlayStoryTime";
import NavigationsString from "../constants/NavigationsString";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Img_Paths } from "../assets/Imagepaths";
// import FeedChat from "../screens/HomeScreens/FeedChat";
import FirstScreenPlayFlow from "../screens/HomeScreens/playslowscreens/FirstScreenPlayFlow";
import AddFiends from "../screens/HomeScreens/AddFriends";
import AddPlayers from "../screens/HomeScreens/catagoriesaddMembers/Add_Players";
import SubCategories from "../screens/HomeScreens/catagoriesaddMembers/SubCategories";
import FeedChat from "../screens/HomeScreens/FeedChat";

const Navigations = () => {

    const Stack = createStackNavigator();
    const { PLAY_STORY_TIME, FEED_CHAT, FIRSTSCREENPLAYFLOW, ADD_FRIENDS, ADD_PLAYERS } = NavigationsString;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTavNavigator">
            <Stack.Screen name="BottomTavNavigator" component={BottomTavNavigator} />
            <Stack.Screen name="PLayFlowScreens" component={PLayFlowScreens} />
            <Stack.Screen name={ADD_FRIENDS} component={AddFiends} />
            <Stack.Screen name={ADD_PLAYERS} component={AddPlayers} />
        </Stack.Navigator>
    )
};



const PLayFlowScreens = () => {

    const Stack = createStackNavigator();
    const { FIRSTSCREENPLAYFLOW } = NavigationsString;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={FIRSTSCREENPLAYFLOW} component={FirstScreenPlayFlow} />
        </Stack.Navigator>
    )
};

const HomeStack = () => {
    const Stack = createStackNavigator()
    const { HOME, FEED_CHAT } = NavigationsString;
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={HOME} component={Home} />
            <Stack.Screen name={FEED_CHAT} component={FeedChat} />
        </Stack.Navigator>
    )
}

const CategoriesStack = () => {
    const Stack = createStackNavigator();
    const { HOME, CATEGORIES, PROFILE } = NavigationsString;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={CATEGORIES} component={Categories} />
            <Stack.Screen name="SubCategories" component={SubCategories} />
        </Stack.Navigator>
    )
}



const BottomTavNavigator = () => {

    const { HOME, CATEGORIES, PROFILE } = NavigationsString;
    const { HOME_FOCUSED } = Img_Paths;
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: () => null,
            tabBarStyle: { height: responsiveHeight(10) }
        }}>

            <Tab.Screen name="HomeStack" component={HomeStack}
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

            <Tab.Screen name="categoriesStack" component={CategoriesStack} options={{
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

                                <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center", tintColor: "red" }} source={require("../assets/profile_focused.png")} />
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
