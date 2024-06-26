import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import UserNames from '../../../components/UserNames';
import { useDispatch, useSelector } from 'react-redux';
import { recordingData, } from '../../../../store/slices/RecordingData';
import CustomPlayFlowButton from '../../../components/playFlow/CustomPlayFlowButton';
import SaveStoryBtn from '../../../components/playFlow/SaveStoryBtn';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import SaveStoryPhone from '../../../components/playFlow/SaveStoryPhone';
import { Img_Paths } from '../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../Styles/Style';
import {
  checkTrueOrFalse, extendStoryCheck,
} from '../../../../store/slices/addplayers/addPlayersSlice';
import { SCREEN_HEIGHT, SPACING } from '../../../constants/Constant';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import GuestModals from '../../../components/GuestModals';
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice';


const FirstUser = ({ route }) => {
  let longPressTimeout;
  const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME, BG_VOICE_TO_TEXT_IMG } = Img_Paths;
  const navigation = useNavigation();
  const SCREENWIDTH = Dimensions.get('window').width;
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timeText, setTimeText] = useState('02:00');
  const [IsRecording, setIsRecording] = useState(false);
  const [isLongPress, setIsLongPress] = useState(false);
  const addedUsers = useSelector(state => state.addPlayers.addFriends);
  const { user } = useSelector(state => state?.authSlice);
  const checkUserTrueorFalse = useSelector(
    state => state.addPlayers.checkTrueOrFalse,
  );
  const extendCounting = useSelector(state => state?.addPlayers?.extendCounting,);
  const extendStoryTrueOrFalse = useSelector(state => state?.addPlayers?.extendStoryCheck);
  const dispatch = useDispatch();
  const textrecordUsers = useSelector(state => state?.recordingData?.recordingText,);
  const [recordingText, setRecordingText] = useState("");
  const [isNext, setIsNext] = useState(true);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isCancelingStory, setisCancelingStory] = useState(true);
  const [saveStoryModal, setSaveStoryModal] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [partialResults, setPartialResults] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  const USER = user?.data?.user || user?.data;
  const sequenceUser = useMemo(() => [...addedUsers, (USER?._id && USER?.username && { "userid": USER?._id, username: USER?.username })], [USER, addedUsers],);
  const [currentDisplayUser, setCurrentDisplayUser] = useState(sequenceUser[0]);
  const [isNextUser, setIsNextUser] = useState(sequenceUser[1]);
  const GuestModalRef = useRef(null);
  const GuestModalRefForAds = useRef(null);
  const USER_LENGTH_CHECK = sequenceUser?.length == 1;

  const stringText = recordingText.toString();
  const cleanedText = stringText.replace(/,/g, '');

  // ----------XXXXXXXXXX----------

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResult;

    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechError = onSpeechError
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // onSpeechStart----------

  const onSpeechStart = e => {
    // console.log('START SPEECH CALLED---', e);
    setStarted(true);
  };

  // onSpeechEnd ----------

  const onSpeechEnd = e => {
    setEnded(e.value);
    // console.log('SPEECH END CALLED----', e);
  };

  // ---------- onSpeechResult----------


  const onSpeechResult = async (e) => {
    // console.log('onSpeechResults: ', e?.value);

    if (!e.value) return;
    setSpeaking(false);
    // console.log('Voice Result: ' + e.value);

    if (setRecordingText) {
      dispatch(recordingData(e?.value[0]));
      startRecognizing();
      setRecordingText(prevData => prevData + " " + e?.value[0]);
      // if (callBack) callBack(e?.value[0]);
      return;
    };
  };


  const onSpeechRecognized = e => {
    setSpeaking(false);
    // console.log('onSpeechRecognized', e);
  };

  function onSpeechError(e) {
    _destroyRecognizer();
    setSpeaking(false);
    console.log('onSpeechError: ', JSON.stringify(e.error));
  };

  // setisCancelingStory(false);

  useEffect(() => {
    setTimeLeft(null);
    setIsPressed(false);
    dispatch(checkTrueOrFalse(false));
    return () => {
      setIsFirstCall(false);
      setisCancelingStory(true);
      setStarted(false);

    };
  }, [extendStoryTrueOrFalse]);

  // ---------- Start Recording And Convert Text ----------

  const startRecognizing = async () => {

    // console.log('Start Recognizing Value---------');
    try {
      if (!speaking) {
        await Voice.start('en-US');
        handlePressIn();
      } else {
        await Voice.stop();
      }
      setSpeaking(prevState => !prevState);
    } catch (error) {
      console.log('err', error);
    }
  };

  // console.log("SPEAKING=======", speaking);
  // -------- Stop Recording --------

  const stopRecording = async () => {
    setIsRecording(false);
    console.log('STOP RECORDING-----');
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
    user ? navigation.navigate('FirstUserStorytext') : null;
  };

  console.log("extendStoryTrueOrFalse=============", extendStoryTrueOrFalse);

  useFocusEffect(
    useCallback(() => {

      if (extendStoryTrueOrFalse === false || extendStoryTrueOrFalse === true) {
        setIsPressed(false);
        setTimeLeft(null);
      };

      if (checkUserTrueorFalse) {

        const currentIndex = sequenceUser.indexOf(currentDisplayUser);
        const nextIndex = (currentIndex + 1) % sequenceUser.length;
        const nextPlayer = (currentIndex + 2) % sequenceUser.length;

        if (currentIndex !== sequenceUser?.length) {
          setCurrentDisplayUser(sequenceUser[nextIndex]);
          setIsNextUser(sequenceUser[nextPlayer]);
          if (nextPlayer == 0) {
            return setIsNext(false);
          }
        } else {
          console.log('add players in Game Completed');
        }
      };

      return () => {
        setIsFirstCall(false);
        setisCancelingStory(true);
      };
    }, [checkUserTrueorFalse, extendStoryTrueOrFalse]),
  );



  const saveBtnHandler = () => {
    if (!user) {
      modalOpen(
        GuestModalRef,
        'Get Story Time Premium',
        'Subscribe now to save your Story to your profile',
        'Subscribe',
        'Back',
      )
      return;
    }
    saveStoryhandler();
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
  };

  const saveStoryhandler = () => {
    setSaveStoryModal(true);
    setVisible(true); // Set isVisible to true to open the modal
  };

  const modalOpen = (ref, heading, content, buttonText, text) => {
    if (ref.current) {
      ref.current.open(heading, content, buttonText, text);
    }
  };

  console.log("timeleft--", timeLeft)
  const handleStart = () => {

    if (extendStoryTrueOrFalse && timeLeft == null) {
      setTimeText('00:30');
      setTimeLeft(extendCounting);
      startRecognizing();
      setIsPressed(true);
    };

    if (timeLeft !== 0) {
      setIsPressed(true);

      if (!extendStoryTrueOrFalse && timeLeft === null) {
        startRecognizing();
        setTimeLeft(120);
      };

      if (isFirstCall) {
        stopRecording();
        clearTimeout(longPressTimeout);
        setIsLongPress(false);
        setIsPressed(false);
        console.log('STOP RECORDING-----');
      };

      if (timeLeft !== null && timeLeft > 0) {
        setisCancelingStory(false);
        setIsFirstCall(true);
        setTimeLeft(0);
      }
    }
  };

  // Timer 2 Minutes ---------

  useEffect(() => {

    if (USER_LENGTH_CHECK) {
      setIsNext(false)
    };

    let countdown;

    if (extendStoryTrueOrFalse === false && timeLeft == null) {
      setRecordingText("");
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
    }
    return () => clearInterval(countdown);
  }, [timeLeft]);

  console.log("isNext------", isNext);

  useEffect(() => {
    if (extendStoryTrueOrFalse === true && timeLeft == null) {
      setTimeText('00:30');
    } else if (timeLeft == null) {
      setTimeText('02:00');
    }
    else {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
      setTimeText(formattedTime);
    }
  }, [timeLeft]);


  return (
    <>
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
                width: isCancelingStory
                  ? responsiveWidth(60)
                  : responsiveWidth(90),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                // onPress={stopRecording}
                style={{ width: responsiveWidth(10) }}>
                <Image
                  style={{
                    width: responsiveWidth(5),
                    height: responsiveHeight(2.5),
                    resizeMode: 'center',
                  }}
                  source={require('../../../assets/back-playflowicon.png')}
                />
              </TouchableOpacity>

              <View>
                {isCancelingStory ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 4,
                      borderColor: 'rgba(255, 153, 166, 1)',
                      backgroundColor: 'rgba(255, 164, 164, 0.5)',
                      paddingVertical: moderateVerticalScale(10),
                      paddingHorizontal: moderateScale(12),
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: TextColorGreen,
                        fontSize: responsiveFontSize(1.9),
                      }}>
                      Time :{timeText}
                    </Text>
                  </View>
                ) : !user ? (
                  <TouchableOpacity
                    onPress={() => {
                      modalOpen(
                        GuestModalRefForAds,
                        'Support Story Time',
                        'Watch the add to continue playing',
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

          <ImageBackground
            style={[styles.img_backgroung_content]}
            resizeMode="center"
            source={BG_VOICE_TO_TEXT_IMG}>

            {/* <View
              style={[styles.bg_content,]}> */}
            <View
              style={{
                width: responsiveWidth(69),
                height: responsiveHeight(40),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: responsiveWidth(10),
              }}>
              {user ? (
                <UserNames currentDisplayUser={currentDisplayUser} />
              ) : (
                <></>
              )}
              <ScrollView>
                <View style={{ paddingHorizontal: moderateVerticalScale(35) }}>
                  <Text
                    style={{
                      paddingTop: responsiveWidth(3),
                      color: isFirstCall
                        ? 'rgba(255,255,255,0.3)'
                        : 'rgba(255,255,255,1)',
                      fontSize: responsiveFontSize(2.2),
                      lineHeight: 20,
                      textAlign: 'center',
                      fontFamily: PassionOne_Regular.passionOne,
                    }}>
                    {recordingText}
                  </Text>
                </View>
              </ScrollView>

              <View>
                {!started && (
                  <Text
                    style={{
                      paddingHorizontal: moderateScale(32),
                      lineHeight: moderateScale(22),
                      color: '#FFF',
                      fontSize: responsiveFontSize(2.1),
                      textAlign: 'center',
                      fontFamily: PassionOne_Regular.passionOne,
                    }}>
                    Hold microphone icon and share your story
                  </Text>
                )}
              </View>
            </View>
            {/* </View> */}
          </ImageBackground>

          <View
            style={{ height: responsiveHeight(35), marginBottom: SPACING * 4 }}>
            <View
              style={{
                paddingVertical: moderateVerticalScale(25),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                disabled={isFirstCall ? true : false}
                onPress={() => {
                  handleStart();
                }}
                activeOpacity={0.7}
                style={{
                  borderWidth: isPressed ? 6 : 0,
                  borderColor: isPressed ? '#D04141' : TextColorGreen,
                  backgroundColor: isFirstCall || timeLeft == 0
                    ? 'rgba(87, 150, 164, 0.3)'
                    : TextColorGreen,
                  width: SCREENWIDTH * 0.32,
                  height: SCREENWIDTH * 0.32,
                  borderRadius: SCREENWIDTH / 2,
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
                  source={require('../../../assets/mic.png')}
                />
              </TouchableOpacity>
            </View>

            {isNext && (
              <CustomPlayFlowButton
                onPress={onPressNext}
                isLongPress={isLongPress}
                backgroundColor={TextColorGreen}
                color="#FFF"
                timeLeft={timeLeft}
                isNextUser={isNextUser}
                isCancelingStory={isCancelingStory}
              />
            )}

            <View style={{ paddingTop: responsiveWidth(6) }}>
              <SaveStoryBtn
                onPress={saveBtnHandler}
                text={!user ? "Save to phone" : "Save Story"}
                color={TextColorGreen}
                isNext={!user ? false : isNext}
                timeLeft={timeLeft}
              />
            </View>

            {saveStoryModal && (
              <SaveStoryPhone isVisible={isVisible} setIsVisible={setVisible} />
            )}
          </View>

          <GuestModals ref={GuestModalRef} />
          <GuestModals ref={GuestModalRefForAds} onPress={saveStoryhandler} />
        </ScrollView>
      </ImageBackground>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    // width: responsiveWidth(90),
    height: SCREEN_HEIGHT * 0.42,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(6),
    // backgroundColor: "orange"
  },
  bg_content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(60),
    height: responsiveHeight(30),
  },
});

export default FirstUser;
