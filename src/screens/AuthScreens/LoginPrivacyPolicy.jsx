import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
// import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions"
import NavigationsString from '../../constants/NavigationsString';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import BackButton from '../../components/BackButton';



const LoginPrivacyAndPolicy = () => {
    const {
        SPLASH_SCREEN_IMAGE,
        GET_STARTED_IMAGE,
        STORY_TIME_IMG,
        LEFT_ARROW_IMG
    } = Img_Paths
    const { SPLASH_SCREEN } = NavigationsString
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation()

    return (

        <ImageBackground style={[styles.container]} source={SPLASH_SCREEN_IMAGE}>


            <View style={{ width: responsiveWidth(95), marginLeft: "auto", }}>
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: moderateVerticalScale(16), paddingTop: responsiveWidth(8) }}>
                    <BackButton onPress={() => navigation.goBack()} leftarrow={LEFT_ARROW_IMG} />
                    <View style={{ paddingHorizontal: moderateScale(14) }}>
                        <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Privacy Policy</Text>
                    </View>
                </View>

                <View>
                    <Text style={{ color: "#000", fontWeight: "400", }}>Please read Privacy Policy</Text>
                </View>
            </View>

        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
    },
    container_img: {
        paddingTop: responsiveWidth(15),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: moderateVerticalScale(20)

    },
    story_time_container: {
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontWeight: "500",
        fontSize: responsiveFontSize(1.6)
    },
    story_time_img: {
        marginVertical: moderateVerticalScale(100),
        resizeMode: "center"
    },
    get_started: {
        resizeMode: "center",
        width: responsiveWidth(50),
        height: responsiveHeight(5),
    }
})


export default LoginPrivacyAndPolicy;
