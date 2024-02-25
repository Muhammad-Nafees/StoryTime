import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'


const VoiceToText = ({ text, BackgroundImage, bgColor, innerColor, onPress, extendStoryCheck }) => {
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;

    return (

        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ width: responsiveWidth(90), justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: SCREENWIDTH / 1.3, height: SCREENHEIGHT / 3, resizeMode: "contain" }} source={BackgroundImage} />
        </TouchableOpacity>
    )
};




const styles = StyleSheet.create({
    img_backgroung_content: {
        // width: responsiveWidth(90),
        // height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateVerticalScale(6)
    },
    bg_content: {
        // backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        // width: responsiveWidth(78),
        // height: responsiveHeight(27),
        // marginLeft: responsiveWidth(1),
        // marginBottom: responsiveWidth(2.4)
    },
})

export default VoiceToText;
