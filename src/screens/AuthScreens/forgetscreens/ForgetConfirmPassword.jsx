import { useRef } from "react";
import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TouchableButton from "../../../components/TouchableButton";
import TextInputField from "../../../components/TextInputField";
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Img_Paths } from "../../../assets/Imagepaths";


const ForgetConfirmPassword = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

    const { FORGET_BG_IMG } = Img_Paths

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const toggleShowPasswordConfir = () => {
        setShowPasswordConfirm(!showPasswordConfirm)
    }


    return (

        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={FORGET_BG_IMG} />
            </View>

            {/* Code------------ */}

            <View>
                <View>

                    {/*New Password----------- */}

                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>New Password</Text>
                    </View>

                    <TextInputField onPress={toggleShowPassword} showPassword={showPassword} type="password" placeholderText="Enter here" />
                    {/* Confirm Password------------ */}

                    <View style={{}}>
                        <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                            <Text style={{ marginVertical: responsiveWidth(1), color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Confirm Password</Text>
                        </View>
                        <TextInputField onPress={toggleShowPasswordConfir} showPassword={showPasswordConfirm} type="password" placeholderText="Enter here" />
                    </View>
                </View>

                {/* Next------------ */}

                <View style={{ paddingTop: responsiveWidth(75) }}>
                    <TouchableButton backgroundColor="#395E66" color="#FFF" text="Save" />
                </View>

            </View>

        </View>
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

export default ForgetConfirmPassword;
