import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions"
import NavigationsString from '../../../constants/NavigationsString';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';



const FirstScreenGuest = () => {

    const {
        SPLASH_SCREEN_IMAGE,
        GET_STARTED_IMAGE,
        STORY_TIME_IMG,
    } = Img_Paths
    const { } = NavigationsString;
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();



    return (
        <ImageBackground style={[styles.container]} source={SPLASH_SCREEN_IMAGE}>
            <View style={styles.story_time_container}>
                <Image style={[styles.story_time_img, {
                    width: width * 0.8,
                    height: height * 0.3,
                }]} source={STORY_TIME_IMG} />
            </View>

            <View style={styles.container_img}>
                <TouchableOpacity>
                    <Image style={{ marginVertical: moderateVerticalScale(12), width: width * 0.3, height: height * 0.12, resizeMode: "center" }} source={require("../../../assets/play-btn.png")} />
                </TouchableOpacity>
                <Image style={styles.get_started} source={GET_STARTED_IMAGE} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row", width: responsiveWidth(72), alignItems: "center", justifyContent: "space-between" }}>

                    <TouchableOpacity activeOpacity={0.7} style={{
                        width: width * 0.1,
                        height: height * 0.04, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: TextColorGreen
                    }}>
                        {/* <Image /> */}
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", width: responsiveWidth(60), }}>
                        <Text style={{ color: "#000", color: "#000", fontSize: responsiveFontSize(1.6) }}>By Checking this box, you agree to our </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("GuestStack", {
                            screen: "TermsAndConditions"
                        })}>
                            <Text style={[styles.text, { color: TextColorGreen, }]}>Terms & Conditions </Text>
                        </TouchableOpacity>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.6) }}> and</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("GuestStack", {
                            screen: "PrivacyAndPolicy"
                        })}>
                            <Text style={[styles.text, { color: TextColorGreen, }]}> Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </ImageBackground>
    )
};



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    container_img: {
        paddingTop: responsiveWidth(15),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(20)
    },
    story_time_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontWeight: "500",
        fontSize: responsiveFontSize(1.6)
    },

    story_time_img: {
        marginVertical: moderateVerticalScale(100),
        resizeMode: "center"
    },
    get_started: {
        resizeMode: "center",
        width: responsiveWidth(50),
        height: responsiveHeight(5),
    }
})


export default FirstScreenGuest;
