import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FourthColor, SecondaryColor, TextColorGreen } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import SocialsLogin from '../../components/SocialsLogin';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../../store/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import NavigationsString from '../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Img_Paths } from '../../assets/Imagepaths';
import { Base_Url, login_andpoint } from '../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAccessToken } from '../../../store/slices/authSlice';



// const SignInSchema = Yup.object().shape({
//     email: Yup.string()
//         .email('Invalid email') // Checks for a valid email format
//         .min(4, 'Too Short')
//         .max(40, 'Too Long!')
//         .required('Please Enter Your Email'),
//     password: Yup.string()
//         .min(6, 'Password must be at least 6 characters')
//         .max(20, 'Password is too long') // Adjust the max length as needed
//         .required('Please Enter Your Password'),
// });



const Login = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { REGISTER, FORGET_EMAIL } = NavigationsString;
    const [isLoading, setIsLoading] = useState(false)
    const { GOOGLE_ICON, FACEBOOK_ICON, APPLE_ICON } = Img_Paths;
    const login_user = useSelector((state) => state?.authSlice?.user)
    // console.log("loginser-0-", login_user)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };



    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                fcmToken: "fcmtoken12121212"
            }}

            onSubmit={async (values, { setSubmitting }) => {
                setIsLoading(true)
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
                    dispatch(login(responseData))

                    if (responseData?.data) {
                        setIsLoading(false)
                    }

                    console.log("respdara-=", responseData)
                    const statusCode = responseData?.statusCode;
                    const message = responseData?.message;
                    const accessToken = responseData?.data?.accessToken;
                    const error = responseData?.stack;
                    if (statusCode === 200) {
                        await AsyncStorage.setItem("isLoggedIn", accessToken)
                        dispatch(setAccessToken(accessToken))
                        Alert.alert(message)
                    }
                    if (error) {
                        Alert.alert(error)
                        setIsLoading(false)
                    }
                    return responseData;
                }
                catch (err) {
                    console.log(err)
                }
            }}
        >

            {({ values, errors, handleChange, handleSubmit }) => (

                <View style={styles.container}>
                    <View style={[styles.img_container, { paddingTop: responsiveWidth(6) }]}>
                        <Image style={styles.img_child} source={require('../../assets/story-time-without.png')} />
                    </View>

                    <View style={{ paddingBottom: moderateVerticalScale(12) }}>
                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                            <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Email</Text>
                        </View>
                        <TextInputField
                            value={values.email}
                            onChangeText={handleChange('email')}
                            placeholderText="Type here"
                        />
                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                            <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Password</Text>
                        </View>
                        <TextInputField
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onPress={toggleShowPassword}
                            showPassword={showPassword}
                            placeholderText="Type here"
                            type="password"
                        />

                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto' }}>
                            {errors.password && <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9) }}>{errors.password}</Text>}
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate(FORGET_EMAIL)} style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: FourthColor, fontWeight: '600', fontSize: responsiveFontSize(1.9) }}>Forgot password?</Text>
                    </TouchableOpacity>

                    <View style={{ paddingVertical: moderateVerticalScale(14) }}>
                        <TouchableButton isLoading={isLoading} onPress={handleSubmit} color="#FFF" backgroundColor="#395E66" text="Login" />
                    </View>

                    <View style={{ paddingVertical: moderateVerticalScale(6), justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.text_container}>
                            <Text style={[styles.text, { color: FourthColor }]}>By logging in, you agree to our </Text>
                            <TouchableOpacity>
                                <Text style={[styles.text, { color: TextColorGreen }]}> Terms & Conditions </Text>
                            </TouchableOpacity>
                            <Text style={[styles.text, { color: FourthColor }]}> and </Text>
                            <TouchableOpacity>
                                <Text style={[styles.text, { color: TextColorGreen }]}>Privacy Policy</Text>
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
        fontSize: responsiveFontSize(1.8),
        fontWeight: '400',
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
        width: responsiveWidth(90),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
