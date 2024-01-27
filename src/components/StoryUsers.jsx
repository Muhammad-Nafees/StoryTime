import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import { TextColorGreen } from '../screens/Styles/Style';
import { Base_Url } from '../../services';
import { Img_Paths } from '../assets/Imagepaths';

const StoryUsers = ({ images, text, backgroundColor, mainbgColor, onPress, }) => {
    const { LUDO_ICON } = Img_Paths;

    return (
        <>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={onPress} style={{ marginVertical: moderateVerticalScale(10), borderRadius: 10, width: responsiveWidth(25), height: responsiveHeight(11), justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: 90, height: 80, resizeMode: "contain", borderRadius: 10 }} source={{ uri: "http://storytime.yameenyousuf.com/" + images }} />
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>{text}</Text>
            </View>


        </>
    );
};

export default StoryUsers;
