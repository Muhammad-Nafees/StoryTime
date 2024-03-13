import { View, Text, ImageBackground, SafeAreaView, StatusBar, Image, StyleSheet, TouchableOpacity, ScrollView, ScrollViewBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Img_Paths } from '../../assets/Imagepaths';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import BackButton from '../BackButton';
import { useNavigation } from '@react-navigation/native';
import SettingButton from '../SettingButton';
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../screens/Styles/Style';
import { moderateVerticalScale } from 'react-native-size-matters';
import NavigationsString from '../../constants/NavigationsString';
import RecordingIncognito from './RecordingIncognito';
import { fetch_users_stories } from '../../../services/api/profile';
import IncognitoVideo from './IncognitoVideo';
import { Inter_SemiBold, PassionOne_Regular } from '../../constants/GlobalFonts';


const IncognitoMode = ({ setChangeMode,
    toggel_mode,
    hasMorePagesRecording,
    username
}) => {

    const { BG_CONTAINER, SHARE_BTN, SETTINGS_ICON, BG_BLACK_INCOGNITO } = Img_Paths;
    const navigation = useNavigation();
    const { FEED_CHAT, } = NavigationsString;
    const [isContentIncognito, setIsContentIncognito] = useState(0);
    const [hasMorePagesIncognito, setHasMorePagesincognito] = useState(false);
    const [incognitoPage, setincognitoPage] = useState(1);
    const [InconitoVideoPage, setIncognitoVideoPage] = useState(1);
    const [isLoadingIncognitoRec, setIsLoadingIncognitoRec] = useState(false);
    const [isNoDataProfile, setIsNoDataProfile] = useState("");


    const [type, setType] = useState("text");
    const [incognito_response, SetIncognito_response] = useState([])
    const [responseIncognitoVideo, setResponseIncognitoVideo,] = useState([]);



    const incognito_profileResponse = async () => {
        try {

            const responseData = await fetch_users_stories({ type: type, recordingPage: incognitoPage, isincognitoPage: incognitoPage });
            const responsestories = responseData?.data?.stories;

            if (responsestories && type === "text") {
                setIsLoadingIncognitoRec(false);
                SetIncognito_response((prevData) => [...prevData, ...responsestories]);
            }
            else if (responsestories && type === "video") {
                setIsLoadingIncognitoRec(false);
                setResponseIncognitoVideo((prevData) => [...prevData, ...responsestories]);
            } else {
                setIsNoDataProfile("No any story found");
            };

            setHasMorePagesincognito(responseData?.data?.pagination?.hasNextPage);

            console.log("incognito_response-State=====", incognito_response);
            console.log("hamsorepage", hasMorePagesIncognito);
            return responseData;
        } catch (error) {
            console.log("err", error);
        };
    };

    useEffect(() => {
        incognito_profileResponse();
    }, [type, incognitoPage]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ImageBackground
                style={{ width: '100%', height: responsiveHeight(35) }}
                source={BG_BLACK_INCOGNITO}>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ paddingTop: responsiveWidth(6) }}>
                        <BackButton onPress={() => navigation?.goBack()} />
                    </View>

                    <View
                        style={{
                            height: responsiveHeight(45),
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: "relative",
                            left: 10
                        }}>
                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(2), fontFamily: Inter_SemiBold.Inter_SemiBold }}>
                            {`@${username}`}
                        </Text>
                    </View>

                    {/* Incognito Icon----- */}

                    <View style={{ paddingTop: responsiveWidth(6) }}>
                        <TouchableOpacity onPress={() => {
                            setChangeMode(0);
                            toggel_mode();
                            SetIncognito_response([]);
                            setResponseIncognitoVideo([]);
                        }} style={styles.back_button}>
                            <Image style={styles.left_arrow} source={require("../../assets/incognito-icon.png")} />
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
                            setIsContentIncognito(0);
                            setType("text");
                            setResponseIncognitoVideo([]);
                            setincognitoPage(1);
                        }
                        }
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            paddingVertical: moderateVerticalScale(14),
                            backgroundColor:
                                isContentIncognito == 1
                                    ? 'rgba(0.2235, 0.3686, 0.4, 0.2)'
                                    : TextColorGreen,
                            width: responsiveWidth(45),
                        }}>
                        <Image
                            style={{ width: 22, height: 22, resizeMode: 'center' }}
                            source={require('../../assets/recordingProfile.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setIsContentIncognito(1);
                            setType("video");
                            SetIncognito_response([]);
                            setincognitoPage(1);
                        }}
                        style={{
                            borderRadius: 10,
                            paddingVertical: moderateVerticalScale(14),
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:
                                isContentIncognito == 0
                                    ? 'rgba(0.2235, 0.3686, 0.4, 0.2)'
                                    : TextColorGreen,
                            width: responsiveWidth(45),
                        }}>
                        <Image
                            style={{ width: 22, height: 22, resizeMode: 'center' }}
                            source={require('../../assets/videoprofile.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {isContentIncognito === 0 ?
                <RecordingIncognito
                    incognito_response={incognito_response}
                    setIsincognitoPage={setincognitoPage}
                    hasMorePagesIncognito={hasMorePagesIncognito}
                    isincognitoPage={incognitoPage}
                />
                :
                <IncognitoVideo
                    responseIncognitoVideo={responseIncognitoVideo}
                    setincognitoPage={setincognitoPage}
                    hasMorePagesIncognito={hasMorePagesIncognito}
                    isincognitoPage={incognitoPage}
                    isNoDataProfile={isNoDataProfile}
                // videoPage={incorg}
                />
            }



        </View>

    )
};


export default IncognitoMode;

const styles = StyleSheet.create({
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        width: responsiveWidth(65),
    },

    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    second_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    third_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    back_button: {
        borderRadius: 10,
        width: responsiveWidth(12.9),
        height: responsiveHeight(6.3),
        backgroundColor: "rgba(57, 94, 102, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    left_arrow: {
        width: responsiveWidth(6),
        height: responsiveHeight(3),
        resizeMode: "center"
    },
});
