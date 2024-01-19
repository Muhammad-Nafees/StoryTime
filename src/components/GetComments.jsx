import React, { useEffect, useState } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../assets/Imagepaths';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { getComments_func } from '../../store/slices/storyfeedslices/getCommentsSlice';
import { Base_Url } from '../../services';

const GetComments = ({ text, firstName, lastName, updatedAt, getCommentsstoryId, isComment, mediacommentPic, commentsUserid, commentsUserid2 }) => {
    const { HOME_FRAME, FRANKIN_DRAWEN, SHARE_BTN } = Img_Paths;
    const dispatch = useDispatch()

    const calculateTimeDifference = (updatedAt) => {
        const currentTimestamp = new Date();
        const updatedTimestamp = new Date(updatedAt);
        const differenceInMilliseconds = currentTimestamp - updatedTimestamp;
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        const differenceInHours = Math.floor(differenceInMinutes / 60);
        const differenceInDays = Math.floor(differenceInHours / 24);
        const [isCommentPic, setIsCommentPic] = useState(false)
        if (differenceInDays > 0) {
            return `${differenceInDays}day ago`;
        } else if (differenceInHours > 0) {
            return `${differenceInHours}h ago`;
        } else {
            return `${differenceInMinutes}m ago`;
        }
    };



    return (
        <>
            <View style={{ width: responsiveWidth(83), flexDirection: 'row', justifyContent: "space-between" }}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center", borderRadius: 50 }} source={FRANKIN_DRAWEN} />
                </View>
                <View style={{ backgroundColor: "#FFDCE7", borderRadius: 6, width: responsiveWidth(70), paddingVertical: moderateVerticalScale(4), paddingHorizontal: moderateScale(10) }}>
                    <Text style={{ color: "#000", fontWeight: "500", fontSize: responsiveFontSize(1.8), paddingVertical: moderateVerticalScale(4) }}>{`${firstName} ${lastName}`}</Text>
                    <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.6) }}>{text}</Text>
                    {
                        mediacommentPic && commentsUserid === commentsUserid2 && (
                            <Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={{ uri: "http://storytime.yameenyousuf.com/" + mediacommentPic }} />
                        )
                    }
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
};

export default GetComments;
