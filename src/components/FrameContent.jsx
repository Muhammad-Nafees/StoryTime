import React, { useEffect, useState, memo, useCallback } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { SecondaryColor, TextColorGreen, pinkColor } from '../screens/Styles/Style'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Img_Paths } from '../assets/Imagepaths'
import { useNavigation } from '@react-navigation/native'
import NavigationsString from '../constants/NavigationsString'
import { useDispatch, useSelector } from 'react-redux'
import { likedstoryfeed, disLikedCountingRTK, likedCountingRTK, storyFeedContent, storyFeedUsername } from '../../store/slices/storyfeedslices/likedStorySlice'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { storyFeed } from '../../store/slices/storyfeedslices/storyFeedSlice'
import { Base_Url } from '../../services'
import { PassionOne_Regular } from '../constants/GlobalFonts'
import { storyLikedFeed, storydisLikedFeed, } from '../../services/api/storyfeed'
import LinearGradient from "react-native-linear-gradient"

const FrameContent = ({
    type,
    profileImage,
    content,
    commentsCount,
    likedUserId,
    subCategoryname,
    subCategoryimage, username,
    likedByMe, likedapiId,
    dislikesByMe,
    likesCountuser,
    dislikesCount,
}) => {

    const SCREENWIDTH = Dimensions.get("window").width;
    const SCREENHEIGHT = Dimensions.get("window").height;
    const navigation = useNavigation();
    const { HOME_FRAME, SHARE_BTN, } = Img_Paths;
    const { FEED_CHAT } = NavigationsString;
    const [isLiked, setIsLiked] = useState(likedByMe);
    const [isDisLike, setIsDisliked] = useState(dislikesByMe);
    const [likesCounting, setLikesCounting] = useState(likesCountuser);
    const [dislikesCounting, setDisLikesCounting] = useState(dislikesCount);
    const dispatch = useDispatch();


    const storyLikedHandled = useCallback(async () => {
        try {
            const responseData = await storyLikedFeed(likedUserId);
            setIsLiked((prevIsLiked) => !prevIsLiked);
            if (isLiked && responseData?.data?._id === likedUserId) {
                setLikesCounting((prevCount) => prevCount - 1);
            } else {
                setLikesCounting((prevCount) => responseData?.data?.likes.length || prevCount + 1);
            }
            dispatch(likedstoryfeed(likesCountuser))
            return responseData;
        } catch (error) {
            // Handle errors
        }
    }, [likesCounting]);



    const storydisLikedHandled = useCallback(async () => {
        try {
            const responseData = await storydisLikedFeed(likedUserId)
            setIsDisliked((prevIsLiked) => !prevIsLiked);
            if (isDisLike && responseData?.data?._id === likedUserId) {
                setDisLikesCounting((prevCount) => prevCount - 1);
            } else {
                setDisLikesCounting((prevCount) => responseData?.data?.dislikes.length || prevCount + 1);
            }
            return responseData;
        } catch (error) {
            // Handle errors
        }
    }, [dislikesCounting])


    const commentsHandled = useCallback(() => {
        dispatch(likedstoryfeed(likedUserId));
        dispatch(likedCountingRTK(likesCounting));
        dispatch(disLikedCountingRTK(dislikesCounting));
        dispatch(storyFeedContent(content));
        dispatch(storyFeedUsername(username));
        navigation.navigate(FEED_CHAT);
    }, [dispatch, navigation]);

    return (
        <View style={styles.container}>
            <View style={{ width: responsiveWidth(90), }}>
                <ImageBackground style={[styles.img_backgroung_content, {
                    width: SCREENWIDTH * 0.9,
                    height: SCREENWIDTH * 0.7,
                }]} resizeMode="contain" source={HOME_FRAME}>
                    <View style={[styles.bg_content, {
                        height: SCREENHEIGHT * 0.29,
                        height: SCREENWIDTH * 0.595,
                    }]}>
                        {
                            type == "text" &&
                            <>
                                <LinearGradient colors={["rgba(234, 137, 167, 1)", 'rgba(0,0,0,0.4)',]} start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} locations={[0.8, 1,]} style={[styles.child_bg,]}>
                                    <View style={styles.second_childbg}>
                                        <View style={styles.third_childbg}>
                                            <Image style={styles.child_bg_img} source={profileImage} />
                                            <Text style={{ paddingLeft: moderateScale(12), color: SecondaryColor, fontSize: responsiveFontSize(1.7), fontWeight: "600" }}>{username}</Text>
                                        </View>
                                        <ScrollView>
                                            <View style={styles.text_container}>
                                                <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16, }}>
                                                    {content}
                                                </Text>
                                            </View>
                                        </ScrollView>
                                    </View>
                                </LinearGradient>
                            </>
                        }

                        {
                            type == "video" &&
                            <>
                                <LinearGradient colors={["rgba(234, 137, 167, 1)", 'rgba(0,0,0,0.4)',]} start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }} locations={[0.8, 1,]} style={styles.child_bg}>
                                    <View style={styles.second_childbg}>
                                        <View style={styles.third_childbg}>
                                            <Image style={styles.child_bg_img} source={profileImage} />
                                            <Text style={{ paddingLeft: moderateScale(12), color: SecondaryColor, fontSize: responsiveFontSize(1.7), fontWeight: "600" }}>{username}</Text>
                                        </View>
                                    </View>

                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: responsiveWidth(46), borderRadius: 10, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#56B6A4", alignItems: "center", paddingHorizontal: moderateVerticalScale(10), height: responsiveHeight(7), marginVertical: moderateVerticalScale(10), }}>
                                            <Image style={{ width: 30, height: 30, resizeMode: "contain", }} source={{ uri: "http://storytime.yameenyousuf.com/" + subCategoryimage }} />
                                            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2), fontFamily: PassionOne_Regular.passionOne }}>{subCategoryname}</Text>
                                        </View>

                                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(4) }}>
                                            <Image style={{ width: 30, height: 30, resizeMode: "center", }} source={require("../assets/profileurl_icon.png")} />
                                            <Text style={{ color: "#FFF", fontWeight: "300", fontSize: responsiveFontSize(1.8), paddingVertical: moderateVerticalScale(6) }}>Url</Text>
                                        </TouchableOpacity>

                                    </View>

                                </LinearGradient>
                            </>
                        }
                    </View>
                </ImageBackground>

                <View style={styles.second_container}>
                    <View style={styles.sec_container_firstchild}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: moderateScale(50) }}>

                            <View style={styles.third_container}>
                                <View style={[styles.fourth_container]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(53), }}>
                                        <TouchableOpacity onPress={() => storyLikedHandled()} style={styles.first_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center", }} source={require("../assets/456-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.6), color: SecondaryColor, fontWeight: "400" }}>{likesCounting}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => storydisLikedHandled()} style={styles.second_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "400" }}>{dislikesCounting}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={commentsHandled} style={styles.third_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../assets/message-icon.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "400" }}>{commentsCount}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.third_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={SHARE_BTN} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>Share</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: responsiveWidth(15), justifyContent: 'flex-end', alignItems: "flex-end" }}>
                                        <TouchableOpacity style={{ width: responsiveWidth(6), }}>
                                            <Menu>
                                                <MenuTrigger>
                                                    <Image
                                                        style={{
                                                            width: responsiveWidth(7),
                                                            height: responsiveHeight(3.5),
                                                            resizeMode: 'center',
                                                        }}
                                                        source={require('../assets/three-dots-mod.png')}
                                                    />
                                                </MenuTrigger>

                                                <MenuOptions customStyles={{ optionsContainer: { borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: responsiveWidth(8), width: responsiveWidth(42), } }}>
                                                    <MenuOption style={{ paddingVertical: moderateVerticalScale(12), paddingLeft: responsiveWidth(5) }}>
                                                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9) }}>Block</Text>
                                                    </MenuOption>
                                                    <MenuOption style={{ paddingBottom: 10, paddingLeft: responsiveWidth(5) }}>
                                                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9) }}>Report</Text>
                                                    </MenuOption>
                                                </MenuOptions>

                                            </Menu>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>


                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
};


const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(10),
        flex: 1
    },
    img_backgroung_content: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(0.5),
    },
    child_bg: {
        width: responsiveWidth(71),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(2),
        borderRadius: 18,

    },

    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(69),

    },

    third_childbg: {
        flexDirection: "row",
        width: responsiveWidth(40),
        alignItems: "center",
        paddingVertical: moderateVerticalScale(8),
    },
    child_bg_img: {
        width: responsiveWidth(6.25),
        height: responsiveHeight(3.5),
        resizeMode: "center",
    },
    text_container: {
        paddingTop: responsiveWidth(3),
        // height: responsiveHeight(25)
    },
    second_container: {
        position: 'relative',
        bottom: responsiveWidth(5),
        justifyContent: "center",
        alignItems: "center",
    },
    sec_container_firstchild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: moderateVerticalScale(50),
        width: responsiveWidth(92),
        marginLeft: responsiveWidth(1),
        backgroundColor: "#E44173",
        height: responsiveHeight(7.5),
    },
    third_container: {
        // justifyContent: "center",
        // alignItems: "center",
    },
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        width: responsiveWidth(80),
    },

    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    second_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    third_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    sophia_container: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        margin: responsiveWidth(2.8)
    }
})

export default memo(FrameContent);
