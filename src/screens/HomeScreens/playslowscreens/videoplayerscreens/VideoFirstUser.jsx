import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Img_Paths } from '../../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FeedChatFrame from '../../../../components/FeedChatFrame';
import TouchableButton from '../../../../components/TouchableButton';
import NavigationsString from '../../../../constants/NavigationsString';
import UserNames from '../../../../components/UserNames';
import {
  Camera,
  getCameraFormat,
  useCameraDevices,
  useCameraDevice,
} from 'react-native-vision-camera';
import SaveVideo from '../../../../components/SaveVideo';
import {
  checkVideoTrue,
  extendStoryCheckVideo,
  saveRecordingVideoUser,
} from '../../../../../store/slices/RecordingData';
import { useDispatch, useSelector } from 'react-redux';
import CustomPlayFlowButton from '../../../../components/playFlow/CustomPlayFlowButton';
import CustomVideoPlayFlowButton from '../../../../components/playFlow/CustomVideoPlayFlowButton';
import SaveStoryBtn from '../../../../components/playFlow/SaveStoryBtn';
import { Inter_Regular } from '../../../../constants/GlobalFonts';
import GuestModals from '../../../../components/GuestModals';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../../../constants/Constant';
import LinearGradient from 'react-native-linear-gradient';


const VideoFirstUser = () => {
  //destructures
  const { SECOND_USER_STORY, PLAY_STORY_TIME } = NavigationsString;
  const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;

  //hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //redux states
  const recordingVideo = useSelector(
    state => state.recordingData.saveRecordingVideo,
  );
  const [currentCamera, setCurrentCamera] = useState('back');
  const addedUsers = useSelector(state => state.addPlayers.addFriends);
  const checkVideoisTrue = useSelector(
    state => state.recordingData.checkVideoTrueorFalse,
  );
  const extendStoryCheckVideoTrue = useSelector(
    state => state.recordingData.extendStoryCheckVideo,
  );
  const extendVideoCheck = useSelector(
    state => state.recordingData.extendVideo,
  );
  const extendCountingVideo = useSelector(
    state => state.recordingData.extendCountingVideo,
  );
  const { user } = useSelector(state => state?.authSlice);

  const nextRandomValueVideo = useSelector(
    state => state?.addPlayers?.nextRandomNumberVideo,
  );

  const nextRandomValueVideoExtend = useSelector(
    state => state?.addPlayers?.nextRandomNumberVideoExtend,
  );
  const sequenceUser = useSelector(state => state.addPlayers?.gameFriends);

  //dependant consts
  // const sequenceUser = useMemo(
  //   () => [
  //     ...addedUsers,
  //     USER?._id &&
  //     USER?.username && { userid: USER?._id, username: USER?.username },
  //   ],
  //   [USER, addedUsers],
  // );



  //states
  const [started, setStarted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timeText, setTimeText] = useState('02:00');
  const [showCamera, setShowCamera] = useState(false);
  const [path, setPath] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [isNext, setIsNext] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isCancelingStory, setisCancelingStory] = useState(true);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [currentDisplayUser, setCurrentDisplayUser] = useState(sequenceUser[0]);
  const [isNextUser, setIsNextUser] = useState(sequenceUser[1]);

  //refs

  const cameraRef = useRef(null);
  const GuestModalRef = useRef(null);
  const GuestModalRefForAds = useRef(null);

  //init helper function
  const getCameraDetails = () => {
    return devices.find(camera => camera.position === currentCamera);
  };

  //consts
  const devices = Camera.getAvailableCameraDevices();
  const USER = user?.data?.user || user?.data;
  const isUserGuest = useMemo(() => !user, [user]);
  const USER_LENGTH_CHECK = sequenceUser?.length == 1;
  const activeCamera = getCameraDetails();
  const SHOW_DONE_BTN =
    (timeText === '00:00' && isUserGuest) || (!isCancelingStory && isUserGuest);

  //effects---

  useEffect(() => {
    checkPermission();
  }, []);

  // Timer 2 Minutes

  useEffect(() => {
    if (USER_LENGTH_CHECK) {
      setIsNext(false);
    }
    let countdown;
    if (timeLeft !== null && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(countdown);
      setIsPressed(false);
      pauseRecordings();
    }

    return () => clearInterval(countdown); // Cleanup interval on unmount or change
  }, [timeLeft]);

  useEffect(() => {
    if (extendVideoCheck == true && timeLeft === null) {
      // Display default time when countdown is not started
      setTimeText('00:30');
    } else if (timeLeft == null) {
      setTimeText('02:00');
    } else {
      // Format time for display
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
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
    setShowCamera(true);
  }, []);

  // useFocusEffect(
  //     useCallback(() => {

  useEffect(() => {
    setTimeLeft(null);

    if (
      extendStoryCheckVideoTrue === false ||
      extendStoryCheckVideoTrue === true
    ) {
      setTimeLeft(null);
      setIsPressed(false);
      setIsFirstCall(false);
    };

    if (checkVideoisTrue) {

      const currentIndex = sequenceUser.indexOf(currentDisplayUser);
      const nextIndex = (currentIndex + 1) % sequenceUser.length;
      const nextPlayer = (currentIndex + 2) % sequenceUser.length;

      if (currentIndex !== addedUsers?.length) {
        setCurrentDisplayUser(sequenceUser[nextIndex]);
        setIsNextUser(sequenceUser[nextPlayer]);
        if (nextPlayer == 0 && timeLeft == 0) {
          // stopRecordings();
          // dispatch(saveRecordingVideoUser(path));
          console.log('CALLED-STOP-RECORDING And----');
          return setIsNext(false);
        }
      } else {
        console.log('add players in Game Completed');
      }
    }
    return () => {
      setisCancelingStory(true);
    };
  }, [checkVideoisTrue, nextRandomValueVideo, nextRandomValueVideoExtend]);


  //     }, [checkVideoisTrue])
  // );

  useFocusEffect(
    useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, []),
  );



  const checkPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        setCameraPermission(
          cameraGranted === PermissionsAndroid.RESULTS.GRANTED,
        );
      } else if (Platform.OS === 'ios') {
        await Camera.requestCameraPermission();
        setCameraPermission(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const toggleCamera = () => {
    const newCamera = currentCamera === 'back' ? 'front' : 'back';
    setCurrentCamera(newCamera);
  };

  const recordVideos = useCallback(() => {
    if (!cameraRef.current) {
      return;
    }
    console.log('RECORDING STARTED');

    cameraRef.current.startRecording({
      videoCodec: 'h264',
      // videoBitRate: 'extra-low',
      onRecordingFinished: video => {
        const pathVideo = video.path;
        console.log(video, 'VIDEO');
        setPath(pathVideo);
        dispatch(saveRecordingVideoUser(pathVideo));
      },
      onRecordingError: error => console.error('ON-RECORD-ERR-----', error),
    });
  }, [cameraRef, path]);

  const stopRecordings = async () => {
    try {
      await cameraRef.current?.stopRecording();
      console.log('Stop-Recording-Function_Called');
    } catch (error) {
      console.log('RECORDINGESTOPErr------', error);
    }
  };

  const resumeRecording = async () => {
    try {
      await cameraRef.current.resumeRecording();
      console.log('RESUME_REC--');
    } catch (error) {
      console.log('ERR-RESUME_REC--', error);
    }
  };

  const pauseRecordings = async () => {
    try {
      await cameraRef.current.pauseRecording();
      console.log('PAUSEERecording---');
    } catch (error) {
      console.log('PAUSEERR---', error);
    }
  };

  const saverecordingvideo = () => {
    setIsVisible(true);
    stopRecordings();
  };


  const pressHandlerIn = () => {
    if (timeLeft === null) {
      if (extendStoryCheckVideoTrue == true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(120);
      } else if (extendVideoCheck == true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(30);
        console.log('RESUME VIDEO-----');
      };
      if (timeLeft == null && extendStoryCheckVideoTrue == null) {
        setIsPressed(true);
        setTimeLeft(120);
        recordVideos();
        console.log('START VIDEO-----');
      }
    }
  };



  const pressHandlerOut = () => {
    if (timeLeft > 0) {
      dispatch(extendStoryCheckVideo(false));
      setisCancelingStory(false);
      setIsFirstCall(true);
      setIsPressed(false);
      setTimeLeft(0);
    };

    if (timeLeft === null) {
      if (extendStoryCheckVideoTrue === true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(30);
        console.log('EXTEND VIDEO----');
      } else if (extendVideoCheck === true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(30);
        console.log('RESUME VIDEO-----');
      }
    }
  };

  const onpressNextHandler = () => {
    user ? navigation.navigate(SECOND_USER_STORY) : saveBtnHandler();
  };

  const modalOpen = (ref, heading, content, buttonText, text) => {
    if (ref.current) {
      ref.current.open(heading, content, buttonText, text);
    }
  };

  const saveBtnHandler = () => {
    if (isUserGuest) {
      modalOpen(
        GuestModalRef,
        'Get Story Time Premium',
        'Subscribe now to save your Story to your profile',
        'Subscribe',
        'Back',
      );
      return;
    }
    saverecordingvideo();
  };

  return (
    <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
      {/* BACK BUTTON AND TIMER */}

      <ScrollView>
        <View
          style={{
            paddingVertical: moderateVerticalScale(18),
            paddingHorizontal: moderateScale(22),
          }}>
          <View
            style={{
              paddingTop: responsiveWidth(5),
              flexDirection: 'row',
              // width: isCancelingStory
              //   ? responsiveWidth(60)
              //   : responsiveWidth(90),
              width: SCREEN_WIDTH - moderateScale(22) * 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  width: responsiveWidth(5),
                  height: responsiveHeight(2.5),
                  resizeMode: 'center',
                }}
                source={require('../../../../assets/back-playflowicon.png')}
              />
            </TouchableOpacity>

            <View>
              {SHOW_DONE_BTN ? (
                <TouchableOpacity
                  onPress={() => {
                    modalOpen(
                      GuestModalRefForAds,
                      'Support Story Time',
                      'Watch the ad to \ncontinue playing',
                      'Watch ads',
                      'Subscribe for Ad FREE experience',
                    );
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
              ) : isCancelingStory ? (
                <View
                  style={{
                    borderWidth: 4,
                    borderColor: 'rgba(255, 153, 166, 1)',
                    borderRadius: 8,
                  }}>
                  <LinearGradient
                    colors={['rgba(255, 164, 164, 0.8)', '#FFFFFF']}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 1, y: 0 }}
                    locations={[0, 1]}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: moderateVerticalScale(10),
                      paddingHorizontal: moderateScale(12),
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: TextColorGreen,
                        fontSize: responsiveFontSize(2),
                      }}>
                      Time: {timeText}
                    </Text>
                  </LinearGradient>
                </View>
              ) : (
                <></>
              )}
            </View>
            {
              //Layout adjuster text
              !SHOW_DONE_BTN && <Text></Text>
            }
          </View>
        </View>

        <View>
          <ImageBackground
            style={styles.img_backgroung_content}
            resizeMode="center"
            source={PLAYFLOW_FRAME}>
            <View
              activeOpacity={0.9}
              style={[styles.bg_content, { backgroundColor: TextColorGreen }]}>
              {!showCamera ? (
                <ImageBackground
                  style={{
                    borderRadius: 20,
                    width: responsiveWidth(72),
                    height: responsiveHeight(39),
                    backgroundColor: '#EA89A7',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: responsiveWidth(6),
                  }}
                  source={require('../../../../assets/bgImage-video.png')}>
                  <UserNames backgroundColor="rgba(0,0,0,0.5)" />
                  <View>
                    {!activeCamera && !started && (
                      <Text
                        style={{
                          paddingHorizontal: moderateScale(32),
                          lineHeight: moderateScale(22),
                          color: '#FFF',
                          fontWeight: '700',
                          fontSize: responsiveFontSize(2.1),
                          textAlign: 'center',
                        }}>
                        {' '}
                        Hold microphone icon and share your story
                      </Text>
                    )}
                  </View>
                </ImageBackground>
              ) : (
                <>
                  <View>
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {user ? (
                        <UserNames
                          backgroundColor="rgba(0,0,0,0.5)"
                          currentDisplayUser={currentDisplayUser}
                        />
                      ) : (
                        <></>
                      )}
                    </View>

                    {cameraPermission && (
                      <Camera
                        ref={cameraRef}
                        style={{
                          borderRadius: 50,
                          width: responsiveWidth(72),
                          height: responsiveHeight(40),
                        }}
                        device={activeCamera}
                        isActive={isActive}
                        video={true}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                </>
              )}
            </View>
          </ImageBackground>

          <TouchableOpacity
            onPress={toggleCamera}
            activeOpacity={0.7}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 150,
              width: responsiveWidth(20),
              height: responsiveHeight(6),
              backgroundColor: '#4B7A84',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: responsiveWidth(7),
                height: responsiveHeight(3.5),
                resizeMode: 'center',
              }}
              source={require('../../../../assets/camera-image.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            paddingVertical: moderateVerticalScale(25),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={require('../../../../assets/microphone-bg.png')}>
            <TouchableOpacity
              disabled={isFirstCall || timeLeft == 0 ? true : false}
              onLongPress={() => {
                pressHandlerIn();
              }}
              onPressOut={() => {
                pressHandlerOut();
              }}
              activeOpacity={0.7}
              style={{
                borderWidth: isPressed ? 6 : 0,
                borderColor: isPressed ? '#D04141' : TextColorGreen,
                backgroundColor:
                  isFirstCall || timeLeft == 0
                    ? 'rgba(87, 150, 164, 0.3)'
                    : undefined,
                width: WINDOW_WIDTH * 0.32,
                height: WINDOW_WIDTH * 0.32,
                borderRadius: WINDOW_WIDTH / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: responsiveWidth(16),
                  height: responsiveHeight(8),
                  tintColor: isPressed ? '#D04141' : null,
                  resizeMode: 'center',
                }}
                source={require('../../../../assets/video-recording.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        {/* <View> */}

        {isNext && user ? (
          <CustomVideoPlayFlowButton
            onPress={onpressNextHandler}
            backgroundColor={TextColorGreen}
            color="#FFF"
            timeLeft={timeLeft}
            text={`Next Player${isNextUser?.username ? ': @' + isNextUser?.username : ''
              }`}
            isNextUser={isNextUser}
          />
        ) : (
          isUserGuest && (
            <CustomVideoPlayFlowButton
              onPress={onpressNextHandler}
              backgroundColor={TextColorGreen}
              color="#FFF"
              timeLeft={timeLeft}
              text={'Next Player'}
              isNextUser={isNextUser}
            />
          )
        )}

        <View style={{ paddingVertical: responsiveWidth(4) }}>
          <SaveStoryBtn
            timeLeft={timeLeft}
            onPress={isUserGuest ? saverecordingvideo : saveBtnHandler}
            text={isUserGuest ? 'Save to phone' : 'Save Story'}
            color={TextColorGreen}
            isNext={isUserGuest ? false : isNext}
          />
        </View>

        {isVisible && (
          <SaveVideo
            type="savevideo"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            path={path}
          />
        )}

        <GuestModals
          ref={GuestModalRef}
          onPress={() => navigation.navigate(PLAY_STORY_TIME)}
        />
        <GuestModals
          ref={GuestModalRefForAds}
          onPress={saverecordingvideo}
          textOnPress={() => navigation.navigate(PLAY_STORY_TIME)}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  backplay_flow: {
    marginLeft: 'auto',
    width: responsiveWidth(95),
  },
  circle_container: {
    paddingVertical: moderateVerticalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_circle: {
    backgroundColor: TextColorGreen,
    borderRadius: responsiveWidth(60),
    height: responsiveHeight(41),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_dog: {
    width: responsiveWidth(21),
    height: responsiveHeight(10),
    resizeMode: 'center',
  },
  start: {
    paddingVertical: moderateVerticalScale(8),
    color: PrimaryColor,
    fontWeight: '800',
    fontSize: responsiveFontSize(4.3),
  },
  img_backgroung_content: {
    width: responsiveWidth(100),
    height: responsiveHeight(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(6),
  },
  bg_content: {
    // backgroundColor: PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(76),
    height: responsiveHeight(42),
    marginLeft: responsiveWidth(1),
    marginTop: responsiveWidth(1),
    // marginBottom: responsiveWidth(2.5)
  },
  cameraView: {
    flex: 1,
  },
});
export default VideoFirstUser;
