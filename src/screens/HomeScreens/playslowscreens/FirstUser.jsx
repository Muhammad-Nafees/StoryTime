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
import React, {useCallback, useEffect, useState, useRef, useMemo} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import UserNames from '../../../components/UserNames';
import {useDispatch, useSelector} from 'react-redux';
import {recordingData} from '../../../../store/slices/RecordingData';
import CustomPlayFlowButton from '../../../components/playFlow/CustomPlayFlowButton';
import SaveStoryBtn from '../../../components/playFlow/SaveStoryBtn';
import {PassionOne_Regular} from '../../../constants/GlobalFonts';
import SaveStoryPhone from '../../../components/playFlow/SaveStoryPhone';
import {Img_Paths} from '../../../assets/Imagepaths';
import {PrimaryColor, TextColorGreen} from '../../Styles/Style';
import {checkTrueOrFalse} from '../../../../store/slices/addplayers/addPlayersSlice';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SPACING,
} from '../../../constants/Constant';
import {Inter_Regular} from '../../../constants/GlobalFonts';
import GuestModals from '../../../components/GuestModals';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';
import NavigationsString from '../../../constants/NavigationsString';
import LinearGradient from 'react-native-linear-gradient';

const FirstUser = ({route}) => {
  let longPressTimeout;
  const {SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME, BG_VOICE_TO_TEXT_IMG} = Img_Paths;
  const {PLAY_STORY_TIME} = NavigationsString;

  const navigation = useNavigation();
  const SCREENWIDTH = Dimensions.get('window').width;
  const [started, setStarted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timeText, setTimeText] = useState('02:00');
  const [isLongPress, setIsLongPress] = useState(false);
  const addedUsers = useSelector(state => state.addPlayers.addFriends);
  const {user} = useSelector(state => state?.authSlice);

  const checkUserTrueorFalse = useSelector(
    state => state.addPlayers.checkTrueOrFalse,
  );

  const extendCounting = useSelector(
    state => state?.addPlayers?.extendCounting,
  );
  const extendStoryTrueOrFalse = useSelector(
    state => state?.addPlayers?.extendStoryCheck,
  );
  const textrecordUsers = useSelector(
    state => state?.recordingData?.recordingText,
  );
  const nextRandomNumvalue = useSelector(
    state => state?.addPlayers?.nextRandomNumber,
  );

  const nextRandomNumvalueExtend = useSelector(
    state => state?.addPlayers?.nextRandomNumberExtend,
  );
  const dispatch = useDispatch();

  const [recordingText, setRecordingText] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isCancelingStory, setisCancelingStory] = useState(true);
  const [saveStoryModal, setSaveStoryModal] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const USER = user?.data?.user || user?.data;
  // const sequenceUser = useMemo(() => [...addedUsers, (USER?._id && USER?.username && { "userid": USER?._id, username: USER?.username })
  // ], [USER, addedUsers]);

  const sequenceUser = useSelector(state => state.addPlayers?.gameFriends);
  console.log('sequence-users-------', sequenceUser);
  console.log('sequenceUsers FirstUser--', sequenceUser[1]);
  const [currentDisplayUser, setCurrentDisplayUser] = useState(sequenceUser[0]);
  const [isNextUser, setIsNextUser] = useState(sequenceUser[1]);

  // console.log("isNextUser", isNextUser);

  const GuestModalRef = useRef(null);
  const GuestModalRefForAds = useRef(null);
  const USER_LENGTH_CHECK = sequenceUser?.length == 1;

  const stringText = recordingText.toString();

  //consts
  const isUserGuest = useMemo(() => !user, [user]);
  const SHOW_DONE_BTN =
    (timeText === '00:00' && isUserGuest) || !isCancelingStory;
  // ----------XXXXXXXXXX----------

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResult;

    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // onSpeechStart----------

  const onSpeechStart = e => {
    setStarted(true);
  };

  // onSpeechEnd ----------

  const onSpeechEnd = e => {};

  // ---------- onSpeechResult----------

  // console.log("timeleft--", timeLeft);

  const onSpeechResult = async e => {
    if (!e.value) return;
    setSpeaking(false);

    if (setRecordingText) {
      dispatch(recordingData(e?.value[0]));
      startRecognizing();
      setRecordingText(prevData => prevData + ' ' + e?.value[0]);
      return;
    }
  };

  const onSpeechRecognized = e => {
    setSpeaking(false);
  };

  function onSpeechError(e) {
    setSpeaking(false);
    console.log('onSpeechError: ', JSON.stringify(e.error));
  }

  useEffect(() => {
    setTimeLeft(null);
    setIsPressed(false);
    dispatch(checkTrueOrFalse(false));
    return () => {
      setisCancelingStory(true);
      setStarted(false);
    };
  }, []);

  const startRecognizing = async () => {
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

  // -------- Stop Recording --------

  const stopRecording = async () => {
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
    user
      ? navigation.navigate('FirstUserStorytext')
      : modalOpen(
          GuestModalRef,
          'Get Story Time Premium',
          'Subscribe now to save your Story to your profile',
          'Subscribe',
          'Back',
        );
  };

  // console.log("extendStoryTrueOrFalse=============", extendStoryTrueOrFalse);

  useEffect(() => {
    if (extendStoryTrueOrFalse === false || extendStoryTrueOrFalse === true) {
      setTimeLeft(null);
      setIsPressed(false);
      setIsFirstCall(false);
    }

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
    }
    return () => {
      setisCancelingStory(true);
    };
  }, [checkUserTrueorFalse, nextRandomNumvalue, nextRandomNumvalueExtend]);

  const saveBtnHandler = () => {
    if (!user) {
      modalOpen(
        GuestModalRef,
        'Get Story Time Premium',
        'Subscribe now to save your Story to your profile',
        'Subscribe',
        'Back',
      );
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

  const pressHandlerIn = () => {
    if (extendStoryTrueOrFalse && timeLeft == null) {
      setTimeText('00:30');
      setTimeLeft(extendCounting);
      startRecognizing();
      setIsPressed(true);
    }

    if (timeLeft !== 0) {
      setIsPressed(true);

      if (!extendStoryTrueOrFalse && timeLeft === null) {
        startRecognizing();
        setTimeLeft(120);
      }
    }
  };

  const pressHandlerOut = () => {
    console.log('On PressOut-----');

    // if (timeLeft !== null && timeLeft > 0) {
    // }
    setIsFirstCall(true);
    setisCancelingStory(false);
    stopRecording();
    clearTimeout(longPressTimeout);
    setIsLongPress(false);
    setIsPressed(false);
    setTimeLeft(0);
    console.log('STOP RECORDING-----');

    // if (isFirstCall) {
    // };
  };

  // Timer 2 Minutes ---------

  useEffect(() => {
    if (USER_LENGTH_CHECK) {
      setIsNext(false);
    }

    let countdown;

    if (extendStoryTrueOrFalse === false && timeLeft == null) {
      setRecordingText('');
    }

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

  useEffect(() => {
    if (extendStoryTrueOrFalse === true && timeLeft == null) {
      setTimeText('00:30');
    } else if (timeLeft == null) {
      setTimeText('02:00');
    } else {
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
        {/* <ScrollView> */}
        <View
          style={{
            paddingVertical: moderateVerticalScale(18),
            paddingHorizontal: moderateScale(22),
          }}>
          <View
            style={{
              paddingTop: responsiveWidth(5),
              flexDirection: 'row',
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
                source={require('../../../assets/back-playflowicon.png')}
              />
            </TouchableOpacity>

            <View>
              {SHOW_DONE_BTN ? (
                <TouchableOpacity
                  onPress={() => {
                    modalOpen(
                      GuestModalRefForAds,
                      'Support Story Time',
                      'Watch the add to continue playing',
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
                    start={{x: 1, y: 0.5}}
                    end={{x: 1, y: 0}}
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

        <ImageBackground
          style={[styles.img_backgroung_content]}
          resizeMode="center"
          source={BG_VOICE_TO_TEXT_IMG}>
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
              <View style={{paddingHorizontal: moderateVerticalScale(35)}}>
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
        </ImageBackground>

        <View style={{height: responsiveHeight(35), marginBottom: SPACING * 4}}>
          <View
            style={{
              paddingVertical: moderateVerticalScale(25),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              disabled={isFirstCall ? true : false}
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

          {isNext && user ? (
            <CustomPlayFlowButton
              onPress={onPressNext}
              isLongPress={isLongPress}
              backgroundColor={TextColorGreen}
              color="#FFF"
              text={`Next Player${
                isNextUser?.username ? ': @' + isNextUser?.username : ''
              }`}
              timeLeft={timeLeft}
              isNextUser={isNextUser}
              isCancelingStory={isCancelingStory}
            />
          ) : (
            !user && (
              <CustomPlayFlowButton
                onPress={onPressNext}
                isLongPress={isLongPress}
                backgroundColor={TextColorGreen}
                color="#FFF"
                timeLeft={timeLeft}
                isNextUser={isNextUser}
                text={'Next Player'}
                isCancelingStory={isCancelingStory}
              />
            )
          )}

          <View style={{paddingTop: responsiveWidth(6)}}>
            <SaveStoryBtn
              onPress={!user ? saveStoryhandler : saveBtnHandler}
              text={!user ? 'Save to phone' : 'Save Story'}
              color={TextColorGreen}
              isNext={!user ? false : isNext}
              timeLeft={timeLeft}
            />
          </View>

          {saveStoryModal && (
            <SaveStoryPhone isVisible={isVisible} setIsVisible={setVisible} />
          )}
        </View>

        <GuestModals
          ref={GuestModalRef}
          onPress={() => navigation.navigate(PLAY_STORY_TIME)}
        />
        <GuestModals
          ref={GuestModalRefForAds}
          onPress={saveStoryhandler}
          textOnPress={() => navigation.navigate(PLAY_STORY_TIME)}
        />
        {/* </ScrollView> */}
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
