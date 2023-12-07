import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { SecondaryColor, TextColorGreen, pinkColor } from '../screens/Styles/Style'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { Img_Paths } from '../assets/Imagepaths'
import { useNavigation } from '@react-navigation/native'
import NavigationsString from '../constants/NavigationsString'



const FrameContent = ({ type, profile_text, backgroundImage, profileImage }) => {

    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const navigation = useNavigation()
    const { HOME_FRAME } = Img_Paths
    const { FEED_CHAT } = NavigationsString

    return (

        <View style={styles.container}>
            <View style={{ width: responsiveWidth(90), }}>
                <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={HOME_FRAME}>
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
                                                <Text style={{ fontSize: responsiveWidth(3.7), color: SecondaryColor, lineHeight: 16 }}>
                                                    Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.
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
                                    <ImageBackground style={{ marginTop: responsiveWidth(3), width: SCREENWIDTH / 1.4, height: SCREENHEIGHT / 3.6, }} resizeMode="cover" borderRadius={18} source={backgroundImage}>
                                        <View style={styles.sophia_container}>
                                            <Image style={styles.child_bg_img} source={profileImage} />
                                            <Text style={{ color: SecondaryColor, fontSize: responsiveFontSize(1.9) }}>Lilibeth</Text>
                                        </View>
                                    </ImageBackground>
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
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(36) }}>
                                        <TouchableOpacity style={styles.first_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/456-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.9), color: SecondaryColor, fontWeight: "300" }}>1.5k</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.second_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.9), color: SecondaryColor, fontWeight: "300" }}>456</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate(FEED_CHAT)} style={styles.third_view}>
                                            <Image style={{ width: responsiveWidth(8), height: responsiveHeight(4), resizeMode: "center" }} source={require("../assets/message-icon.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.9), color: SecondaryColor, fontWeight: "300" }}>1.1k</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ width: responsiveWidth(20), justifyContent: 'flex-end', alignItems: "flex-end" }}>
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
}



const styles = StyleSheet.create({

    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(10),
        flex: 1
    },
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(34),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(29.5),
        marginLeft: responsiveWidth(1)
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(5),
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
    }
})

export default FrameContent;
