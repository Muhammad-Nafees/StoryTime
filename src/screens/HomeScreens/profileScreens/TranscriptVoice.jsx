import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../Styles/Style";
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BackButton from '../../../components/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import { Img_Paths } from '../../../assets/Imagepaths';
import SettingButton from '../../../components/SettingButton';
import TouchableButton from '../../../components/TouchableButton';



const TranscriptVoice = () => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, BG_PLAYFLOW, FULL_BORDER_FRAME, HOME_FRAME, SHARE_BTN, PROFILE_BG_FRAME } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const { FEED_CHAT, SECONDSCREENPLAYFLOW, THIRDSCREENPLAYFLOW, VIDEO_FIRST_SCREEN } = NavigationsString;
    const navigation = useNavigation();

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(6) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: responsiveWidth(90), alignItems: "center" }}>
                            <BackButton onPress={() => navigation.goBack()} />
                            <SettingButton image={require("../../../assets/profilenext-icon.png")} />
                        </View>
                    </View>

                    {/* Back Button */}

                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", paddingVertical: moderateVerticalScale(24) }}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", width: responsiveWidth(46) }}>
                                <Text style={{ color: "#000", }}>Posted by:</Text>
                                <View style={{ backgroundColor: "#395E66", paddingHorizontal: moderateScale(18), paddingVertical: moderateVerticalScale(4.5), borderRadius: 40, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9), fontWeight: "400" }}>@chrislee</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <View>
                                    <Text style={{ color: "#393939", paddingHorizontal: moderateScale(4) }}>Hide this story</Text>
                                </View>
                                <TouchableOpacity activeOpacity={0.7} style={{ paddingLeft: 2, width: 50, height: 24, borderRadius: 14, backgroundColor: "rgba(0, 0, 0, 0.15)", justifyContent: "center" }}>
                                    <View style={{ width: 21, height: 21, borderRadius: 50, backgroundColor: "#FFF" }} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", paddingBottom: 20 }}>

                        {/* <View style={{ width: responsiveWidth(90), }}> */}
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

                        <View style={styles.bg_content}>
                            <ScrollView nestedScrollEnabled={true}>
                                <View style={styles.child_bg}>
                                    <View style={styles.second_childbg}>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ width: responsiveWidth(46), borderRadius: 10, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#56B6A4", alignItems: "center", paddingHorizontal: moderateVerticalScale(14), marginVertical: moderateVerticalScale(10), }}>
                                                <Image style={{ width: responsiveWidth(15), height: responsiveHeight(7.5), resizeMode: "center" }} source={require("../../../assets/shark.png")} />
                                                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2) }}>Shark</Text>
                                            </View>
                                        </View>
                                        <View style={styles.text_container}>
                                            <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16, textAlign: "center" }}>
                                                {/* Your text content here */}
                                                Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        {/* </ImageBackground> */}
                    </View>
                    {/* </View> */}

                </ScrollView>
            </SafeAreaView>

        </ImageBackground>

    )
};



export default TranscriptVoice;
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
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(83),
        marginLeft: responsiveWidth(0.8),
        marginTop: responsiveWidth(1.5),

    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(80),
        marginTop: responsiveWidth(4),
        borderRadius: 18,
    },

    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(67),
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
        paddingTop: responsiveWidth(4),
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
        // height: responsiveHeight(34),
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        // backgroundColor: "orange"
    },
});


