import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { PrimaryColor, SecondaryColor, ThirdColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import AuthImage from '../../../components/AuthImage';

const SplashScreen = () => {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation()

    return (

        <ImageBackground style={{ backgroundColor: SecondaryColor, width: "100%", height: "100%", }} source={require("../../../assets/splash-screen-bg.png")}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ marginVertical: 10, width: width * 0.8, height: height * 0.3, resizeMode: "center" }} source={require("../../../assets/story-time.png")} />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AuthImage />
                <AuthImage />
            </View>

        </ImageBackground>
    )
}

export default SplashScreen;


const styles = StyleSheet.create({

})
