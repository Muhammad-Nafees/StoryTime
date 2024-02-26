import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, progre, } from 'react-native'
import { ProgressBar } from "@react-native-community/progress-bar-android"
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder, } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../assets/Imagepaths/index";
import BackButton from '../BackButton';
import NavigationsString from '../../constants/NavigationsString';
import TouchableButton from '../TouchableButton';
import { useDispatch, useSelector } from 'react-redux';
import { Defs, G, Path, Rect, Svg } from 'react-native-svg';
import { useEffect, useState } from 'react';
import StoryTimeSaved from './StoryTimeSaved';
import { Inter_Regular } from '../../constants/GlobalFonts';



const DownloadingVideoModal = ({ isVisibleFirstVideoFlow, setIsVisibleFirstVideoFlow }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BGIMAGE_DOWNLOADING, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER,PLAY_STORY_TIME } = NavigationsString;
    const [saveStoryVideoModalAfterDownloading, setSaveStoryVideoModalAfterDownloading] = useState(false);
    const [isVisibleVideoAfterDownloading, setIsVisibleVideoAfterDownloading] = useState(false)
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const { user } = useSelector(state => state?.authSlice);
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setSaveStoryVideoModalAfterDownloading(true);
                    setIsVisibleVideoAfterDownloading(true);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 50);

        return () => {
            clearInterval(interval)
        };
    }, []);

    const backScreenHandler = () => {
       !user? navigation.navigate(PLAY_STORY_TIME):navigation.goBack(); //guest user doesn't have profile
    };


    return (
        <Modal onRequestClose={() => setIsVisibleFirstVideoFlow(false)} visible={isVisibleFirstVideoFlow}>

            <ImageBackground style={styles.container} source={BGIMAGE_DOWNLOADING}>

                <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => setIsVisibleFirstVideoFlow(false)} />
                </View>

                {/* Back Button */}

                <View style={{ flex: 1, justifyContent: "center", }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#FFF", width: responsiveWidth(80), height: responsiveHeight(10), justifyContent: "space-between", alignItems: "center", borderRadius: 4 }}>
                        <View style={{ width: responsiveWidth(80), justifyContent: "space-evenly", }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-around", }}>
                                <Text style={{ color: "#000", fontFamily: Inter_Regular.Inter_Regular, fontSize: responsiveFontSize(1.8) }}>Downloading Story Time</Text>
                                <Text style={{ color: "#000", fontWeight: "600" }}>{progress}%</Text>
                            </View>

                            <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(3) }}>
                                <ProgressBar styleAttr="Horizontal" indeterminate={false} style={{ color: "rgba(4, 120, 87, 1)", width: responsiveWidth(65) }} progress={progress / 100} />
                            </View>

                        </View>

                    </View>
                </View>

                {saveStoryVideoModalAfterDownloading &&
                    <StoryTimeSaved onPress={backScreenHandler} isVisible={isVisibleVideoAfterDownloading} setVisible={setIsVisibleVideoAfterDownloading} text="Story Time 
Successfully Saved to your phone!" textButton="Back" />
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
    }
});

export default DownloadingVideoModal;
