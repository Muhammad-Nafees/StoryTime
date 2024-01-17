import React, { useEffect } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../assets/Imagepaths';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { getComments_func } from '../../store/slices/storyfeedslices/getCommentsSlice';


const GetComments = ({ text, firstName, lastName, updatedAt, getCommentsstoryId, addCommentsstoryId, isComment }) => {
    const { HOME_FRAME, FRANKIN_DRAWEN, SHARE_BTN } = Img_Paths;
    const dispatch = useDispatch()

    const calculateTimeDifference = (updatedAt) => {
        const currentTimestamp = new Date();
        const updatedTimestamp = new Date(updatedAt);
        const differenceInMilliseconds = currentTimestamp - updatedTimestamp;
        const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
        return `${differenceInMinutes}m ago`;
    };


    // useEffect(() => {
    //     dispatch(getComments_func(getCommentsstoryId))
    // }, [])

    return (
        <>
            <View style={{ width: responsiveWidth(83), flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center", borderRadius: 50 }} source={FRANKIN_DRAWEN} />
                </View>
                <View style={{ backgroundColor: "#FFDCE7", borderRadius: 6, width: responsiveWidth(70), paddingVertical: moderateVerticalScale(4), paddingHorizontal: moderateScale(10) }}>
                    <Text style={{ color: "#000", fontWeight: "500", fontSize: responsiveFontSize(1.8), paddingVertical: moderateVerticalScale(4) }}>{`${firstName} ${lastName}`}</Text>
                    <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.6) }}>{text}</Text>
                </View>
            </View>

            <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row", paddingTop: moderateScale(4), width: responsiveWidth(67), }}>
                    <Text style={{ color: "grey", fontSize: responsiveFontSize(1.5), paddingHorizontal: moderateScale(12) }}>{calculateTimeDifference(updatedAt)}</Text>
                    <Text style={{ color: "grey", fontWeight: "500", fontSize: responsiveFontSize(1.7) }}>Reply</Text>
                </View>
            </View>
        </>
    )
}

export default GetComments;
