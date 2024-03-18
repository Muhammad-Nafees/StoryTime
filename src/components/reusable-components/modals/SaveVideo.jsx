import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import {
  PrimaryColor,
  TextColorGreen,

  pinkColor,
} from '../../../screens/Styles/Style';
import {
  useNavigation,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths/index';
import BackButton from '../addplayer/customBackButton/BackButton';
import NavigationsString from '../../../constants/NavigationsString';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';
import SaveStoryBtn from '../../playFlow/SaveStoryBtn';
import DownloadingVideoModal from '../../playFlow/DownloadingVideoModal';
import { SPACING } from '../../../constants/Constant';
import { recordingData, saveRecordingVideoUser } from "../../../../store/slices/categoriesSlice/categoriesSlice"
import { resetFriends } from '../../../../store/slices/categoriesSlice/categoriesSlice';

const SaveVideo = ({ isVisible, setIsVisible, path }) => {
  const { user } = useSelector(state => state?.authSlice);
  const isUserGuest = useMemo(() => !user, [user]);
  console.log(isUserGuest, "ISUSERGUES")
  const [isDownloadingModalVisible, setIsDownloadingModalVisible] =
    useState(false);
  const {
    BG_PLAYFLOW,
    BG_CLOCK,
  } = Img_Paths;
  const [saveStoryVideoModal, setSaveStoryVideoModal] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const recordedVideo = useSelector(
    state => state.getcategories.saveRecordingVideo,
  );
  console.log('RECORDVID-----', recordedVideo);

  const closeDownloadingModal = () => {
    setIsDownloadingModalVisible(false);
    setIsVisible(false); // Close the main modal
  };

  // const checkPermission = async () => {
  //   try {
  //     const OsVer = Platform.constants['Release'];
  //     console.log('osVER', typeof OsVer);
  //     // Check if the platform is Android
  //     if (Platform.OS === 'android' && Number(OsVer) < 12) {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Storage permission granted');
  //         // setIsVisible(false)
  //         downloadRecording();
  //       } else {
  //         console.log('Storage permission denied');
  //         Alert.alert(
  //           'Permission Denied',
  //           'Please grant storage permission to save the PDF.',
  //         );
  //       }
  //     } else {
  //       // Platform is iOS, no explicit permission request needed
  //       downloadRecording();
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  const convertExternalStorageUriToAbsolutePath = uri => {
    let dirToRead = uri.split('tree')[1];
    dirToRead = '/storage' + dirToRead.replace(/%3A/g, '%2F');
    return decodeURIComponent(dirToRead);
  };

  const convertInternalStoragePathToAbsolutePath = uri => {
    let dirToRead = uri?.split('primary')[1];
    const InternalStoragePath = RNFS.ExternalStorageDirectoryPath;
    dirToRead = InternalStoragePath + dirToRead.replace(/%3A/g, '%2F');
    return decodeURIComponent(dirToRead);
  };

  const pickDirectory = async () => {
    setSaveStoryVideoModal(true);
    setIsDownloadingModalVisible(true);
    dispatch(saveRecordingVideoUser(null));
    dispatch(recordingData(null));
    dispatch(resetFriends());
  };

  // const pickDirectory = async () => {
  //   try {
  //     const result = await DocumentPicker.pickDirectory({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     let absolutePath;
  //     if (
  //       result?.uri?.startsWith(
  //         'content://com.android.externalstorage.documents/tree/primary',
  //       )
  //     ) {
  //       absolutePath = convertInternalStoragePathToAbsolutePath(result.uri);
  //     } else {
  //       absolutePath = convertExternalStorageUriToAbsolutePath(result.uri);
  //     }
  //     setSaveStoryVideoModal(true);
  //     setIsDownloadingModalVisible(true);
  //     dispatch(saveRecordingVideoUser(null));
  //     dispatch(recordingData(null));
  //     dispatch(resetFriends());
  //     // downloadRecording(absolutePath);
  //   } catch (err) {
  //     // Handle errors
  //     console.error('Error picking directory:', err);
  //   }
  // };
  // const downloadRecording = async absolutePath => {
  //   // try {
  //   //   const destinationPath = `${
  //   //     RNFS.DownloadDirectoryPath
  //   //   }/downloaded_video${Math.floor(Math.random() * 100000)}.mp4`; // Generate random number
  //   //   const sourcePath = `file://${recordedVideo}`;

  //   //   if (!sourcePath) {
  //   //     console.error('Recording path not found.');
  //   //     return;
  //   //   }
  //   //   await RNFS.copyFile(sourcePath, destinationPath);
  //   //   console.log('Video downloaded successfully:', destinationPath);
  //   //   setSaveStoryVideoModal(true);
  //   //   setIsDownloadingModalVisible(true);
  //   // } catch (error) {
  //   //   console.error('Error downloading recording:', error);
  //   // }
  //   try {
  //     // Download the video
  //     const destinationPath = `${
  //       RNFS.DownloadDirectoryPath
  //     }/downloaded_video${Math.floor(Math.random() * 100000)}.mp4`; // Generate random number
  //     const sourcePath = `file://${recordedVideo}`;

  //     if (!sourcePath) {
  //       console.error('Recording path not found.');
  //       return;
  //     }
  //     await RNFS.copyFile(sourcePath, destinationPath);
  //     console.log('Video downloaded successfully:', destinationPath);

  //     // Create PDF from the downloaded video
  //     await createPDF(selectedPath);

  //     // Additional logic or UI updates after both tasks are completed
  //     setSaveStoryVideoModal(true);
  //     setIsDownloadingModalVisible(true);
  //   } catch (error) {
  //     console.error('Error downloading recording or generating PDF:', error);
  //   }
  // };

  const downloadRecording = async selectedPath => {
    try {
      // Ensure the selected path exists
      if (!(await RNFS.exists(selectedPath))) {
        await RNFS.mkdir(selectedPath);
      }

      // Generate a random filename for the downloaded video
      const destinationPath = `${selectedPath}/downloaded_video${Math.floor(
        Math.random() * 100000,
      )}.mov`;

      // Copy the recorded video to the selected path
      const sourcePath = `file://${path}`;
      if (!sourcePath) {
        console.error('Recording path not found.');
        return;
      }

      await RNFS.copyFile(sourcePath, destinationPath);

      // Additional logic or UI updates after the video is saved
      setSaveStoryVideoModal(true);
      setIsDownloadingModalVisible(true);
      dispatch(saveRecordingVideoUser(null));
      dispatch(recordingData(null));
      dispatch(resetFriends());
    } catch (error) {
      console.error('Error saving video:', error);
    }
  };

  return (
    <>
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
          <View
            style={{
              width: responsiveWidth(90),
              marginLeft: 'auto',
              paddingTop: responsiveWidth(10),
            }}>
            <BackButton onPress={() => setIsVisible(false)} />
          </View>

          <ImageBackground
            style={styles.img_frame}
            resizeMode="stretch"
            source={BG_CLOCK}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: -SPACING * 7,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: PassionOne_Regular.passionOne,
                  color: TextColorGreen,
                  fontSize: 24,
                  paddingVertical: 10,
                }}>
                Save Story
              </Text>
              <Text
                style={{
                  paddingVertical: 2,
                  width: responsiveWidth(45),
                  textAlign: 'center',
                  color: TextColorGreen,
                  lineHeight: 22,
                  fontWeight: '400',
                }}>
                Do you want to save your Story Time in your phone?
              </Text>

              <View style={{ paddingVertical: 12 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={pickDirectory}
                    style={{
                      width: responsiveWidth(70),
                      backgroundColor: TextColorGreen,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: responsiveHeight(6.6),
                    }}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.9),
                        fontWeight: '600',
                        letterSpacing: 0.28,
                        color: '#FFF',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <SaveStoryBtn
                timeLeft={0}
                onPress={() => {
                  isUserGuest ? setIsVisible(false) : setIsVisible(false);
                  navigation.navigate('Home');
                }}
                text="No"
              />
            </View>
          </ImageBackground>
        </ImageBackground>
      </Modal>
      {isDownloadingModalVisible && (
        <DownloadingVideoModal
          isVisibleFirstVideoFlow={isDownloadingModalVisible}
          setIsVisibleFirstVideoFlow={closeDownloadingModal}
          text={`Story Time\nSuccessfully Saved!`}
          textButton="Back"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  img: {
    resizeMode: 'center',
  },
  img_frame: {
    height: '70%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  img_backgroung_content: {
    width: responsiveWidth(90),
    height: responsiveHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg_content: {
    backgroundColor: PrimaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(78),
    height: responsiveHeight(27),
    marginLeft: responsiveWidth(1),
    marginBottom: responsiveWidth(2),
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    backgroundColor: '#FFF',
    height: responsiveHeight(30),
    width: responsiveWidth(80),
    borderWidth: 4,
    borderColor: TextColorGreen,
  },
  child_bg: {
    backgroundColor: pinkColor,
    width: responsiveWidth(70),
    height: responsiveHeight(28),
    marginTop: responsiveWidth(5),
    borderRadius: 18,
  },
  second_childbg: {
    marginLeft: 'auto',
    width: responsiveWidth(67),
  },

  third_childbg: {
    flexDirection: 'row',
    width: responsiveWidth(21),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(8),
  },
  child_bg_img: {
    width: responsiveWidth(6.25),
    height: responsiveHeight(3.5),
    resizeMode: 'center',
  },
  text_container: {
    paddingTop: responsiveWidth(4),
  },
  second_container: {
    position: 'relative',
    bottom: responsiveWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sec_container_firstchild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateVerticalScale(50),
    width: responsiveWidth(92),
    marginLeft: responsiveWidth(1),
    backgroundColor: '#E44173',
    height: responsiveHeight(7.5),
  },
  third_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fourth_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveWidth(36),
  },

  first_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  second_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  third_view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sophia_container: {
    flexDirection: 'row',
    width: responsiveWidth(21),
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: responsiveWidth(2.8),
  },
  // ... Your existing styles ...
});

export default SaveVideo;
