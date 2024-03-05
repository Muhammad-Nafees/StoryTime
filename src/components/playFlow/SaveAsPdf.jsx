import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert, PermissionsAndroid, Platform } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../assets/Imagepaths/index";
import BackButton from '../BackButton';
import NavigationsString from '../../constants/NavigationsString';
import TouchableButton from '../TouchableButton';
import { useDispatch, useSelector } from 'react-redux';
import { recordingVideo } from '../../../store/slices/RecordingData';
import RNFetchBlob from 'rn-fetch-blob';
import { PassionOne_Regular } from '../../constants/GlobalFonts';
import SaveStoryBtn from './SaveStoryBtn';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import StoryTimeSaved from './StoryTimeSaved';
import DownloadingFlow from './DownloadingFlow';
import { SPACING } from '../../constants/Constant';

const SaveAsPdf = ({ isVisiblePdf, setIsVisiblePdf, directoryPath }) => {

    const { width, height } = Dimensions.get('window');
    const { SAVE_STORY_BACKGROUND, BG_CLOCK } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const [isVisibleDownloading, setIsVisibleDownloading] = useState(false);
    const [saveStoryModalDownloading, setSaveStoryModalDownloading] = useState(false)
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    console.log("textrecordusers", textrecordUsers);



    const checkPermission = async () => {
        try {
            const OsVer = Platform.constants['Release'];
            // Check if the platform is Android
            if (Platform.OS === 'android' && Number(OsVer) < 12) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Storage permission granted');
                    createPDF();
                } else {
                    console.log('Storage permission denied');
                    Alert.alert('Permission Denied', 'Please grant storage permission to save the PDF.');
                }
            } else {
                createPDF();
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const createPDF = async () => {
        try {
            const folderPath = `${RNFS.DocumentDirectoryPath}/PDF`;
            await RNFS.mkdir(folderPath);
            console.log("folderPath---------------------", folderPath)

            const htmlContent = `<html><body><h3>${textrecordUsers}</h3></body></html>`;

            const options = {
                html: htmlContent,
                fileName: 'voicetotext',
                directory: folderPath,
            };

            const pdf = await RNHTMLtoPDF.convert(options);
            const downloadDest = `${RNFS.DownloadDirectoryPath}/voicetotext_${Math.floor(Math.random() * 100000)}.pdf`;
            console.log("downloadDest---------------------", downloadDest);
            await RNFS.moveFile(pdf.filePath, downloadDest);
            setIsVisiblePdf(false);
            setIsVisibleDownloading(true);
            setSaveStoryModalDownloading(true);

        }
        catch (error) {
            console.error('Error generating PDF: ', error);
            Alert.alert('Error generating PDF. Please try again.');
        };
    };


    // setIsVisiblePdf(false);
    // setIsVisibleDownloading(true);
    // setSaveStoryModalDownloading(true);


    return (
        <>
            <Modal onRequestClose={() => setIsVisiblePdf(false)} visible={isVisiblePdf} >

                <ImageBackground style={styles.container} source={SAVE_STORY_BACKGROUND}>


                    {/* Back Button */}
                    <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                        <BackButton onPress={() => setIsVisiblePdf(false)} />
                    </View>

                    <ImageBackground
                        style={styles.img_frame}
                        resizeMode="stretch"
                        source={BG_CLOCK}>
                        <View style={{ justifyContent: "center", alignSelf: 'center', marginTop: -SPACING * 7, alignItems: 'center' }}>

                            <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
                            <Text style={{ paddingVertical: 2, width: responsiveWidth(45), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400" }}>Do you want to save your Story Time as PDF?</Text>

                            <View style={{ paddingVertical: 12, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={checkPermission}
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

                            <SaveStoryBtn timeLeft={0} onPress={() => setIsVisiblePdf(false)} text="No" />

                            {/* </View> */}

                        </View>
                    </ImageBackground>


                </ImageBackground>
            </Modal>
            {saveStoryModalDownloading &&
                <DownloadingFlow isVisibleDownloading={isVisibleDownloading} setIsVisibleDownloading={setIsVisibleDownloading} text={`Story Time\nSuccessfully Saved`} textButton="Back" />
            }
        </>
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
    img_frame: {
        height: '70%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default SaveAsPdf;
