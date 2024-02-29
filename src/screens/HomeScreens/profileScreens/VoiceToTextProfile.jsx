import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, Animated, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../Styles/Style";
import { useSelector } from 'react-redux';
import BackButton from '../../../components/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import { Img_Paths } from '../../../assets/Imagepaths';
import SettingButton from '../../../components/SettingButton';
import TouchableButton from '../../../components/TouchableButton';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import { base, get_story_byId } from '../../../../services';
import { getStory_Byid } from '../../../../services/api/profile';
import CustomEmoji from '../../../components/likeDislikesandComments/CustomEmoji';



const VoiceToTextProfile = ({ route }) => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, BG_PLAYFLOW, FULL_BORDER_FRAME, HOME_FRAME, SHARE_BTN, PROFILE_BG_FRAME } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const { FEED_CHAT, SECONDSCREENPLAYFLOW, THIRDSCREENPLAYFLOW, VIDEO_FIRST_SCREEN } = NavigationsString;
    const navigation = useNavigation();
    const [isMoreLength, setIsMoreLength] = useState(false);
    const [getresponseById, setGetresponseById] = useState([]);
    const profileUsersStories = useSelector((state) => state?.recordingData?.saveDatatoProfile);
    const storyId = route?.params?.storyuserId;



    const getStory_Byid_api = async () => {
        try {
            const responseData = await getStory_Byid(storyId);
            setGetresponseById(responseData?.data)
            console.log("responseData------", responseData);
            return responseData;
        } catch (error) {
        }
    };

    useEffect(() => {
        getStory_Byid_api();
    }, []);

    const contentLength = getresponseById?.content?.length || 0;



    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <SafeAreaView>
                <ScrollView style={{}}>
                    <View style={{}}>

                        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(6) }}>
                            <View style={{ flexDirection: 'row', width: responsiveWidth(90), alignItems: "center", justifyContent: "space-between" }}>
                                <BackButton onPress={() => navigation.goBack()} />
                                {
                                    isMoreLength ?
                                        <SettingButton onPress={() => {
                                            setIsMoreLength(false);
                                        }} image={require("../../../assets/profilenext-icon.png")} />
                                        :
                                        null
                                }
                            </View>
                        </View>

                        {/* Back Button */}


                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingVertical: moderateVerticalScale(24) }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: responsiveWidth(42) }}>
                                    <View style={{}}>
                                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontFamily: Inter_Regular.Inter_Regular }}>Posted by:</Text>
                                    </View>
                                    <View style={{ backgroundColor: "#395E66", paddingHorizontal: moderateScale(18), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9), fontWeight: "400" }}>{getresponseById?.creator?.username || "loading.."}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                    <View>
                                        <Text style={{ color: "#393939", paddingHorizontal: moderateScale(4) }}>Hide this story</Text>
                                    </View>

                                    <TouchableOpacity activeOpacity={0.7} style={{ paddingLeft: 2, width: responsiveWidth(14), height: responsiveHeight(3), borderRadius: 14, backgroundColor: "rgba(0, 0, 0, 0.15)", justifyContent: "center" }}>
                                        <View style={{ width: 21, height: 21, borderRadius: 50, backgroundColor: "#FFF" }} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: responsiveWidth(90), }}>
                                {/* <ImageBackground
                                    style={[styles.img_background_content,
                                    {
                                        width: SCREENWIDTH * 0.9,
                                        height: SCREENWIDTH * 0.8,
                                    },
                                    ]}
                                    resizeMode="contain"
                                    source={PROFILE_BG_FRAME}
                                > */}

                                <View style={{ justifyContent: "center", alignItems: "center", }}>
                                    <View style={[styles.bg_content, { height: SCREENHEIGHT / 3 }]}>
                                        {/* <View > */}
                                        <ScrollView style={[styles.child_bg,]} >
                                            {/* <View style={styles.second_childbg}> */}
                                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                <View style={{ height: 45, width: responsiveWidth(50), borderRadius: 10, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#56B6A4", alignItems: "center", paddingHorizontal: moderateVerticalScale(20), marginVertical: moderateVerticalScale(6), }}>
                                                    <Image style={{ width: 40, height: 40, resizeMode: "center" }} source={{ uri: base + getresponseById?.subCategory?.image }} />
                                                    <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2) }}>{getresponseById?.subCategory?.name}</Text>
                                                </View>
                                            </View>

                                            <View style={{ paddingTop: responsiveWidth(4), justifyContent: "center", alignItems: "center" }}>
                                                <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16, textAlign: "center", paddingHorizontal: moderateScale(24) }}>
                                                    {/* {
                                                        !isMoreLength ?
                                                            getresponseById?.content?.slice(0, 220) :
                                                            getresponseById?.content
                                                    } */}
                                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo
                                                    {/* "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo */}
                                                </Text>
                                            </View>
                                        </ScrollView>

                                        {/* </View> */}
                                        {/* </View> */}
                                    </View>
                                </View>

                                {/* </ImageBackground> */}

                            </View>
                        </View>

                        {
                            !isMoreLength ?
                                <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(10) }}>
                                    <SettingButton onPress={() => {
                                        setIsMoreLength(true)
                                    }} image={require("../../../assets/profilenext-icon.png")} />
                                </View>
                                :
                                null
                        }

                        <View style={{ paddingTop: responsiveWidth(25), justifyContent: "center", alignItems: "center", }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(50), alignItems: "center", paddingVertical: moderateVerticalScale(10), }}>
                                <CustomEmoji image={require("../../../assets/456-img.png")} text={getresponseById?.likesCount || 0} />
                                <CustomEmoji image={require("../../../assets/1.5k-img.png")} text={getresponseById?.dislikesCount || 0} />
                                <CustomEmoji image={require("../../../assets/message-icon.png")} text={getresponseById?.commentsCount || 0} />
                                <CustomEmoji image={SHARE_BTN} text="Share" />
                            </View>
                            <TouchableButton onPress={() => navigation.navigate("ProfileScreens", {
                                screen: "TagFriends"
                            })} backgroundColor={TextColorGreen} color="#FFF" text="Tag Friends" />
                        </View>
                        {/* {
                            Array.from({ length: 1 }, (item, index) => {
                                return (
                                )
                            })
                        } */}
                    </View>

                </ScrollView>
            </SafeAreaView>

        </ImageBackground>

    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        flex: 1,
    },
    img: {
        resizeMode: "center"
    },
    img_background_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        // justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        paddingBottom: 10

        // marginLeft: responsiveWidth(0.8),
        // marginTop: responsiveWidth(1.5),

    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        marginTop: responsiveWidth(2),
        borderRadius: 18,

    },

    second_childbg: {
        // marginLeft: "auto",
        // width: responsiveWidth(67),
    },

    third_childbg: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(8)
    },
    child_bg_img: {
        width: responsiveWidth(6.25),
        height: responsiveHeight(3.5),
        resizeMode: "center",
    },
    text_container: {
        // paddingTop: responsiveWidth(4),
        // height: responsiveHeight(18)
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
        justifyContent: "center",
        alignItems: "center",
    },
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: responsiveWidth(36),
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
    },
    img_backgroung_content: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});

export default VoiceToTextProfile;
