import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { PrimaryColor, TextColorGreen } from '../screens/Styles/Style'
import UserNames from './UserNames'
import { moderateVerticalScale, moderateScale } from 'react-native-size-matters'
import TouchableButton from './TouchableButton'

const FirstScreen = ({ image, started, handlePressOut, onPressnext, isPressed, setIsPressed, handleStart, result, timeText }) => {

    const navigation = useNavigation()
    const SCREENWIDTH = Dimensions.get("window").width;


    return (
        <>
            <View style={{ paddingVertical: moderateVerticalScale(18), paddingHorizontal: moderateScale(22) }}>
                <View style={{ paddingTop: responsiveWidth(5), flexDirection: "row", width: responsiveWidth(60), justifyContent: 'space-between', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: responsiveWidth(10), }}>
                        <Image style={{ width: responsiveWidth(5), height: responsiveHeight(2.5), resizeMode: "center" }} source={require("../assets/back-playflowicon.png")} />
                    </TouchableOpacity>
                    <View>
                        <View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 10, borderWidth: 4, borderColor: "rgba(255, 153, 166, 1)", backgroundColor: 'rgba(255, 164, 164, 0.5)', paddingVertical: moderateVerticalScale(10), paddingHorizontal: moderateScale(12) }}>
                            <Text style={{ fontWeight: '600', color: TextColorGreen, fontSize: responsiveFontSize(1.9) }}>Time :{timeText}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={image}>
                <View activeOpacity={0.9} style={[styles.bg_content, { backgroundColor: TextColorGreen, }]}>
                    <View style={{ borderRadius: 20, width: responsiveWidth(72), height: responsiveHeight(39), backgroundColor: "#EA89A7", alignItems: "center", justifyContent: "space-between", paddingBottom: responsiveWidth(6) }}>

                        <UserNames username="@Cedrick101" />

                        <ScrollView>
                            <View style={{ paddingHorizontal: moderateVerticalScale(35) }}>
                                <Text style={{ paddingTop: responsiveWidth(3), color: "#FFF", fontSize: responsiveFontSize(2.1), lineHeight: 20, fontWeight: "700", textAlign: "center" }}>{result}</Text>
                            </View>
                        </ScrollView>

                        <View>
                            {
                                !started &&
                                <Text style={{ paddingHorizontal: moderateScale(32), lineHeight: moderateScale(22), color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2.1), textAlign: "center" }}> Hold microphone icon and share your story</Text>
                            }
                        </View>


                    </View>
                </View>
            </ImageBackground>

            <View style={{ paddingVertical: moderateVerticalScale(25), justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onLongPress={() => {
                    setIsPressed(true);
                    handleStart();
                }}
                    onPressOut={handlePressOut}
                    activeOpacity={0.7} style={{ borderWidth: isPressed ? 6 : 0, borderColor: isPressed ? "#D04141" : TextColorGreen, backgroundColor: TextColorGreen, width: SCREENWIDTH / 3, height: responsiveHeight(15), borderRadius: responsiveWidth(50), justifyContent: 'center', alignItems: "center" }}>
                    <Image style={{ width: responsiveWidth(16), height: responsiveHeight(8), tintColor: isPressed ? "#D04141" : null, resizeMode: "center" }} source={require("../assets/mic.png")} />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableButton onPress={() => { onPressnext(); }} text="Next Player: @alfred" backgroundColor={TextColorGreen} color="#FFF" />
                <TouchableButton text="Save Story" color={TextColorGreen} />
            </View>
        </>
    )
}



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
        height: responsiveHeight(41),
        justifyContent: "center",
        alignItems: "center"
    },
    img_dog: {
        width: responsiveWidth(21),
        height: responsiveHeight(10),
        resizeMode: "center"
    },
    start: {
        paddingVertical: moderateVerticalScale(8),
        color: PrimaryColor,
        fontWeight: "800",
        fontSize: responsiveFontSize(4.3)
    },
    img_backgroung_content: {
        width: responsiveWidth(100),
        height: responsiveHeight(45),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateVerticalScale(6)
    },
    bg_content: {
        // backgroundColor: PrimaryColor,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(76),
        height: responsiveHeight(42),
        marginLeft: responsiveWidth(1),
        marginTop: responsiveWidth(1),
        // marginBottom: responsiveWidth(2.5)
    },

})

export default FirstScreen;
