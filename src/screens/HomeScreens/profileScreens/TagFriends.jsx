import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { FourthColor, PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../Styles/Style";
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BackButton from '../../../components/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import { Img_Paths } from '../../../assets/Imagepaths';
import SettingButton from '../../../components/SettingButton';
import TouchableButton from '../../../components/TouchableButton';





const TagFriends = () => {

    const { width, height } = Dimensions.get('window');
    const { SPLASH_SCREEN_IMAGE, BG_PLAYFLOW, FULL_BORDER_FRAME, HOME_FRAME, SHARE_BTN } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const { FEED_CHAT, SECONDSCREENPLAYFLOW, THIRDSCREENPLAYFLOW, VIDEO_FIRST_SCREEN } = NavigationsString;
    const navigation = useNavigation();

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <View style={{}}>
                <View style={{ paddingTop: responsiveWidth(6), marginLeft: "auto", width: responsiveWidth(95) }}>
                    <BackButton onPress={() => navigation.goBack()} />
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

                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: responsiveWidth(90), }}>
                        <ImageBackground
                            style={[styles.img_background_content,
                            {
                                width: SCREENWIDTH * 0.9,
                                height: SCREENWIDTH * 0.7,
                            },
                            ]}
                            resizeMode="contain"
                            source={HOME_FRAME}
                        >
                            <View style={styles.bg_content}>
                                <View style={styles.child_bg}>
                                    <View style={styles.second_childbg}>
                                        {/* <View style={styles.third_childbg}>
                                            <Image style={styles.child_bg_img} />
                                            <Text style={{ color: SecondaryColor, fontSize: responsiveFontSize(1.9) }}>Lilibeth</Text>
                                        </View> */}

                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ width: responsiveWidth(46), borderRadius: 10, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#56B6A4", alignItems: "center", paddingHorizontal: moderateVerticalScale(14), marginVertical: moderateVerticalScale(10), }}>
                                                <Image style={{ width: responsiveWidth(15), height: responsiveHeight(7.5), resizeMode: "center" }} source={require("../../../assets/shark.png")} />
                                                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2) }}>Shark</Text>
                                            </View>
                                        </View>

                                        <View style={styles.text_container}>
                                            <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16, textAlign: "center" }}>
                                                {/* Your text content here */}
                                                DEVELOPERSDEVELOPERSDEVELOPERSDEVELOPERSDEVELOPERSDEVELOPERSDEVELOPERSDEVELOPERS
                                            </Text>
                                        </View>



                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", paddingBottom: responsiveWidth(35) }}>
                    <SettingButton image={require("../../../assets/profilenext-icon.png")} />
                </View>



                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(50), alignItems: "center" }}>
                        <TouchableOpacity style={styles.first_view}>
                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../../../assets/456-img.png")} />
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: FourthColor, fontWeight: "300" }}>1.5k</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.second_view}>
                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../../../assets/1.5k-img.png")} />
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: FourthColor, fontWeight: "300", }}>456</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(FEED_CHAT)} style={styles.third_view}>
                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../../../assets/message-icon.png")} />
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: FourthColor, fontWeight: "300" }}>1.1k</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.third_view}>
                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={SHARE_BTN} />
                            <Text style={{ fontSize: responsiveFontSize(1.7), color: FourthColor, fontWeight: "300" }}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableButton backgroundColor={TextColorGreen} color="#FFF" text="Tag Friends" />

            </View>
        </ImageBackground>

    )
};



export default TagFriends;
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
        height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(29),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(1.5)
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(27),
        marginTop: responsiveWidth(0),
        borderRadius: 18,
    },

    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(67)
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


