import { View, Text, ImageBackground, StatusBar, Image, StyleSheet, TouchableOpacity, ScrollView, ScrollViewBase } from 'react-native'
import React, { useState } from 'react'
import { Img_Paths } from '../../../assets/Imagepaths';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import SettingButton from '../../../components/SettingButton';
import { SecondaryColor, TextColorGreen } from '../../Styles/Style';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import NavigationsString from '../../../constants/NavigationsString';
import { profile_oliverPierce } from '../../../../dummyData/DummyData';
import ProfileOliverData from '../../../components/ProfileOliverData';
import RecordingOliverData from '../../../components/RecordingOliverData';
import IncognitoMode from '../../../components/IncognitoMode';
import Svg, { Defs, Filter, Rect, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

const Profile = () => {

    const { BG_CONTAINER, SHARE_BTN, SETTINGS_ICON } = Img_Paths;
    const navigation = useNavigation();
    const { FEED_CHAT,SETTING } = NavigationsString;
    const [isContent, setIsContent] = useState(0);
    const [changeMode, setChangeMode] = useState(0);


    return (
        <>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#000", }}>Profile Screen is Coming</Text>
            </View>
        </>

)
};


// {
//    changeMode === 0 ?
//        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
//            <ScrollView>
//                <ImageBackground style={{ width: "100%", height: responsiveHeight(35) }} source={BG_CONTAINER}>
//                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly', }}>
//                        <View style={{ paddingTop: responsiveWidth(6) }}>
//                            <BackButton onPress={() => navigation?.goBack()} />
//                        </View>
//                        <View style={{ height: responsiveHeight(35), justifyContent: "center", alignItems: "center" }}>
//                            <Image style={{ width: 180, height: 200, resizeMode: "center" }} source={require("../../../assets/bgoliver.png")} />

//                        </View>

//                        {/* Incognito Icon----- */}

//                        <View style={{ paddingTop: responsiveWidth(6) }}>
//                            <TouchableOpacity onPress={() => setChangeMode(1)} style={[styles.back_button, { backgroundColor: changeMode == 1 ? TextColorGreen : "rgba(57, 94, 102, 0.5)" }]}>
//                                <Image style={styles.left_arrow} source={require("../../../assets/incognito-icon.png")} />
//                            </TouchableOpacity>
//                        </View>
//                        <View style={{ paddingTop: responsiveWidth(6) }}>
//                            <SettingButton  onPress={()=> navigation.navigate(SETTING)} image={SETTINGS_ICON} />
//                        </View>
//                    </View>
//                </ImageBackground>

//                <View style={{ paddingVertical: moderateVerticalScale(10), justifyContent: "center", alignItems: "center" }}>
//                    <View style={{ flexDirection: "row", width: responsiveWidth(91), justifyContent: "space-around" }}>
//                        <TouchableOpacity onPress={() => setIsContent(0)} style={{ justifyContent: "center", alignItems: "center", borderRadius: 10, paddingVertical: moderateVerticalScale(14), backgroundColor: isContent == 1 ? "rgba(0.2235, 0.3686, 0.4, 0.2)" : TextColorGreen, width: responsiveWidth(45) }}>
//                            <Image style={{ width: 22, height: 22, resizeMode: "center" }} source={require("../../../assets/recordingProfile.png")} />
//                        </TouchableOpacity>
//                        <TouchableOpacity onPress={() => setIsContent(1)} style={{ borderRadius: 10, paddingVertical: moderateVerticalScale(14), justifyContent: "center", alignItems: "center", backgroundColor: isContent == 0 ? "rgba(0.2235, 0.3686, 0.4, 0.2)" : TextColorGreen, width: responsiveWidth(45) }}>
//                            <Image style={{ width: 22, height: 22, resizeMode: "center" }} source={require("../../../assets/videoprofile.png")} />
//                        </TouchableOpacity>
//                    </View>
//                </View>

//                <View>
//                    {isContent === 0 ?
//                        <ProfileOliverData />
//                        :
//                        <RecordingOliverData />
//                    }
//                </View>

//            </ScrollView>
//        </View>
//        :
//        <IncognitoMode setChangeMode={setChangeMode} />
// } 

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
        justifyContent: "center",
        alignItems: "center"
    },
    left_arrow: {
        width: responsiveWidth(6),
        height: responsiveHeight(3),
        resizeMode: "center"
    },
});

export default Profile;
