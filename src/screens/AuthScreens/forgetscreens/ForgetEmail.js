import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"

import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInputField from '../../../components/TextInputField';
import TouchableButton from '../../../components/TouchableButton';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Img_Paths } from '../../../assets/Imagepaths';
import reset_email from '../../../../services/api/auth_mdule/auth';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import { validationforgetEmail } from '../../../../validation/validation';
import * as Yup from 'yup';
import { Path, Svg } from 'react-native-svg';

const ForgetEmail = () => {
    const { FORGET_PHONE_NO, OTP_FORGET } = NavigationsString;

    const { FORGET_BG_IMG } = Img_Paths;

    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();



    return (

        <Formik initialValues={{
            email: ''
        }}

            validationSchema={validationforgetEmail}
            onSubmit={async (values) => {
                const { email } = values;
                setIsLoading(true)
                try {
                    const response = await reset_email({ email: email });
                    if (response?.statusCode === 200) {
                        Toast.show({
                            type: "success",
                            text1: response?.message,

                        })
                        setIsLoading(false)
                        setTimeout(() => {
                            navigation.navigate(OTP_FORGET, {
                                code: response?.data?.code,
                                email: email,
                                type: "email"
                            })
                        }, 1000);
                    } else if (response?.stack) {
                        Toast.show({
                            type: "error",
                            text1: response?.message
                        })
                        setIsLoading(false)
                    }
                }
                catch (err) {
                    console.log(err)
                }
                finally {
                    setIsLoading(false);
                }
            }}
        >
            {({ values, errors, handleChange, handleSubmit }) => (
                <>
                    <View style={styles.container}>
                        <View style={styles.img_container}>
                            <Image style={styles.img_child} source={FORGET_BG_IMG} />
                        </View>

                        {/* Password------------ */}

                        <View>
                            <View>
                                <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                                    <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Email Address</Text>
                                </View>
                                <TextInputField
                                    placeholderText="Type here"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                />
                            </View>

                            {errors.email &&
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
                                            <Text style={{ color: 'red', fontSize: responsiveFontSize(1.9), fontWeight: "600" }}>{errors.email}</Text>
                                        </View>
                                    </View>
                                </View>
                            }

                            {/* Confirm Password------------ */}

                            {/* Next------------ */}

                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate(FORGET_PHONE_NO)}>
                                    <Text style={{ color: TextColorGreen, fontWeight: "600", textAlign: "center", paddingVertical: moderateVerticalScale(20), fontSize: responsiveFontSize(1.9) }}>Use phone number instead</Text>
                                </TouchableOpacity>
                                <TouchableButton isLoading={isLoading} setIsLoading={setIsLoading} onPress={handleSubmit} backgroundColor="#395E66" color="#FFF" text="Next" />
                            </View>

                        </View>
                        <Toast />
                    </View>
                </>

            )}

        </Formik>

    )
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: SecondaryColor
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


export default ForgetEmail;


