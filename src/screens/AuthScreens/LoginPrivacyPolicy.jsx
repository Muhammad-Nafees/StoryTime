import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
// import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions"
import NavigationsString from '../../constants/NavigationsString';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import BackButton from '../../components/BackButton';



const LoginTermsAnd_Conditions = () => {
    const {
        SPLASH_SCREEN_IMAGE,
        LEFT_ARROW_IMG
    } = Img_Paths
    const navigation = useNavigation();

    return (

        <ImageBackground style={[styles.container]} source={SPLASH_SCREEN_IMAGE}>
            <ScrollView>

                <View style={{ width: responsiveWidth(95), marginLeft: "auto", }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: moderateVerticalScale(16), paddingTop: responsiveWidth(8) }}>
                        <BackButton onPress={() => navigation.goBack()} leftarrow={LEFT_ARROW_IMG} />
                        <View style={{ paddingHorizontal: moderateScale(14) }}>
                            <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Privacy Policy</Text>
                        </View>
                    </View>

                </View>


                <View style={{ flexWrap: "wrap", paddingHorizontal: moderateScale(20) }}>
                    <View style={{ paddingVertical: moderateVerticalScale(10), paddingBottom: responsiveWidth(7) }}>
                        <Text style={{ color: "#000", fontWeight: "400", }}>Please read Privacy Policy</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9), paddingBottom: responsiveWidth(1) }}>Reservation of Rights</Text>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "400", lineHeight: 24 }}>
                            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                        </Text>
                    </View>
                    <View style={{ paddingVertical: moderateVerticalScale(15) }}>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9), paddingBottom: responsiveWidth(1) }}>Removal of links from our website</Text>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "400", lineHeight: 24 }}>
                            If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                        </Text>
                    </View>

                    <View style={{ paddingVertical: moderateVerticalScale(15) }}>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "400", lineHeight: 24 }}>
                            We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
                        </Text>
                    </View>

                    <View style={{ paddingBottom: responsiveWidth(7) }}>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9), paddingBottom: responsiveWidth(1) }}>Disclaimer</Text>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9), lineHeight: 24 }}>
                            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                        </Text>
                    </View>
                </View>


            </ScrollView>
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


export default LoginTermsAnd_Conditions;
