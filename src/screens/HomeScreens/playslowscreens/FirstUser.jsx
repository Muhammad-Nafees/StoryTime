import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../Styles/Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Voice from "@react-native-voice/voice";
import UserNames from '../../../components/UserNames';
import { useDispatch, useSelector } from 'react-redux';
import { recordingData, resetRecordingData } from '../../../../store/slices/RecordingData';
import CustomPlayFlowButton from '../../../components/playFlow/CustomPlayFlowButton';
import SaveStoryBtn from '../../../components/playFlow/SaveStoryBtn';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import SaveStory from '../../../components/playFlow/SaveStory';
import SaveStoryPhone from '../../../components/playFlow/SaveStoryPhone';
import { checkTrueOrFalse, extendStoryCheck } from '../../../../store/slices/addplayers/addPlayersSlice';
import { SCREEN_HEIGHT } from '../../../constants/Constant';


const FirstUser = ({ route }) => {


    let longPressTimeout;
    const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;
    const navigation = useNavigation();
    const SCREENWIDTH = Dimensions.get("window").width;
    const [started, setStarted] = useState(false)
    const [ended, setEnded] = useState("")
    const [isPressed, setIsPressed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timeText, setTimeText] = useState('02:00');
    const [IsRecording, setIsRecording] = useState(false)
    const [isLongPress, setIsLongPress] = useState(false);
    const addedUsers = useSelector(state => state.addPlayers.addFriends);
    const checkUserTrueorFalse = useSelector(state => state.addPlayers.checkTrueOrFalse);
    const extendCounting = useSelector(state => state?.addPlayers?.extendCounting);
    const extendStoryTrueOrFalse = useSelector(state => state?.addPlayers?.extendStoryCheck);
    const dispatch = useDispatch();
    const textrecordUsers = useSelector((state) => state?.recordingData?.recordingText);
    const [recordingText, setRecordingText] = useState([])
    const [currentDisplayUser, setCurrentDisplayUser] = useState(addedUsers[0]);
    const [isNextUser, setIsNextUser] = useState(addedUsers[1]);
    const [isNext, setIsNext] = useState(true);
    const [isFirstCall, setIsFirstCall] = useState(false);
    const [isCancelingStory, setisCancelingStory] = useState(true);
    const [saveStoryModal, setSaveStoryModal] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [partialResults, setPartialResults] = useState([]);
    const profileUsersStories = useSelector((state) => state?.recordingData?.saveDatatoProfile);
    const checkTrue = route?.params?.checkValue;
    console.log("profileusers", profileUsersStories);
    console.log("ended====", ended)
    // const isEmptyArray = route?.params?.isEmptyArray;

    // console.log("displayuser--", currentDisplayUser)
    console.log("textrecordUsers=====", textrecordUsers);
    // const IdUsers = addedUsers.map((item) => item?.userid)
    // console.log("checkUserTrueorFalse=====", checkUserTrueorFalse);

    // console.log("isEmptyArray=====", isEmptyArray);

    console.log("extendStoryTrueOrFalse=====", extendStoryTrueOrFalse);
    const stringText = recordingText.toString();
    // Remove commas from the string
    const cleanedText = stringText.replace(/,/g, "");
    // Output the cleaned text
    console.log("cleanedText=====", cleanedText)


    const handleStart = () => {
        if (timeLeft !== 0) {
            // setIsFirstCall(!isFirstCall)
            setIsPressed(true);
            if (timeLeft === null) {
                startRecognizing();
                setTimeLeft(30);
            };

            // console.log("isFirstCall-----", isFirstCall);

            if (isFirstCall) {
                clearTimeout(longPressTimeout);
                setIsLongPress(false);
                setIsPressed(false);
                stopRecording();
                console.log("STOP RECORDING-----")
            };

            if (timeLeft !== null && timeLeft > 0) {
                setisCancelingStory(false);
                setIsFirstCall(true);
                setTimeLeft(0);
            };

        };
    };

    // Timer 2 Minutes ---------

    useEffect(() => {
        let countdown;
        if (extendStoryTrueOrFalse && timeLeft == null) {
            setTimeLeft(extendCounting);
            // handleStart();
            startRecognizing();
            setIsPressed(true);
        }

        if (extendStoryTrueOrFalse === false && timeLeft == null) {
            setRecordingText([]);
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

    }, [timeLeft,]);


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
        Voice.onSpeechPartialResults = onSpeechPartialResults
        Voice.onSpeechRecognized = onSpeechRecognized

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);


    // onSpeechStart----------

    const onspeechStart = (e) => {
        console.log("START SPEECH CALLED---", e)
        setStarted(true)
    };

    // onSpeechEnd ----------

    const onspeechEnd = (e) => {
        setEnded(e.value)
        console.log("SPEECH END CALLED----", e)
    };

    //---------- onSpeechResult----------

    const onspeechResult = useCallback((e) => {
        console.log("ON SPEECH RESULT-----------", e);
        // const text = e?.value[0];

        // dispatch(recordingData(text));
        // if (text) {
        //     setRecordingText((prevVal) => [...prevVal, ...text]);
        // }
    }, [dispatch]);

    const onSpeechPartialResults = (e) => {
        const text = e?.value[0];
        console.log("text======Voice", e?.value[0]);
        console.log("recordingTextState====", recordingText)
        dispatch(recordingData(e?.value[0]));

        if (e?.value[0]) {
            setRecordingText((prevVal) => [...prevVal, e?.value[0]]);
        }
        console.log('onSpeechPartialResults: ', e);
        setPartialResults(e.value);


        const combinedText = e.value.join(" ");
        // Combined text ko split karna taki har word ko alag karein
        const words = combinedText.split(" ");
        // Duplicate entries ko hata kar ek naya array banana
        const uniqueWords = [];

    };


    const onSpeechRecognized = (e) => {
        console.log("onSpeechRecognized", e)
    };

    useFocusEffect(
        useCallback(() => {
            setTimeLeft(null);
            setIsPressed(false);
            dispatch(checkTrueOrFalse(false));
            return () => {
                setIsFirstCall(false);
                setisCancelingStory(true);
            }
        }, [])
    );

    // ---------- Start Recording And Convert Text ----------


    const startRecognizing = async () => {
        const options = { EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 10000, }
        try {
            await Voice.start('en-US', options);
            handlePressIn();
            console.log("Start Recognizing Value====")
        } catch (error) {
            console.log("err", error);
        }
    };



    // const startRecognizing = async () => {
    //     try {
    //         await Voice.start('en-US', {
    //             "RECOGNIZER_ENGINE": "GOOGLE",
    //             "EXTRA_PARTIAL_RESULTS": true
    //         });
    //         handlePressIn();
    //         console.log("Start Recognizing Value====")
    //     } catch (error) {
    //         console.log("err", error);
    //     }
    // };


    // useEffect(() => {

    // }, [])

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

    const onPressNext = () => {
        navigation.navigate("FirstUserStorytext");
    };


    useFocusEffect(
        useCallback(() => {
            if (checkUserTrueorFalse) {
                const currentIndex = addedUsers.indexOf(currentDisplayUser);
                const nextIndex = (currentIndex + 1) % addedUsers.length;
                const nextPlayer = (currentIndex + 2) % addedUsers.length;

                if (currentIndex !== addedUsers?.length - 1) {
                    setCurrentDisplayUser(addedUsers[nextIndex]);
                    setIsNextUser(addedUsers[nextPlayer])
                    if (nextIndex == addedUsers?.length - 1 && nextPlayer == 0) {
                        return setIsNext(false);
                    };

                } else {
                    console.log("add players in Game Completed");
                }
            }
        }, [checkUserTrueorFalse])
    );


    const saveStoryhandler = () => {
        setSaveStoryModal(true);
        setVisible(true); // Set isVisible to true to open the modal
    };


    return (
        <>

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


                <ImageBackground style={[styles.img_backgroung_content,]} resizeMode="center" source={PLAYFLOW_FRAME}>
                    <View activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: TextColorGreen, }]}>
                        <View style={{ borderRadius: 20, width: responsiveWidth(69), height: responsiveHeight(39), backgroundColor: "#EA89A7", alignItems: "center", justifyContent: "space-between", paddingBottom: responsiveWidth(6) }}>

                            <UserNames currentDisplayUser={currentDisplayUser} />

                            <ScrollView>
                                <View style={{ paddingHorizontal: moderateVerticalScale(35) }}>
                                    <Text style={{ paddingTop: responsiveWidth(3), color: isFirstCall ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,1)", fontSize: responsiveFontSize(2.2), lineHeight: 20, textAlign: "center", fontFamily: PassionOne_Regular.passionOne, }}>{cleanedText}</Text>
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

                <View style={{ height: responsiveHeight(35) }}>
                    <View style={{ paddingVertical: moderateVerticalScale(25), justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity
                            disabled={isFirstCall ? true : false}
                            onPress={() => {
                                handleStart();
                            }}
                            activeOpacity={0.7} style={{ borderWidth: isPressed ? 6 : 0, borderColor: isPressed ? "#D04141" : TextColorGreen, backgroundColor: isFirstCall ? "rgba(87, 150, 164, 0.3)" : TextColorGreen, width: SCREENWIDTH * 0.32, height: SCREENWIDTH * 0.32, borderRadius: SCREENWIDTH / 2, justifyContent: 'center', alignItems: "center" }}>
                            <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../assets/mic.png")} />
                        </TouchableOpacity>
                    </View>

                    {
                        isNext &&
                        <CustomPlayFlowButton onPress={onPressNext} isLongPress={isLongPress} backgroundColor={TextColorGreen} color="#FFF" timeLeft={timeLeft} isNextUser={isNextUser} isCancelingStory={isCancelingStory} />
                    }

                    <View style={{ paddingTop: responsiveWidth(6) }}>
                        <SaveStoryBtn onPress={saveStoryhandler} text="Save Story" color={TextColorGreen} isNext={isNext} />
                    </View>

                    {
                        saveStoryModal && (
                            <SaveStoryPhone isVisible={isVisible} setIsVisible={setVisible} />
                        )
                    }
                </View>


            </ImageBackground>

        </>
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
        // width: responsiveWidth(90),
        height: SCREEN_HEIGHT * 0.42,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateVerticalScale(6),
        // backgroundColor: "orange"
    },
    bg_content: {
        // backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(74),
        height: responsiveHeight(42),
        marginLeft: responsiveWidth(0.9),
        // marginRight: responsiveWidth(2),
        marginTop: responsiveWidth(1),
        // marginBottom: responsiveWidth(2.5)
    },
});

export default FirstUser;
