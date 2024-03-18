import { Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateVerticalScale, } from 'react-native-size-matters'


const VoiceToText = ({ BackgroundImage, onPress }) => {
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
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateVerticalScale(6)
    },
    bg_content: {
        justifyContent: "center",
        alignItems: "center",
    },
})

export default VoiceToText;
