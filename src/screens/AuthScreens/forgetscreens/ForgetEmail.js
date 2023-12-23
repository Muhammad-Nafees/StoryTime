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


const ForgetEmail = () => {
    const { FORGET_PHONE_NO, OTP_FORGET } = NavigationsString;

    const { FORGET_BG_IMG } = Img_Paths
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation();

    const resetEmailhandle = async (data) => {
        setIsLoading(true)

        try {
            const response = await reset_email(email);
            console.log("repsonse", response)

            console.log(response?.message)
            if (response?.statusCode === 200) {
                Alert.alert(response?.message)
                setIsLoading(false)
                navigation.navigate(OTP_FORGET)
            } else if (response?.stack) {
                Alert.alert(response.stack)
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
                        <Text style={{ color: FourthColor, fontWeight: "600", fontSize: responsiveFontSize(1.9) }}>Email Address</Text>
                    </View>
                    <TextInputField
                        placeholderText="Type here"
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>

                {/* Confirm Password------------ */}

                {/* Next------------ */}

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate(FORGET_PHONE_NO)}>
                        <Text style={{ color: TextColorGreen, fontWeight: "600", textAlign: "center", paddingVertical: moderateVerticalScale(20), fontSize: responsiveFontSize(1.9) }}>Use phone number instead</Text>
                    </TouchableOpacity>
                    <TouchableButton isLoading={isLoading} setIsLoading={setIsLoading} onPress={() => resetEmailhandle(email)} backgroundColor="#395E66" color="#FFF" text="Next" />
                </View>

                {/* onPress={() => navigation.navigate(FORGET_PHONE_NO)}  */}
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


export default ForgetEmail;


