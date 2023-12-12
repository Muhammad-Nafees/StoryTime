import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import NavigationsString from '../../constants/NavigationsString';
import { Img_Paths } from '../../assets/Imagepaths';



const PlayStoryTime = () => {
    const {
        SPLASH_SCREEN_IMAGE,
        PLAY_STORY_IMG,
        STORY_TIME_IMG
    } = Img_Paths
    const { width, height } = Dimensions.get('window');
    const { CATEGORIES } = NavigationsString
    const navigation = useNavigation()

    return (

        <ImageBackground style={[styles.container]} source={SPLASH_SCREEN_IMAGE}>
            <View style={styles.story_time_container}>
                <Image style={[styles.story_time_img, {
                    width: width * 0.8,
                    height: height * 0.3,
                }]} source={STORY_TIME_IMG} />
            </View>

            <View style={styles.container_img}>
                <TouchableOpacity onPress={() => navigation.navigate(CATEGORIES)}>
                    <Image style={{ marginVertical: moderateVerticalScale(12), width: width * 0.3, height: height * 0.12, resizeMode: "center" }} source={require("../../assets/play-btn.png")} />
                </TouchableOpacity>
                <Image style={styles.get_started} source={PLAY_STORY_IMG} />
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
        marginTop: responsiveWidth(20),
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
        height: responsiveHeight(5),
    }
})


export default PlayStoryTime;

