import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { useNavigation } from '@react-navigation/native';
import TouchableButton from '../../../components/TouchableButton';
import PhoneNumber from '../../../components/PhoneNumber';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { Img_Paths } from '../../../assets/Imagepaths';
import reset_email from '../../../../services/api/auth_mdule/auth';
import { object } from 'yup';
import Toast from 'react-native-toast-message';



const ForgetPhoneNumber = () => {

    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { OTP_FORGET, FORGET_EMAIL } = NavigationsString;
    const [formatText, setFormatText] = useState("")
    const [countryCode, setCountryCode] = useState({})
    const { FORGET_BG_IMG } = Img_Paths;

    const toggleCountryPicker = () => {
        setCountryPickerVisible(!countryPickerVisible);
    };

    const resetPhonehandle = async () => {
        setIsLoading(true)

        try {

            const response = await reset_email(formatText, code,);
            console.log("responsephonenu", response)
            if (response?.statusCode === 200) {
                Toast.show({
                    type: "success",
                    text1: response?.message,
                })
                setIsLoading(false)
                navigation.navigate(OTP_FORGET)
            } else if (response?.stack) {
                Toast.show({
                    type: "error",
                    text1: response?.message,
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
    };



    return (

        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={FORGET_BG_IMG} />
            </View>

            {/* Password------------ */}

            <View>
                <View>
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Phone Number</Text>
                    </View>
                    <PhoneNumber setFormatText={setFormatText} formatText={formatText} setCountryCode={setCountryCode} value={phoneNumber} onPressFlag={toggleCountryPicker} onchangeState={setPhoneNumber} />

                </View>

                {/* Confirm Password------------ */}

                {/* Next and Back------------ */}

                <View style={{ marginTop: responsiveWidth(80) }}>
                    <TouchableOpacity onPress={() => navigation.navigate(FORGET_EMAIL)}>
                        <Text style={{ color: TextColorGreen, fontWeight: "600", textAlign: "center", paddingVertical: moderateVerticalScale(22) }}>Use email address instead</Text>
                    </TouchableOpacity>
                    <TouchableButton isLoading={isLoading} onPress={() => resetPhonehandle(phoneNumber)} backgroundColor="#395E66" color="#FFF" text="Next" />
                </View>

            </View>
            <Toast />
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



export default ForgetPhoneNumber;


