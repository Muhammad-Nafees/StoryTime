import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../assets/Imagepaths/index";
import BackButton from '../components/BackButton';
import NavigationsString from '../constants/NavigationsString';
import TouchableButton from './TouchableButton';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { PassionOne_Regular } from '../constants/GlobalFonts';
import SaveStoryBtn from './playFlow/SaveStoryBtn';
import StoryTimeSaved from './playFlow/StoryTimeSaved';
import DownloadingVideoModal from './playFlow/DownloadingVideoModal';
import { SPACING } from '../constants/Constant';

const SaveVideo = ({ isVisible, setIsVisible, path }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, BG_CLOCK, SAVE_STORY_BACKGROUND } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const [saveStoryVideoModal, setSaveStoryVideoModal] = useState(false);
    const [isVisibleFirstVideoFlow, setIsVisibleFirstVideoFlow] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const recordedVideo = useSelector((state) => state.recordingData.saveRecordingVideo);
    console.log("RECORDVID-----", recordedVideo);


    const downloadRecording = async () => {
        try {
            const destinationPath = `${RNFS.DownloadDirectoryPath}/downloaded_video${Math.floor(Math.random() * 100000)}.mp4`; // Generate random number
            const sourcePath = `file://${recordedVideo}`;

            if (!sourcePath) {
                console.error('Recording path not found.');
                return;
            }
            await RNFS.copyFile(sourcePath, destinationPath);
            console.log('Video downloaded successfully:', destinationPath);
            setSaveStoryVideoModal(true);
            setIsVisibleFirstVideoFlow(true);

        } catch (error) {
            console.error('Error downloading recording:', error);
        }
    };



    return (
        <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible} >

            <ImageBackground style={styles.container} source={SAVE_STORY_BACKGROUND}>

                {/* Back Button */}

                <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => setIsVisible(false)} />
                </View>

                <ImageBackground
                    style={styles.img_frame}
                    resizeMode="stretch"
                    source={BG_CLOCK}>
                    <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: -SPACING * 10, backgroundColor: 'white', alignItems: 'center' }}>

                        <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
                        <Text style={{ paddingVertical: 2, width: responsiveWidth(45), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400" }}>Do you want to save your Story Time in your phone?</Text>

                        <View style={{ paddingVertical: 12, }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={downloadRecording}
                                    style={{
                                        width: responsiveWidth(70),
                                        backgroundColor: TextColorGreen,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: responsiveHeight(6.6),
                                    }}>

                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(1.9),
                                            fontWeight: '600',
                                            letterSpacing: 0.28,
                                            color: "#FFF",
                                        }}>
                                        Save
                                    </Text>

                                </TouchableOpacity>
                            </View>
                        </View>

                        <SaveStoryBtn timeLeft={0} onPress={() => setIsVisible(false)} text="No" />

                        {/* </View> */}

                    </View>
                </ImageBackground>

                {
                    isVisibleFirstVideoFlow &&
                    <DownloadingVideoModal
                        isVisibleFirstVideoFlow={isVisibleFirstVideoFlow} setIsVisibleFirstVideoFlow={setIsVisibleFirstVideoFlow} text="Story Time 
Successfully Saved!" textButton="Back"
                    />
                }

            </ImageBackground>
        </Modal>


    )
};




const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        // paddingVertical: moderateVerticalScale(10),
        flex: 1,
    },
    img: {
        resizeMode: "center"
    },
    // container: {

    // },

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
    container2: {
        justifyContent: "center",
        alignItems: "center",
        // flex: 1,
        backgroundColor: "#FFF",
        height: responsiveHeight(30),
        width: responsiveWidth(80),
        borderWidth: 4,
        borderColor: TextColorGreen
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
    },
    img_frame: {
        height: '70%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default SaveVideo;


