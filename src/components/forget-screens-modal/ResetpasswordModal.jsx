import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import { Path, Svg } from 'react-native-svg';
import * as Progress from 'react-native-progress';

const ResetPasswordModal = ({ isVisible, setVisible, text, onPress, statusCodeForget }) => {

    const { BG_PLAYFLOW } = Img_Paths;

    return (
        <Modal onRequestClose={() => setVisible(false)} visible={isVisible}>
            <ImageBackground style={styles.container} source={require("../../assets/background-image-Forget.png")}>
                <View style={{ width: responsiveWidth(80), height: responsiveHeight(8), backgroundColor: "rgba(255, 255, 255, 1)", flexDirection: "row", borderRadius: 10, justifyContent: "center", alignItems: "center", }}>
                    {/* <Progress.CircleSnail animating size={40} style={{ width: 50, height: 50, }} /> */}
                    <View style={{ paddingHorizontal: moderateScale(10) }}>
                        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M5 9V7C5 3.69 6 1 11 1C16 1 17 3.69 17 7V9" stroke="#395E66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M11 17.5C12.3807 17.5 13.5 16.3807 13.5 15C13.5 13.6193 12.3807 12.5 11 12.5C9.61929 12.5 8.5 13.6193 8.5 15C8.5 16.3807 9.61929 17.5 11 17.5Z" stroke="#395E66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M16 21H6C2 21 1 20 1 16V14C1 10 2 9 6 9H16C20 9 21 10 21 14V16C21 20 20 21 16 21Z" stroke="#395E66" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>

                    </View>
                    <Text style={{ color: "#000" }}>Reset Password Complete!</Text>
                </View>
            </ImageBackground>
        </Modal>
    )
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: responsiveWidth(12)
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

export default ResetPasswordModal;
