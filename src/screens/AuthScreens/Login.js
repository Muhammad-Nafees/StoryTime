import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FourthColor, SecondaryColor, TextColorGreen } from '../Styles/Style';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputField from '../../components/TextInputField';
import CustomButton from '../../components/reusable-components/CustomButton/CustomButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import {
  login,
  setRefreshToken,
} from '../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import { Base_Url, login_andpoint } from '../../../services';
import { setAccessToken } from '../../../store/slices/authSlice';
import { validationUserLogin } from '../../../validation/validation';
import { Path, Svg } from 'react-native-svg';
import { Inter_Regular, Poppins_Regular } from '../../constants/GlobalFonts';
import ErrorMessageForm from '../../components/ErrorMessagesForm';
import CustomErrorField from '../../components/auth/CustomErrorField';
import CustomInput from '../../components/auth/CustomInput';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const Login = () => {
  const { REGISTER, FORGET_EMAIL } = NavigationsString;
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const { GOOGLE_ICON, FACEBOOK_ICON, APPLE_ICON } = Img_Paths;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (values) => {
    setIsSubmitted(false);
    setIsLoading(true);

    try {
      const responseData = await axios.post(Base_Url + login_andpoint, values);
      console.log(responseData, 'RESPONSE FROM LOGIN!');
      dispatch(login(responseData));
      await AsyncStorage.setItem('userData', responseData);

      setIsLoading(false);

      const accessToken = responseData?.data?.accessToken;
      const refreshToken = responseData?.data?.refreshToken;
      // const username = responseData?.data?.user?.username;
      // const userLoginId = responseData?.data?.user?._id;

      await AsyncStorage.setItem('isLoggedIn', accessToken);
      // await AsyncStorage.setItem('isUsername', username);
      // await AsyncStorage.setItem('isUserId', userLoginId);
      // await AsyncStorage.setItem('refreshToken', refreshToken);
      dispatch(setAccessToken(accessToken));
      dispatch(setRefreshToken(refreshToken));

    } catch (error) {
      console.log(error?.response?.data, 'ERROR FROM LOGIN!');
      Toast.show({
        type: "error",
        text1: `${error?.response?.data?.message}`,
      });
    }
    setIsLoading(false);
  };



  // const handleLoginSubmit = async (values) => {
  //   setIsSubmitted(false);
  //   setIsLoading(true);

  //   try {
  //     const response = await axios.post(Base_Url + login_andpoint, values);
  //     console.log(response, 'RESPONSE FROM LOGIN!');
  //   } catch (error) {
  //     console.log(error?.response?.data, 'ERROR FROM LOGIN!');
  //     Toast.show({
  //       text1: ${error?.response?.data?.message},
  //     });
  //   }
  //   setIsLoading(false);

  // try {
  //   const { email, password, fcmToken } = values;
  //   const response = await fetch(Base_Url + login_andpoint, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //       fcmToken,
  //     }),
  //   });

  //   const responseData = await response.json();
  //   console.log('RESPONSE_LOGIN----', responseData);
  //   dispatch(login(responseData));
  //   await AsyncStorage.setItem('userData', JSON.stringify(responseData));

  //   if (responseData?.data) {
  //     setIsLoading(false);
  //   };

  //   const statusCode = responseData?.statusCode;
  //   const message = responseData?.message;
  //   const accessToken = responseData?.data?.accessToken;
  //   const refreshToken = responseData?.data?.refreshToken;
  //   const username = responseData?.data?.user?.username;
  //   const userLoginId = responseData?.data?.user?._id;
  //   const error = responseData?.stack;

  //   if (statusCode === 200) {
  //     await AsyncStorage.setItem('isLoggedIn', accessToken);
  //     await AsyncStorage.setItem('isUsername', username);
  //     await AsyncStorage.setItem('isUserId', userLoginId);
  //     await AsyncStorage.setItem('refreshToken', refreshToken);
  //     dispatch(setAccessToken(accessToken));
  //     dispatch(setRefreshToken(refreshToken));
  //   }
  //   if (message === 'Email not found') {
  //     setIsEmail('Invalid email');
  //   } else if (
  //     message ===
  //     'password length must be at least 8 characters long' ||
  //     message === 'Invalid password'
  //   ) {
  //     setPasswordErr('Invalid password');
  //     setIsEmail('');
  //   }
  //   setIsLoading(false);
  //   return responseData;
  // } catch (error) {
  //   if (error?.response) {
  //     console.log("errrr _", error);
  //   }
  // }
  // };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        fcmToken: 'fcmtoken12121212',
      }}
      validationSchema={validationUserLogin}
      onSubmit={handleLoginSubmit}>
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="always">

            <View
              style={[styles.img_container, { paddingTop: responsiveWidth(6) }]}>
              <Image
                style={styles.img_child}
                source={require('../../assets/story-time-without.png')}
              />
            </View>

            <View style={{ paddingBottom: moderateVerticalScale(6) }}>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <CustomInput
                  value={values.email}
                  label={"Email"}
                  placeholder={"Type here"}
                  error={errors.email}
                  handleChange={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />

                {
                  <ErrorMessageForm
                    errorsField={errors.email}
                    isSubmitted={isSubmitted}
                  />
                }

                <CustomInput
                  label={"Password"}
                  value={values.password}
                  handleChange={handleChange('password')}
                  onPress={toggleShowPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  placeholder={"Type here"}
                  onBlur={() => setFieldTouched('password')}
                  type="password"
                />

                {
                  <ErrorMessageForm
                    errorsField={errors.password}
                    isSubmitted={isSubmitted}
                  />
                }


              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(FORGET_EMAIL)}
              style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: FourthColor,
                  fontWeight: '600',
                  fontSize: responsiveFontSize(2),
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <View style={{ paddingVertical: moderateVerticalScale(14) }}>
              <CustomButton
                type="login"
                isLoading={isLoading}
                color="#FFF"
                backgroundColor="#395E66"
                text="Login"
                onPress={() => {
                  setIsSubmitted(true);
                  handleSubmit();
                }}
              />
            </View>

            <View
              style={{
                paddingVertical: moderateVerticalScale(6),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.text_container}>
                <Text style={[styles.text, { color: FourthColor }]}>
                  By logging in, you agree to our
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TermsAndConditionsStack', {
                      screen: 'LoginTermsAndConditions',
                    })
                  }>
                  <Text style={[styles.text, { color: TextColorGreen, fontWeight: "600" }]}>
                    {' '}
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, { color: FourthColor }]}> and</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TermsAndConditionsStack', {
                      screen: 'LoginPrivacyAndPolicy',
                    })
                  }>
                  <Text style={[styles.text, { color: TextColorGreen, fontWeight: "600" }]}>
                    {' '}
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                paddingTop: responsiveWidth(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  styles.text,
                  {
                    color: FourthColor,
                    fontWeight: '400',
                    paddingVertical: moderateVerticalScale(10),
                  },
                ]}>
                or login with
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: responsiveWidth(78),
                  justifyContent: 'space-between',
                }}>
                <SocialsLogin ImageSource={GOOGLE_ICON} />
                <SocialsLogin ImageSource={FACEBOOK_ICON} />
                <SocialsLogin ImageSource={APPLE_ICON} />
              </View>
            </View>

            <View
              style={{
                paddingVertical: verticalScale(30),
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.text, { color: FourthColor }]}>
                Don’t have an account yet?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
                <Text
                  style={[
                    styles.text,
                    {
                      color: TextColorGreen,
                      fontWeight: '400',
                      fontFamily: Poppins_Regular.Poppins_regular
                    },
                  ]}>
                  Create one
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <Toast />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: SecondaryColor,
  },
  text: {
    fontSize: responsiveFontSize(1.7),
    fontFamily: Inter_Regular.Inter_Regular,
    fontWeight: "600"
  },
  img_container: {
    paddingVertical: moderateVerticalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_child: {
    width: responsiveWidth(40),
    height: responsiveHeight(20),
    resizeMode: 'center',
  },
  text_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: responsiveWidth(95),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
