import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions"
import { FourthColor, SecondaryColor, TextinputColor, ThirdColor } from '../screens/Styles/Style'
import Icon from "react-native-vector-icons/Feather"
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"

const TextInputField = ({ placeholderText, type, onPress, showPassword, onChangeText, value }) => {

    return (

        <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: moderateVerticalScale(12), }}>
            <View style={{ flexDirection: type == "password" ? "row" : null, width: responsiveWidth(80), backgroundColor: TextinputColor, borderRadius: 12, height: responsiveHeight(6.5), justifyContent: "center", alignItems: "center", }}>
                <TextInput placeholder={placeholderText}
                    onChangeText={onChangeText}
                    value={value}
                    placeholderTextColor="#AAAAAA"
                    secureTextEntry={type == "password" ? !showPassword : null}
                    style={{ color: "#000", width: type == "password" ? 235 : 260 }} />

                {
                    type == "password" &&
                    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                        <Icon name={!showPassword ? "eye" : "eye-off"} size={22} color="#AAAAAA" />
                    </TouchableOpacity>
                }

            </View>
        </View>

    )
}

export default TextInputField
