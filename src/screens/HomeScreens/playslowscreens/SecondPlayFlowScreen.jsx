import { View, Text, ImageBackground, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Img_Paths } from '../../../assets/Imagepaths';
import { PrimaryColor, TextColorGreen } from '../../Styles/Style';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import NavigationsString from '../../../constants/NavigationsString';
import { PassionOne_Regular } from '../../../constants/GlobalFonts';



const SecondPlayFlowScreen = () => {

    const { SPLASH_SCREEN_IMAGE, PLAY_FLOW_FRAME } = Img_Paths;
    const navigation = useNavigation();
    // const SCREENWIDTH = Dimensions.get("window").width;
    const windowWidth = Dimensions.get('window').width;
    const { FIRST_USER } = NavigationsString;
    const squareSize = windowWidth * 0.95;

    return (

        <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
            <View style={styles.backplay_flow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: responsiveWidth(10), paddingTop: responsiveWidth(12), }}>
                    <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2.5), resizeMode: "center" }} source={require("../../../assets/back-playflowicon.png")} />
                </TouchableOpacity>
            </View>

            <View style={styles.circle_container}>
                <View style={[styles.sub_circle, {
                    width: squareSize,
                    height: squareSize,
                    borderRadius: squareSize / 2,
                }]}>

                    <View style={{ paddingBottom: moderateVerticalScale(30) }}>
                        <Image style={styles.img_dog} source={require("../../../assets/dog-playflow.png")} />
                    </View>

                    <View style={{ paddingVertical: moderateVerticalScale(10), }}>
                        <Text style={{ fontSize: responsiveFontSize(3), fontWeight: "400", color: "#FFF" }}>Your Word is </Text>
                    </View>

                    <View>
                        <Text style={{ fontFamily: PassionOne_Regular.passionOne, color: "#F3F3F3", fontSize: responsiveFontSize(9), letterSpacing: 0 }}>Dog</Text>
                    </View>
                </View>

                <View style={{ paddingVertical: moderateVerticalScale(35), }} />

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate(FIRST_USER)}>
                        <Image source={require("../../../assets/pause-img.png")} />
                    </TouchableOpacity>
                    <Text style={styles.start}>Start</Text>
                </View>

            </View>
        </ImageBackground>
    )
};



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFF"
    },
    backplay_flow: {
        marginLeft: "auto",
        width: responsiveWidth(95)
    },
    circle_container: {
        paddingVertical: moderateVerticalScale(10),
        justifyContent: "center",
        alignItems: "center"
    },
    sub_circle: {
        backgroundColor: TextColorGreen,
        borderRadius: responsiveWidth(60),
        height: 340,
        justifyContent: "center",
        alignItems: "center"
    },
    img_dog: {
        width: responsiveWidth(22),
        height: responsiveHeight(11),
        resizeMode: "center"
    },
    start: {
        paddingVertical: moderateVerticalScale(12),
        color: PrimaryColor,
        // fontWeight: "800",
        fontSize: responsiveFontSize(4.8),
        fontFamily: PassionOne_Regular.passionOne,
    }

})
export default SecondPlayFlowScreen;
