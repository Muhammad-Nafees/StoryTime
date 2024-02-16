import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { PassionOne_Regular } from '../constants/GlobalFonts'
import { useSelector } from 'react-redux'

const UserNames = ({ username, backgroundColor, currentDisplayUser }) => {

    return (
        <View style={{ width: responsiveWidth(55), marginTop: responsiveWidth(2), paddingHorizontal: moderateScale(12), backgroundColor: "rgba(255, 255, 255, 0.20)", paddingVertical: moderateVerticalScale(10), borderRadius: 50, justifyContent: "center", alignItems: "center", }}>
            <Text style={{ textAlign: "center", color: "#FFF", fontFamily: PassionOne_Regular.passionOne, fontSize: responsiveFontSize(2.4) }}>Now Playing: {`@${currentDisplayUser?.username}`}</Text>
        </View>
    )
};

export default UserNames;
