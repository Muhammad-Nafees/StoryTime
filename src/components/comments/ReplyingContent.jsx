import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale, } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import CommentImagePreview from './CommentImagePreview';


const ReplyingContent = ({ replies, lastName, firstName, text, createdAt, replymedia, handleReplying }) => {


    const [isImageFullscreen, setImageFullscreen] = useState(false);
    const width = Dimensions.get('window').width;

    const handleImageClose = () => {
        setImageFullscreen(false);
    };

    const { FRANKIN_DRAWEN, } = Img_Paths;

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


    return (
        <>
            <View style={{ paddingTop: responsiveWidth(2) }}>
                <View style={{ flexDirection: "row", width: responsiveWidth(65), alignItems: "center", justifyContent: "space-between", }}>

                    <View>
                        <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center", borderRadius: 50 }} source={FRANKIN_DRAWEN} />
                    </View>

                    <View style={{ backgroundColor: "#FFDCE7", borderRadius: 6, width: responsiveWidth(52), paddingVertical: moderateVerticalScale(4), paddingHorizontal: moderateScale(10) }}>
                        <Text style={{ color: "#000", fontWeight: "500", fontSize: responsiveFontSize(1.8), paddingVertical: moderateVerticalScale(4) }}>{`${firstName} ${lastName}`}</Text>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.6) }}>{text}</Text>
                        {
                            replymedia && replymedia?.length > 0 && (
                                <TouchableOpacity onPress={() => setImageFullscreen(true)}>
                                    <Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={{ uri: "http://storytime.yameenyousuf.com/" + replymedia }} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row", paddingTop: moderateScale(4), width: responsiveWidth(52), }}>
                        <Text style={{ color: "grey", fontSize: responsiveFontSize(1.5), paddingHorizontal: moderateScale(12) }}>{calculateTimeDifference(createdAt)}</Text>
                        <TouchableOpacity onPress={handleReplying}>
                            <Text style={{ color: "#000", fontWeight: "500", fontSize: responsiveFontSize(1.7) }}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CommentImagePreview
                    handleImageClose={handleImageClose}
                    media={replymedia}
                    isImageFullscreen={isImageFullscreen}
                    width={width}
                    setImageFullscreen={setImageFullscreen}
                />

            </View>
        </>
    )
}

export default ReplyingContent;
