import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, progre, } from 'react-native'
import { ProgressBar } from "@react-native-community/progress-bar-android"
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder, } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from "../../assets/Imagepaths/index";
import BackButton from '../BackButton';
import NavigationsString from '../../constants/NavigationsString';
import CustomButton from '../reusable-components/CustomButton/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { Defs, G, Path, Rect, Svg } from 'react-native-svg';
import { useEffect, useState } from 'react';
import StoryTimeSaved from './StoryTimeSaved';
import { Inter_Regular } from '../../constants/GlobalFonts';
import { resetFriends } from '../../../store/slices/addplayers/addPlayersSlice';



const DownloadingVideoModal = ({ isVisibleFirstVideoFlow, setIsVisibleFirstVideoFlow }) => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, BGIMAGE_DOWNLOADING, NEXT_PLAYER_IMG } = Img_Paths;
    const SCREENWIDTH = Dimensions.get("window").width
    const SCREENHEIGHT = Dimensions.get("window").height;
    const { VIDEO_SECOND_USER, FIRST_USER, PLAY_STORY_TIME } = NavigationsString;
    const [saveStoryVideoModalAfterDownloading, setSaveStoryVideoModalAfterDownloading] = useState(false);
    const [isVisibleVideoAfterDownloading, setIsVisibleVideoAfterDownloading] = useState(false)
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const { user } = useSelector(state => state?.authSlice);
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch()


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
        !user ? navigation.navigate(PLAY_STORY_TIME) : navigation.navigate("Home");
        dispatch(resetFriends());
        setTimeout(() => { //TEMP HACK
            setIsVisibleFirstVideoFlow(false);
        }, 1000);
    };

    return (
        <>
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

                </ImageBackground>
            </Modal>

            {saveStoryVideoModalAfterDownloading &&
                <StoryTimeSaved
                    onPress={backScreenHandler}
                    isVisible={isVisibleVideoAfterDownloading}
                    setVisible={setIsVisibleVideoAfterDownloading}
                    text={`Story Time\nSuccessfully Saved to your\nphone!`}
                    textButton="Back" />
            }
        </>
    )
};



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
});

export default DownloadingVideoModal;
