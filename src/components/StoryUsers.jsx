import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateVerticalScale } from 'react-native-size-matters'



const StoryUsers = ({ images, text, backgroundColor, mainbgColor, onPress }) => {

    return (
        <View style={{ backgroundColor: mainbgColor, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: "center", }}>
            <TouchableOpacity onPress={onPress} style={{ marginVertical: moderateVerticalScale(10), borderRadius: 10, width: responsiveWidth(25), height: responsiveHeight(11), backgroundColor: backgroundColor, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), resizeMode: "center" }} source={images} />
            </TouchableOpacity>
            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>{text}</Text>
        </View>
    )

};

export default StoryUsers;