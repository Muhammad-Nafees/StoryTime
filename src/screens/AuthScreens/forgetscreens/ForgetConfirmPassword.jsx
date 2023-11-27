import { useRef } from "react";
import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TouchableButton from "../../../components/TouchableButton";
import TextInputField from "../../../components/TextInputField";

const ForgetConfirmPassword = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)


    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const toggleShowPasswordConfir = () => {
        setShowPasswordConfirm(!showPasswordConfirm)
    }


    return (
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../../assets/forget-bg-img.png")} />
            </View>

            {/* Code------------ */}

            <View>
                <View>

                    {/*New Password----------- */}

                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>New Password</Text>
                    </View>

                    <TextInputField onPress={toggleShowPassword} showPassword={showPassword} type="password" placeholderText="Enter here" />
                    {/* Confirm Password------------ */}
                    <View style={{}}>
                        <View style={{ width: "90%", marginLeft: "auto" }}>
                            <Text style={{ marginVertical: responsiveWidth(1), color: FourthColor, fontWeight: "600" }}>Confirm Password</Text>
                        </View>
                        <TextInputField onPress={toggleShowPasswordConfir} showPassword={showPasswordConfirm} type="password" placeholderText="Enter here" />
                    </View>

                </View>


                {/* Next------------ */}

                <View style={{ marginTop: responsiveWidth(75) }}>
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
        marginVertical: 22,
        justifyContent: "center",
        alignItems: "center"
    },
    img_child: {
        width: responsiveWidth(50),
        height: responsiveHeight(20),
        resizeMode: "center"
    },
    text_container: {
        marginTop: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        justifyContent: "center",
        alignItems: "center"
    },
})

export default ForgetConfirmPassword;
