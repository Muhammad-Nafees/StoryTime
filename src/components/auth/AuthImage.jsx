import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from "react-native"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale, moderateScale } from "react-native-size-matters"


const AuthImage = ({ ImageSource, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <Image style={styles.Auth_Img} resizeMode="center" source={ImageSource} />
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(70),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(5),
    },
    Auth_Img: {
        width: responsiveWidth(76),
        height: responsiveHeight(26),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AuthImage;
