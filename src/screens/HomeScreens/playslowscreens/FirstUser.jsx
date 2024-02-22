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
import { Img_Paths } from '../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../Styles/Style';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import UserNames from '../../../components/UserNames';
import { useDispatch, useSelector } from 'react-redux';
import {
  recordingData,
  resetRecordingData,
} from '../../../../store/slices/RecordingData';
import CustomPlayFlowButton from '../../../components/playFlow/CustomPlayFlowButton';
import SaveStoryBtn from '../../../components/playFlow/SaveStoryBtn';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import SaveStory from '../../../components/playFlow/SaveStory';
import SaveStoryPhone from '../../../components/playFlow/SaveStoryPhone';
import {
  checkTrueOrFalse,
  extendStoryCheck,
} from '../../../../store/slices/addplayers/addPlayersSlice';
import { SCREEN_HEIGHT, SPACING } from '../../../constants/Constant';
import { Inter_Regular } from '../../../constants/GlobalFonts';
import GuestModals from '../../../components/GuestModals';

const FirstUser = ({ route }) => {
  let longPressTimeout;
  const { SPLASH_SCREEN_IMAGE, PLAYFLOW_FRAME } = Img_Paths;
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
  const extendStoryTrueOrFalse = useSelector(state => state?.addPlayers?.extendStoryCheck,);
  const dispatch = useDispatch();
  const textrecordUsers = useSelector(state => state?.recordingData?.recordingText,);
  const [recordingText, setRecordingText] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isCancelingStory, setisCancelingStory] = useState(true);
  const [saveStoryModal, setSaveStoryModal] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [partialResults, setPartialResults] = useState([]);
  const profileUsersStories = useSelector(state => state?.recordingData?.saveDatatoProfile,);
  const checkTrue = route?.params?.checkValue;
  const USER = user?.data?.user || user?.data;
  const sequenceUser = useMemo(() => [...addedUsers, (USER?._id && USER?.username && { "userid": USER?._id, username: USER?.username })], [USER, addedUsers],);
  const [currentDisplayUser, setCurrentDisplayUser] = useState(sequenceUser[0]);
  const [isNextUser, setIsNextUser] = useState(sequenceUser[1]);

  const GuestModalRef = useRef(null);
  const GuestModalRefForAds = useRef(null);
  const USER_LENGTH_CHECK = sequenceUser?.length == 1



  // console.log("sequenceUser====", sequenceUser)
  // console.log('profileusers', profileUsersStories);
  // console.log('ended====', ended);
  // const isEmptyArray = route?.params?.isEmptyArray;

  // console.log("displayuser--", currentDisplayUser)
  // console.log('textrecordUsers=====', textrecordUsers);
  // const IdUsers = addedUsers.map((item) => item?.userid)
  // console.log("checkUserTrueorFalse=====", checkUserTrueorFalse);

  // console.log("isEmptyArray=====", isEmptyArray);

  // console.log('extendStoryTrueOrFalse=====', extendStoryTrueOrFalse);
  const stringText = recordingText.toString();
  const cleanedText = stringText.replace(/,/g, '');
  // console.log('cleanedText=====', cleanedText);

  const handleStart = () => {
    if (timeLeft !== 0) {
      // setIsFirstCall(!isFirstCall)
      setIsPressed(true);
      if (timeLeft === null) {
        startRecognizing();
        setTimeLeft(30);
      }

      // console.log("isFirstCall-----", isFirstCall);

      if (isFirstCall) {
        clearTimeout(longPressTimeout);
        setIsLongPress(false);
        setIsPressed(false);
        stopRecording();
        console.log('STOP RECORDING-----');
      }

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
    }

    let countdown;
    if (extendStoryTrueOrFalse && timeLeft == null) {
      setTimeLeft(extendCounting);
      // handleStart();
      startRecognizing();
      setIsPressed(true);
    }

    if (extendStoryTrueOrFalse === false && timeLeft == null) {
      setRecordingText([]);
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
    if (timeLeft === null) {
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

  // ----------XXXXXXXXXX----------

  useEffect(() => {
    Voice.onSpeechStart = onspeechStart;
    Voice.onSpeechEnd = onspeechEnd;
    Voice.onSpeechResults = onspeechResult;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechRecognized = onSpeechRecognized;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // onSpeechStart----------

  const onspeechStart = e => {
    console.log('START SPEECH CALLED---', e);
    setStarted(true);
  };

  // onSpeechEnd ----------

  const onspeechEnd = e => {
    setEnded(e.value);
    console.log('SPEECH END CALLED----', e);
  };

  //---------- onSpeechResult----------

  const onspeechResult = useCallback(
    e => {
      console.log('ON SPEECH RESULT-----------', e);
      // const text = e?.value[0];

      // dispatch(recordingData(text));
      // if (text) {
      //     setRecordingText((prevVal) => [...prevVal, ...text]);
      // }
    },
    [dispatch],
  );

  const onSpeechPartialResults = e => {
    const text = e?.value[0];
    console.log('text======Voice', e?.value[0]);
    // console.log('recordingTextState====', recordingText);
    dispatch(recordingData(e?.value[0]));

    if (e?.value[0]) {
      // setRecordingText(prevVal => [...prevVal, e?.value[0]]);
      setRecordingText([e?.value[0]]);

    }
    // console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechRecognized = e => {
    console.log('onSpeechRecognized', e);
  };

  useFocusEffect(
    useCallback(() => {
      setTimeLeft(null);
      setIsPressed(false);
      dispatch(checkTrueOrFalse(false));
      return () => {
        setIsFirstCall(false);
        setisCancelingStory(true);
      };
    }, []),
  );

  // ---------- Start Recording And Convert Text ----------

  const startRecognizing = async () => {
    // const options = { EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 10000 };
    try {
      // await Voice.start('en-US', options);
      await Voice.start('en-US');
      handlePressIn();
      console.log('Start Recognizing Value====');
    } catch (error) {
      console.log('err', error);
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

  const onPressNext = () => {
    user ? navigation.navigate('FirstUserStorytext') : null;
  };

  useFocusEffect(
    useCallback(() => {
      if (checkUserTrueorFalse) {
        const currentIndex = sequenceUser.indexOf(currentDisplayUser);
        const nextIndex = (currentIndex + 1) % sequenceUser.length;
        const nextPlayer = (currentIndex + 2) % sequenceUser.length;

        console.log("NEXT INDEX-----", nextIndex)
        console.log("NEXT PLAYER------", nextPlayer);
        console.log("CURRENT INDEX------", currentIndex);
        console.log("sequenceUser?.length------", sequenceUser?.length);


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
    }, [checkUserTrueorFalse]),
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
      return
    }
    saveStoryhandler()
  }

  const saveStoryhandler = () => {
    setSaveStoryModal(true);
    setVisible(true); // Set isVisible to true to open the modal
  };

  const modalOpen = (ref, heading, content, buttonText, text) => {
    if (ref.current) {
      ref.current.open(heading, content, buttonText, text);
    }
  };

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

          <ImageBackground
            style={[styles.img_backgroung_content]}
            resizeMode="center"
            source={PLAYFLOW_FRAME}>
            <View
              activeOpacity={0.9}
              style={[styles.bg_content, { backgroundColor: TextColorGreen }]}>
              <View
                style={{
                  borderRadius: 20,
                  width: responsiveWidth(69),
                  height: responsiveHeight(39),
                  backgroundColor: '#EA89A7',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: responsiveWidth(6),
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
                      {cleanedText}
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
                      {' '}
                      Hold microphone icon and share your story
                    </Text>
                  )}
                </View>
              </View>
            </View>
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
                  backgroundColor: isFirstCall
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
              />
            </View>

            {saveStoryModal && (
              <SaveStoryPhone isVisible={isVisible} setIsVisible={setVisible} />
            )}
          </View>

          <GuestModals ref={GuestModalRef}/>
          <GuestModals ref={GuestModalRefForAds} onPress={saveStoryhandler}/>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // height: "100%",
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
    // backgroundColor: PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(74),
    height: responsiveHeight(42),
    marginLeft: responsiveWidth(0.9),
    // marginRight: responsiveWidth(2),
    marginTop: responsiveWidth(1),
    // marginBottom: responsiveWidth(2.5)
  },
});

export default FirstUser;




////DEMO CODE EXAMPLE FOR REACT NATIVE VOICE

// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
// } from 'react-native';

// import Voice, {
//   SpeechRecognizedEvent,
//   SpeechResultsEvent,
//   SpeechErrorEvent,
// } from '@react-native-voice/voice';

// const FirstUser = () => {
//   const [recognized, setRecognized] = useState('');
//   const [pitch, setPitch] = useState('');
//   const [error, setError] = useState('');
//   const [end, setEnd] = useState('');
//   const [started, setStarted] = useState('');
//   const [results, setResults] = useState([]);
//   const [partialResults, setPartialResults] = useState([]);

//   useEffect(() => {
//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechRecognized = onSpeechRecognized;
//     Voice.onSpeechEnd = onSpeechEnd;
//     Voice.onSpeechError = onSpeechError;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechPartialResults = onSpeechPartialResults;
//     Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechStart = (e) => {
//     console.log('onSpeechStart: ', e);
//     setStarted('√');
//   };

//   const onSpeechRecognized = (e) => {
//     console.log('onSpeechRecognized: ', e);
//     setRecognized('√');
//   };

//   const onSpeechEnd = (e) => {
//     console.log('onSpeechEnd: ', e);
//     setEnd('√');
//   };

//   const onSpeechError = (e) => {
//     console.log('onSpeechError: ', e);
//     setError(JSON.stringify(e.error));
//   };

//   const onSpeechResults = (e) => {
//     console.log('onSpeechResults: ', e);
//     setResults(e.value);
//   };

//   const onSpeechPartialResults = (e) => {
//     console.log('onSpeechPartialResults: ', e);
//     setPartialResults(e.value);
//   };

//   const onSpeechVolumeChanged = (e) => {
//     console.log('onSpeechVolumeChanged: ', e);
//     setPitch(e.value);
//   };

//   const startRecognizing = async () => {
//     setRecognized('');
//     setPitch('');
//     setError('');
//     setStarted('');
//     setResults([]);
//     setPartialResults([]);
//     setEnd('');

//     try {
//     // below option is under investigation
//     // const options = { EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 3000 }; //https://github.com/react-native-voice/voice/issues/441
//       await Voice.start('en-US');
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const stopRecognizing = async () => {
//     try {
//       await Voice.stop();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const cancelRecognizing = async () => {
//     try {
//       await Voice.cancel();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const destroyRecognizer = async () => {
//     try {
//       await Voice.destroy();
//     } catch (e) {
//       console.error(e);
//     }
//     setRecognized('');
//     setPitch('');
//     setError('');
//     setStarted('');
//     setResults([]);
//     setPartialResults([]);
//     setEnd('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
//       <Text style={styles.instructions}>
//         Press the button and start speaking.
//       </Text>
//       <Text style={styles.stat}>{`Started: ${started}`}</Text>
//       <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
//       <Text style={styles.stat}>{`Pitch: ${pitch}`}</Text>
//       <Text style={styles.stat}>{`Error: ${error}`}</Text>
//       <Text style={styles.stat}>Results</Text>
//       {results.map((result, index) => (
//         <Text key={`result-${index}`} style={styles.stat}>
//           {result}
//         </Text>
//       ))}
//       <Text style={styles.stat}>Partial Results</Text>
//       {partialResults.map((result, index) => (
//         <Text key={`partial-result-${index}`} style={styles.stat}>
//           {result}
//         </Text>
//       ))}
//       <Text style={styles.stat}>{`End: ${end}`}</Text>
//       <TouchableHighlight onPress={startRecognizing}>
//        <Text style={{backgroundColor:"red",padding:50}}>BTN</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={stopRecognizing}>
//         <Text style={styles.action}>Stop Recognizing</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={cancelRecognizing}>
//         <Text style={styles.action}>Cancel</Text>
//       </TouchableHighlight>
//       <TouchableHighlight onPress={destroyRecognizer}>
//         <Text style={styles.action}>Destroy</Text>
//       </TouchableHighlight>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     width: 50,
//     height: 50,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   action: {
//     textAlign: 'center',
//     color: '#0000FF',
//     marginVertical: 5,
//     fontWeight: 'bold',
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   stat: {
//     textAlign: 'center',
//     color: '#B0171F',
//     marginBottom: 1,
//   },
// });

// export default FirstUser;

