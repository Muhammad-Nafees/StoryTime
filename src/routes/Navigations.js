import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  CommonActions,
  NavigationContainer,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/HomeScreens/storyfeed/Home';
import Profile from '../screens/HomeScreens/profileScreens/Profile';
import Categories from '../screens/HomeScreens/catagoriesaddMembers/Categories';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import NavigationsString from '../constants/NavigationsString';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Img_Paths} from '../assets/Imagepaths';
import FirstScreenPlayFlow from '../screens/HomeScreens/playslowscreens/FirstScreenPlayFlow';
import AddFiends from '../screens/HomeScreens/storyfeed/AddFriends';
import AddPlayers from '../screens/HomeScreens/catagoriesaddMembers/Add_Players';
import SubCategories from '../screens/HomeScreens/catagoriesaddMembers/SubCategories';
import FeedChat from '../screens/HomeScreens/storyfeed/FeedChat';
import Sequence from '../screens/HomeScreens/catagoriesaddMembers/sequenceofPlayer/Sequence';
import SecondPlayFlowScreen from '../screens/HomeScreens/playslowscreens/SecondPlayFlowScreen';
import VideoFirstStartScreen from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoFirstStartScreen';
import VideoFirstUser from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoFirstUser';
import VideoSecondStory from '../screens/HomeScreens/playslowscreens/videoplayerscreens/VideoSecondStory';
import FirstUser from '../screens/HomeScreens/playslowscreens/FirstUser';
import FirstUserStory from '../screens/HomeScreens/playslowscreens/FirstUserStory';
import TagFriends from '../screens/HomeScreens/profileScreens/TagFriends';
import AddUrl from '../screens/HomeScreens/profileScreens/AddUrl';
import {
  FAQ,
  Notification,
  Setting,
  SubscriptionDetails,
  SettingsProfile,
  DeleteAccount,
  BlockUser,
} from '../screens';
import TermsAndConditions from '../screens/AuthScreens/guestScreens/TermsAndConditions';
import PrivacyAndPolicy from '../screens/AuthScreens/guestScreens/PrivacyAndpolicy';
import VoiceToTextProfile from '../screens/HomeScreens/profileScreens/VoiceToTextProfile';
import TranscriptVoice from '../screens/HomeScreens/profileScreens/TranscriptVoice';
import { Login } from '../screens/index';
import Reportuser from '../screens/HomeScreens/storyfeed/Reportuser';
import React, { useEffect, useReducer, useRef, useState, useTransition } from 'react';
import { useSelector } from 'react-redux';

import Support from '../screens/HomeScreens/Setting/Support';
import SupportMessage from '../screens/HomeScreens/Setting/SupportMessage';
import SupportMessageList from '../screens/HomeScreens/Setting/SupportMessageList';
import Report from '../screens/HomeScreens/Setting/Report';
import PaymentSetting from '../screens/HomeScreens/Setting/PaymentSetting';
import AddPaymentCard from '../screens/HomeScreens/Setting/AddPaymentCard';
import AddPaymentCardDetail from '../screens/HomeScreens/Setting/AddPaymentCardDetail';

