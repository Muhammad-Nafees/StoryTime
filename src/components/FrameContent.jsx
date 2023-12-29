import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { SecondaryColor, TextColorGreen, pinkColor } from '../screens/Styles/Style'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Img_Paths } from '../assets/Imagepaths'
import { useNavigation } from '@react-navigation/native'
import NavigationsString from '../constants/NavigationsString'
import { useSelector } from 'react-redux'



const FrameContent = ({ type, profile_text, backgroundImage, profileImage, text }) => {

    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const navigation = useNavigation()
    const { HOME_FRAME, SHARE_BTN, } = Img_Paths
    const { FEED_CHAT } = NavigationsString;
    const RecordingText = useSelector((state) => state.RecordingData.recordingTextToHome)



    return (
        <View style={styles.container}>
            <View style={{ width: responsiveWidth(90), }}>
                <ImageBackground style={[styles.img_backgroung_content, {
                    width: SCREENWIDTH * 0.9,
                    height: SCREENWIDTH * 0.7,
                }]} resizeMode="contain" source={HOME_FRAME}>
                    <View style={styles.bg_content}>
                        {
                            type == "lilibeth" ?
                                <>
                                    <View style={styles.child_bg}>
                                        <View style={styles.second_childbg}>
                                            <View style={styles.third_childbg}>
                                                <Image style={styles.child_bg_img} source={profileImage} />
                                                <Text style={{ color: SecondaryColor, fontSize: responsiveFontSize(1.9) }}>Lilibeth</Text>
                                            </View>

                                            <View style={styles.text_container}>
                                                <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16, }}>
                                                    {RecordingText}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </>
                                :
                                null
                        }

                        {
                            type == "imp_bg_img" ?
                                <>
                                    <View style={styles.child_bg}>
                                        <View style={styles.second_childbg}>
                                            <View style={styles.third_childbg}>
                                                <Image style={styles.child_bg_img} source={profileImage} />
                                                <Text style={{ color: SecondaryColor, fontSize: responsiveFontSize(1.9) }}>Tiffany</Text>
                                            </View>
                                        </View>
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <View style={{ width: responsiveWidth(46), borderRadius: 10, justifyContent: "space-around", flexDirection: "row", backgroundColor: "#56B6A4", alignItems: "center", paddingHorizontal: moderateVerticalScale(14), marginVertical: moderateVerticalScale(10), }}>
                                                <Image style={{ width: responsiveWidth(15), height: responsiveHeight(7.5), resizeMode: "center" }} source={backgroundImage} />
                                                <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.2) }}>{text}</Text>
                                            </View>

                                            <View style={{ width: responsiveWidth(60), borderRadius: 10, height: responsiveHeight(7.5), justifyContent: "space-around", flexDirection: "row", backgroundColor: "#FFF", alignItems: "center", paddingHorizontal: moderateVerticalScale(14) }}>
                                                <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.8) }}>www.facebook.com/oli....</Text>
                                            </View>
                                        </View>
                                    </View>
                                </>
                                :
                                null
                        }
                    </View>
                </ImageBackground>


                <View style={styles.second_container}>
                    <View style={styles.sec_container_firstchild}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingHorizontal: moderateScale(55) }}>


                            <View style={styles.third_container}>

                                <View style={[styles.fourth_container]}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(50), }}>
                                        <TouchableOpacity style={styles.first_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/456-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>1.5k</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.second_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>456</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate(FEED_CHAT)} style={styles.third_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/message-icon.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>1.1k</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.third_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={SHARE_BTN} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>Share</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: responsiveWidth(15), justifyContent: 'flex-end', alignItems: "flex-end" }}>
                                        <TouchableOpacity style={{ width: responsiveWidth(6), }}>
                                            <Image style={{ width: responsiveWidth(7), height: responsiveHeight(3.5), resizeMode: "center" }} source={require("../assets/three-dots-mod.png")} />
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
        // height: responsiveHeight(34),
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        // backgroundColor: "orange"
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(28.6),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(0.5),
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(71),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(2),
        borderRadius: 18,
    },

    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(69)
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
        paddingTop: responsiveWidth(3),
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
        width: responsiveWidth(65),
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

export default FrameContent;
