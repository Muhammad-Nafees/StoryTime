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



const DownloadingFlow = ({ isVisibleDownloading, setIsVisibleDownloading }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BGIMAGE_DOWNLOADING, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { FIRST_USER } = NavigationsString;
    const [saveStoryModalAfterDownloading, setSaveStoryModalAfterDownloading] = useState(false);
    const [isVisibleAfterDownloading, setIsVisibleAfterDownloading] = useState(false)
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    // setIsVisibleDownloading(false);
                    setSaveStoryModalAfterDownloading(true);
                    setIsVisibleAfterDownloading(true);
                    return 100;
                }
                return prevProgress + 1;
            });
        }, 50);

        return () => {
            clearInterval(interval)
        };
    }, []);


    const nextScreenmodalHandler = () => {
        navigation.goBack();
        console.log("FUNCTION CALLED");
    };

    return (
        <Modal onRequestClose={() => setIsVisibleDownloading(false)} visible={isVisibleDownloading} >

            {/* <View style={{ backgroundColor: "orange" }}> */}

            <ImageBackground style={styles.container} source={BGIMAGE_DOWNLOADING}>

                <View style={{ width: responsiveWidth(90), marginLeft: "auto", paddingTop: responsiveWidth(10) }}>
                    <BackButton onPress={() => setIsVisibleDownloading(false)} />
                </View>

                {/* Back Button */}

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ flexDirection: 'row', backgroundColor: "#FFF", width: responsiveWidth(85), height: responsiveHeight(9), justifyContent: "space-between" }}>

                        <View style={{ width: responsiveWidth(20), justifyContent: "center", alignItems: "center" }}>
                            {/* <Text style={{ color: "#000" }}>Pdf</Text> */}
                            <Svg width="24" height="35" viewBox="0 0 24 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <G clip-path="url(#clip0_141_91127)">
                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M4.5165 3.06738H15.0622L24 12.3835V30.5035C24 32.7734 22.1636 34.6099 19.9015 34.6099H4.5165C2.24658 34.6099 0.410156 32.7734 0.410156 30.5035V7.17372C0.410116 4.90381 2.24654 3.06738 4.5165 3.06738V3.06738Z" fill="#E5252A" />
                                    <Path opacity="0.302" fill-rule="evenodd" clip-rule="evenodd" d="M15.0566 3.06738V12.3126H24.0024L15.0566 3.06738Z" fill="white" />
                                    <Path d="M4.97656 26.6018V20.8403H7.42777C8.03467 20.8403 8.51546 21.0058 8.87801 21.3448C9.24056 21.6758 9.42186 22.1251 9.42186 22.6846C9.42186 23.2442 9.24056 23.6935 8.87801 24.0245C8.51546 24.3635 8.03467 24.529 7.42777 24.529H6.45044V26.6018H4.97656ZM6.45044 23.2758H7.26226C7.48293 23.2758 7.65633 23.2285 7.77458 23.1182C7.89279 23.0157 7.95588 22.8738 7.95588 22.6847C7.95588 22.4955 7.89283 22.3537 7.77458 22.2512C7.65637 22.1408 7.48297 22.0936 7.26226 22.0936H6.45044V23.2758ZM10.0287 26.6018V20.8403H12.0701C12.472 20.8403 12.8504 20.8955 13.205 21.0137C13.5597 21.1319 13.8829 21.2975 14.1666 21.5261C14.4503 21.7467 14.6789 22.0462 14.8444 22.4246C15.002 22.8029 15.0888 23.2364 15.0888 23.725C15.0888 24.2058 15.0021 24.6393 14.8444 25.0176C14.6789 25.3959 14.4503 25.6954 14.1666 25.9161C13.8828 26.1447 13.5597 26.3102 13.205 26.4284C12.8504 26.5466 12.472 26.6018 12.0701 26.6018H10.0287ZM11.4711 25.3487H11.8967C12.1252 25.3487 12.338 25.325 12.5351 25.2698C12.7242 25.2147 12.9055 25.128 13.0789 25.0098C13.2444 24.8916 13.3784 24.726 13.473 24.5053C13.5676 24.2847 13.6149 24.0245 13.6149 23.725C13.6149 23.4176 13.5676 23.1576 13.473 22.9369C13.3784 22.7162 13.2444 22.5507 13.0789 22.4325C12.9055 22.3142 12.7243 22.2275 12.5351 22.1724C12.338 22.1172 12.1252 22.0935 11.8967 22.0935H11.4711V25.3487ZM15.8296 26.6018V20.8403H19.9281V22.0935H17.3035V23.0157H19.4V24.261H17.3035V26.6018H15.8296Z" fill="white" />
                                </G>
                            </Svg>
                        </View>

                        <View style={{ width: responsiveWidth(65), justifyContent: "space-around", }}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-around", }}>
                                <Text style={{ color: "#000" }}>Downloading Story Time</Text>
                                <Text style={{ color: "#000" }}>{progress}%</Text>
                            </View>

                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {/* <View style={{ width: responsiveWidth(50), height: 4, backgroundColor: "rgba(4, 120, 87, 1)" }} /> */}
                                <ProgressBar styleAttr="Horizontal" indeterminate={false} style={{ color: "rgba(4, 120, 87, 1)", width: responsiveWidth(60) }} progress={progress / 100} />
                            </View>

                        </View>

                    </View>
                </View>

                {saveStoryModalAfterDownloading &&
                    <StoryTimeSaved
                        onPress={nextScreenmodalHandler}
                        isVisible={isVisibleAfterDownloading}
                        setVisible={setIsVisibleAfterDownloading}
                        text="Story Time 
Successfully Saved to your phone!"
                        textButton="Back" />
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

export default DownloadingFlow;
