import React, { useState, useMemo } from 'react'
import { Dimensions, Image, Platform, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, ProgressBarAndroid } from 'react-native'
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
import { createStory_api } from '../../../services/api/storyfeed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPACING } from '../../constants/Constant';


const SaveStoryPhone = ({ isVisible, setIsVisible }) => {


    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, SAVE_STORY_BACKGROUND, BG_CLOCK } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const [saveStoryModal, setSaveStoryModal] = useState(false);
    const [saveStoryModalsecond, setSaveStoryModalsecond] = useState(false);
    const [isVisibleSavePhone, setVisibleSavePhone] = useState(false);
    const [isVisiblePdf, setVisiblePdf] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const categoryId = useSelector((state) => state?.getcategories?.categoriesId);
    const subCategoryId = useSelector((state) => state?.getcategories?.subcategoriesId);
    const playerContributorsId = useSelector((state) => state?.getcategories?.playerscontributorsIds);
    const { user } = useSelector(state => state?.authSlice);


    const isUserGuest = useMemo(() => !user, [user])

    // console.log("categoryId-----", categoryId);
    // console.log("subCategoryId-----", subCategoryId)
    // console.log("playerContributorsId-----", playerContributorsId);
    // console.log("textrecordUsers-----", textrecordUsers);


    const convertStr = textrecordUsers.join()
    console.log("convertstr----", convertStr)

    const dispatch = useDispatch();


    const saveStoryhandler = () => {
        setSaveStoryModal(true);
        setVisiblePdf(true);
    };

    const handleSaveStories = async () => {
        setIsLoading(true);
        try {
            const userLoginId = await AsyncStorage.getItem("isUserId");
            const responseData = await createStory_api({ creator: userLoginId, category: categoryId, subCategory: subCategoryId, contributors: playerContributorsId, content: convertStr });
            setIsLoading(false);
            console.log("storyresData====", responseData)
            dispatch(SaveDataToProfile(textrecordUsers));
            setSaveStoryModalsecond(true);
            setVisibleSavePhone(true);
            console.log("Users Stories save to profile");
            console.log("isLoginUserId-----", userLoginId)
            return responseData;
        } catch (error) {
            console.log("error", error)
        }
    };



    return (
        <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible} >


            <ImageBackground style={styles.container} source={SAVE_STORY_BACKGROUND}>


                <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => setIsVisible(false)} />
                </View>

                {/* Back Button */}
                <ImageBackground
                    style={styles.img_frame}
                    resizeMode="stretch"
                    source={BG_CLOCK}>
                    <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: -SPACING * 10, backgroundColor: 'white', alignItems: 'center' }}>
                        {/* <View style={styles.container2}> */}
                        <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
                        <Text style={{ paddingVertical: 2, width: responsiveWidth(40), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400", marginBottom: responsiveHeight(2) }}>Save your story to your phone</Text>

                        {!isUserGuest && <View style={{}}>
                            <TouchableButton isLoading={isLoading} type="savestoryphone" onPress={handleSaveStories} backgroundColor={TextColorGreen} text="Save" color="#FFF" />
                        </View>}

                        <View style={{ paddingTop: responsiveWidth(8) }}>
                            <SaveStoryBtn timeLeft={0} onPress={saveStoryhandler} text="Save as PDF" isUserGuest={isUserGuest} />
                        </View>

                        {/* </View> */}
                    </View>
                </ImageBackground>

                {
                    saveStoryModal && (
                        <SaveAsPdf isVisiblePdf={isVisiblePdf} setIsVisiblePdf={setVisiblePdf} />
                    )
                }

                {saveStoryModalsecond &&
                    <StoryTimeSaved isLoading={isLoading} isVisible={isVisibleSavePhone} setVisible={setVisibleSavePhone} text="Story Time
                   Successfully Saved!" textButton="Back" />
                }

            </ImageBackground>
        </Modal>
    )
};






const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
    img: {
        resizeMode: "center"
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


export default SaveStoryPhone;



