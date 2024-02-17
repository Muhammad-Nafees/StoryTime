import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native'
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


const SaveAsPdf = ({ isVisiblePdf, setIsVisiblePdf }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BG_PLAYFLOW, HOME_FRAME, FULL_BORDER_FRAME, EXTEND_STORY_IMG, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const [isVisibleDownloading, setIsVisibleDownloading] = useState(false);
    const [saveStoryModalDownloading, setSaveStoryModalDownloading] = useState(false)
    const { VIDEO_SECOND_USER, FIRST_USER } = NavigationsString;
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    console.log("textrecordusers", textrecordUsers)
    const createPDF = async () => {

        try {
            const folderPath = `${RNFS.DocumentDirectoryPath}/PDF`;
            await RNFS.mkdir(folderPath);

            const htmlContent = `<html><body><h3>${textrecordUsers}</h3></body></html>`;
            const options = {
                html: htmlContent,
                fileName: 'voicetotext', // PDF file ka naam
                directory: folderPath,
            };
            const pdf = await RNHTMLtoPDF.convert(options);
            // console.log('PDF generated: ', pdf.filePath);
            // Move the PDF file to desired directory
            const downloadDest = `${RNFS.DownloadDirectoryPath}/voicetotext_${Math.floor(Math.random() * 100000)}.pdf`; // Generate random number
            // "/download_" +  + 
            console.log("download dest :", downloadDest)
            await RNFS.moveFile(pdf.filePath, downloadDest);
            setIsVisibleDownloading(true);
            setSaveStoryModalDownloading(true);
        } catch (error) {
            console.error('Error generating PDF: ', error);
            Alert.alert('Error generating PDF. Please try again.');
        }
    };


    // const createPDF = async () => {
    //     try {
    //         const folderPath = `${RNFS.DocumentDirectoryPath}/PDF`;
    //         await RNFS.mkdir(folderPath);

    //         const htmlContent = `<html><body><h3>${textrecordUsers}</h3></body></html>`;
    //         const options = {
    //             html: htmlContent,
    //             fileName: 'textUsers', // PDF file ka naam
    //             directory: folderPath,
    //         };

    //         const pdf = await RNHTMLtoPDF.convert(options);
    //         console.log('PDF generated: ', pdf.filePath);
    //         setIsVisibleDownloading(true);
    //         setSaveStoryModalDownloading(true)
    //         // Alert.alert('PDF generated successfully!', `File saved at: ${pdf.filePath}`);
    //     } catch (error) {
    //         console.error('Error generating PDF: ', error);
    //         Alert.alert('Error generating PDF. Please try again.');
    //     }
    // };

    return (
        <Modal onRequestClose={() => setIsVisiblePdf(false)} visible={isVisiblePdf} >

            {/* <View style={{ backgroundColor: "orange" }}> */}

            <ImageBackground style={styles.container} source={BG_PLAYFLOW}>

                <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => setIsVisiblePdf(false)} />
                </View>

                {/* Back Button */}

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.container2}>
                        <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: TextColorGreen, fontSize: 24, paddingVertical: 10 }}>Save Story</Text>
                        <Text style={{ paddingVertical: 2, width: responsiveWidth(45), textAlign: "center", color: TextColorGreen, lineHeight: 22, fontWeight: "400" }}>Do you want to save your Story Time as PDF?</Text>

                        <View style={{ paddingVertical: 12, }}>
                            {/* <TouchableButton onPress={createPDF} type="savestoryphone" backgroundColor={TextColorGreen} text="Save" color="#FFF" /> */}
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    // disabled={}
                                    onPress={createPDF}
                                    style={{
                                        width: responsiveWidth(70),
                                        backgroundColor: TextColorGreen,
                                        // backgroundColor:  "red" : "green",
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

                        <SaveStoryBtn onPress={() => setIsVisiblePdf(false)} text="No" />

                    </View>
                </View>

                {saveStoryModalDownloading &&
                    <DownloadingFlow isVisibleDownloading={isVisibleDownloading} setIsVisibleDownloading={setIsVisibleDownloading} text="Story Time 
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

export default SaveAsPdf;
