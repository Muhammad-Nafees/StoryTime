import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BackButton from '../components/BackButton';
import TouchableButton from './TouchableButton';
import { Img_Paths } from '../assets/Imagepaths';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/Constant';
import { Inter_Medium, Inter_Regular } from '../constants/GlobalFonts';


const UserErrors = ({ isVisible, setVisible, text, onPress, text1, bgImage }) => {

    const { BGIMAGE_ACCOUNT_CREATED } = Img_Paths;

    return (
        <Modal onRequestClose={() => setVisible(false)} visible={isVisible} >
            <ImageBackground style={styles.container} source={bgImage}>
                <View style={{ width: responsiveWidth(80), height: responsiveHeight(25), backgroundColor: "#FFF", borderRadius: 30, justifyContent: "space-evenly" }}>

                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <View style={{ backgroundColor: "rgba(48, 210, 152, 1)", borderRadius: 50, height: 40, width: 40, justifyContent: "center", alignItems: "center", }}>
                            <Image style={{ width: SCREEN_WIDTH * 0.08, height: SCREEN_WIDTH * 0.08, resizeMode: "center", }} source={require("../assets/456-img.png")} />
                        </View>
                        <Text style={{ paddingTop: responsiveWidth(3), fontSize: responsiveFontSize(1.9), fontWeight: "400", color: "rgba(0, 0, 0, 1)", fontFamily: Inter_Medium.Inter_Medium }}>{text1}</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={onPress} style={{ width: responsiveWidth(60), backgroundColor: TextColorGreen, borderRadius: 10, justifyContent: "center", alignItems: "center", height: responsiveHeight(6.6) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "600", letterSpacing: 0.28, color: "#FFF", textAlign: "center" }}>{text}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        </Modal>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        resizeMode: "center"
    },
    // container: {
    //     justifyContent: "center",
    //     alignItems: "center",
    //     paddingVertical: moderateVerticalScale(10),
    //     flex: 1
    // },
    img_backgroung_content: {
        width: responsiveWidth(90),
        height: responsiveHeight(32),
        justifyContent: "center",
        alignItems: "center",
    },
    bg_content: {
        backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(78),
        height: responsiveHeight(27),
        marginLeft: responsiveWidth(1),
        marginBottom: responsiveWidth(2)
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: responsiveWidth(70),
        height: responsiveHeight(28),
        marginTop: responsiveWidth(5),
        borderRadius: 18,
    },
    second_childbg: {
        marginLeft: "auto",
        width: responsiveWidth(67)
    },

    third_childbg: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(8)
    },
    child_bg_img: {
        width: responsiveWidth(6.25),
        height: responsiveHeight(3.5),
        resizeMode: "center",
    },
    text_container: {
        paddingTop: responsiveWidth(4),
    },
    second_container: {
        position: 'relative',
        bottom: responsiveWidth(5),
        justifyContent: "center",
        alignItems: "center",
    },
    sec_container_firstchild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: moderateVerticalScale(50),
        width: responsiveWidth(92),
        marginLeft: responsiveWidth(1),
        backgroundColor: "#E44173",
        height: responsiveHeight(7.5),
    },
    third_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: responsiveWidth(36),
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
    sophia_container: {
        flexDirection: "row",
        width: responsiveWidth(21),
        justifyContent: "space-between",
        alignItems: "center",
        margin: responsiveWidth(2.8)
    }
});

export default UserErrors;