const Navigations = () => {
  const Stack = createStackNavigator();

  const {
    ADD_FRIENDS,
    REPORT_USER,
    ADD_PLAYERS,
    PLAYER_SEQUENCE,
    FAQ_ROUTE,
    SETTING,
    NOTIFICATION,
    SUBSCRIPTION_DETAILS,
    PROFILE,
    BLOCK_USER,
    DELETE_ACCOUNT,
    LOGIN,
    SUPPORT,
    SUPPORT_MESSAGE,
    SUPPORT_MESSAGE_LIST,
    REPORT,
    PAYEMENT,
    ADD_PAYMENT_CARD,
    ADD_PAYMENT_CARD_DETAIL,
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
      <Stack.Screen name={SETTING} component={Setting} />
      <Stack.Screen name={NOTIFICATION} component={Notification} />
      <Stack.Screen
        name={SUBSCRIPTION_DETAILS}
        component={SubscriptionDetails}
      />
      <Stack.Screen name={FAQ_ROUTE} component={FAQ} />
      <Stack.Screen name={PROFILE} component={SettingsProfile} />
      <Stack.Screen name={BLOCK_USER} component={BlockUser} />
      <Stack.Screen name={DELETE_ACCOUNT} component={DeleteAccount} />
      {/* <Stack.Screen name={DELETE_ACCOUNT} component={DeleteAccount} /> */}
      <Stack.Screen
        name={LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name={SUPPORT} component={Support} />
      <Stack.Screen name={SUPPORT_MESSAGE} component={SupportMessage} />
      <Stack.Screen name={REPORT} component={Report} />
      <Stack.Screen
        name={SUPPORT_MESSAGE_LIST}
        component={SupportMessageList}
      />
      <Stack.Screen name={PAYEMENT} component={PaymentSetting} />
      <Stack.Screen name={ADD_PAYMENT_CARD} component={AddPaymentCard} />
      <Stack.Screen
        name={ADD_PAYMENT_CARD_DETAIL}
        component={AddPaymentCardDetail}
      />
      <Stack.Screen
        name="GuestStack"
        component={GuestStack}
        options={{headerShown: false}}
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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PrivacyAndPolicy"
        component={PrivacyAndPolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ProfileScreens" component={ProfileScreens} />
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
        name={FIRSTSCREENPLAYFLOW}
        component={FirstScreenPlayFlow}
      />
      <Stack.Screen
        name={SECONDSCREENPLAYFLOW}
        component={SecondPlayFlowScreen}
      />
      <Stack.Screen name={FIRST_USER} component={FirstUser} />
      <Stack.Screen name="FirstUserStorytext" component={FirstUserStory} />

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
  const {HOME, FEED_CHAT, REPORT_USER} = NavigationsString;
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen name={HOME} component={Home} />
      <Stack.Screen name={FEED_CHAT} component={FeedChat} />
    </Stack.Navigator>
  );
};

// Categories Bottom And Stack Screens---

const CategoriesStackBottom = () => {
  const Stack = createStackNavigator();
  const {CATEGORIES} = NavigationsString;

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

const ProfileStacksBottom = ({ navigation, route, }) => {
  console.log("route-------------- :substack", route?.params?.screen);
  const Stack = createStackNavigator();
  const {HOME} = NavigationsString;
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="VoiceToTextProfile" component={VoiceToTextProfile} />
      <Stack.Screen name="TranscriptVoice" component={TranscriptVoice} />
    </Stack.Navigator>
  );
};

const ProfileScreens = () => {
  const Stack = createStackNavigator();
  const {HOME, FEED_CHAT} = NavigationsString;
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

const BottomTavNavigator = ({ route }) => {
  const { HOME, CATEGORIES, PROFILE } = NavigationsString;
  const { HOME_FOCUSED } = Img_Paths;
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  const FriendIdRTK = useSelector((state) => state?.addPlayers?.friendId);
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
        initialParams={route}
        options={{
          tabBarIcon: ({focused}) => (
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
        initialParams={route}

        options={{
          tabBarIcon: ({focused}) => (
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
        initialParams={route}
        options={{
          tabBarIcon: ({focused}) => (
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

// const shouldShowTabBar = (route) => {
//   // Implement your logic here to determine whether to show tabBar or not
//   console.log("route---- :", route)
//   if (route.state && route.state.index > 0) {
//     return false; // Hide tabBar when navigating deeper into screens
//   }
//   return true; // Show tabBar by default
// };

// export default Navigations;



// const AnimatedTapBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {

//   console.log("activeince----- :", activeIndex)
//   const route = useRoute();
//   const { bottom } = useSafeAreaInsets();

//   const reducer = (state, action) => {
//     return [...state, { x: action.x, index: action.index }];
//   };

//   const [layout, dispatch] = useReducer(reducer, []);

//   const handleLayout = (event, index) => {
//     dispatch({ x: event.nativeEvent.layout.x, index });
//   };

//   return (
//     <View style={[styles.tabBar, { paddingBottom: bottom }]}>

//       <View style={styles.tabBarContainer}>
//         {
//           routes.map((route, index) => {
//             console.log("route--------", route)
//             const active = index === activeIndex;
//             const { options } = descriptors[route.key];


//             return (
//               <TabBarComponent
//                 //    descriptors={descriptors?.tabBarStyle}
//                 key={route.key}
//                 route={route?.name}
//                 active={active}
//                 options={options}
//                 index={index}
//                 onLayout={(e) => handleLayout(e, index)}
//                 onPress={() => navigation.navigate(route.name)}
//               />
//             );
//           })}
//       </View>
//     </View>
//   );
// };



// const TabBarComponent = ({ active, options, onLayout, onPress, route, index, descriptors }) => {

//   // console.log('descriptors0-0=-=',descriptors)
//   const ref = useRef(null);
//   return (
//     <Pressable onPress={onPress} onLayout={onLayout} style={{ ...styles.component }}>

//       <View style={[styles.iconContainer]}>
//         {options.tabBarIcon ? options.tabBarIcon({}) : <Text>?</Text>}
//       </View>
//     </Pressable>
//   );
// };



// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#FFF',
//     height: 80,
//   },
//   activeBackground: {
//     position: 'absolute',
//   },
//   tabBarContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//   },
//   component: {
//     height: 60,
//     width: 60,
//     marginTop: 10
//   },
//   componentCircle: {
//     flex: 1,
//     borderRadius: 30,
//   },
//   iconContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   icon: {
//     height: 36,
//     width: 36,
//   },
//   tab_icon: {
//     marginHorizontal: 10,
//     paddingHorizontal: 10
//   },
//   icon_badge: {
//     // backgroundColor: 'red',
//     color: '#fff',
//     position: 'absolute',
//     top: -6,
//     right: -10,
//     borderRadius: 20,
//     width: 15,
//     height: 15,
//     fontWeight: 'bold',
//     fontSize: 10,
//     textAlign: 'center'
//   }
// });

export default Navigations
