import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import { Circle, Path, Svg } from 'react-native-svg';


const StoryTimeSaved = ({ isVisible, setVisible, text, onPress, textButton }) => {

    const { BG_PLAYFLOW } = Img_Paths;

    return (
        <Modal onRequestClose={() => setVisible(false)} visible={isVisible} >
            <ImageBackground style={styles.container} source={BG_PLAYFLOW}>
                <View style={{ width: responsiveWidth(80), height: responsiveHeight(24), backgroundColor: "#FFF", borderRadius: 30 }}>

                    <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: moderateVerticalScale(12) }}>
                        <Svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Circle cx="17.5" cy="17" r="17" fill="#30D298" />
                            <Path d="M24.5 13L14.875 22L10.5 17.9091" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: "#000", textAlign: "center", lineHeight: 24 }}>{text}</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => setVisible(false)} style={{ width: responsiveWidth(60), backgroundColor: TextColorGreen, borderRadius: 10, justifyContent: "center", alignItems: "center", height: responsiveHeight(6.6) }}>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: "600", letterSpacing: 0.28, color: "#FFF", }}>{textButton}</Text>
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

export default StoryTimeSaved;
