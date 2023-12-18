import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../assets/Imagepaths';
import { moderateScale } from 'react-native-size-matters';

const AddFriendUsers = ({ profileimage, text, userchoice }) => {


    return (
        <View style={{ paddingVertical: 3, flexDirection: "row", justifyContent: "space-between", width: responsiveWidth(90), alignItems: "center" }}>
            <View style={{ flexDirection: "row", width: responsiveWidth(31), justifyContent: "space-between", alignItems: "center" }}>
                <Image style={{ width: responsiveWidth(11.5), height: responsiveHeight(5.5), resizeMode: "center" }} source={profileimage} />
                <View style={{ paddingHorizontal: moderateScale(8), }}>
                    <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.8) }}>{text}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={{ color: "#209BCC", fontSize: responsiveFontSize(1.9) }}>{userchoice}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddFriendUsers;
