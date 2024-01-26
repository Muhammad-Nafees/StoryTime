import React, { useEffect, useRef, useState, memo } from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { Img_Paths } from '../assets/Imagepaths';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { getComments_func } from '../../store/slices/storyfeedslices/getCommentsSlice';
import { Base_Url } from '../../services';
import CommentImagePreview, { CommentsImagePreview } from './comments/CommentImagePreview';
import ReplyingContent from './comments/ReplyingContent';

const GetComments = ({ text, firstName, lastName, createdAt, handleLoadMore, isLoadMore, commentsCount, getCommentsstoryId, media, commentsUserid, commentsUserid2, isReplying, setIsReplyingId, setIsReply, replies, inputRef }) => {


    const { HOME_FRAME, FRANKIN_DRAWEN, SHARE_BTN } = Img_Paths;
    const [isImageFullscreen, setImageFullscreen] = useState(false);
    const width = Dimensions.get('window').width;


    const handleImageClose = () => {
        setImageFullscreen(false);
    };


    const calculateTimeDifference = (createdAt) => {

        const commentDate = new Date(createdAt);
        const currentDate = new Date();
        const differenceInSeconds = Math.floor(
            (currentDate.getTime() - commentDate.getTime()) / 1000,
        );

        if (differenceInSeconds <= 0) {
            return `Just now`;
        } else if (differenceInSeconds < 60) {
            return `${differenceInSeconds} seconds ago`;
        } else if (differenceInSeconds < 3600) {
            const minutes = Math.floor(differenceInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (differenceInSeconds < 86400) {
            const hours = Math.floor(differenceInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const days = Math.floor(differenceInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };

    const handleReplying = () => {
        setIsReplyingId(commentsUserid)
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setIsReply(true)
    };

    return (
        <>
            <View style={{ paddingVertical: 4 }}>
                <View style={{ width: responsiveWidth(83), flexDirection: 'row', justifyContent: "space-between", }}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center", borderRadius: 50 }} source={FRANKIN_DRAWEN} />
                    </View>

                    <View style={{ backgroundColor: "#FFDCE7", borderRadius: 6, width: responsiveWidth(70), paddingVertical: moderateVerticalScale(4), paddingHorizontal: moderateScale(10) }}>
                        <Text style={{ color: "#000", fontWeight: "500", fontSize: responsiveFontSize(1.8), paddingVertical: moderateVerticalScale(4) }}>{`${firstName} ${lastName}`}</Text>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.6) }}>{text}</Text>

                        {
                            media && media?.length > 0 && (
                                <TouchableOpacity onPress={() => setImageFullscreen(true)}>
                                    <Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={{ uri: "http://storytime.yameenyousuf.com/" + media }} />
                                </TouchableOpacity>
                            )
                        }

                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "flex-end", }}>
                    <View style={{ flexDirection: "row", paddingTop: moderateScale(4), width: responsiveWidth(67), }}>
                        <Text style={{ color: "grey", fontSize: responsiveFontSize(1.5), paddingHorizontal: moderateScale(12) }}>{calculateTimeDifference(createdAt)}</Text>
                        <TouchableOpacity onPress={handleReplying}>
                            <Text style={{ color: "grey", fontWeight: "500", fontSize: responsiveFontSize(1.7) }}>Reply</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        replies && replies?.length > 0 &&
                        replies?.map((item, index) => (
                            <ReplyingContent
                                firstName={item.user.firstName}
                                lastName={item.user.lastName}
                                text={item.text}
                                createdAt={item.createdAt}
                                replymedia={item.media}
                                handleReplying={handleReplying}
                            />
                        ))
                    }
                </View>

                <CommentImagePreview
                    handleImageClose={handleImageClose}
                    media={media}
                    isImageFullscreen={isImageFullscreen}
                    width={width}
                    setImageFullscreen={setImageFullscreen}
                />
            </View>

        </>
    )
};

export default memo(GetComments);
