import { View, Text } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'

const UserNames = ({ username }) => {
    return (
        <View style={{ marginTop: responsiveWidth(2), paddingHorizontal: moderateScale(12), backgroundColor: "rgba(255, 255, 255, 0.20)", paddingVertical: moderateVerticalScale(10), borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2) }}>Now Playing: {username}</Text>
        </View>
    )
}

export default UserNames;
