import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'


const VoiceToText = ({ text, BackgroundImage, InnerImage, bgColor, innerColor, onPress, extendStoryCheck }) => {
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;

    // console.log("extendStoryCheck-voicetotext", extendStoryCheck);


    return (
        <ImageBackground style={[styles.img_backgroung_content, { width: SCREENWIDTH * 0.9, height: SCREENWIDTH * 0.7 }]} resizeMode="center" source={BackgroundImage}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: bgColor, height: SCREENHEIGHT * 0.267 }]}>
                <View style={{ borderRadius: 20, width: responsiveWidth(72), height: responsiveHeight(18), backgroundColor: innerColor, justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(69), height: responsiveHeight(18), resizeMode: "center" }} source={InnerImage} />
                </View>
                <View style={{ paddingVertical: moderateVerticalScale(4), }} />
                <Text style={{ color: "#FFF", fontSize: responsiveFontSize(2.9), fontWeight: "700", }}>{extendStoryCheck ? "Continue" : text}</Text>
            </TouchableOpacity>
        </ImageBackground>
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
        width: responsiveWidth(78),
        // height: responsiveHeight(27),
        marginLeft: responsiveWidth(1),
        marginBottom: responsiveWidth(2.4)
    },
})

export default VoiceToText;
