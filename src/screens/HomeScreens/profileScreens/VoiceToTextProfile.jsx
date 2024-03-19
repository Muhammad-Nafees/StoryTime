import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../Styles/Style";
import { useSelector } from 'react-redux';
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import { Img_Paths } from '../../../assets/Imagepaths';
import SettingButton from '../../../components/SettingButton';
import CustomButton from '../../../components/reusable-components/CustomButton/CustomButton';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import { base, get_story_byId } from '../../../../services';
import { fetch_users_stories, getStory_Byid, hide_Story } from '../../../../services/api/profile';
import CustomEmoji from '../../../components/likeDislikesandComments/CustomEmoji';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Switch } from 'react-native-switch';

const VoiceToTextProfile = ({ route }) => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, SHARE_BTN } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const { FEED_CHAT } = NavigationsString;
    const navigation = useNavigation();
    // states
    const [isMoreLength, setIsMoreLength] = useState(false);
    const [getresponseById, setGetresponseById] = useState([]);
    const [isHidden, setIsHidden] = useState(false);
    const [isEnabled, setIsEnabled] = useState(null);
    //route params
    const storyId = route?.params?.storyuserId;
    const IS_HIDDEN = route?.params?.isHidden;
    // redux
    const { user } = useSelector(state => state?.authSlice);
    const USER = user?.data?.user || user?.data;
    const FriendIdRTK = useSelector((state) => state?.getcategories?.friendId);


    const getStory_Byid_api = async () => {
        try {
            const responseData = await getStory_Byid(storyId);
            setGetresponseById(responseData?.data)
            setIsHidden(responseData?.data?.isHidden)
            return responseData;
        } catch (error) {
        }
    };

    const profile_story_api = async () => {
        try {
            const responseData = await fetch_users_stories({
                recordingPage: 1,
                type: "text"
            });
            console.log("testResponse", responseData?.data?.stories[0])
            return responseData;
        } catch (error) {
            console.log("err", error);
        };
    };

    const toggleSwitch = async (apiKey = null) => {
        profile_story_api()
        setIsEnabled(previousState => !previousState);
        let response = await hide_Story(storyId);
        console.log("response Hidden--- : ", response?.data);
    };

    useEffect(() => {
        setIsEnabled(IS_HIDDEN);
        getStory_Byid_api();
    }, []);

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
                            <View style={{ flexDirection: "row", justifyContent: USER?._id === FriendIdRTK ? "space-evenly" : "flex-start", paddingLeft: USER?._id === FriendIdRTK ? moderateScale(0) : moderateScale(20), alignItems: "center", paddingVertical: moderateVerticalScale(24) }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', }}>
                                    <View>
                                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontFamily: Inter_Regular.Inter_Regular }}>Posted by:</Text>
                                    </View>
                                    <View style={{ marginLeft: USER?._id !== FriendIdRTK ? moderateScale(10) : null, backgroundColor: "#395E66", paddingHorizontal: moderateScale(10), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9), fontWeight: "400" }}>{`@${getresponseById?.creator?.username}` || "loading.."}</Text>
                                    </View>
                                </View>

                                {
                                    USER?._id === FriendIdRTK ?
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                            <View>
                                                <Text style={{ color: "#393939", paddingHorizontal: moderateScale(4) }}>Hide this story</Text>
                                            </View>
                                            {
                                                isEnabled !== null ?
                                                    <Switch
                                                        value={isEnabled}
                                                        onValueChange={() => {
                                                            toggleSwitch();
                                                        }}
                                                        circleSize={20}
                                                        barHeight={22}
                                                        innerCircleStyle={{ marginLeft: moderateScale(3) }}
                                                        backgroundActive={'#D4D4D4'}
                                                        backgroundInactive={'#D4D4D4'}
                                                        circleActiveColor={'#FFF'}
                                                        circleInActiveColor={'#FFF'}
                                                        circleBorderWidth={0}
                                                        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                                        renderActiveText={false}
                                                        renderInActiveText={false}
                                                    /> : <ActivityIndicator />
                                            }



                                        </View>
                                        :
                                        null
                                }
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
                                    <View style={[styles.bg_content, { minHeight: !isMoreLength ? SCREENHEIGHT / 3 : "auto", }]}>
                                        <View >
                                            <View style={[styles.child_bg, { minHeight: !isMoreLength ? SCREENHEIGHT / 3.2 : "auto", }]}>
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                    <View style={{ height: 45, width: responsiveWidth(50), borderRadius: 10, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#56B6A4", alignItems: "center", paddingHorizontal: moderateVerticalScale(20), marginVertical: moderateVerticalScale(6), }}>
                                                        <Image style={{ width: 40, height: 40, resizeMode: "center" }} source={{ uri: base + getresponseById?.subCategory?.image }} />
                                                        <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2) }}>{getresponseById?.subCategory?.name}</Text>
                                                    </View>
                                                </View>

                                                <View style={{ paddingTop: responsiveWidth(4), justifyContent: "center", alignItems: "center" }}>
                                                    <ScrollView style={{ flexGrow: 0 }}>
                                                        <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16, textAlign: "center", paddingHorizontal: moderateScale(24) }}>
                                                            {
                                                                !isMoreLength ?
                                                                    getresponseById?.content?.slice(0, 220) :
                                                                    getresponseById?.content
                                                            }
                                                            {/* "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo */}
                                                        </Text>
                                                    </ScrollView>
                                                </View>
                                            </View>

                                        </View>
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

                            <CustomButton
                                onPress={() => {
                                    USER?._id === FriendIdRTK ?
                                        navigation.navigate("ProfileScreens", {
                                            screen: "TagFriends",
                                            params: {
                                                storyId: storyId
                                            }
                                        })
                                        :
                                        navigation.navigate("Profile")
                                }
                                }
                                backgroundColor={TextColorGreen}
                                color="#FFF"
                                type={"tagFriends"}
                                text="Tag Friends"
                            />

                        </View>

                    </View>

                </ScrollView>
            </SafeAreaView>

        </ImageBackground>

    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
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
