import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TextInputField from '../../components/TextInputField';
import TouchableButton from '../../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import UserErrors from '../../components/UserErrors';
import NavigationsString from '../../constants/NavigationsString';
import { registerapi } from '../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { validationUserPassword } from '../../../validation/validation';
import { Path, Svg } from 'react-native-svg';
import { Img_Paths } from '../../assets/Imagepaths';


const RegisterPassword = ({ route }) => {

    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [firstPasswordError, setFirstPasswordError] = useState("")
    const dispatch = useDispatch();
    const { LOGIN } = NavigationsString;
    const { BGIMAGE_ACCOUNT_CREATED } = Img_Paths;
    const firstuserData = useSelector((state) => state.authSlice.firstpageData);
    const seconduserData = useSelector((state) => state.authSlice.secondpageData);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleconfirmshowpassword = () => {
        setConfirmShowPassword(!confirmShowPassword);
    };

    const validate = (values) => {
        return (
            values.password &&
            values.confirmPassword
        )
    };

    return (
        <Formik
            initialValues={{
                password: "",
                confirmPassword: "",
            }}
            validationSchema={validationUserPassword}
            onSubmit={async (values) => {
                setIsLoading(true)
                const responseData = await registerapi(firstuserData, seconduserData, values)
                const statusCode = responseData?.statusCode;
                const accessToken = responseData?.data?.accessToken;
                const error = responseData?.stack;
                const message = responseData?.message;
                if (statusCode === 200) {
                    setVisible(true);
                    setIsLoading(false);
                    Toast.show({
                        type: "error",
                        text1: message,
                        position: "top",
                        visibilityTime: 2500,
                    })
                }
                if (error) {
                    setFirstPasswordError(message)
                    Toast.show({
                        type: "error",
                        text1: message,
                        position: "top",
                        visibilityTime: 2500,
                    })
                    setIsLoading(false)
                }
                setResponse(responseData)
            }}
        >

            {({ values, errors, handleChange, handleSubmit, setFieldValue, touched, setFieldTouched, isValid }) => (
                <>
                    <View style={styles.container}>

                        <ScrollView>
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
                                        onBlur={() => setFieldTouched("password")}
                                        placeholderText="Type here" />
                                </View>

                                <View style={{ height: responsiveHeight(3.2) }}>
                                    {touched.password && errors.password &&
                                        <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(2) }}>
                                            <View style={{ flexDirection: "row", }}>
                                                <View>
                                                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                        <Path
                                                            d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                        />
                                                    </Svg>
                                                </View>
                                                <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                    <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.password}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    }
                                </View>

                                {/* <View */}
                                {/* Confirm Password------------ */}

                                <View>
                                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                        <Text style={{ color: FourthColor, fontWeight: "600" }}>Confirm Password</Text>
                                    </View>
                                    <TextInputField onPress={toggleShowPassword}
                                        showPassword={showPassword}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange("confirmPassword")}
                                        onBlur={() => setFieldTouched("confirmPassword")}
                                        type="password" placeholderText="Type here" />
                                </View>



                                {touched.confirmPassword && errors.confirmPassword &&
                                    <View style={{ width: responsiveWidth(90), marginLeft: 'auto', paddingBottom: responsiveWidth(2) }}>
                                        <View style={{ flexDirection: "row", }}>
                                            <View>
                                                <Svg width={20} height={20} viewBox="0 0 24 24" fill="red">
                                                    <Path
                                                        d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                                                    />
                                                </Svg>
                                            </View>
                                            <View style={{ paddingHorizontal: moderateScale(5) }}>
                                                <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.confirmPassword}</Text>
                                            </View>
                                        </View>
                                    </View>
                                }

                                {/* Next and Back------------ */}

                                <View style={{ paddingTop: responsiveWidth(60) }}>
                                    {/* <TouchableButton isLoading={isLoading} onPress={handleSubmit} backgroundColor="#395E66" color="#FFF" text="Create" validate={validate} values={values} /> */}
                                    {/*  */}

                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            disabled={validate(values) ? false : true}
                                            onPress={handleSubmit}
                                            style={{
                                                width: responsiveWidth(80),
                                                backgroundColor: validate(values) ? TextColorGreen : "rgba(57, 94, 102, 0.3)",
                                                borderRadius: 10,
                                                //   borderWidth: borderWidth == '1' ? 1 : 0,
                                                //   borderColor: borderWidth == '1' ? '#395E66' : null,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: responsiveHeight(6.6),
                                            }}>
                                            {/* {isLoading ? (
          <ActivityIndicator color={'#FFF'} />
        ) : ( */}

                                            {
                                                !isLoading ? (
                                                    <Text
                                                        style={{
                                                            fontSize: responsiveFontSize(1.9),
                                                            fontWeight: '600',
                                                            letterSpacing: 0.28,
                                                            color: "#FFF",
                                                        }}>
                                                        Create
                                                    </Text>
                                                ) :
                                                    <ActivityIndicator color={'#FFF'} />
                                            }
                                        </TouchableOpacity>
                                    </View>

                                    {/*  */}
                                    <View style={{ marginVertical: 7 }}>
                                        <TouchableButton onPress={() => navigation.goBack()} backgroundColor="#FFF" borderWidth="1" color="#395E66" text="Back" />
                                    </View>
                                </View>

                            </View>

                            {isVisible && <UserErrors
                                setVisible={setVisible}
                                text1={"Account Created"}
                                bgImage={BGIMAGE_ACCOUNT_CREATED}
                                isVisible={isVisible}
                                text="Login"
                                onPress={() => navigation.navigate(LOGIN)} />
                            }
                        </ScrollView>

                    </View>
                    <Toast />
                </>

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
