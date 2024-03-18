import React from 'react'
import { ImageBackground, View, StyleSheet, } from 'react-native'
import { PrimaryColor, SecondaryColor, pinkColor } from "../../../Styles/Style";
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../../../assets/Imagepaths/index";
import BackButton from '../../../../components/reusable-components/addplayer/customBackButton/BackButton';
import VoiceToText from '../../../../components/categories/voiceTextFlow/VoiceToText';
import { useDispatch } from 'react-redux';
import { checkVideoTrue, extendStoryCheckVideo, extendVideo } from '../../../../../store/slices/categoriesSlice/categoriesSlice';
import { nextRandomNumVideo, nextRandomNumVideoExtend } from '../../../../../store/slices/categoriesSlice/categoriesSlice';


const VideoSecondStory = () => {

    const { BG_PLAYFLOW, NEXT_PLAYER_IMAGE, EXTEND_STORYTIME_IMAGE } = Img_Paths;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // nextRandomNumVideoExtend

    const nextPlayerHandler = () => {
        const randomValuevideo = Math.floor(Math.random() * 100);
        dispatch(nextRandomNumVideo(randomValuevideo));
        dispatch(checkVideoTrue(true));
        navigation.navigate("VideoFirstUser");
        dispatch(extendStoryCheckVideo(true));
        dispatch(extendVideo(false));
    };

    const extendVideoHandler = async () => {
        const randomValuevideoExt = Math.floor(Math.random() * 100);
        dispatch(nextRandomNumVideoExtend(randomValuevideoExt));
        navigation.navigate("VideoFirstUser");
        dispatch(extendStoryCheckVideo(false));
        dispatch(checkVideoTrue(false));
        dispatch(extendVideo(true));
    };


    return (
        <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
            <View>
                {/* Back Button */}
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.container}>
                    <View style={{ width: responsiveWidth(90), }}>
                        <VoiceToText onPress={extendVideoHandler} BackgroundImage={EXTEND_STORYTIME_IMAGE} />
                        <VoiceToText onPress={nextPlayerHandler} BackgroundImage={NEXT_PLAYER_IMAGE} />
                    </View>
                </View>
            </View>
        </ImageBackground>

    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
    img: {
        resizeMode: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(10),
        flex: 1
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

export default VideoSecondStory;

