import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../Styles/Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import FeedChatFrame from '../../../components/FeedChatFrame';
import TouchableButton from '../../../components/TouchableButton';
import Voice from "@react-native-voice/voice";
import NavigationsString from '../../../constants/NavigationsString';
import UserNames from '../../../components/UserNames';

const ThirdUser = () => {

    let longPressTimeout;
    const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;
    const { THIRD_EXTEND_STORY } = NavigationsString
    const navigation = useNavigation();
    const SCREENWIDTH = Dimensions.get("window").width;
    const [started, setStarted] = useState(false)
    const [ended, setEnded] = useState("")
    const [result, setResult] = useState([])
    const [isPressed, setIsPressed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timeText, setTimeText] = useState('02:00');
    const [IsRecording, setIsRecording] = useState(false)
    const [isLongPress, setIsLongPress] = useState(false);

    const handleStart = () => {
        setTimeLeft(120); // Set initial time to 120 seconds (2 minutes) on button press
        startRecognizing()
    };

    // Timer 2 Minutes
    useEffect(() => {
        let countdown;

        if (timeLeft !== null && timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(countdown);
        }

        return () => clearInterval(countdown); // Cleanup interval on unmount or change
    }, [timeLeft]);

    useEffect(() => {
        if (timeLeft === null) {
            // Display default time when countdown is not started
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

    // onSpeechStart-----------

    const onspeechStart = (e) => {
        console.log(e);
        setStarted(true)
    };

    // onSpeechEnd-----------

    const onspeechEnd = (e) => {
        console.log(e);
        setEnded(e.value)
    };

    // onSpeechResult----------

    const onspeechResult = (e) => {
        setResult(e.value[0])
    };

    // Start Recording And Convert Text----------

    const startRecognizing = async () => {
        try {
            await Voice.start('en-US');
            handlePressIn()
        } catch (error) {
            console.log("err", error);
        }
    };

    // Stop Recording---------

    const stopRecording = async () => {
        setIsRecording(false)
        try {
            await Voice.stop();
        } catch (error) {
            console.error(error);
        }
    };

    // Handle Press In----------

    const handlePressIn = () => {
        longPressTimeout = setTimeout(() => {
            setIsLongPress(true);
            // Perform actions or start voice recognition on long press
        }, 1000); // Set your desired duration for long press
    };

    // Handle Press out----------

    const handlePressOut = () => {
        clearTimeout(longPressTimeout);
        setIsLongPress(false);
        setIsPressed(false);
        stopRecording()
    };



    const onPressnext = () => {
        navigation.navigate(THIRD_EXTEND_STORY)
    }



    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>

            {/* BACK BUTTON AND TIMER */}

            <View style={{ paddingVertical: moderateVerticalScale(18), paddingHorizontal: moderateScale(22) }}>
                <View style={{ paddingTop: responsiveWidth(5), flexDirection: "row", width: responsiveWidth(60), justifyContent: 'space-between', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: responsiveWidth(10), }}>
                        <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2.5), resizeMode: "center" }} source={require("../../../assets/back-playflowicon.png")} />
                    </TouchableOpacity>
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 10, borderWidth: 4, borderColor: "rgba(255, 153, 166, 1)", backgroundColor: 'rgba(255, 164, 164, 0.5)', paddingVertical: moderateVerticalScale(10), paddingHorizontal: moderateScale(12) }}>
                            <Text style={{ fontWeight: '600', color: TextColorGreen, fontSize: responsiveFontSize(1.9) }}>Time :{timeText}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={PLAYFLOW_FRAME}>
                <View activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: TextColorGreen, }]}>
                    <View style={{ borderRadius: 20, width: responsiveWidth(72), height: responsiveHeight(39), backgroundColor: "#EA89A7", alignItems: "center", justifyContent: "space-between", paddingBottom: responsiveWidth(6) }}>

                        <UserNames username="@alfred" />

                        <ScrollView>
                            <View style={{ paddingHorizontal: moderateVerticalScale(35) }}>
                                <Text style={{ paddingTop: responsiveWidth(3), color: "#FFF", fontSize: responsiveFontSize(2.1), lineHeight: 20, fontWeight: "700", textAlign: "center" }}>{result}</Text>
                            </View>
                        </ScrollView>

                        <View>
                            {
                                !started &&
                                <Text style={{ paddingHorizontal: moderateScale(32), lineHeight: moderateScale(22), color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.1), textAlign: "center" }}> Hold microphone icon and share your story</Text>
                            }
                        </View>

                    </View>
                </View>
            </ImageBackground>

            <View style={{ paddingVertical: moderateVerticalScale(25), justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onLongPress={() => {
                    setIsPressed(true);
                    handleStart();
                }}
                    onPressOut={handlePressOut}
                    activeOpacity={0.7} style={{ borderWidth: isPressed ? 6 : 0, borderColor: isPressed ? "#D04141" : TextColorGreen, backgroundColor: TextColorGreen, width: SCREENWIDTH / 3, height: responsiveHeight(15), borderRadius: responsiveWidth(50), justifyContent: 'center', alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../assets/mic.png")} />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableButton onPress={onPressnext} isLongPress={isLongPress} text="Next Player: @oliverpierce" backgroundColor={TextColorGreen} color="#FFF" />
                <TouchableButton text="Save Story" color={TextColorGreen} />
            </View>


        </ImageBackground>
    )
};



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
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
export default ThirdUser;

