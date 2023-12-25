import React from "react"
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SecondaryColor } from "../screens/Styles/Style";
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const SocialsLogin = ({ ImageSource, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, borderColor: "#DEDEDE", paddingVertical: moderateVerticalScale(14), paddingHorizontal: moderateVerticalScale(18), borderRadius: 12, width: responsiveWidth(24), justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: responsiveWidth(6), height: responsiveHeight(3), resizeMode: "center" }} source={ImageSource} />
        </TouchableOpacity>
    )
}

export default SocialsLogin;
