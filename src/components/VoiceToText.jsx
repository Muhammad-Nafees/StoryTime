import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { TextColorGreen, PrimaryColor } from '../screens/Styles/Style'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'

const VoiceToText = ({ text, BackgroundImage, InnerImage, bgColor, innerColor }) => {
    return (
        <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={BackgroundImage}>
            <TouchableOpacity activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: bgColor, }]}>
                <View style={{ borderRadius: 20, width: responsiveWidth(72), height: responsiveHeight(20), backgroundColor: innerColor, justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(60), height: responsiveHeight(18), resizeMode: "center" }} source={InnerImage} />
                </View>
                <View style={{ paddingVertical: moderateVerticalScale(4), }} />
                <Text style={{ color: "#FFF", fontSize: 22, fontWeight: "700", }}>{text}</Text>
            </TouchableOpacity>
        </ImageBackground>

    )
};


const styles = StyleSheet.create({
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateVerticalScale(6)
    },
    bg_content: {
        // backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(27),
        marginLeft: responsiveWidth(1),
        marginBottom: responsiveWidth(2.5)
    },
})

export default VoiceToText;
