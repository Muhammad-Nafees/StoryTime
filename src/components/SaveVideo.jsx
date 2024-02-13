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


const SaveVideo = ({ isVisible, setIsVisible, path }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, HOME_FRAME, FULL_BORDER_FRAME, EXTEND_STORY_IMG, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const [saveStoryModalsecond, setSaveStoryModalsecond] = useState(false);
    const [isVisibleSavePhone, setVisibleSavePhone] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const recordedVideo = useSelector((state) => state.recordingData.saveRecordingVideo);
    console.log("RECORDVID-----", recordedVideo);


    // const saveVideo = () => {
    //     dispatch(recordingToHome(RecordingText))
    //     Alert.alert("Recording Text Saved to Home")
    // }

    // Recording ko download karne ka function

    // const requestStoragePerission = async () => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //             {
    //                 title: "Cool Photo App Camera Permission",
    //                 message:
    //                     "Your app needs permission.",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             downloadRecording()
    //             return true;
    //         } else {
    //             console.log("Camera permission denied");
    //             return false;
    //         }
    //     } catch (err) {
    //         console.warn("ERR-PERMISSION", err);
    //         return false;
    //     }
    // }

    const downloadRecording = async () => {
        try {
            const destinationPath = `${RNFS.DownloadDirectoryPath}/downloaded_video.mp4`;
            setSaveStoryModalsecond(true);
            setVisibleSavePhone(true)

            const sourcePath = `file://${recordedVideo}`;

            if (!sourcePath) {
                console.error('Recording path not found.');
                return;
            }

            await RNFS.copyFile(sourcePath, destinationPath);
            console.log('Video downloaded successfully:', destinationPath);

        } catch (error) {
            console.error('Error downloading recording:', error);
        }
    };



    return (
        <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible} >

            {/* <View style={{ backgroundColor: "orange" }}> */}

            <ImageBackground style={styles.container} source={BG_PLAYFLOW}>

                <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => setIsVisible(false)} />
                </View>
                {/* Back Button */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.container2}>
                        <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
                        <Text style={{ paddingVertical: 2, width: responsiveWidth(45), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400" }}>Do you want to save your Story Time in your phone?</Text>

                        <View style={{ paddingVertical: 12, }}>
                            <TouchableButton type="savevideo" onPress={downloadRecording} backgroundColor={TextColorGreen} text="Save" color="#FFF" />
                        </View>

                        <SaveStoryBtn onPress={() => setIsVisible(false)} text="No" />

                    </View>
                </View>

                {saveStoryModalsecond &&
                    <StoryTimeSaved isVisible={isVisibleSavePhone} setVisible={setVisibleSavePhone} text="Story Time 
Successfully Saved!" textButton="Back" />
                }

            </ImageBackground>
            {/* </View> */}
        </Modal>

        // <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible} >
        //     <ImageBackground style={styles.container} source={BG_PLAYFLOW}>

        //         <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
        //             <BackButton onPress={() => setIsVisible(false)} />
        //         </View>

        //         {/* Back Button */}

        //         <View style={{ flex: 1, justifyContent: "center" }}>
        //             <View style={styles.container2}>
        //                 <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
        //                 <Text style={{ paddingVertical: 2, width: responsiveWidth(40), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400" }}>Save your story to your phone</Text>

        //                 <View style={{ paddingVertical: 12, }}>
        //                     <TouchableButton type="savevideo" onPress={downloadRecording} backgroundColor={TextColorGreen} text="Save" color="#FFF" />
        //                 </View>

        //             </View>
        //         </View>

        //     </ImageBackground>

        // </Modal>

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
    }
});

export default SaveVideo;
