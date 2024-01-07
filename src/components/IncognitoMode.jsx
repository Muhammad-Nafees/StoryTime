import { View, Text, ImageBackground, StatusBar, Image, StyleSheet, TouchableOpacity, ScrollView, ScrollViewBase } from 'react-native'
import React, { useState } from 'react'
import { Img_Paths } from '../assets/Imagepaths';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import BackButton from '../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import SettingButton from '../components/SettingButton';
import { SecondaryColor, TextColorGreen } from '../screens/Styles/Style';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import NavigationsString from '../constants/NavigationsString';
import { profile_oliverPierce } from '../../dummyData/DummyData';
import RecordingIncognito from './RecordingIncognito';


const IncognitoMode = ({ setChangeMode }) => {

    const { BG_CONTAINER, SHARE_BTN, SETTINGS_ICON, BG_BLACK_INCOGNITO } = Img_Paths;
    const navigation = useNavigation();
    const { FEED_CHAT, } = NavigationsString;
    const [isContentIncognito, setIsContentIncognito] = useState(0);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ScrollView>
                <ImageBackground style={{ width: "100%", height: responsiveHeight(35) }} source={BG_BLACK_INCOGNITO}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly', }}>
                        <View style={{ paddingTop: responsiveWidth(6) }}>
                            <BackButton onPress={() => navigation?.goBack()} />
                        </View>
                        <View style={{ height: responsiveHeight(35), justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 180, height: 200, resizeMode: "center" }} source={require("../assets/incognitopic.png")} />
                        </View>
                        <View style={{ paddingTop: responsiveWidth(6) }}>
                            <TouchableOpacity onPress={() => setChangeMode(0)} style={styles.back_button}>
                                <Image style={styles.left_arrow} source={require("../assets/incognito-icon.png")} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: responsiveWidth(6) }}>
                            <SettingButton image={SETTINGS_ICON} />
                        </View>
                    </View>
                </ImageBackground>


                <View style={{ paddingVertical: moderateVerticalScale(10), justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", width: responsiveWidth(91), justifyContent: "space-around" }}>
                        <TouchableOpacity onPress={() => setIsContentIncognito(0)} style={{ justifyContent: "center", alignItems: "center", borderRadius: 10, paddingVertical: moderateVerticalScale(14), backgroundColor: isContentIncognito == 1 ? "rgba(0.2235, 0.3686, 0.4, 0.2)" : TextColorGreen, width: responsiveWidth(45) }}>
                            <Image style={{ width: 22, height: 22, resizeMode: "center" }} source={require("../assets/recordingProfile.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsContentIncognito(1)} style={{ borderRadius: 10, paddingVertical: moderateVerticalScale(14), justifyContent: "center", alignItems: "center", backgroundColor: isContentIncognito == 0 ? "rgba(0.2235, 0.3686, 0.4, 0.2)" : TextColorGreen, width: responsiveWidth(45) }}>
                            <Image style={{ width: 22, height: 22, resizeMode: "center" }} source={require("../assets/videoprofile.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {isContentIncognito === 0 ?
                        <RecordingIncognito />
                        :
                        <RecordingIncognito />

                    }
                </View>


            </ScrollView>
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
