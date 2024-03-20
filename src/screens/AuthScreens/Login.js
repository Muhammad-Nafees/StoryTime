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
import CustomButton from '../../components/reusable-components/CustomButton/CustomButton';
import SocialsLogin from '../../components/auth/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import {
  login,
  setRefreshToken,
} from '../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import { setAccessToken } from '../../../store/slices/authSlice';
import { validationUserLogin } from '../../../validation/validation';
import { Inter_Regular, Poppins_Regular } from '../../constants/GlobalFonts';
import CustomInput from '../../components/auth/CustomInput';
import Toast from 'react-native-toast-message';
import { login_api } from '../../../services/api/auth_mdule/auth';

const Login = () => {
  // states
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // images
  const { GOOGLE_ICON, FACEBOOK_ICON, APPLE_ICON } = Img_Paths;
  // navigation
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // api calling
  const handleLoginSubmit = async (values) => {
    setIsSubmitted(false);
    setIsLoading(true);

    try {
      const responseData = await login_api(values)
      console.log(responseData, "RESPONSE FROM LOGIN");
      setIsLoading(false);
      dispatch(login(responseData?.data));
      await AsyncStorage.setItem('userData', JSON.stringify(responseData.data));
      await AsyncStorage.setItem('isLoggedIn', responseData?.data?.data?.accessToken);
      await AsyncStorage.setItem('refreshToken', responseData?.data?.data?.refreshToken);
      dispatch(setAccessToken(responseData?.data?.data?.accessToken));
      dispatch(setRefreshToken(responseData?.data?.data.refreshToken));
      return responseData;

    } catch (error) {
      setIsLoading(false);
      console.log(error?.response, "ERROR FROM LOGIN");
      if (error?.response?.data) {
        Toast.show({
          type: "error",
          text1: error?.response?.data?.message
        })
      }
    }
  };
  // form handling
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
        touched
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

              <CustomInput
                value={values.email}
                label={"Email"}
                placeholder={"Type here"}
                error={errors.email}
                touched={touched}
                Submitted={isSubmitted}
                handleChange={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
              />

              <CustomInput
                label={"Password"}
                value={values.password}
                handleChange={handleChange('password')}
                onPress={toggleShowPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={errors.password}
                placeholder={"Type here"}
                touched={touched}
                onBlur={() => setFieldTouched('password')}
                Submitted={isSubmitted}
                type="password"
              />

            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetEmail")}
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
                paddingVertical: moderateVerticalScale(16),
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
                paddingTop: responsiveWidth(7),
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[styles.text, { color: FourthColor }]}>
                Don’t have an account yet?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
