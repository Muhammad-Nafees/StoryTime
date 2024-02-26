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
import { Camera, getCameraFormat, useCameraDevices, useCameraDevice } from "react-native-vision-camera"
import SaveVideo from '../../../../components/SaveVideo';
import { checkVideoTrue, extendStoryCheckVideo, recordingVideo, saveRecordingVideoUser } from '../../../../../store/slices/RecordingData';
import { useDispatch, useSelector } from 'react-redux';
import CustomPlayFlowButton from '../../../../components/playFlow/CustomPlayFlowButton';
import CustomVideoPlayFlowButton from '../../../../components/playFlow/CustomVideoPlayFlowButton';
import SaveStoryBtn from '../../../../components/playFlow/SaveStoryBtn';
import { Inter_Regular } from '../../../../constants/GlobalFonts';
import GuestModals from '../../../../components/GuestModals';


const VideoFirstUser = () => {

    const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;
    const navigation = useNavigation();
    const SCREENWIDTH = Dimensions.get("window").width;
    const [started, setStarted] = useState(false)
    const [isPressed, setIsPressed] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [timeText, setTimeText] = useState('02:00');
    const [showCamera, setShowCamera] = useState(false)
    const [path, setPath] = useState("")
    const [isVisible, setIsVisible] = useState(false);
    const recordingVideo = useSelector(
        (state) => state.recordingData.saveRecordingVideo
    )
    const [currentCamera, setCurrentCamera] = useState('back');
    const addedUsers = useSelector(state => state.addPlayers.addFriends
    );
    const checkVideoisTrue = useSelector(
        state => state.recordingData.checkVideoTrueorFalse);
    const extendStoryCheckVideoTrue = useSelector(
        state => state.recordingData.extendStoryCheckVideo
    );
    const extendVideoCheck = useSelector(
        state => state.recordingData.extendVideo
    );
    const extendCountingVideo = useSelector(
        state => state.recordingData.extendCountingVideo
    );
    const { user } = useSelector(
        state => state?.authSlice
    );
    const [isNext, setIsNext] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isFirstCall, setIsFirstCall] = useState(false);
    const [isCancelingStory, setisCancelingStory] = useState(true);
    const [cameraPermission, setCameraPermission] = useState(false);
    const USER = user?.data?.user || user?.data;
    const sequenceUser = useMemo(() => [...addedUsers, (USER?._id && USER?.username && { "userid": USER?._id, username: USER?.username })], [USER, addedUsers],);
    const [currentDisplayUser, setCurrentDisplayUser] = useState(sequenceUser[0]);
    const [isNextUser, setIsNextUser] = useState(sequenceUser[1]);
    const cameraRef = useRef(null);
    const dispatch = useDispatch()
    const devices = Camera.getAvailableCameraDevices();
    const { SECOND_USER_STORY } = NavigationsString;
    const GuestModalRef = useRef(null);
    const GuestModalRefForAds = useRef(null);
    const USER_LENGTH_CHECK = sequenceUser?.length == 1;

    console.log("sequcenuserVIdeo====", sequenceUser);
    // const devices = useCameraDevice("back", {
    //     physicalDevices: ["ultra-wide-angle-camera"],
    // })

    const getCameraDetails = () => {
        return devices.find(camera => camera.position === currentCamera);
    };

    console.log("path---", path)
    console.log("recordingVideo---", recordingVideo);
    console.log("currentDisplayUser---", currentDisplayUser);
    // console.log("extend-video-check-true", extendStoryCheckVideoTrue)

    const activeCamera = getCameraDetails();


    const checkPermission = async () => {
        try {
            if (Platform.OS === 'android') {
                const cameraGranted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                );
                setCameraPermission(cameraGranted === PermissionsAndroid.RESULTS.GRANTED);
            } else if (Platform.OS === 'ios') {
                await Camera.requestCameraPermission();
                setCameraPermission(true);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    // const checkpermission = async () => {
    //     await Camera.requestCameraPermission()
    //     await Camera.requestMicrophonePermission()
    // }
    useEffect(() => {
        // checkpermission()
        checkPermission()
    }, []);


    // Timer 2 Minutes


    useEffect(() => {
        if (USER_LENGTH_CHECK) {
            setIsNext(false)
        };
        let countdown;
        if (timeLeft !== null && timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(countdown);
            setIsPressed(false);
            pauseRecordings();
            // dispatch(saveRecordingVideoUser(path))
            // stopRecordings();
            // pauseRecordings()
            // pauseRecordings()
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
        console.log("NEWCAMERA====", newCamera)
        setCurrentCamera(newCamera);
    };

    const recordVideos = useCallback(() => {
        if (!cameraRef.current) {
            return;
        }

        cameraRef.current.startRecording({
            videoCodec: 'h264',
            // videoBitRate: 'extra-low',
            onRecordingFinished: (video) => {
                const pathVideo = video.path;
                setPath(pathVideo)
                dispatch(saveRecordingVideoUser(pathVideo))
            },
            onRecordingError: (error) => console.error("ON-RECORD-ERR-----", error),
        });

    }, [cameraRef, path]);


    const stopRecordings = async () => {

        try {
            await cameraRef.current?.stopRecording();
            console.log("Stop-Recording-Function_Called")
        } catch (error) {
            console.log("RECORDINGESTOPErr------", error)
        }
        // setTimeLeft(null);
    };

    const resumeRecording = async () => {
        try {
            await cameraRef.current.resumeRecording()
            console.log("RESUME_REC--")
        } catch (error) {
            console.log("ERR-RESUME_REC--", error)
        }
    };


    const pauseRecordings = async () => {
        try {
            await cameraRef.current.pauseRecording();
            console.log("PAUSEERecording---")
        } catch (error) {
            console.log("PAUSEERR---", error)
        }
    };


    const saverecordingvideo = () => {
        setIsVisible(true);
        stopRecordings();
    };



    useFocusEffect(
        useCallback(() => {
            if (checkVideoisTrue) {
                const currentIndex = sequenceUser.indexOf(currentDisplayUser);
                const nextIndex = (currentIndex + 1) % sequenceUser.length;
                const nextPlayer = (currentIndex + 2) % sequenceUser.length;

                if (currentIndex !== addedUsers?.length) {
                    setCurrentDisplayUser(sequenceUser[nextIndex]);
                    setIsNextUser(sequenceUser[nextPlayer])
                    if (nextPlayer == 0 && timeLeft == 0) {
                        // stopRecordings();
                        // dispatch(saveRecordingVideoUser(path));
                        console.log("CALLED-STOP-RECORDING And----")
                        return setIsNext(false);
                    };

                } else {
                    console.log("add players in Game Completed");
                }
            }
        }, [checkVideoisTrue])
    );

    useFocusEffect(
        useCallback(() => {
            setIsActive(true)
            return () => {
                setIsActive(false)
            }
        }, [])
    );

    console.log("Is Active :", isActive);

    useFocusEffect(
        useCallback(() => {
            setTimeLeft(null);
            setIsPressed(false);
            dispatch(checkVideoTrue(false));
            return () => {
                dispatch(extendStoryCheckVideo(false));
                setIsFirstCall(false);
                setisCancelingStory(true);
            }
            // dispatch(extendStoryCheckVideo(false));
        }, [])
    );


    const handleStart = () => {

        if (timeLeft > 0) {
            dispatch(extendStoryCheckVideo(false));
            setisCancelingStory(false);
            setIsFirstCall(true);
            setIsPressed(false);
            setTimeLeft(0);
            console.log("CALLED CANCELING=============");
        };

        if (timeLeft == null) {

            if (extendStoryCheckVideoTrue == true) {
                resumeRecording();
                setIsPressed(true);
                setTimeLeft(30);
                console.log("EXTEND VIDEO----");
            } else if (extendVideoCheck == true) {
                resumeRecording();
                setIsPressed(true);
                setTimeLeft(30);
                console.log("RESUME VIDEO-----")
            };

            if (timeLeft == null && extendStoryCheckVideoTrue == null) {
                setIsPressed(true);
                setTimeLeft(30);
                recordVideos();
                console.log("START VIDEO-----")
            }
        }
    };



    const onpressNextHandler = () => {
        user ? navigation.navigate(SECOND_USER_STORY) : saveBtnHandler()
    };

    const modalOpen = (ref, heading, content, buttonText, text) => {
        if (ref.current) {
            ref.current.open(heading, content, buttonText, text);
        }
    }

    const saveBtnHandler = () => {
        if (!user) {
            modalOpen(
                GuestModalRef,
                'Get Story Time Premium',
                'Subscribe now to save your Story to your profile',
                'Subscribe',
                'Back',
            )
            return
        }
        saverecordingvideo()
    }

    return (
        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            {/* BACK BUTTON AND TIMER */}

            <ScrollView>

                <View style={{ paddingVertical: moderateVerticalScale(18), paddingHorizontal: moderateScale(22) }}>
                    <View style={{ paddingTop: responsiveWidth(5), flexDirection: "row", width: isCancelingStory ? responsiveWidth(60) : responsiveWidth(90), justifyContent: 'space-between', alignItems: "center" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: responsiveWidth(10), }}>
                            <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2.5), resizeMode: "center" }} source={require("../../../../assets/back-playflowicon.png")} />
                        </TouchableOpacity>
                        <View>

                            {
                                isCancelingStory ?
                                    (<View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 10, borderWidth: 4, borderColor: "rgba(255, 153, 166, 1)", backgroundColor: 'rgba(255, 164, 164, 0.5)', paddingVertical: moderateVerticalScale(10), paddingHorizontal: moderateScale(12) }}>
                                        <Text style={{ fontWeight: '600', color: TextColorGreen, fontSize: responsiveFontSize(1.9) }}>Time :{timeText}</Text>
                                    </View>
                                    ) : !user ? (
                                        <TouchableOpacity
                                            onPress={() => {
                                                modalOpen(
                                                    GuestModalRefForAds,
                                                    'Support Story Time',
                                                    'Watch the ad to \ncontinue playing',
                                                    'Watch ads',
                                                    'Subscribe for Ad FREE experience',
                                                )
                                            }}
                                            style={{
                                                borderRadius: 10,
                                                borderWidth: 4,
                                                borderColor: TextColorGreen,
                                                backgroundColor: TextColorGreen,
                                                paddingVertical: moderateVerticalScale(6),
                                                paddingHorizontal: moderateScale(25),
                                            }}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontWeight: '400',
                                                    fontSize: responsiveFontSize(1.9),
                                                    fontFamily: Inter_Regular.Inter_Regular,
                                                }}>
                                                Done
                                            </Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <></>
                                    )}

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
                                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999, justifyContent: "center", alignItems: "center" }}>
                                                {user ? (
                                                    <UserNames backgroundColor="rgba(0,0,0,0.5)" currentDisplayUser={currentDisplayUser} />
                                                ) : (
                                                    <></>
                                                )}
                                            </View>

                                            {cameraPermission && (
                                                <Camera
                                                    ref={cameraRef}
                                                    style={{ borderRadius: 50, width: responsiveWidth(72), height: responsiveHeight(40), }}
                                                    device={activeCamera}
                                                    isActive={isActive}
                                                    video={true}
                                                    resizeMode='cover'
                                                />
                                            )}

                                        </View>
                                    </>
                            }

                        </View>
                    </ImageBackground>

                    <TouchableOpacity onPress={toggleCamera} activeOpacity={0.7} style={{ position: "absolute", bottom: 0, right: 150, width: responsiveWidth(20), height: responsiveHeight(6), backgroundColor: "#4B7A84", justifyContent: "center", alignItems: "center" }}>
                        <Image style={{ width: responsiveWidth(7), height: responsiveHeight(3.5), resizeMode: "center" }} source={require("../../../../assets/camera-image.png")} />
                    </TouchableOpacity>

                </View>

                <View style={{ paddingVertical: moderateVerticalScale(25), justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity
                        disabled={isFirstCall ? true : false}
                        onPress={() => {
                            handleStart();
                        }}
                        activeOpacity={0.7} style={{ borderWidth: isPressed ? 6 : 0, borderColor: isPressed ? "#D04141" : TextColorGreen, backgroundColor: isFirstCall ? "rgba(87, 150, 164, 0.3)" : TextColorGreen, width: SCREENWIDTH * 0.32, height: SCREENWIDTH * 0.32, borderRadius: SCREENWIDTH / 2, justifyContent: 'center', alignItems: "center" }}>
                        <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../../assets/video-recording.png")} />
                        {/* <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../../../assets/mic.png")} /> */}
                    </TouchableOpacity>
                </View>

                {/* <View> */}

                {
                    isNext &&
                    <CustomVideoPlayFlowButton onPress={onpressNextHandler} backgroundColor={TextColorGreen} color="#FFF" timeLeft={timeLeft} isNextUser={isNextUser} />
                }
                 {
                    !user?
                    <CustomVideoPlayFlowButton onPress={onpressNextHandler} backgroundColor={TextColorGreen} color="#FFF" timeLeft={timeLeft} isNextUser={isNextUser} />:<></>
                }

                {/* <TouchableButton onPress={saverecordingvideo} text="Save Story" color={TextColorGreen} isNext={isNext} /> */}

                <View style={{ paddingTop: responsiveWidth(6),marginBottom:responsiveHeight(2)}}>
                    <SaveStoryBtn onPress={saveBtnHandler} text={!user ? "Save to phone" : "Save Story"} color={TextColorGreen} isNext={!user ? false : isNext} />
                </View>

                {
                    isVisible &&
                    <SaveVideo type="savevideo" isVisible={isVisible} setIsVisible={setIsVisible} path={path} />
                }
                <GuestModals ref={GuestModalRef} />
                <GuestModals ref={GuestModalRefForAds} onPress={saverecordingvideo} />
            </ScrollView>

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
