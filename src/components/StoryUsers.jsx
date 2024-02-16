import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import { TextColorGreen } from '../screens/Styles/Style';
import { Base_Url } from '../../services';
import { Img_Paths } from '../assets/Imagepaths';
import { useDispatch } from 'react-redux';
import { setStoryUserImage } from '../../store/slices/addplayers/addPlayersSlice';

const StoryUsers = ({ images, text, backgroundColor, mainbgColor, onPress, }) => {
    const dispatch = useDispatch();
    const { LUDO_ICON } = Img_Paths;
    const imageLink = "http://storytime.yameenyousuf.com/" + images;

    const handlePress = () => {
        onPress()
        dispatch(setStoryUserImage(imageLink));
    }

    return (
        <>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={handlePress} style={{ backgroundColor: 'rgba(86, 182, 164, 1)', marginVertical: moderateVerticalScale(10), borderRadius: 10, width: responsiveWidth(25), height: responsiveHeight(11), justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: 60, height: 60, borderRadius: 10, resizeMode: "center" }} source={{ uri: "http://storytime.yameenyousuf.com/" + images }} />
                </TouchableOpacity>
                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>{text}</Text>
            </View>

        </>
    );
};

export default StoryUsers;
