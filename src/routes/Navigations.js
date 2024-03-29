import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreens/storyfeed/Home';
import Profile from '../screens/HomeScreens/profileScreens/Profile';
import Categories from '../screens/HomeScreens/categoriesScreens/Categories';
import { Image, View } from 'react-native';
import NavigationsString from '../constants/NavigationsString';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Img_Paths } from '../assets/Imagepaths';
import AddFiends from '../screens/HomeScreens/storyfeed/AddFriends';
import AddPlayers from '../screens/HomeScreens/categoriesScreens/Add_Players';
import SubCategories from '../screens/HomeScreens/categoriesScreens/SubCategories';
import FeedChat from '../screens/HomeScreens/storyfeed/FeedChat';
import Sequence from '../screens/HomeScreens/categoriesScreens/Sequence';
import VideoFirstStartScreen from '../screens/HomeScreens/categoriesScreens/videoplayerscreens/Index';
import VideoFirstUser from '../screens/HomeScreens/categoriesScreens/videoplayerscreens/VideoRecordingStart';
import VideoSecondStory from '../screens/HomeScreens/categoriesScreens/videoplayerscreens/VideoSecondStory';
import TagFriends from '../screens/HomeScreens/profileScreens/TagFriends';
import AddUrl from '../screens/HomeScreens/profileScreens/AddUrl';
import {
  FAQ,
  Notification,
  Setting,
  SubscriptionDetails,
  SettingsProfile,
  DeleteAccount,
  BlockUser
} from '../screens';
import TermsAndConditions from '../screens/AuthScreens/guestScreens/TermsAndConditions';
import PrivacyAndPolicy from '../screens/AuthScreens/guestScreens/PrivacyAndpolicy';
import VoiceToTextProfile from '../screens/HomeScreens/profileScreens/VoiceToTextProfile';
import { Login } from '../screens/index';
import Reportuser from '../screens/HomeScreens/storyfeed/Reportuser';
import React from 'react';
import { useSelector } from 'react-redux';

import Support from '../screens/HomeScreens/Setting/Support';
import SupportMessage from '../screens/HomeScreens/Setting/SupportMessage';
import SupportMessageList from '../screens/HomeScreens/Setting/SupportMessageList';
import Report from '../screens/HomeScreens/Setting/Report';
import PaymentSetting from '../screens/HomeScreens/Setting/PaymentSetting';
import AddPaymentCard from '../screens/HomeScreens/Setting/AddPaymentCard';

import AddPaymentCardDetail from '../screens/HomeScreens/Setting/AddPaymentCardDetail';
import SelectGamePoint from '../screens/HomeScreens/categoriesScreens/playFlowScreens/SelectGamePoint';
import StartGame from '../screens/HomeScreens/categoriesScreens/playFlowScreens/StartGame';
import StartRecordingVoice from '../screens/HomeScreens/categoriesScreens/playFlowScreens/StartRecordingVoice';
import GoNextPlayer from '../screens/HomeScreens/categoriesScreens/playFlowScreens/GoNextPlayer';
import EditAddPaymentCardDetail from '../screens/HomeScreens/Setting/EditAddPaymentCardDetail';



const Navigations = () => {
  const Stack = createStackNavigator();

  const {
    ADD_FRIENDS,
    REPORT_USER,
    ADD_PLAYERS,
    PLAYER_SEQUENCE,
    LOGIN,
  } = NavigationsString;

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}

      initialRouteName="BottomTavNavigator">
      <Stack.Screen name="BottomTavNavigator" component={BottomTavNavigator} />
      <Stack.Screen name="PLayFlowScreens" component={PLayFlowScreens} />
      <Stack.Screen name={ADD_FRIENDS} component={AddFiends} />
      <Stack.Screen name={ADD_PLAYERS} component={AddPlayers} />
      <Stack.Screen name={REPORT_USER} component={Reportuser} />
      <Stack.Screen name={PLAYER_SEQUENCE} component={Sequence} />
      <Stack.Screen name="ProfileScreens" component={ProfileScreens} />
      <Stack.Screen name={'Setting'} component={Setting} />
      <Stack.Screen name={'Notification'} component={Notification} />
      <Stack.Screen
        name={'SubscriptionDetails'}
        component={SubscriptionDetails}
      />
      <Stack.Screen name={'Faq'} component={FAQ} />
      <Stack.Screen name={'SettingsProfile'} component={SettingsProfile} />
      <Stack.Screen name={'BlockUser'} component={BlockUser} />
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount} />
      <Stack.Screen
        name={LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'Support'} component={Support} />
      <Stack.Screen name={'SupportMessage'} component={SupportMessage} />
      <Stack.Screen name={'Report'} component={Report} />
      <Stack.Screen
        name={'SupportMessageList'}
        component={SupportMessageList}
      />
      <Stack.Screen name={'PayementSetting'} component={PaymentSetting} />
      <Stack.Screen name={'AddCard'} component={AddPaymentCard} />
      <Stack.Screen
        name={'AddPaymentCardDetail'}
        component={AddPaymentCardDetail}
      />
      <Stack.Screen
        name={'EditAddPaymentCardDetail'}
        component={EditAddPaymentCardDetail}
      />
      <Stack.Screen
        name="GuestStack"
        component={GuestStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const GuestStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyAndPolicy"
        component={PrivacyAndPolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProfileScreens" component={ProfileScreens} />
    </Stack.Navigator>
  );
};

