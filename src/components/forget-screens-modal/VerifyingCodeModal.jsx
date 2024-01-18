import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, Modal, TouchableOpacityBase, ActivityIndicator, Alert } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from "../../screens/Styles/Style";
import { useNavigation, useNavigationBuilder } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import { Path, Svg } from 'react-native-svg';
import * as Progress from 'react-native-progress';



const VerifyingCodeModal = ({ isVisible, setVisible, onPress, statusCodeForget }) => {

    const { BG_PLAYFLOW } = Img_Paths;

    return (
        <Modal onRequestClose={() => setVisible(false)} visible={isVisible}>
            <ImageBackground style={styles.container} source={require("../../assets/background-image-Forget.png")}>
                <View style={{ width: responsiveWidth(80), height: responsiveHeight(8), backgroundColor: "rgba(255, 255, 255, 1)", flexDirection: "row", borderRadius: 10, justifyContent: "center", alignItems: "center", }}>
                    {/* <Progress.CircleSnail animating size={40} style={{ width: 50, height: 50, }} /> */}
                    <View style={{ paddingHorizontal: moderateScale(10) }}>
                        {
                            !statusCodeForget ?
                                <ActivityIndicator size={22} color={"rgba(57, 94, 102, 1)"} style={{}} />
                                :
                                <Svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M24.7877 3.41639C24.4199 3.04798 23.8232 3.04735 23.4554 3.41483L12.1521 14.6884L8.07384 10.259C7.72145 9.8765 7.12565 9.85169 6.74249 10.204C6.35963 10.5564 6.33512 11.1525 6.68751 11.5354L11.43 16.6858C11.6037 16.8746 11.8467 16.9842 12.103 16.9895C12.1099 16.9898 12.1166 16.9898 12.1232 16.9898C12.3722 16.9898 12.6118 16.8909 12.7883 16.715L24.7859 4.74896C25.1546 4.38153 25.1552 3.7848 24.7877 3.41639Z" fill="#395E66" />
                                    <Path d="M24.5578 11.5578C24.0374 11.5578 23.6156 11.9795 23.6156 12.5C23.6156 18.3537 18.8537 23.1156 13 23.1156C7.14668 23.1156 2.38442 18.3537 2.38442 12.5C2.38442 6.64668 7.14668 1.88442 13 1.88442C13.5204 1.88442 13.9422 1.46265 13.9422 0.942236C13.9422 0.421777 13.5204 0 13 0C6.10742 0 0.5 5.60742 0.5 12.5C0.5 19.3923 6.10742 25 13 25C19.8923 25 25.5 19.3923 25.5 12.5C25.5 11.9796 25.0782 11.5578 24.5578 11.5578Z" fill="#395E66" />
                                </Svg>
                        }
                    </View>
                    <Text style={{ color: "#000" }}>{statusCodeForget ? "Code Verified" : "Verifying Code"}</Text>
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

export default VerifyingCodeModal;
