import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Formik } from 'formik';
import * as  Yup from "yup"
import { register, registeruser, registeruser_city, registeruser_password } from '../../../store/slices/Register_Slice';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../services/api/Register_Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserErrors from '../../components/UserErrors';
import NavigationsString from '../../constants/NavigationsString';
import { Base_Url, register_endpoint } from '../../../services';
import { registerapi } from '../../../services/api/auth_mdule/auth';


const RegisterPassword = ({ route }) => {

    // const handleSubmit = async (values ) => {
    //     if (isError) {
    //       return;
    //     }
    //     setIsLoading(true);
    //     const {confirmPassword, ...reqData} = values;
    //     try {
    //       const response = await register({
    //         ...reqData,
    //         phone: ${values.phone},
    //         phoneCode: +${phoneCode},
    //         countryCode: getCode ? getCode : countryCode,
    //         role: userRole,
    //         fcmToken: 'abcabsdflskdjflskdj',
    //       });
    //       const data = response?.data?.data;
    //       console.log(data.user);
    //       console.log(data, 'ddd');
    //       dispatch(setUserData(data?.user));
    //       dispatch(setAccessToken(data?.accessToken));
    //       dispatch(setRefreshToken(data?.refreshToken));
    //       navigation.navigate('CreateProfile');
    //       Toast.show({
    //         type: 'success',
    //         text1: ${response?.data.message},
    //       });
    //     } catch (error: any) {
    //       console.log(error?.response?.data?.message, 'ERROR FROM CREATE ACCOUNT!');
    //       if (error?.response?.data?.message) {
    //         Toast.show({
    //           type: 'error',
    //           text1: ${error?.response?.data.message},
    //         });
    //       } else {
    //         Toast.show({
    //           type: 'error',
    //           text1: ${error.message}!,
    //         });
    //       }
    //     }
    //     setIsLoading(false);
    //   };


    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [response, setResponse] = useState([])
    const [showErrors, setShowErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const dispatch = useDispatch();
    const { LOGIN } = NavigationsString;
    const firstuserData = useSelector((state) => state.Register.firstpageData);
    const seconduserData = useSelector((state) => state.Register.secondpageData);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleconfirmshowpassword = () => {
        setConfirmShowPassword(!confirmShowPassword);
    };


    return (
        <Formik
            initialValues={{
                password: "",
                confirmPassword: "",
            }}

            onSubmit={async (values) => {
                setIsLoading(true)
                const responseData = await registerapi(firstuserData, seconduserData, values)
                const statusCode = responseData?.statusCode;
                const accessToken = responseData?.data?.accessToken;
                const error = responseData?.stack;
                if (statusCode === 200) {
                    setVisible(true)
                    setIsLoading(false)
                }
                if (error) {
                    Alert.alert(error);
                    setIsLoading(false)
                }
                setResponse(responseData)
            }}
        >

            {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (

                <View style={styles.container}>
                    <View style={styles.img_container}>
                        <Image style={styles.img_child} source={require("../../assets/create-account-img.png")} />
                    </View>

                    {/* Password------------ */}

                    <View>
                        <View>
                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Password</Text>
                            </View>
                            <TextInputField
                                onPress={toggleconfirmshowpassword}
                                showPassword={confirmShowPassword}
                                value={values.password}
                                onChangeText={handleChange("password")}
                                type="password"
                                placeholderText="Type here" />
                        </View>

                        {/* Confirm Password------------ */}

                        <View>
                            <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                <Text style={{ color: FourthColor, fontWeight: "600" }}>Confirm Password</Text>
                            </View>
                            <TextInputField onPress={toggleShowPassword}
                                showPassword={showPassword}
                                value={values.confirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                type="password" placeholderText="Type here" />
                        </View>

                        {/* Next and Back------------ */}

                        <View style={{ paddingTop: responsiveWidth(60) }}>
                            <TouchableButton isLoading={isLoading} onPress={handleSubmit} backgroundColor="#395E66" color="#FFF" text="Create" />
                            <View style={{ marginVertical: 7 }}>
                                <TouchableButton backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                            </View>
                        </View>

                    </View>

                    {isVisible && <UserErrors setVisible={setVisible} isVisible={isVisible} text="Login" onPress={() => navigation.navigate(LOGIN)} />}
                </View>
            )}

        </Formik>
    )
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    text: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "400"
    },
    img_container: {
        paddingVertical: moderateVerticalScale(22),
        justifyContent: "center",
        alignItems: "center"
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: "center"
    },

})

export default RegisterPassword;
