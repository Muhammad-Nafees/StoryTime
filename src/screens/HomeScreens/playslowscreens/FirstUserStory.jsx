import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../Styles/Style";
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../../assets/Imagepaths/index";
import BackButton from '../../../components/reuseable-components/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import VoiceToText from '../../../components/VoiceToText';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserplay, isNextUserplay } from '../../../../store/slices/playflow/startGameSlice';
import { checkTrueOrFalse, extendStoryCheck, nextRandomNum, nextRandomNumExtend, userId } from '../../../../store/slices/addplayers/addPlayersSlice';


const FirstUserStory = () => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, NEXT_PLAYER_IMAGE, CONTINUE_IMAGE, EXTEND_STORYTIME_IMAGE, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { FIRST_USER } = NavigationsString;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const extendstory = useSelector(
        state => state?.addPlayers?.extendStoryCheck
    );


    const extendStoryHandler = async () => {
        const randomvalue = Math.floor(Math.random() * 100);
        dispatch(checkTrueOrFalse(false));
        dispatch(nextRandomNumExtend(randomvalue));
        dispatch(extendStoryCheck(true));
        navigation.navigate(FIRST_USER);
    };


    const nextUserHandler = () => {
        const randomvalue = Math.floor(Math.random() * 100);
        console.log("randomvalue", randomvalue)
        dispatch(checkTrueOrFalse(true));
        dispatch(extendStoryCheck(false));
        dispatch(nextRandomNum(randomvalue))
        navigation.navigate(FIRST_USER);
    };


    return (
        <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
            <View>
                {/* Back Button */}
                <BackButton onPress={() => navigation.goBack()} />
                <View style={styles.container}>
                    <View style={{ width: responsiveWidth(90), }}>
                        <VoiceToText
                            onPress={extendStoryHandler}
                            BackgroundImage={!extendstory ? EXTEND_STORYTIME_IMAGE : CONTINUE_IMAGE}
                        />

                        <VoiceToText text="Next Player"
                            onPress={nextUserHandler}
                            BackgroundImage={NEXT_PLAYER_IMAGE}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
};



const styles = StyleSheet.create({

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

export default FirstUserStory;
