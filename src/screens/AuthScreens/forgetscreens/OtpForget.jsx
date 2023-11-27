import { useRef } from "react";
import React, { useState } from 'react'
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, TextinputColor, ThirdColor } from '../../Styles/Style';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import TouchableButton from "../../../components/TouchableButton";
import { useNavigation } from "@react-navigation/native"

const OtpForget = ({ length, value, disabled, onChange, }) => {
    const navigation = useNavigation()

    const inputRefs = useRef([]);

    // const onChangeValue = (text, index) => {
    //     const newValue = value?.map((item, valueindex) => {
    //         if (valueindex === index) {
    //             return text;
    //         }
    //         return item;
    //     });
    //     onChange(newValue);
    // };

    const handlechange = (text, index) => {
        // onChangeValue(text, index)
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

    return (
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img_child} source={require("../../../assets/forget-bg-img.png")} />
            </View>

            {/* Code------------ */}

            <View>
                <View>
                    <View style={{ width: "90%", marginLeft: "auto" }}>
                        <Text style={{ color: FourthColor, fontWeight: "600" }}>Code</Text>
                    </View>

                    {/* OtpPassword----------- */}
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveWidth(5) }}>

                        <View style={{ width: "80%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", }}>
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
                        <Text style={{ color: TextColorGreen, fontWeight: "600", textAlign: "center", marginVertical: 20 }}>Resend </Text>
                        <Text style={{ color: TextColorGreen, fontWeight: "300", textAlign: "center", }}> in 30s</Text>
                    </View>
                    <TouchableButton onPress={() => navigation.navigate("ForgetConfirmPassword")} backgroundColor="#395E66" color="#FFF" text="Next" />
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

export default OtpForget;
