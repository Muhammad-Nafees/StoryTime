// imports libraries 
import {
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Voice from '@react-native-voice/voice';
// imports components
import UserNames from '../../../../components/UserNames';
import { recordingData } from '../../../../../store/slices/categoriesSlice/categoriesSlice';
import CustomPlayFlowButton from '../../../../components/playFlow/CustomPlayFlowButton';
import SaveStoryBtn from '../../../../components/playFlow/SaveStoryBtn';
import SaveStoryPhone from '../../../../components/playFlow/SaveStoryPhone';
import { Img_Paths } from '../../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../../Styles/Style';
import { SCREEN_HEIGHT, SPACING } from '../../../../constants/Constant';
import GuestModals from '../../../../components/GuestModals';
import CustomHeaderTimer from '../../../../components/reusable-components/categoriesplayFlow/CustomHeaderTImer';

import UserVoiceContent from '../../../../components/reusable-components/categoriesplayFlow/UserVoiceContent';
import MicrophoneButton from '../../../../components/reusable-components/categoriesplayFlow/MicrophoneButton';
import { isCheckValue } from '../../../../../store/slices/categoriesSlice/categoriesSlice';

const StartRecordingVoice = () => {
  // global variable
  let longPressTimeout;
  // img paths
  const { SPLASH_SCREEN_IMAGE, BG_VOICE_TO_TEXT_IMG } = Img_Paths;
  // states
  const [started, setStarted] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timeText, setTimeText] = useState('02:00');
  const [isLongPress, setIsLongPress] = useState(false);
  const [recordingText, setRecordingText] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isCancelingStory, setisCancelingStory] = useState(true);
  const [saveStoryModal, setSaveStoryModal] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const { isCheck,
    nextRandomNumber,
    isExtendStory,
    extendCounting,
    nextRandomNumberExtend,
    gameFriends
  } = useSelector(state => state.getcategories);
  const [currentDisplayUser, setCurrentDisplayUser] = useState(gameFriends[0]);
  const [isNextUser, setIsNextUser] = useState(gameFriends[1]);
  const navigation = useNavigation();

  // redux states
  const { user } = useSelector(state => state?.authSlice);

  const dispatch = useDispatch();

  const GuestModalRef = useRef(null);
  const GuestModalRefForAds = useRef(null);
  const USER_LENGTH_CHECK = gameFriends?.length == 1;
  // ----------XXXXXXXXXX----------

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
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
  };

  useEffect(() => {
    setTimeLeft(null);
    setIsPressed(false);
    dispatch(isCheckValue(false));
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
      ? navigation.navigate('GoNextPlayer')
      : modalOpen(
        GuestModalRef,
        'Get Story Time Premium',
        'Subscribe now to save your Story to your profile',
        'Subscribe',
        'Back',
      );
  };

  useEffect(() => {
    if (isExtendStory === false || isExtendStory === true) {
      setTimeLeft(null);
      setIsPressed(false);
      setIsFirstCall(false);
    };

    if (isCheck) {
      const currentIndex = gameFriends.indexOf(currentDisplayUser);
      const nextIndex = (currentIndex + 1) % gameFriends.length;
      const nextPlayer = (currentIndex + 2) % gameFriends.length;

      if (currentIndex !== gameFriends?.length) {
        setCurrentDisplayUser(gameFriends[nextIndex]);
        setIsNextUser(gameFriends[nextPlayer]);
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
  }, [isCheck, nextRandomNumber, nextRandomNumberExtend]);



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
    if (isExtendStory && timeLeft == null) {
      setTimeText('00:30');
      setTimeLeft(extendCounting);
      startRecognizing();
      setIsPressed(true);
    };

    if (timeLeft !== 0) {
      setIsPressed(true);

      if (!isExtendStory && timeLeft === null) {
        startRecognizing();
        setTimeLeft(120);
      }
    }
  };

  const pressHandlerOut = () => {
    console.log('On PressOut-----');
    setIsFirstCall(true);
    setisCancelingStory(false);
    stopRecording();
    clearTimeout(longPressTimeout);
    setIsLongPress(false);
    setIsPressed(false);
    setTimeLeft(0);
    console.log('STOP RECORDING-----');
  };

  // Timer 2 Minutes ---------

  useEffect(() => {
    if (USER_LENGTH_CHECK) {
      setIsNext(false);
    };

    let countdown;

    if (isExtendStory === false && timeLeft == null) {
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
    if (isExtendStory === true && timeLeft == null) {
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
        <CustomHeaderTimer
          isCancelingStory={isCancelingStory}
          timeText={timeText}
          user={user}
          GuestModalRefForAds={GuestModalRefForAds}
          modalOpen={modalOpen}
        />

        {/* ------------------------------ */}
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

            <UserVoiceContent
              isFirstCall={isFirstCall}
              recordingText={recordingText}
              started={started}
            />
          </View>
        </ImageBackground>

        <View style={{ height: responsiveHeight(35), marginBottom: SPACING * 4 }}>
          <View
            style={{
              paddingVertical: moderateVerticalScale(25),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MicrophoneButton
              pressHandlerIn={pressHandlerIn}
              pressHandlerOut={pressHandlerOut}
              isFirstCall={isFirstCall}
              timeLeft={timeLeft}
              isPressed={isPressed}
            />
          </View>

          {isNext && user ? (
            <CustomPlayFlowButton
              onPress={onPressNext}
              isLongPress={isLongPress}
              backgroundColor={TextColorGreen}
              color="#FFF"
              text={`Next Player${isNextUser?.username ? ': @' + isNextUser?.username : ''
                }`}
              timeLeft={timeLeft}
              isNextUser={isNextUser}
              isCancelingStory={isCancelingStory}
            />
          ) :
            !user && (
              <CustomPlayFlowButton
                onPress={onPressNext}
                isLongPress={isLongPress}
                backgroundColor={TextColorGreen}
                color="#FFF"
                timeLeft={timeLeft}
                isNextUser={isNextUser}
                user={user}
                text={'Next Player'}
                isCancelingStory={isCancelingStory}
              />
            )
          }

          <View style={{ paddingTop: responsiveWidth(6) }}>
            <SaveStoryBtn
              onPress={!user ? saveStoryhandler : saveBtnHandler}
              text={!user ? 'Save to phone' : 'Save Story'}
              color={TextColorGreen}
              isNext={!user ? false : isNext}
              timeLeft={timeLeft}
            />
          </View>

          {saveStoryModal && (
            <SaveStoryPhone
              isVisible={isVisible}
              setIsVisible={setVisible} />
          )}
        </View>

        <GuestModals
          ref={GuestModalRef}
          onPress={() => navigation.navigate("PlayStoryTime")}
        />
        <GuestModals
          ref={GuestModalRefForAds}
          onPress={saveStoryhandler}
          textOnPress={() => navigation.navigate("PlayStoryTime")}
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
  start: {
    paddingVertical: moderateVerticalScale(8),
    color: PrimaryColor,
    fontWeight: '800',
    fontSize: responsiveFontSize(4.3),
  },
  img_backgroung_content: {
    height: SCREEN_HEIGHT * 0.42,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(6),
  },
});

export default StartRecordingVoice;
