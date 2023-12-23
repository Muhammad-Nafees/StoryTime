import { useRef } from "react";
import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TouchableButton from "../../../components/TouchableButton";
import { useNavigation } from "@react-navigation/native"
import NavigationsString from "../../../constants/NavigationsString";
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Img_Paths } from "../../../assets/Imagepaths";
import { reset_verify_code } from "../../../../services";
import { otp_forget } from "../../../../services/api/auth_mdule/auth";
import { useDispatch } from "react-redux";
import { forgetResetToken } from "../../../../store/slices/authSlice";

const OtpForget = ({ length, value, disabled, onChange, }) => {
    const navigation = useNavigation()
    const { FORGET_CONFIRM_PASSWORD } = NavigationsString
    const { FORGET_BG_IMG } = Img_Paths;
    const [otptext, setOtptext] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const inputRefs = useRef([]);
    const dispatch = useDispatch();

    const handlechange = (text, index) => {
        const updatedText = otptext.slice(0, index) + text + otptext.slice(index + 1);
        setOtptext(updatedText);
        if (text.length !== 0) {
            return inputRefs.current[index + 1]?.focus();
        }
        return inputRefs.current[index - 1]?.focus();
    };

    const handleBackspace = (event, index) => {
        const { nativeEvent } = event;

        if (nativeEvent.key === "Backspace") {
            handlechange("", index);
        }
    };


    const otp_forget_api = async () => {
        setIsLoading(true)
        try {
            const response = await otp_forget(otptext)
            console.log("response", response)
            if (response?.statusCode === 200) {
                navigation.navigate(FORGET_CONFIRM_PASSWORD)
                Alert.alert(response?.message)
                dispatch(forgetResetToken(response?.data?.accessToken))
                setIsLoading(false)
            } else if (response?.stack) {
                Alert.alert(response.stack)
                setIsLoading(false)

            }
        }


        catch (err) {
            console.log(err)
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={FORGET_BG_IMG} />
            </View>

            {/* Code------------ */}

            <View>
                <View>
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Code</Text>
                    </View>

                    {/* OtpPassword----------- */}
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveWidth(5) }}>

                        <View style={{ width: responsiveWidth(80), flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
                            {[...new Array(6)].map((item, index) => (
                                <TextInput
                                    ref={ref => {
                                        if (ref && !inputRefs.current.includes(ref)) {
                                            inputRefs.current = [...inputRefs.current, ref];

                                        }
                                    }}
                                    style={{ width: responsiveWidth(12.5), height: responsiveHeight(6), borderWidth: 1, fontSize: responsiveFontSize(1.8), color: "#000", textAlign: "center", borderRadius: 12, borderColor: "#AAAAAA", backgroundColor: SecondaryColor }}
                                    key={index}
                                    maxLength={1}
                                    contextMenuHidden
                                    selectTextOnFocus
                                    editable={!disabled}
                                    keyboardType="decimal-pad"
                                    testID={`OTPInput-${index}`}
                                    onChangeText={text => handlechange(text, index)}
                                    onKeyPress={event => handleBackspace(event, index)}
                                />
                            ))}
                        </View>
                    </View>



                </View>

                {/* Confirm Password------------ */}

                {/* Next and Back------------ */}

                <View style={{ marginTop: responsiveWidth(88) }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: TextColorGreen, fontWeight: "600", textAlign: "center", paddingVertical: moderateVerticalScale(22), fontSize: responsiveFontSize(1.9) }}>Resend </Text>
                        <Text style={{ color: TextColorGreen, fontWeight: "300", textAlign: "center", fontSize: responsiveFontSize(1.9) }}> in 30s</Text>
                    </View>
                    <TouchableButton isLoading={isLoading} onPress={otp_forget_api} backgroundColor="#395E66" color="#FFF" text="Verify" />
                </View>
                {/* () => navigation.navigate(FORGET_CONFIRM_PASSWORD) */}
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

export default OtpForget;
