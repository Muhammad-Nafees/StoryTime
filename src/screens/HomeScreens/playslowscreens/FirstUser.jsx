import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../Styles/Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Voice from "@react-native-community/voice";
import UserNames from '../../../components/UserNames';
import { useDispatch, useSelector } from 'react-redux';
import { recordingData } from '../../../../store/slices/RecordingData';
import CustomPlayFlowButton from '../../../components/CustomPlayFlowButton';
import SaveStoryBtn from '../../../components/SaveStoryBtn';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';


const FirstUser = ({ route }) => {


    let longPressTimeout;
    const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;
    const navigation = useNavigation();
    const SCREENWIDTH = Dimensions.get("window").width;
    const [started, setStarted] = useState(false)
    const [ended, setEnded] = useState("")
    const [result, setResult] = useState("");
    // const [recordingText, setRecordingText] = useState([])
    const [isPressed, setIsPressed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timeText, setTimeText] = useState('02:00');
    const [IsRecording, setIsRecording] = useState(false)
    const [isLongPress, setIsLongPress] = useState(false);
    const addedUsers = useSelector(state => state.addPlayers.addFriends);
    const dispatch = useDispatch();
    const textrecordUsers = useSelector((state) => state.RecordingData.recordingText);
    const [currentDisplayUser, setCurrentDisplayUser] = useState(addedUsers[0]);
    const [isNextUser, setIsNextUser] = useState(addedUsers[1]);
    const [isNext, setIsNext] = useState(true);
    const [isFirstCall, setIsFirstCall] = useState(false);
    const [isCancelingStory, setisCancelingStory] = useState(true);
    const extendCount = route?.params?.extentCounting;

    console.log("textusers=====", textrecordUsers);


    const handleStart = () => {

        if (timeLeft !== 0) {
            setIsFirstCall(!isFirstCall)
            setIsPressed(true);
            startRecognizing();

            if (timeLeft === null) {
                setTimeLeft(120);
            };

            if (isFirstCall) {
                clearTimeout(longPressTimeout);
                setIsLongPress(false);
                setIsPressed(false);
                stopRecording();
                console.log("IN If cond")
            };

            if (timeLeft !== null && timeLeft > 0) {
                setisCancelingStory(false);
                setTimeLeft(null);
            };
            console.log("isfirstcall", isFirstCall)
        };
    };
    // Timer 2 Minutes ---------

    useEffect(() => {
        let countdown;
        if (extendCount) {
            setTimeLeft(extendCount);
        };
        if (timeLeft !== null && timeLeft > 0) {

            countdown = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

        } else if (timeLeft === 0) {
            clearTimeout(longPressTimeout);
            setIsLongPress(false);
            setIsPressed(false);
            stopRecording();
            clearInterval(countdown);
        };
        return () => clearInterval(countdown);

    }, [timeLeft, extendCount]);


    useEffect(() => {
        if (timeLeft === null) {
            setTimeText('02:00');
        } else {
            // Format time for display
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setTimeText(formattedTime);
        }
    }, [timeLeft]);

    // ----------XXXXXXXXXX----------

    useEffect(() => {
        Voice.onSpeechStart = onspeechStart;
        Voice.onSpeechEnd = onspeechEnd;
        Voice.onSpeechResults = onspeechResult;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    // onSpeechStart----------

    const onspeechStart = (e) => {
        // console.log(e);
        setStarted(true)
    };

    // onSpeechEnd----------

    const onspeechEnd = (e) => {
        // console.log(e);
        setEnded(e.value)
    };

    //---------- onSpeechResult----------

    const onspeechResult = (e) => {
        console.log("eeeee-", e)
        const text = e.value[0]
        dispatch(recordingData(text));
        if (text) {
            setResult(text);
        }
        console.log("text", text)
    }

    // ---------- Start Recording And Convert Text ----------

    const startRecognizing = async () => {
        try {
            await Voice.start('en-US');
            handlePressIn();
        } catch (error) {
            console.log("err", error);
        }
    };

    // -------- Stop Recording --------

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await Voice.stop();
        } catch (error) {
            console.error(error);
        }
    };

    //---------- Handle Press In ---------- 

    const handlePressIn = () => {
        longPressTimeout = setTimeout(() => {
            setIsLongPress(true);
        }, 1000);
    };

    // ---------- Handle Press out ----------

    // const handlePressOut = () => {
    //     clearTimeout(longPressTimeout);
    //     setIsLongPress(false);
    //     setIsPressed(false);
    //     stopRecording();
    // };

    const onPressNext = () => {

        const currentIndex = addedUsers.indexOf(currentDisplayUser);
        const nextIndex = (currentIndex + 1) % addedUsers.length;
        const nextPlayer = (currentIndex + 2) % addedUsers.length;

        if (currentIndex !== addedUsers?.length - 1) {
            setCurrentDisplayUser(addedUsers[nextIndex]);
            setIsNextUser(addedUsers[nextPlayer])
            navigation.navigate("FirstUserStorytext");
            if (nextIndex == addedUsers?.length - 1 && nextPlayer == 0) {
                return setIsNext(false);
            };

        } else {
            console.log("add players in Game Completed");
        }
    };



    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>

            {/* BACK BUTTON AND TIMER */}

            <View style={{ paddingVertical: moderateVerticalScale(18), paddingHorizontal: moderateScale(22) }}>
                <View style={{ paddingTop: responsiveWidth(5), flexDirection: "row", width: responsiveWidth(60), justifyContent: 'space-between', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: responsiveWidth(10), }}>
                        <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2.5), resizeMode: "center" }} source={require("../../../assets/back-playflowicon.png")} />
                    </TouchableOpacity>
                    <View>
                        {
                            isCancelingStory &&
                            <View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 10, borderWidth: 4, borderColor: "rgba(255, 153, 166, 1)", backgroundColor: 'rgba(255, 164, 164, 0.5)', paddingVertical: moderateVerticalScale(10), paddingHorizontal: moderateScale(12) }}>
                                <Text style={{ fontWeight: '600', color: TextColorGreen, fontSize: responsiveFontSize(1.9) }}>Time :{timeText}</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>



            <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={PLAYFLOW_FRAME}>
                <View activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: TextColorGreen, }]}>
                    <View style={{ borderRadius: 20, width: responsiveWidth(72), height: responsiveHeight(39), backgroundColor: "#EA89A7", alignItems: "center", justifyContent: "space-between", paddingBottom: responsiveWidth(6) }}>

                        <UserNames currentDisplayUser={currentDisplayUser} />

                        <ScrollView>
                            <View style={{ paddingHorizontal: moderateVerticalScale(35) }}>
                                <Text style={{ paddingTop: responsiveWidth(3), color: "#FFF", fontSize: responsiveFontSize(2.2), lineHeight: 20, textAlign: "center", fontFamily: PassionOne_Regular.passionOne }}>{result}</Text>
                            </View>
                        </ScrollView>

                        <View>
                            {
                                !started &&
                                <Text style={{ paddingHorizontal: moderateScale(32), lineHeight: moderateScale(22), color: "#FFF", fontSize: responsiveFontSize(2.1), textAlign: "center", fontFamily: PassionOne_Regular.passionOne }}> Hold microphone icon and share your story</Text>
                            }
                        </View>

                    </View>
                </View>
            </ImageBackground>

            <View style={{ paddingVertical: moderateVerticalScale(25), justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    handleStart();
                }}
                    activeOpacity={0.7} style={{ borderWidth: isPressed ? 6 : 0, borderColor: isPressed ? "#D04141" : TextColorGreen, backgroundColor: TextColorGreen, width: SCREENWIDTH * 0.32, height: SCREENWIDTH * 0.32, borderRadius: SCREENWIDTH / 2, justifyContent: 'center', alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../assets/mic.png")} />
                </TouchableOpacity>
            </View>

            {
                isNext &&
                <CustomPlayFlowButton onPress={onPressNext} isLongPress={isLongPress} backgroundColor={TextColorGreen} color="#FFF" timeLeft={timeLeft} isNextUser={isNextUser} isCancelingStory={isCancelingStory} />
            }

            <View style={{ paddingTop: responsiveWidth(6) }}>
                <SaveStoryBtn text="Save Story" color={TextColorGreen} />
            </View>

        </ImageBackground>

    )
};



const styles = StyleSheet.create({
    container: {
        // width: "100%",
        // height: "100%",
        flex: 1,
        backgroundColor: "#FFF"
    },
    backplay_flow: {
        marginLeft: "auto",
        width: responsiveWidth(95)
    },
    circle_container: {
        paddingVertical: moderateVerticalScale(10),
        justifyContent: "center",
        alignItems: "center"
    },
    sub_circle: {
        backgroundColor: TextColorGreen,
        borderRadius: responsiveWidth(60),
        height: responsiveHeight(41),
        justifyContent: "center",
        alignItems: "center"
    },
    img_dog: {
        width: responsiveWidth(21),
        height: responsiveHeight(10),
        resizeMode: "center"
    },
    start: {
        paddingVertical: moderateVerticalScale(8),
        color: PrimaryColor,
        fontWeight: "800",
        fontSize: responsiveFontSize(4.3)
    },
    img_backgroung_content: {
        width: responsiveWidth(100),
        height: responsiveHeight(45),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateVerticalScale(6)
    },
    bg_content: {
        // backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(76),
        height: responsiveHeight(42),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(1),
        // marginBottom: responsiveWidth(2.5)
    },

})

export default FirstUser;
