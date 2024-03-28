import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import React, { useCallback, useState } from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackButton from '../../../components/reusable-components/addplayer/customBackButton/BackButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SettingButton from '../../../components/SettingButton';
import { TextColorGreen } from '../../Styles/Style';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import ProfileOliverData from '../../../components/profile/ProfileOliverData';
import RecordingOliverData from '../../../components/profile/RecordingOliverData';
import IncognitoMode from '../../../components/profile/IncognitoMode';
import { fetch_users_stories, getUsers_Profile, toggle_publicandPrivateMode } from "../../../../services/api/profile/index"
import { useDispatch, useSelector } from 'react-redux';
import { setResponseUsersProfile } from '../../../../store/slices/categoriesSlice/categoriesSlice';
import { Inter_Regular, Inter_SemiBold } from '../../../constants/GlobalFonts';


const Profile = () => {

  const { BG_CONTAINER, SETTINGS_ICON } = Img_Paths;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const navigation = useNavigation();
  const [isContent, setIsContent] = useState(0);
  const [changeMode, setChangeMode] = useState(0);
  const [recordingPage, setRecordingPage] = useState(1);
  const [hasMorePagesRecording, setHasMorePagesRecording] = useState(false);
  const [type, setType] = useState("text");
  const [isLoadingRecording, setIsLoadingRecording] = useState(false);
  const [response_ProfileVideo, setResponse_ProfileVideo] = useState([]);
  const [profile_response, setProfileResponse] = useState([]);
  const [responseUserProfile, setResponseUserProfile] = useState({});
  const [isUserProfileData, setIsUserProfileData] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isPublicOrPrivate, setIsPublicOrPrivate] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const FriendIdRTK = useSelector((state) => state?.getcategories?.friendId);
  const { user } = useSelector(state => state?.authSlice);
  const USER = user?.data?.user || user?.data;



  useFocusEffect(
    useCallback(() => {
      const getUsersProfile = async () => {
        setIsUserLoading(true);
        setProfileResponse([]);
        setResponse_ProfileVideo([]);
        setType("text");
        try {
          const response = await getUsers_Profile({ user: FriendIdRTK });
          if (response) {
            setResponseUserProfile(response);
            setIsUserLoading(false);
          }
          setRecordingPage(1);
          dispatch(setResponseUsersProfile(response))
          setIsPublicOrPrivate(response?.data?.isPublic);
          return response;
        } catch (error) {
          console.log("ERROR FROM USERS_PROFILE", error?.response?.data);
        };
      };
      getUsersProfile();
    }, [FriendIdRTK])
  );



  useFocusEffect(
    useCallback(() => {
      const profile_story_api = async () => {
        if (hasMorePagesRecording) {
          setIsLoadingRecording(false);
        }
        else {
          setIsLoadingRecording(true);
        };
        try {
          const responseData = await fetch_users_stories({
            recordingPage: recordingPage,
            type: type,
            user: FriendIdRTK,
          });
          console.log("RESPONSE DATA :", responseData?.data?.data?.stories);
          setIsLoadingRecording(false);
          if (responseData?.data?.data?.stories && type === "text") {
            setType("text");
            setIsLoadingRecording(false);
            setProfileResponse((prevData) => {
              const filteredData = responseData?.data?.data?.stories.filter(item => !prevData.some(prevItem => prevItem._id === item._id));
              console.log("filteredDataTEXT", filteredData);
              return [...prevData, ...filteredData]
            }
            );
          }

          else if (responseData?.data?.data?.stories && type === "video") {
            setType("video");
            setIsLoadingRecording(false);
            setResponse_ProfileVideo((prevData) => {
              const filteredData = responseData?.data?.data?.stories.filter(item => !prevData.some(prevItem => prevItem._id === item._id));
              console.log("filteredDataVIDEO", filteredData);
              return [...prevData, ...filteredData];
            }
            );
          };

          setHasMorePagesRecording(responseData?.data?.pagination?.hasNextPage);
          return responseData;

        } catch (error) {
          console.log("ERROR FROM FETCH_USERS_SRORIES :", error);
        };
      };
      profile_story_api();
    }, [type, recordingPage, FriendIdRTK])
  );


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



  const handleText = () => {
    setType("text");
    setIsContent(0);
    setRecordingPage(1);
    setIsLoadingRecording(false);
  }

  const handleVideo = () => {
    setType("video");
    setIsContent(1);
    setRecordingPage(1);
    setIsLoadingRecording(false);
  };



  return (
    <>
      {isPublicOrPrivate ? (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
          <ImageBackground
            style={{
              height: SCREEN_HEIGHT / 3,
              width: SCREEN_WIDTH,
            }}
            source={BG_CONTAINER}>

            <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
              <View style={{ paddingTop: responsiveWidth(6) }}>
                <BackButton onPress={() => navigation?.goBack()} />
              </View>

              <View>
                <View style={{ flexDirection: "row", }}>
                  {
                    isUserLoading ?
                      <View style={{ height: SCREEN_HEIGHT / 3, width: SCREEN_WIDTH / 2.5, justifyContent: "center" }}>
                        <ActivityIndicator />
                      </View>
                      :
                      <>
                        <View style={{}}>
                          <ImageBackground style={{ width: SCREEN_WIDTH / 2, height: SCREEN_HEIGHT / 3, justifyContent: "center", alignItems: "center" }} resizeMode="contain" source={require("../../../assets/profile-picture.png")}>

                            <View style={{ width: responsiveWidth(30), height: responsiveHeight(17.5), justifyContent: "center" }}>
                              <Text style={{ color: "#FFF", fontSize: responsiveFontSize(2), fontFamily: Inter_SemiBold.Inter_SemiBold, textAlign: "center", paddingTop: responsiveWidth(15) }}>
                                {`@${responseUserProfile?.data?.username || 0}`}
                              </Text>
                            </View>


                            <View style={{ flexDirection: 'row', height: responsiveHeight(7), width: responsiveWidth(40), justifyContent: "space-around", alignItems: "center" }}>
                              <View>
                                <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.8), textAlign: "center", fontFamily: Inter_Regular.Inter_Regular }}>
                                  {`${responseUserProfile?.data?.noOfFollowings || 0}`}
                                </Text>
                                <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.8), fontFamily: Inter_Regular.Inter_Regular }}>
                                  Following
                                </Text>
                              </View>

                              <View>
                                <View style={{}}>
                                  <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.8), textAlign: "center", fontFamily: Inter_Regular.Inter_Regular }}>
                                    {`${responseUserProfile?.data?.noOfFollowers || 0}`}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.8), fontFamily: Inter_Regular.Inter_Regular }}>
                                    Followers
                                  </Text>
                                </View>
                              </View>

                            </View>

                          </ImageBackground>
                        </View>

                      </>
                  }


                  <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: responsiveWidth(6), width: responsiveWidth(30) }}>
                    {
                      USER?._id === FriendIdRTK ? (
                        <>

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
                                backgroundColor: 'rgba(57, 94, 102, 0.5)',
                              },
                            ]}>
                            <Image
                              style={styles.left_arrow}
                              source={require('../../../assets/incognito-icon.png')}
                            />
                          </TouchableOpacity>

                          <View style={{ paddingHorizontal: moderateScale(7) }}>
                            <SettingButton
                              onPress={() => navigation.navigate("Setting")}
                              image={SETTINGS_ICON}
                            />
                          </View>
                        </>
                      )
                        :
                        null
                    }
                  </View>


                </View>
                <View>

                </View>
              </View>
            </View>

            {/* Incognito Icon----- */}


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
                onPress={() => handleText()}
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
                onPress={() => handleVideo()}
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
              isUserProfileData={isUserProfileData}
              isUserLoading={isUserLoading}
            />
          )
            :
            (
              <RecordingOliverData
                video_profile_response={response_ProfileVideo}
                hasMorePagesRecording={hasMorePagesRecording}
                setRecordingPage={setRecordingPage}
                isLoadingRecording={isLoadingRecording}
                isUserProfileData={isUserProfileData}
                isUserLoading={isUserLoading}
              />
            )}
        </View>
      ) : (
        <IncognitoMode
          toggel_mode={toggel_mode}
          setChangeMode={setChangeMode}
          changeMode={changeMode}
          hasMorePagesRecording={hasMorePagesRecording}
          username={responseUserProfile?.data?.username}
        />
      )}
    </>
  )
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
