import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { PrimaryColor, SecondaryColor, ThirdColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import AuthImage from '../../../components/AuthImage';
import TouchableButton from '../../../components/TouchableButton';



const SplashScreen = () => {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation()

    return (

        <ImageBackground style={styles.container} source={require("../../../assets/splash-screen-bg.png")}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={[styles.img, { width: width * 0.8, height: height * 0.3, }]} source={require("../../../assets/story-time.png")} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AuthImage ImageSource={require("../../../assets/background-frame-img.png")} />
                <AuthImage onPress={() => navigation.navigate("Login")} ImageSource={require("../../../assets/login-img.png")} />
            </View>

            <View style={{ marginTop: 22 }}>
                <TouchableButton color="#FFF" backgroundColor="#395E66" text="Subscribe for AD FREE experience" />
            </View>

        </ImageBackground>
    )
}

export default SplashScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
    },
    img: {
        marginVertical: 8,
        resizeMode: "center"
    }
})
