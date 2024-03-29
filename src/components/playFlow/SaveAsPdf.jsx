import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {TextColorGreen} from '../../screens/Styles/Style';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Img_Paths} from '../../assets/Imagepaths/index';
import BackButton from '../reusable-components/addplayer/customBackButton/BackButton';
import NavigationsString from '../../constants/NavigationsString';
import {useDispatch, useSelector} from 'react-redux';
import {PassionOne_Regular} from '../../constants/GlobalFonts';
import SaveStoryBtn from './SaveStoryBtn';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import DownloadingFlow from './DownloadingFlow';
import {SPACING} from '../../constants/Constant';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetFriends} from '../../../store/slices/categoriesSlice/categoriesSlice';
import SaveStoryPhone from './SaveStoryPhone';

const SaveAsPdf = ({isVisiblePdf, setIsVisiblePdf, directoryPath}) => {
  console.log('SAVEASPDF FIEL!', isVisiblePdf);
  const {width, height} = Dimensions.get('window');
  const {SAVE_STORY_BACKGROUND, BG_CLOCK} = Img_Paths;
  const SCREENWIDTH = Dimensions.get('window').width;
  const SCREENHEIGHT = Dimensions.get('window').height;
  const [isVisibleDownloading, setIsVisibleDownloading] = useState(false);
  const [saveStoryModalDownloading, setSaveStoryModalDownloading] =
    useState(false);
  const {VIDEO_SECOND_USER, FIRST_USER} = NavigationsString;
  const textrecordUsers = useSelector(
    state => state?.getcategories?.recordingText,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dontSaveToPdf, setDontSaveToPdf] = useState(false);
  // const {user} = useSelector(state => state?.authSlice);

  // const isUserGuest = useMemo(() => !user, [user]);

  console.log('textrecordusers', textrecordUsers);

  const loadSavedPath = async () => {
    console.log('Saving pdf file!');
    pickDirectory();

    // try {
    //   const savedPath = await AsyncStorage.getItem('selectedFolderPath');
    //   if (savedPath) {
    //     // If path is saved, use it for subsequent PDF creations
    //     console.log(savedPath, '.....');
    //     createPDF(savedPath);
    //   } else {
    //     // If no path is saved, prompt the user to select
    //     pickDirectory();
    //   }
    // } catch (error) {
    //   console.error('Error loading saved path: ', error);
    // }
  };

  const saveSelectedPath = async path => {
    try {
      // Save the selected path to AsyncStorage for future usage
      await AsyncStorage.setItem('selectedFolderPath', path);
    } catch (error) {
      console.error('Error saving selected path: ', error);
    }
  };

  const convertExternalStorageUriToAbsolutePath = uri => {
    let dirToRead = uri.split('tree')[1];
    dirToRead = '/storage' + dirToRead.replace(/%3A/g, '%2F');
    console.log(dirToRead);
    return decodeURIComponent(dirToRead);
  };

  const convertInternalStoragePathToAbsolutePath = uri => {
    let dirToRead = uri?.split('primary')[1];
    const InternalStoragePath = RNFS.ExternalStorageDirectoryPath;
    console.log(InternalStoragePath);
    dirToRead = InternalStoragePath + dirToRead.replace(/%3A/g, '%2F');
    console.log(dirToRead);
    return decodeURIComponent(dirToRead);
  };
  const [isLoadingDirectory, setIsLoadingDirectory] = useState(false);

  const pickDirectory = async () => {
    try {
      const result = await DocumentPicker.pickDirectory({
        type: [DocumentPicker.types.allFiles],
      });

      if (result) {
        console.log('result', result);

        let absolutePath;

        // Check if it's internal storage
        if (
          result?.uri?.startsWith(
            'content://com.android.externalstorage.documents/tree/primary',
          )
        ) {
          absolutePath = convertInternalStoragePathToAbsolutePath(result.uri);
        } else {
          // It's SD card or other external storage
          absolutePath = convertExternalStorageUriToAbsolutePath(result.uri);
        }

        console.log(absolutePath);

        // Save the selected path
        saveSelectedPath(absolutePath);
        // Use the absolute file path directly
        if (Platform.OS === 'android' && Platform.Version < 23) {
          requestStoragePermission(absolutePath);
        } else {
          console.log('else works');
          createPDF(absolutePath);
        }
      } else {
        console.log('User canceled directory selection.');
        // Handle the case where the user canceled the directory selection (pressed back)
        // You may choose to show a message or take appropriate action.
      }
    } catch (err) {
      // Handle errors
      console.error('Error picking directory:', err);
    }
  };

  const requestStoragePermission = async selectedPath => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('External storage permissions granted');
        createPDF(selectedPath);
      } else {
        console.warn('External storage permissions denied');
        // Handle the case where permissions are denied
      }
    } catch (error) {
      console.error('Error requesting external storage permissions: ', error);
      // Handle the error
    }
  };

  const createPDF = async selectedPath => {
    setIsLoadingDirectory(true);
    try {
      const folderPath = `${RNFS.DocumentDirectoryPath}/PDF`;
      await RNFS.mkdir(folderPath);
      console.log('folderPath---------------------', folderPath);

      const htmlContent = `<html><body><h3>${textrecordUsers}</h3></body></html>`;

      const options = {
        html: htmlContent,
        fileName: 'voicetotext',
        directory: folderPath,
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      const downloadDest = `${
        RNFS.DownloadDirectoryPath
      }/voicetotext_${Math.floor(Math.random() * 100000)}.pdf`;
      console.log('downloadDest---------------------', downloadDest);
      await RNFS.moveFile(pdf.filePath, downloadDest);

      setIsVisiblePdf(false);
      setIsVisibleDownloading(true);
      setSaveStoryModalDownloading(true);
      dispatch(resetFriends());
      setIsLoadingDirectory(false);
    } catch (error) {
      console.error('Error generating PDF: ', error.message, error.code);
      Alert.alert('Error generating PDF. Please try again.');
      setIsLoadingDirectory(false);
    }
  };

  return (
    <>
      <Modal
        onRequestClose={() => setIsVisiblePdf(false)}
        visible={isVisiblePdf}>
        <ImageBackground
          style={styles.container}
          source={SAVE_STORY_BACKGROUND}>
          {/* Back Button */}
          <View
            style={{
              width: responsiveWidth(90),
              marginLeft: 'auto',
              paddingTop: responsiveWidth(10),
            }}>
            <BackButton onPress={() => setIsVisiblePdf(false)} />
          </View>

          <ImageBackground
            style={styles.img_frame}
            resizeMode="stretch"
            source={BG_CLOCK}>
            <View
              style={{
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
                Do you want to save your Story Time as PDF?
              </Text>

              <View style={{paddingVertical: 12}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity
                    disabled={isLoadingDirectory}
                    onPress={loadSavedPath}
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
                onPress={() => setIsVisiblePdf(false)}
                text="No"
              />

              {/* </View> */}
            </View>
          </ImageBackground>
        </ImageBackground>
      </Modal>
      {dontSaveToPdf && (
        <SaveStoryPhone
          isVisible={dontSaveToPdf}
          setIsVisible={setDontSaveToPdf}
        />
      )}
      {saveStoryModalDownloading && (
        <DownloadingFlow
          isVisibleDownloading={isVisibleDownloading}
          setIsVisibleDownloading={setIsVisibleDownloading}
          text={`Story Time\nSuccessfully Saved`}
          textButton="Back"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: 'center',
    // paddingVertical: moderateVerticalScale(10),
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
});

export default SaveAsPdf;
