import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import { TextColorGreen } from '../../screens/Styles/Style'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'

const RandomCategories = ({ responseRandom }) => {

    return (
        <View style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: 'center', margin: responsiveWidth(1.2) }}>
            <View style={{ backgroundColor: TextColorGreen, width: responsiveWidth(29), borderRadius: 10, height: responsiveHeight(18.5), alignItems: "center", }}>
                <TouchableOpacity style={{ marginVertical: moderateVerticalScale(10), borderRadius: 10, width: responsiveWidth(25), height: responsiveHeight(11), backgroundColor: "rgba(199, 152, 97, 1)", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), resizeMode: "center" }} source={{ uri: "http://storytime.yameenyousuf.com/" + responseRandom?.image }} />
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>{responseRandom?.name}</Text>
            </View>
        </View>
    )
};

export default RandomCategories;

// onPress={() => handleStoryUser(responseRandom?._id)}
