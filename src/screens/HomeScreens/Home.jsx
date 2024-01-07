import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import { FlatListData } from '../../../dummyData/DummyData';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';



const Home = () => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, SPLASH_SCREEN_IMAGE, SHARK_ICON, FISH_ICON } = Img_Paths;
    const { ADD_FRIENDS } = NavigationsString;
    const navigation = useNavigation();



    return (
        <ScrollView>
            <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>

                <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(5) }}>
                    <View style={{ flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Image style={[styles.img, { width: width * 0.23, height: height * 0.075, }]} source={STORY_TIME_IMG} />
                        </View>

                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity style={{ paddingHorizontal: moderateVerticalScale(8) }} onPress={() => navigation.navigate(ADD_FRIENDS)}>
                                <Image style={{ width: width * 0.11, height: height * 0.05, }} source={require("../../assets/plus-icon.png")} />
                            </TouchableOpacity>

                            <View>
                                <Image style={{ width: width * 0.10, height: height * 0.05, resizeMode: "center" }} source={require("../../assets/avatar.png")} />
                            </View>

                        </View>
                    </View>
                </View>


                <View style={{ width: responsiveWidth(94), marginLeft: 'auto', marginVertical: responsiveWidth(1.5), marginTop: responsiveWidth(6) }}>
                    <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(2.7), fontWeight: "900", }}>My Friend’s Story Time</Text>
                </View>

                <View style={styles.flatlist_container}>
                    <View style={{ width: responsiveWidth(95), marginLeft: "auto" }}>

                        <FlatList
                            data={FlatListData}
                            horizontal
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                                        <TouchableOpacity style={{ alignItems: "center", paddingVertical: moderateVerticalScale(6), paddingHorizontal: moderateScale(12), }}>
                                            <Image style={{ width: responsiveWidth(15.2), height: responsiveHeight(7.7), resizeMode: "center" }} source={item.img} />
                                        </TouchableOpacity>
                                        <Text style={{ color: PrimaryColor, fontWeight: "600", fontSize: responsiveFontSize(1.8), textTransform: "capitalize" }}>{item.text}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>

                {/* Frame Content Start----------- */}

                <FrameContent type="lilibeth" profileImage={require("../../assets/avatar-inn.png")} />
                <FrameContent text="Shark" type="imp_bg_img" profile_text="Sophia" backgroundImage={SHARK_ICON} profileImage={require("../../assets/sophia-img.png")} />
                <FrameContent type="lilibeth" profileImage={require("../../assets/avatar-inn.png")} />
                <FrameContent text="Whale" type="imp_bg_img" profile_text="Alfred" backgroundImage={FISH_ICON} profileImage={require("../../assets/porter-img.png")} />

                {/* Frame Content Close----------- */}

            </ImageBackground>
        </ScrollView>
    )
};



const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
        flex: 1,
    },
    img: {
        resizeMode: "center"
    },
    flatlist_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fisrt_row_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: responsiveWidth(8)
    },
    pause_img: {
        resizeMode: "center"
    },

});

export default Home;
