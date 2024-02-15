import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  PopUpStart,
  SplashScreen,
  Login,
  Register,
  RegisterUserInformation,
  RegisterPassword,
  ForgetEmail,
  ForgetPhoneNumber,
  OtpForget,
  ForgetConfirmPassword,
} from '../screens/index';
import { Image, View } from 'react-native';
import NavigationsString from '../constants/NavigationsString';
import FrameContent from '../components/FrameContent';
import FirstScreenGuest from '../screens/AuthScreens/guestScreens/FirstScreenGuest';
import TermsAndConditions from '../screens/AuthScreens/guestScreens/TermsAndConditions';
import PrivacyAndPolicy from '../screens/AuthScreens/guestScreens/PrivacyAndpolicy';
import LoginPrivacyAndPolicy from '../screens/AuthScreens/LoginPrivacyPolicy';
import LoginTermsAnd_Conditions from '../screens/AuthScreens/LoginTermsAnd_Conditions';
import Categories from '../screens/HomeScreens/catagoriesaddMembers/Categories';
import SubCategories from '../screens/HomeScreens/catagoriesaddMembers/SubCategories';
import {Img_Paths} from '../assets/Imagepaths';

const AuthStack = () => {
  const {
    POPUP_START,
    SPLASH_SCREEN,
    LOGIN,
    REGISTER,
    REGISTER_USER_INFO,
    REGISTER_PASSWORD,
    FORGET_EMAIL,
    FORGET_PHONE_NO,
    OTP_FORGET,
    FORGET_CONFIRM_PASSWORD,
    FRAME_CONTENT,
  } = NavigationsString;

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName={POPUP_START}>
        <Stack.Screen
          name={POPUP_START}
          component={PopUpStart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={SPLASH_SCREEN}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GuestStack"
          component={GuestStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsAndConditionsStack"
          component={TermsAndConditionsStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={REGISTER}
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={REGISTER_USER_INFO}
          component={RegisterUserInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={REGISTER_PASSWORD}
          component={RegisterPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={FORGET_EMAIL}
          component={ForgetEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={FORGET_PHONE_NO}
          component={ForgetPhoneNumber}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={OTP_FORGET}
          component={OtpForget}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={FORGET_CONFIRM_PASSWORD}
          component={ForgetConfirmPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={FRAME_CONTENT}
          component={FrameContent}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const GuestStack = () => {
  const Stack = createStackNavigator();
  const {CATEGORIES} = NavigationsString;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FirstScreenGuest"
        component={FirstScreenGuest}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name={"CategoriesTab"}
        component={CategoriesTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const CategoriesTab = () => {
  const {CATEGORIES} = NavigationsString;
  const {HOME_FOCUSED} = Img_Paths;

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarIcon: () => null,
        tabBarStyle: {height: responsiveHeight(10)},
      }}>
      <Tab.Screen
        name={CATEGORIES}
        component={Categories}
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
                  source={require('../assets/book_focused.png')}
                />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'SubCategories'}
        component={SubCategories}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
};

const TermsAndConditionsStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="FirstScreenGuest" component={FirstScreenGuest} options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="LoginTermsAndConditions"
        component={LoginTermsAnd_Conditions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginPrivacyAndPolicy"
        component={LoginPrivacyAndPolicy}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