const PLayFlowScreens = () => {
  const Stack = createStackNavigator();

  const {
    VIDEO_FIRST_SCREEN,
    VIDEO_FIRST_USER,
    SECOND_USER_STORY,
  } = NavigationsString;

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen
        name="SelectGamePoint"
        component={SelectGamePoint}
      />
      <Stack.Screen
        name="StartGame"
        component={StartGame}
      />
      <Stack.Screen name="StartRecordingVoice" component={StartRecordingVoice} />
      <Stack.Screen name="GoNextPlayer" component={GoNextPlayer} />

      {/* <Stack.Screen name="SecondUsertext" component={SecondUser} /> */}

      {/* VIDEOS---------SCR*** */}

      <Stack.Screen
        name={VIDEO_FIRST_SCREEN}
        component={VideoFirstStartScreen}
      />
      <Stack.Screen name={VIDEO_FIRST_USER} component={VideoFirstUser} />
      <Stack.Screen name={SECOND_USER_STORY} component={VideoSecondStory} />
    </Stack.Navigator>
  );
};

const HomeStackBottom = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Feedchat" component={FeedChat} />
    </Stack.Navigator>
  );
};

// Categories Bottom And Stack Screens---

const CategoriesStackBottom = () => {
  const Stack = createStackNavigator();
  const { CATEGORIES } = NavigationsString;

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
      initialRouteName={CATEGORIES}>
      <Stack.Screen
        name={CATEGORIES}
        component={Categories}
      />
      <Stack.Screen
        name="SubCategories"
        component={SubCategories}
      />
    </Stack.Navigator>
  );
};

// Profile Bottom And Stack Screens -----

const ProfileStacksBottom = () => {
  const Stack = createStackNavigator();
  const { HOME } = NavigationsString;
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="VoiceToTextProfile" component={VoiceToTextProfile} />
    </Stack.Navigator>
  );
};

const ProfileScreens = () => {
  const Stack = createStackNavigator();
  const { HOME, FEED_CHAT } = NavigationsString;
  return (
    <Stack.Navigator screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      headerShown: false
    }}>
      <Stack.Screen name="TagFriends" component={TagFriends} />
      <Stack.Screen name="AddUrl" component={AddUrl} />
    </Stack.Navigator>
  );
};

const BottomTavNavigator = () => {
  const { HOME, CATEGORIES, PROFILE } = NavigationsString;
  const { HOME_FOCUSED } = Img_Paths;
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  const FriendIdRTK = useSelector((state) => state?.getcategories?.friendId);
  const { user } = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;
  return (
    <Tab.Navigator
      // tabBar={(props) => <AnimatedTapBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: () => null,
        // tabBarVisible: shouldShowTabBar(route),
        tabBarStyle: { height: responsiveHeight(10), display: USER?._id !== FriendIdRTK ? "none" : "flex" },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackBottom}
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
        component={CategoriesStackBottom}
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

        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('categoriesStack', { screen: CATEGORIES });
          },
        })}
      />

      <Tab.Screen
        name="profileStack"
        component={ProfileStacksBottom}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Image
                  style={{
                    width: responsiveWidth(6),
                    height: responsiveHeight(3),
                    resizeMode: 'center',
                    tintColor: '#E44173',
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

        listeners={({ navigation, route }) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('profileStack', { screen: "Profile" });
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigations
