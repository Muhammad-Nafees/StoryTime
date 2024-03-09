import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ScrollViewBase,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackButton from '../../../components/BackButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SettingButton from '../../../components/SettingButton';
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../Styles/Style';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import NavigationsString from '../../../constants/NavigationsString';
import { profile_oliverPierce } from '../../../../dummyData/DummyData';
import ProfileOliverData from '../../../components/profile/ProfileOliverData';
import RecordingOliverData from '../../../components/profile/RecordingOliverData';
import IncognitoMode from '../../../components/profile/IncognitoMode';
import { fetch_users_stories, getUsers_Profile, toggle_publicandPrivateMode } from "../../../../services/api/profile/index"
import { useDispatch, useSelector } from 'react-redux';
import { setIsPublicOrPrivateMode } from '../../../../store/slices/addplayers/addPlayersSlice';
import LogoutBtn from '../../../components/profile/LogoutBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';

const Profile = ({ route }) => {

  const { BG_CONTAINER, SHARE_BTN, SETTINGS_ICON } = Img_Paths;
  const navigation = useNavigation();
  const { FEED_CHAT, SETTING } = NavigationsString;
  const [isContent, setIsContent] = useState(0);
  const [changeMode, setChangeMode] = useState(0);
  const [recordingPage, setRecordingPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);
  const [hasMorePagesRecording, setHasMorePagesRecording] = useState(false);
  const [type, setType] = useState("text");
  const [isLoadingRecording, setIsLoadingRecording] = useState(false);
  const [response_ProfileVideo, setResponse_ProfileVideo] = useState([]);
  const [profile_response, setProfileResponse] = useState([]);
  const dispatch = useDispatch();
  const reduxPublicInc = useSelector((state) => state?.addPlayers?.publicAndPrivateMode);
  const FriendIdRTK = useSelector((state) => state?.addPlayers?.friendId);


  const [isPublicOrPrivate, setIsPublicOrPrivate] = useState(true);
  const [isNoDataProfile, setIsNoDataProfile] = useState("");

  // const FRIEND_ID = route?.params?.friendId;

  console.log("from Home", FriendIdRTK);
  // const FRIEND_ID = parseFloat(FriendIdRTK);

  const getUsersProfile = async () => {
    try {
      const response = await getUsers_Profile({ user: FriendIdRTK });
      console.log("response--- :", response);
      return response;
    } catch (error) {
    };
  };

  useEffect(() => {
    getUsersProfile();
  }, [FriendIdRTK])




  const toggel_mode = async () => {
    try {
      const responseData = await toggle_publicandPrivateMode();
      if (responseData) {
        setIsPublicOrPrivate(responseData?.data?.isPublic);
      };
      console.log("toggleModeResponse=====", responseData?.data);
      return responseData;
    } catch (error) {
    };
  };

  console.log("id ;========== :", typeof FriendIdRTK)

  const profile_story_api = async () => {

    if (hasMorePagesRecording) {
      setIsLoadingRecording(false);
    } else {
      setIsLoadingRecording(true);
    };

    try {
      const responseData = await fetch_users_stories({
        recordingPage: recordingPage,
        type: type,
        // user: FriendIdRTK
      });

      const responsestories = responseData?.data?.stories;
      console.log("responsestories---- :", responsestories);
      console.log("FUNC-updated.... API----------------------:");
      if (responsestories && type === "text") {
        setIsLoadingRecording(false);
        setProfileResponse((prevData) => [...prevData, ...responsestories]);
      }
      else if (responsestories && type === "video") {
        console.log("responsestories Video---- :", responsestories);
        setIsLoadingRecording(false);
        setResponse_ProfileVideo((prevData) => [...prevData, ...responsestories]);
      }
      else {
        setIsNoDataProfile("No any story found");
      };
      console.log("FUNC-updated.... API again----------------------:");
      setHasMorePagesRecording(responseData?.data?.pagination?.hasNextPage);

      return responseData;
    } catch (error) {
      console.log("err", error);
    };
  };



  useFocusEffect(
    useCallback(() => {
      setType("text");
      profile_story_api();
    }, [type, recordingPage])
  );

  // useEffect(() => {

  // }, [type, recordingPage, FriendIdRTK,]);



  // <>
  //   <View style={{ height: responsiveHeight(90), justifyContent: "flex-end" }}>
  //     <LogoutBtn />
  //   </View>
  // </>

  return (
    <>
      {isPublicOrPrivate ? (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <ImageBackground
            style={{ width: '100%', height: responsiveHeight(35) }}
            source={BG_CONTAINER}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View style={{ paddingTop: responsiveWidth(6) }}>
                <BackButton onPress={() => navigation?.goBack()} />
              </View>
              <View
                style={{
                  height: responsiveHeight(35),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 180, height: 200, resizeMode: 'center' }}
                  source={require('../../../assets/bgoliver.png')}
                />
              </View>

              {/* Incognito Icon----- */}

              <View style={{ paddingTop: responsiveWidth(6) }}>
                <TouchableOpacity
                  onPress={() => {
                    setChangeMode(1)
                    setType("video");
                    toggel_mode();
                  }
                  }
                  style={[
                    styles.back_button,
                    {
                      backgroundColor:
                        changeMode == 1
                          ? TextColorGreen
                          : 'rgba(57, 94, 102, 0.5)',
                    },
                  ]}>
                  <Image
                    style={styles.left_arrow}
                    source={require('../../../assets/incognito-icon.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingTop: responsiveWidth(6) }}>
                <SettingButton
                  onPress={() => navigation.navigate(SETTING)}
                  image={SETTINGS_ICON}
                />
              </View>
            </View>
          </ImageBackground>

          <View
            style={{
              paddingVertical: moderateVerticalScale(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: responsiveWidth(91),
                justifyContent: 'space-around',
              }}>

              <TouchableOpacity
                onPress={() => {
                  setIsContent(0)
                  setType("text");
                  setRecordingPage(1);
                  setIsLoadingRecording(false);
                  setResponse_ProfileVideo([]);
                }
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  paddingVertical: moderateVerticalScale(14),
                  backgroundColor:
                    isContent == 1
                      ? 'rgba(0.2235, 0.3686, 0.4, 0.2)'
                      : TextColorGreen,
                  width: responsiveWidth(45),
                }}>
                <Image
                  style={{ width: 22, height: 22, resizeMode: 'center' }}
                  source={require('../../../assets/recordingProfile.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsContent(1);
                  setType("video");
                  setProfileResponse([]);
                  setRecordingPage(1);
                }}
                style={{
                  borderRadius: 10,
                  paddingVertical: moderateVerticalScale(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor:
                    isContent == 0
                      ? 'rgba(0.2235, 0.3686, 0.4, 0.2)'
                      : TextColorGreen,
                  width: responsiveWidth(45),
                }}>
                <Image
                  style={{ width: 22, height: 22, resizeMode: 'center' }}
                  source={require('../../../assets/videoprofile.png')}
                />
              </TouchableOpacity>

            </View>
          </View>

          {isContent === 0 ? (
            <ProfileOliverData
              profile_response={profile_response}
              hasMorePagesRecording={hasMorePagesRecording}
              setRecordingPage={setRecordingPage}
              setIsLoadingRecording={setIsLoadingRecording}
              isLoadingRecording={isLoadingRecording}
            />
          )
            :
            (
              <RecordingOliverData
                video_profile_response={response_ProfileVideo}
                isNoDataProfile={isNoDataProfile}
                hasMorePagesRecording={hasMorePagesRecording}
                setRecordingPage={setRecordingPage}
                isLoadingRecording={isLoadingRecording}
              />
            )}
        </View>
      ) : (
        <IncognitoMode
          toggel_mode={toggel_mode}
          setChangeMode={setChangeMode}
          hasMorePagesRecording={hasMorePagesRecording}
        />
      )}
    </>
  );
};



const styles = StyleSheet.create({
  fourth_container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(65),
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
  back_button: {
    borderRadius: 10,
    width: responsiveWidth(12.9),
    height: responsiveHeight(6.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  left_arrow: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    resizeMode: 'center',
  },
});

export default Profile;
