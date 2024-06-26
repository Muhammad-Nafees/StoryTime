import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { SecondaryColor, TextColorGreen, White, } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import AuthImage from '../../../components/AuthImage';
import NavigationsString from '../../../constants/NavigationsString';
import { moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../../assets/Imagepaths';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SplashScreen = () => {
    const { STORY_TIME_IMG, BG_FRAME, LOGIN_IMG, BG_IMAGE_ELEMENTS } = Img_Paths
    const { LOGIN } = NavigationsString

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation()

    return (
        <ImageBackground style={styles.container} source={BG_IMAGE_ELEMENTS}>
            <View style={styles.story_time_container}>
                <Image style={[styles.img, { width: width * 0.8, height: height * 0.3, }]} source={STORY_TIME_IMG} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AuthImage onPress={() => navigation.navigate("GuestStack")} ImageSource={BG_FRAME} />
                <AuthImage onPress={() => navigation.navigate(LOGIN)} ImageSource={LOGIN_IMG} />
            </View>
            {/* <View style={{width:responsiveWidth(80),height:responsiveHeight(6),backgroundColor:TextColorGreen,alignSelf:'center',borderRadius:10,justifyContent:'center',marginTop:responsiveHeight(2)}}>
                <Text style={{color:'white',fontWeight:'800',textAlign:'center',fontSize:responsiveFontSize(2)}}>Subscribe for AD FEEE experience </Text>
            </View> */}
        </ImageBackground>
    )
}

export default SplashScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        flex: 1,
        width: "100%",
        height: "100%",
    },
    img: {
        marginVertical: moderateVerticalScale(8),
        resizeMode: "center",
    },
    story_time_container: {
        justifyContent: "center",
        alignItems: "center"
    }
})
