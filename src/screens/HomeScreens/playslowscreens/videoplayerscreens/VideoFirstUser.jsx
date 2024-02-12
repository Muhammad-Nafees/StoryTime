import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, PermissionsAndroid, SafeAreaView, Alert } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Img_Paths } from '../../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../../Styles/Style';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FeedChatFrame from '../../../../components/FeedChatFrame';
import TouchableButton from '../../../../components/TouchableButton';
import NavigationsString from '../../../../constants/NavigationsString';
import UserNames from '../../../../components/UserNames';
import { Camera, getCameraFormat, useCameraDevices, } from "react-native-vision-camera"
import SaveVideo from '../../../../components/SaveVideo';
import { checkVideoTrue, recordingVideo, saveRecordingVideoUser } from '../../../../../store/slices/RecordingData';
import { useDispatch, useSelector } from 'react-redux';
import CustomPlayFlowButton from '../../../../components/CustomPlayFlowButton';


const VideoFirstUser = () => {

    const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;
    const navigation = useNavigation();
    const SCREENWIDTH = Dimensions.get("window").width;
    const [started, setStarted] = useState(false)
    const [isPressed, setIsPressed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timeText, setTimeText] = useState('02:00');
    const [showCamera, setShowCamera] = useState(false)
    const [path, setPath] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const recordingVideo = useSelector((state) => state.recordingData.saveRecordingVideo)
    const [currentCamera, setCurrentCamera] = useState('back');
    const devices = Camera.getAvailableCameraDevices();
    const addedUsers = useSelector(state => state.addPlayers.addFriends);
    const checkVideoisTrue = useSelector(state => state.recordingData.checkVideoTrueorFalse);
    const [currentDisplayUser, setCurrentDisplayUser] = useState(addedUsers[0]);
    const [isNextUser, setIsNextUser] = useState(addedUsers[1]);
    const [isNext, setIsNext] = useState(true);
    const cameraRef = useRef(null);
    const dispatch = useDispatch()
    const { SECOND_USER_STORY } = NavigationsString

    const getCameraDetails = () => {
        return devices.find(camera => camera.position === currentCamera);
    };

    console.log("path---", path)
    console.log("recordingVideo---", recordingVideo);
    console.log("currentDisplayUser---", currentDisplayUser);

    const activeCamera = getCameraDetails();

    const checkpermission = async () => {
        await Camera.requestCameraPermission()
        await Camera.requestMicrophonePermission()
    }



    useEffect(() => {
        checkpermission()
    }, [])

    // Timer 2 Minutes

    useEffect(() => {
        let countdown;

        if (timeLeft !== null && timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(countdown);
            setIsPressed(false);
            // dispatch(saveRecordingVideoUser(path))
            stopRecording();
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

    // const handlePressOut = () => {
    //     setIsPressed(false);
    //     stopRecording()
    //     dispatch(recordingVideo(path))
    //     if (isPressed) {
    //         Alert.alert("Video Recorded Successfully")
    //     }
    // };

    useEffect(() => {
        setShowCamera(true)
    }, []);


    const toggleCamera = () => {
        const newCamera = currentCamera === 'back' ? 'front' : 'back';
        setCurrentCamera(newCamera);
    };

    const recordVideos = useCallback(() => {
        setIsPressed(true);
        if (!cameraRef.current) {
            return;
        }

        cameraRef.current.startRecording({
            videoBitRate: 'high',
            onRecordingFinished: (video) => {
                const pathVideo = video.path;
                setPath(pathVideo)
                dispatch(saveRecordingVideoUser(pathVideo))
            },
            onRecordingError: (error) => console.error("err", error),
        });

    }, [cameraRef, path]);

    const stopRecording = async () => {
        await cameraRef.current?.stopRecording();
        // setTimeLeft(null);
    };

    const saverecordingvideo = () => {
        setIsVisible(true)
    }

    const handleStart = () => {

        if (timeLeft == null) {
            setTimeLeft(15);
            recordVideos()
        }
    };

    const onpressNextHandler = () => {
        navigation.navigate(SECOND_USER_STORY)
    }


    useFocusEffect(
        useCallback(() => {
            if (checkVideoisTrue) {
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
        }, [checkVideoisTrue])
    )


    useFocusEffect(
        useCallback(() => {
            setTimeLeft(null);
            setIsPressed(false);
            dispatch(checkVideoTrue(false));
        }, [])
    );

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            {/* BACK BUTTON AND TIMER */}

            <Text style={{ marginBottom: 'auto', marginTop: "auto", alignSelf: 'center', fontWeight: 'bold', fontSize: 18 }}>Play Flow Coming Soon</Text>

            <View style={{ paddingVertical: moderateVerticalScale(18), paddingHorizontal: moderateScale(22) }}>
                <View style={{ paddingTop: responsiveWidth(5), flexDirection: "row", width: responsiveWidth(60), justifyContent: 'space-between', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: responsiveWidth(10), }}>
                        <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2.5), resizeMode: "center" }} source={require("../../../../assets/back-playflowicon.png")} />
                    </TouchableOpacity>
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 10, borderWidth: 4, borderColor: "rgba(255, 153, 166, 1)", backgroundColor: 'rgba(255, 164, 164, 0.5)', paddingVertical: moderateVerticalScale(10), paddingHorizontal: moderateScale(12) }}>
                            <Text style={{ fontWeight: '600', color: TextColorGreen, fontSize: responsiveFontSize(1.9) }}>Time :{timeText}</Text>
                        </View>
                    </View>
                </View>
            </View>


            <View>
                <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={PLAYFLOW_FRAME}>
                    <View activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: TextColorGreen, }]}>
                        {
                            !showCamera ?
                                <ImageBackground style={{ borderRadius: 20, width: responsiveWidth(72), height: responsiveHeight(39), backgroundColor: "#EA89A7", alignItems: "center", justifyContent: "space-between", paddingBottom: responsiveWidth(6) }} source={require("../../../../assets/bgImage-video.png")}>
                                    <UserNames backgroundColor="rgba(0,0,0,0.5)" />
                                    <View>
                                        {
                                            !activeCamera &&
                                            !started &&
                                            <Text style={{ paddingHorizontal: moderateScale(32), lineHeight: moderateScale(22), color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.1), textAlign: "center" }}> Hold microphone icon and share your story</Text>
                                        }
                                    </View>
                                </ImageBackground>
                                :
                                <>
                                    <View>
                                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999 }}>
                                            <UserNames backgroundColor="rgba(0,0,0,0.5)" currentDisplayUser={currentDisplayUser} />
                                        </View>

                                        <Camera
                                            ref={cameraRef}
                                            style={{ borderRadius: 50, width: responsiveWidth(72), height: responsiveHeight(40), }}
                                            device={activeCamera}
                                            isActive={true}
                                            video={true}
                                            resizeMode='cover'
                                            photo={true}
                                        />

                                    </View>
                                </>
                        }

                        {/* {
                             path&&(
                                <
                             )
                        } */}

                    </View>
                </ImageBackground>

                <TouchableOpacity onPress={toggleCamera} activeOpacity={0.7} style={{ position: "absolute", bottom: 0, right: 150, width: responsiveWidth(20), height: responsiveHeight(6), backgroundColor: "#4B7A84", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(7), height: responsiveHeight(3.5), resizeMode: "center" }} source={require("../../../../assets/camera-image.png")} />
                </TouchableOpacity>

            </View>

            <View style={{ paddingVertical: moderateVerticalScale(25), justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    handleStart();
                }}
                    activeOpacity={0.7} style={{ borderWidth: isPressed ? 6 : 0, borderColor: isPressed ? "#D04141" : TextColorGreen, backgroundColor: TextColorGreen, width: SCREENWIDTH * 0.32, height: SCREENWIDTH * 0.32, borderRadius: SCREENWIDTH / 2, justifyContent: 'center', alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../../assets/video-recording.png")} />
                    {/* <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../assets/mic.png")} /> */}
                </TouchableOpacity>
            </View>

            <View>
                {isNext &&
                    <CustomPlayFlowButton onPress={onpressNextHandler} backgroundColor={TextColorGreen} color="#FFF" timeLeft={timeLeft} isNextUser={isNextUser} />
                }
                <TouchableButton onPress={saverecordingvideo} text="Save Story" color={TextColorGreen} />
            </View>

            {
                isVisible &&
                <SaveVideo type="savevideo" isVisible={isVisible} setIsVisible={setIsVisible} path={path} />
            }


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
    cameraView: {
        flex: 1,
    },

})
export default VideoFirstUser;

