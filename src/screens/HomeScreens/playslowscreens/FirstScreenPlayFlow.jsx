import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../Styles/Style";
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../../assets/Imagepaths/index";
import BackButton from '../../../components/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import VoiceToText from '../../../components/VoiceToText';
import { SCREEN_HEIGHT } from '../../../constants/Constant';


const FirstScreenPlayFlow = () => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, HOME_FRAME, FULL_BORDER_FRAME, FIRST_VOICE_TO_TEXT_IMAGE, VIDEO_IMAGE } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height
    const { FEED_CHAT, SECONDSCREENPLAYFLOW, THIRDSCREENPLAYFLOW, VIDEO_FIRST_SCREEN } = NavigationsString;
    const navigation = useNavigation();

    return (
        <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
            <View style={{
                height: SCREEN_HEIGHT / 1,
            }}>
                <View style={{ paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                {/* Back Button */}
                <View style={{ paddingTop: responsiveWidth(15) }}>
                    <VoiceToText onPress={() => navigation.navigate(SECONDSCREENPLAYFLOW)} text="Voice to Text" BackgroundImage={FIRST_VOICE_TO_TEXT_IMAGE} />
                    <VoiceToText onPress={() => navigation.navigate(VIDEO_FIRST_SCREEN)} text="Video" BackgroundImage={VIDEO_IMAGE} />
                </View>

            </View>
        </ImageBackground>
    )
};

export default FirstScreenPlayFlow;

const styles = StyleSheet.create({

    img: {
        resizeMode: "center"
    },
    container: {
        alignItems: "center",
    },
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(27),
        marginLeft: responsiveWidth(1),
        marginBottom: responsiveWidth(2)
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
});
