import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import { pinkColor } from '../../Styles/Style';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';


const PopUpStart = () => {
    const {
        SPLASH_SCREEN_IMAGE,
        GET_STARTED_IMAGE,
        STORY_TIME_IMG
    } = Img_Paths
    const { SPLASH_SCREEN } = NavigationsString;
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();

    return (

        <ImageBackground style={[styles.container]} source={SPLASH_SCREEN_IMAGE}>

            <View style={{ height: responsiveHeight(88), justifyContent: "space-between", alignItems: "center" }}>
                <View style={styles.story_time_container}>
                    <Image style={[styles.story_time_img, {
                        width: width * 0.8,
                        height: height * 0.3,
                    }]} source={STORY_TIME_IMG} />
                </View>

                <View style={styles.container_img}>
                    <TouchableOpacity onPress={() => navigation.navigate(SPLASH_SCREEN)}>
                        <Image style={{ width: width * 0.3, height: height * 0.13, resizeMode: "center" }} source={require("../../../assets/play-btn.png")} />
                    </TouchableOpacity>
                    <Text style={{ paddingVertical: 20, color: "rgba(228, 65, 115, 1)", fontFamily: PassionOne_Regular.passionOne, fontSize: 32, fontWeight: "600", textAlign: "center", }}>Get Started</Text>

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
        justifyContent: "center",
        alignItems: "center",

    },
    story_time_container: {
        justifyContent: "center",
        alignItems: "center",

    },
    story_time_img: {
        marginVertical: moderateVerticalScale(100),
        resizeMode: "center"
    },
    get_started: {
        resizeMode: "center",
        width: responsiveWidth(50),
        height: responsiveHeight(10),
        // backgroundColor: "red"
    }
});



export default PopUpStart;
