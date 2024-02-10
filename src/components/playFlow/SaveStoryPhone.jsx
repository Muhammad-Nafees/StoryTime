import React, { useState, } from 'react'
import { Dimensions, Image, Platform, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../assets/Imagepaths/index";
import BackButton from '../BackButton';
import NavigationsString from '../../constants/NavigationsString';
import TouchableButton from '../TouchableButton';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { SaveDataToProfile, recordingVideo } from '../../../store/slices/RecordingData';
import RNFetchBlob from 'rn-fetch-blob';
import { PassionOne_Regular } from '../../constants/GlobalFonts';
import SaveStory from './SaveStory';
import SaveStoryBtn from './SaveStoryBtn';
import SaveAsPdf from './SaveAsPdf';
import StoryTimeSaved from './StoryTimeSaved';


const SaveStoryPhone = ({ isVisible, setIsVisible }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, HOME_FRAME, FULL_BORDER_FRAME, EXTEND_STORY_IMG, NEXT_PLAYER_IMG } = Img_Paths;
    const [isVisiblePdf, setVisiblePdf] = useState(false);
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const [saveStoryModal, setSaveStoryModal] = useState(false);
    const [saveStoryModalsecond, setSaveStoryModalsecond] = useState(false);
    const [isVisibleSavePhone, setVisibleSavePhone] = useState(false);
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    const saveStoryhandler = () => {
        setSaveStoryModal(true);
        setVisiblePdf(true);
    };

    const handleSaveStories = () => {
        dispatch(SaveDataToProfile(textrecordUsers));
        setSaveStoryModalsecond(true);
        setVisibleSavePhone(true)
        console.log("Users Stories save to profile");
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
                        <Text style={{ paddingVertical: 2, width: responsiveWidth(40), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400" }}>Save your story to your phone</Text>

                        <View style={{ paddingVertical: 12, }}>
                            <TouchableButton type="savestoryphone" onPress={handleSaveStories} backgroundColor={TextColorGreen} text="Save" color="#FFF" />
                        </View>

                        <SaveStoryBtn onPress={saveStoryhandler} text="Save as PDF" />

                    </View>
                </View>

                {
                    saveStoryModal && (
                        <SaveAsPdf isVisiblePdf={isVisiblePdf} setIsVisiblePdf={setVisiblePdf} />
                    )
                }

                {saveStoryModalsecond &&
                    <StoryTimeSaved isVisible={isVisibleSavePhone} setVisible={setVisibleSavePhone} text="Story Time 
Successfully Saved!" textButton="Back" />
                }



            </ImageBackground>
            {/* </View> */}
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
        height: responsiveHeight(28),
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

export default SaveStoryPhone;
