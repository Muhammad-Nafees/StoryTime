import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreens/Home';
import Profile from '../screens/HomeScreens/Profile';
import Categories from '../screens/HomeScreens/catagoriesaddMembers/Categories';
import { Image, View } from 'react-native';
import NavigationsString from '../constants/NavigationsString';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Img_Paths } from '../assets/Imagepaths';
import FirstScreenPlayFlow from '../screens/HomeScreens/playslowscreens/FirstScreenPlayFlow';
import AddFiends from '../screens/HomeScreens/AddFriends';
import AddPlayers from '../screens/HomeScreens/catagoriesaddMembers/Add_Players';
import SubCategories from '../screens/HomeScreens/catagoriesaddMembers/SubCategories';
import FeedChat from '../screens/HomeScreens/FeedChat';
import Sequence from '../screens/HomeScreens/catagoriesaddMembers/sequenceofPlayer/Sequence';
import SecondPlayFlowScreen from '../screens/HomeScreens/playslowscreens/SecondPlayFlowScreen';
import VideoFirstStartScreen from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoFirstStartScreen';
import VideoFirstUser from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoFirstUser';
import VideoSecondStory from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoSecondStory';
import VideoSecondUser from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoSecondUser';
import VideoFourthUser from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoFirstUser';
import FirstUser from '../screens/HomeScreens/playslowscreens/FirstUser';
import FirstUserStory from '../screens/HomeScreens/playslowscreens/FirstUserStory';
import SecondUser from '../screens/HomeScreens/playslowscreens/SecondUser';
import { Text } from 'react-native';

const Navigations = () => {
  const Stack = createStackNavigator();
  const { ADD_FRIENDS, ADD_PLAYERS, PLAYER_SEQUENCE } = NavigationsString;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="BottomTavNavigator">
      <Stack.Screen name="BottomTavNavigator" component={BottomTavNavigator} />
      <Stack.Screen name="PLayFlowScreens" component={PLayFlowScreens} />
      <Stack.Screen name={ADD_FRIENDS} component={AddFiends} />
      <Stack.Screen name={ADD_PLAYERS} component={AddPlayers} />
      <Stack.Screen name={PLAYER_SEQUENCE} component={Sequence} />
    </Stack.Navigator>
  );
};

const PLayFlowScreens = () => {
  const Stack = createStackNavigator();
  const {
    FIRSTSCREENPLAYFLOW,
    FIRST_USER,
    SECONDSCREENPLAYFLOW,
    VIDEO_SECOND_USER,
    THIRDSCREENPLAYFLOW,
    EXTENDSTORY,
    SECONDUSER_NEXT_PLAY,
    CONTINUE_AND_NEXTPLAYER,
    THIRD_USER,
    THIRD_EXTEND_STORY,
    FOURTH_USER,
    FOURTH_USER_STORY,
    VIDEO_FIRST_SCREEN,
    VIDEO_FIRST_USER,
    SECOND_USER_STORY,
  } = NavigationsString;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={FIRSTSCREENPLAYFLOW}
        component={FirstScreenPlayFlow}
      />
      <Stack.Screen
        name={SECONDSCREENPLAYFLOW}
        component={SecondPlayFlowScreen}
      />
      <Stack.Screen name={FIRST_USER} component={FirstUser} />
      <Stack.Screen name="FirstUserStorytext" component={FirstUserStory} />
      <Stack.Screen name="SecondUsertext" component={SecondUser} />
      {/* VIDEOS---------SCR*** */}
      <Stack.Screen
        name={VIDEO_FIRST_SCREEN}
        component={VideoFirstStartScreen}
      />
      <Stack.Screen name={VIDEO_FIRST_USER} component={VideoFirstUser} />
      <Stack.Screen name={SECOND_USER_STORY} component={VideoSecondStory} />
      <Stack.Screen name={VIDEO_SECOND_USER} component={VideoSecondUser} />
    </Stack.Navigator>
  );
};

// const HomeStack = () => {
//   const Stack = createStackNavigator();
//   const {HOME, FEED_CHAT} = NavigationsString;
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name={HOME} component={Home} />
//       <Stack.Screen name={FEED_CHAT} component={FeedChat} />
//     </Stack.Navigator>
//   );
// };

// const CategoriesStack = () => {
//   const Stack = createStackNavigator();
//   const {CATEGORIES} = NavigationsString;

//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name={CATEGORIES} component={Categories} />
//       <Stack.Screen name="SubCategories" component={SubCategories} />
//     </Stack.Navigator>
//   );
// };



const BottomTavNavigator = () => {
  const { HOME, CATEGORIES, PROFILE } = NavigationsString;
  const { HOME_FOCUSED } = Img_Paths;
  const Tab = createBottomTabNavigator();

  const HomeStack = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: "#000" }}>Home Screen Coming Soon</Text>
    </View>
  );
  const CategoriesStack = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: "#000" }}>Category Screen Coming Soon</Text>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: () => null,
        tabBarStyle: { height: responsiveHeight(10) },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                  }}
                  source={HOME_FOCUSED}
                />
              ) : (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                  }}
                  source={require('../assets/home-icon-bottom.png')}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="categoriesStack"
        component={CategoriesStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                  }}
                  source={require('../assets/book_focused.png')}
                />
              ) : (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                  }}
                  source={require('../assets/categories-icon-bottom.png')}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                    tintColor: 'red',
                  }}
                  source={require('../assets/profile_focused.png')}
                />
              ) : (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                  }}
                  source={require('../assets/profile-icon-bottom.png')}
                />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigations;
