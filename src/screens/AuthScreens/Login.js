import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { FourthColor, SecondaryColor, TextColorGreen } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import { login, setRefreshToken, userLoginid } from '../../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Img_Paths } from '../../assets/Imagepaths';
import { Base_Url, login_andpoint } from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccessToken } from '../../../store/slices/authSlice';
import Toast from 'react-native-toast-message';
import { validationUserLogin } from '../../../validation/validation';
import { Path, Svg } from 'react-native-svg';
import { refresh_token_api } from '../../../services/api/auth_mdule/auth';
import { Inter_Regular } from '../../constants/GlobalFonts';
import ErrorMessageForm from '../../components/ErrorMessagesForm';



const Login = () => {

    const { REGISTER, FORGET_EMAIL } = NavigationsString;
    const [isLoading, setIsLoading] = useState(false);
    const [isEmail, setIsEmail] = useState("")
    const [isPasswordErr, setPasswordErr] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [] = useState();
    const { GOOGLE_ICON, FACEBOOK_ICON, APPLE_ICON } = Img_Paths;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const toggleShowPassword = () => {
        // console.log("setShowPassword---=====", setShowPassword);
        setShowPassword(!showPassword);
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                fcmToken: "fcmtoken12121212"
            }}

            validationSchema={validationUserLogin}
            onSubmit={async (values, actions) => {
                console.log(values);
                // Reset form submission state
                setIsSubmitted(false);

                setIsLoading(true);

                try {
                    const { email, password, fcmToken } = values;
                    const response = await fetch(Base_Url + login_andpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email, password, fcmToken
                        }),
                    });

                    const responseData = await response.json();
                    console.log("RESPONSE_LOGIN----", responseData)
                    dispatch(login(responseData))
                    await AsyncStorage.setItem("userData", JSON.stringify(responseData));

                    if (responseData?.data) {
                        setIsLoading(false)
                    };

                    const statusCode = responseData?.statusCode;
                    const message = responseData?.message;
                    const accessToken = responseData?.data?.accessToken;
                    const refreshToken = responseData?.data?.refreshToken;
                    const username = responseData?.data?.user?.username;
                    const userLoginId = responseData?.data?.user?._id;
                    const error = responseData?.stack;

                    if (statusCode === 200) {
                        await AsyncStorage.setItem("isLoggedIn", accessToken);
                        await AsyncStorage.setItem("isUsername", username);
                        await AsyncStorage.setItem("isUserId", userLoginId);
                        await AsyncStorage.setItem("refreshToken", refreshToken)
                        dispatch(setAccessToken(accessToken));
                        dispatch(setRefreshToken(refreshToken));
                        dispatch(userLoginid(userLoginId));
                    };

                    if (error) {

                        if (message === "Email not found") {
                            setIsEmail("Invalid email");
                        } else if (message === "password length must be at least 8 characters long" || message === "Invalid password") {
                            setPasswordErr("Invalid password");
                            setIsEmail("");
                        };
                        setIsLoading(false)
                        console.log("message-----", message)
                    };
                    return responseData;
                }
                catch (err) {
                    console.log(err)
                };
            }}
        >

            {({ values, errors, handleChange, handleSubmit, setFieldTouched, isValid, touched }) => (

                <View style={styles.container}>
                    <ScrollView>
                        <View style={[styles.img_container, { paddingTop: responsiveWidth(6) }]}>
                            <Image style={styles.img_child} source={require('../../assets/story-time-without.png')} />
                        </View>
                        <View style={{ paddingBottom: moderateVerticalScale(6) }}>
                            <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                                <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Email</Text>
                            </View>

                            <TextInputField
                                value={values.email}
                                // onPress={toggleShowPassword}
                                showPassword={showPassword}
                                onChangeText={handleChange('email')}
                                setShowPassword={setShowPassword}
                                placeholderText="Type here"
                                onBlur={() => setFieldTouched("email")}
                            />

                            <View style={{ height: responsiveHeight(3), }}>
                                {
                                    isEmail.length > 0 ?
                                        <View style={{ height: responsiveHeight(3), }}>
                                            <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(1) }}>
                                                <View style={{ flexDirection: "row", }}>

                                                    <View>
                                                        <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                            <Path
                                                                d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                            />
                                                        </Svg>
                                                    </View>
                                                    <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{isEmail}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View> :
                                        <ErrorMessageForm
                                            errorsField={errors.email}
                                            isSubmitted={isSubmitted}
                                        />
                                }
                            </View>

                            <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingTop: responsiveWidth(1) }}>
                                <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Password</Text>
                            </View>

                            <TextInputField
                                value={values.password}
                                onChangeText={handleChange('password')}
                                // onBlur={() => setFieldTouched("password")}
                                onPress={toggleShowPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                placeholderText="Type here"
                                type="password"
                            />

                            <View style={{ height: responsiveHeight(3), }}>

                                {
                                    isPasswordErr.length > 0 ?
                                        <View style={{ height: responsiveHeight(3), }}>
                                            <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(1) }}>
                                                <View style={{ flexDirection: "row", }}>

                                                    <View>
                                                        <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                            <Path
                                                                d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                            />
                                                        </Svg>
                                                    </View>
                                                    <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                        <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{isPasswordErr}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View> :
                                        <ErrorMessageForm
                                            errorsField={errors.password}
                                            isSubmitted={isSubmitted}
                                        />
                                }
                            </View>

                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate(FORGET_EMAIL)} style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Forgot password?</Text>
                        </TouchableOpacity>

                        <View style={{ paddingVertical: moderateVerticalScale(14) }}>
                            <TouchableButton
                                type="login"
                                isLoading={isLoading}
                                color="#FFF"
                                backgroundColor="#395E66"
                                text="Login"
                                onPress={() => {
                                    setIsSubmitted(true);
                                    handleSubmit()
                                }
                                }
                            />
                        </View>

                        <View style={{ paddingVertical: moderateVerticalScale(6), justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.text_container}>
                                <Text style={[styles.text, { color: FourthColor }]}>By logging in, you agree to our</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("TermsAndConditionsStack", {
                                    screen: "LoginTermsAndConditions"
                                })}>
                                    <Text style={[styles.text, { color: TextColorGreen }]}> Terms & Conditions</Text>
                                </TouchableOpacity>
                                <Text style={[styles.text, { color: FourthColor }]}> and</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("TermsAndConditionsStack", {
                                    screen: "LoginPrivacyAndPolicy"
                                })}>
                                    <Text style={[styles.text, { color: TextColorGreen }]}> Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ paddingVertical: moderateVerticalScale(16), justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={[styles.text, { color: FourthColor, fontWeight: '400', paddingVertical: moderateVerticalScale(10), }]}>or login with</Text>
                            <View style={{ flexDirection: 'row', width: responsiveWidth(78), justifyContent: 'space-between', }}>
                                <SocialsLogin ImageSource={GOOGLE_ICON} />
                                <SocialsLogin ImageSource={FACEBOOK_ICON} />
                                <SocialsLogin ImageSource={APPLE_ICON} />
                            </View>
                        </View>

                        <View style={{ paddingTop: responsiveWidth(7), flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={[styles.text, { color: FourthColor }]}>Don’t have an account yet? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
                                <Text style={[styles.text, { color: TextColorGreen, fontWeight: '600' }]}>Create one</Text>
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
        height: "100%",
        backgroundColor: SecondaryColor,
    },
    text: {
        fontSize: responsiveFontSize(1.7),
        fontWeight: '400',
        fontFamily: Inter_Regular.Inter_Regular
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
