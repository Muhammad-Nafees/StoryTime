import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
// import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions"
import NavigationsString from '../../../constants/NavigationsString';
import { moderateScale, scale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import BackButton from '../../../components/reuseable-components/BackButton';



const TermsAndConditions = () => {
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
            <ScrollView>

                <View style={{ width: responsiveWidth(95), marginLeft: "auto", }}>
                    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: moderateVerticalScale(16), paddingTop: responsiveWidth(8) }}>
                        <BackButton onPress={() => navigation.goBack()} leftarrow={LEFT_ARROW_IMG} />
                        <View style={{ paddingHorizontal: moderateScale(14) }}>
                            <Text style={{ color: "#000", fontWeight: "600", fontSize: responsiveFontSize(2.5) }}>Terms & Conditions</Text>
                        </View>
                    </View>
                </View>



                <View style={{ flexWrap: "wrap", paddingHorizontal: moderateScale(20) }}>
                    <View style={{ paddingVertical: moderateVerticalScale(10), paddingBottom: responsiveWidth(7) }}>
                        <Text style={{ color: "#000", fontWeight: "400", }}>Welcome to Story Time!</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "400", lineHeight: 24 }}>
                            These terms and conditions outline the rules and regulations for the use of Story Time Website, located at Story Time.
                        </Text>
                    </View>
                    <View style={{ paddingVertical: moderateVerticalScale(20) }}>
                        <Text style={{ color: "#000", fontSize: responsiveFontSize(1.9), fontWeight: "400", lineHeight: 24 }}>
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use  if you do not agree to take all of the terms and conditions stated on this page.
                        </Text>
                    </View>

                    <View style={{ paddingBottom: responsiveWidth(7) }}>
                        <Text style={{ color: "#000", fontWeight: "400", fontSize: responsiveFontSize(1.9), lineHeight: 24 }}>
                            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                            Cookies
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


export default TermsAndConditions;

