// imports from libraries
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Img_Paths } from '../../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Camera, getCameraFormat,
} from 'react-native-vision-camera';
import { useDispatch, useSelector } from 'react-redux';
// imports components
import SaveVideo from '../../../../components/reusable-components/modals/SaveVideo';
import {
  extendStoryCheckVideo,
  saveRecordingVideoUser,
} from '../../../../../store/slices/categoriesSlice/categoriesSlice';
import CustomVideoPlayFlowButton from '../../../../components/playFlow/CustomVideoPlayFlowButton';
import SaveStoryBtn from '../../../../components/playFlow/SaveStoryBtn';
import { Inter_Regular } from '../../../../constants/GlobalFonts';
import GuestModals from '../../../../components/GuestModals';
import { SCREEN_WIDTH, WINDOW_WIDTH } from '../../../../constants/Constant';
import HeaderContentVideo from '../../../../components/categories/videoFlow/HeaderContentVideo';
import MainContentVideo from '../../../../components/categories/videoFlow/MainContentVideo';


const VideoFirstUser = () => {
  // global variable
  let videoPath;

  //destructures
  const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;

  //hooks
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //redux states
  const [currentCamera, setCurrentCamera] = useState('back');
  const { user } = useSelector(state => state?.authSlice);

  const { nextRandomNumberVideo,
    nextRandomNumberVideoExtend,
    gameFriends,
    extendVideo,
    isExtendStoryVideo,
    isCheckVideoTrue,
    addFriends
  } = useSelector(state => state?.getcategories);

  //states

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
  const [currentDisplayUser, setCurrentDisplayUser] = useState(gameFriends[0]);
  const [isNextUser, setIsNextUser] = useState(gameFriends[1]);

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
  const isUserGuest = useMemo(() => !user, [user]);
  const USER_LENGTH_CHECK = gameFriends?.length == 1;
  const activeCamera = getCameraDetails();
  const SHOW_DONE_BTN =
    (timeText === '00:00' && isUserGuest) || (!isCancelingStory && isUserGuest);

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
    if (extendVideo == true && timeLeft === null) {
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


  useEffect(() => {
    setShowCamera(true);
  }, []);


  useEffect(() => {
    setTimeLeft(null);

    if (
      isExtendStoryVideo === false ||
      isExtendStoryVideo === true
    ) {
      setTimeLeft(null);
      setIsPressed(false);
      setIsFirstCall(false);
    };

    if (isCheckVideoTrue) {

      const currentIndex = gameFriends.indexOf(currentDisplayUser);
      const nextIndex = (currentIndex + 1) % gameFriends.length;
      const nextPlayer = (currentIndex + 2) % gameFriends.length;
      if (currentIndex !== addFriends?.length) {
        setCurrentDisplayUser(gameFriends[nextIndex]);
        setIsNextUser(gameFriends[nextPlayer]);
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
  }, [isCheckVideoTrue, nextRandomNumberVideo, nextRandomNumberVideoExtend]);


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

  const recordVideos = () => {
    if (!cameraRef.current) {
      return;
    }
    console.log('RECORDING STARTED');

    cameraRef.current.startRecording({
      videoCodec: 'h264',
      onRecordingFinished: video => {
        const pathVideo = video.path;
        console.log(video, 'VIDEO');
        setPath(pathVideo);
        videoPath = pathVideo;
        dispatch(saveRecordingVideoUser(pathVideo));
      },
      onRecordingError: error => console.error('ON-RECORD-ERR-----', error),
    });
  };

  const stopRecordings = async () => {
    try {
      await cameraRef.current?.stopRecording();
      console.log('Stop-Recording-Function_Called');
    } catch (error) {
      console.log('RECORDINGESTOPErr------', error);
    }
  };
  console.log(videoPath, 'VIDEOPATHH');

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
      if (isExtendStoryVideo == true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(120);
        console.log('IF IS RUNNIGN!');
      } else if (extendVideo == true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(30);
        console.log('RESUME VIDEO-----');
      };
      if (timeLeft == null && isExtendStoryVideo == null) {
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
      if (isExtendStoryVideo === true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(30);
        console.log('EXTEND VIDEO----');
      } else if (extendVideo === true) {
        resumeRecording();
        setIsPressed(true);
        setTimeLeft(30);
        console.log('RESUME VIDEO-----');
      }
    }
  };

  const onpressNextHandler = () => {
    user ? navigation.navigate("SecondUserStory") : saveBtnHandler();
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
        <HeaderContentVideo
          SHOW_DONE_BTN={SHOW_DONE_BTN}
          modalOpen={modalOpen}
          isCancelingStory={isCancelingStory}
          timeText={timeText}
          GuestModalRefForAds={GuestModalRefForAds}
        />

        <MainContentVideo
          activeCamera={activeCamera}
          cameraPermission={cameraPermission}
          cameraRef={cameraRef}
          isActive={isActive}
          showCamera={showCamera}
          toggleCamera={toggleCamera}
          user={user}
          currentDisplayUser={currentDisplayUser}
        />

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
                    : TextColorGreen,
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
            path={videoPath}
          />
        )}

        <GuestModals
          ref={GuestModalRef}
          onPress={() => navigation.navigate("PlayStoryTime")}
        />
        <GuestModals
          ref={GuestModalRefForAds}
          onPress={saverecordingvideo}
          textOnPress={() => navigation.navigate("PlayStoryTime")}
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
  start: {
    paddingVertical: moderateVerticalScale(8),
    color: PrimaryColor,
    fontWeight: '800',
    fontSize: responsiveFontSize(4.3),
  },
  img_backgroung_content: {
    width: responsiveWidth(90),
    height: responsiveHeight(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(6),
    alignSelf: 'center'
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

});
export default VideoFirstUser;
