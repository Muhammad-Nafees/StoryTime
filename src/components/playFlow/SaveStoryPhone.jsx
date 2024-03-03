import React, { useState, useMemo, useEffect } from 'react'
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
import * as ScopedStorage from "react-native-scoped-storage"
import DocumentPicker from "react-native-document-picker"



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
    const [directoryPath, setDirectoryPath] = useState("");


    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const categoryId = useSelector((state) => state?.getcategories?.categoriesId);
    const subCategoryId = useSelector((state) => state?.getcategories?.subcategoriesId);
    const playerContributorsId = useSelector((state) => state?.getcategories?.playerscontributorsIds);
    const { user } = useSelector(state => state?.authSlice);

    const isUserGuest = useMemo(() =>
        !user, [user])

    const convertStr = textrecordUsers.join();
    const dispatch = useDispatch();



    async function requestPermission(directoryId) {
        dir = await ScopedStorage.openDocumentTree(true);
        if (!dir) return null; // User cancelled
        await AsyncStorage.setItem(directoryId, JSON.stringify(dir));
        return dir;
    };

    console.log("directoryPath===", directoryPath);

    async function getAndroidDir(directoryId) {

        try {
            let dir = await AsyncStorage.getItem(directoryId);
            if (!dir) {
                dir = await requestPermission(directoryId)
            }
            else {
                dir = JSON.parse(dir);
            };
            let absolutePath;

            const persistedUris = await ScopedStorage.getPersistedUriPermissions();

            if (
                dir?.uri?.startsWith(
                    'content://com.android.externalstorage.documents/tree/primary'
                )
            ) {
                absolutePath = convertInternalStoragePathToAbsolutePath(dir?.uri);
            } else {
                // It's SD card or other external storage
                absolutePath = convertExternalStorageUriToAbsolutePath(dir?.uri);
            }


            if (persistedUris.length > 0) {
                setIsVisible(false);
                setSaveStoryModal(true);
                setVisiblePdf(true);
                console.log("I'M OUT FROM DESTINATIOnN----====");
            };
            setDirectoryPath(absolutePath);

            console.log("diruri--", dir?.uri)

            console.log("persistedUris", persistedUris);

            if (persistedUris.indexOf(dir?.uri) !== -1)
                return { dir, persistedUris }; // Return both dir and persistedUris
            return { dir: await requestPermission(directoryId), persistedUris };
        } catch (e) {
            console.log("err==", e);
            return null;
        }
    };

    const convertExternalStorageUriToAbsolutePath = (uri) => {
        let dirToRead = uri.split('tree')[1];
        dirToRead = '/storage' + dirToRead.replace(/%3A/g, '%2F');
        return decodeURIComponent(dirToRead);
    };

    const convertInternalStoragePathToAbsolutePath = (uri) => {
        let dirToRead = uri?.split('primary')[1];
        const InternalStoragePath = RNFS.ExternalStorageDirectoryPath;
        dirToRead = InternalStoragePath + dirToRead.replace(/%3A/g, '%2F');
        return decodeURIComponent(dirToRead);
    };

    const saveFile = async () => {
        let dir = await getAndroidDir("dataDir");
        await ScopedStorage.writeFile(dir?.uri, 'text/plain',)
    };




    const handleSaveStories = async () => {
        setIsLoading(true);
        try {
            const userLoginId = await AsyncStorage.getItem("isUserId");
            const responseData = await createStory_api({
                creator: userLoginId,
                category: categoryId,
                subCategory: subCategoryId,
                contributors: playerContributorsId,
                content: convertStr
            });
            setIsLoading(false);
            console.log("storyresData====", responseData)
            dispatch(SaveDataToProfile(textrecordUsers));
            setSaveStoryModalsecond(true);
            setVisibleSavePhone(true);
            console.log("Users Stories save to profile");
            return responseData;
        } catch (error) {
            console.log("error", error)
        }
    };



    return (
        <>
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
                        <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: -SPACING * 8, alignItems: 'center' }}>
                            {/* <View style={styles.container2}> */}
                            <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
                            <Text style={{ paddingVertical: 2, width: responsiveWidth(40), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400", marginBottom: responsiveHeight(2) }}>Save your story to your phone</Text>

                            {!isUserGuest && <View style={{}}>
                                <TouchableButton isLoading={isLoading} type="savestoryphone" onPress={handleSaveStories} backgroundColor={TextColorGreen} text="Save" color="#FFF" />
                            </View>}


                            <View style={{ paddingTop: responsiveWidth(8) }}>
                                <SaveStoryBtn timeLeft={0} onPress={saveFile} text="Save as PDF" isUserGuest={isUserGuest} />
                            </View>


                            {/* </View> */}
                        </View>
                    </ImageBackground>



                </ImageBackground>
            </Modal>
            {
                saveStoryModal && (
                    <SaveAsPdf
                        directoryPath={directoryPath}
                        isVisiblePdf={isVisiblePdf}
                        setIsVisiblePdf={setVisiblePdf} />
                )
            }


            {saveStoryModalsecond &&
                <StoryTimeSaved isLoading={isLoading} isVisible={isVisibleSavePhone} setVisible={setVisibleSavePhone} text={`Story Time\nSuccessfully Saved`} textButton="Back" />
            }
        </>
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


