import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { PrimaryColor, SecondaryColor } from '../../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions"

const PopUpStart = () => {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation()

    return (

        <ImageBackground style={styles.container} source={require("../../../assets/splash-screen-bg.png")}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ marginVertical: 100, width: width * 0.8, height: height * 0.3, resizeMode: "center" }} source={require("../../../assets/story-time.png")} />
            </View>

            <View style={{ marginTop: responsiveWidth(25), justifyContent: "center", alignItems: "center", }}>
                <TouchableOpacity onPress={() => navigation.navigate("SplashScreen")}>
                    <Image style={{ marginVertical: 14, width: width * 0.3, height: height * 0.12, resizeMode: "center" }} source={require("../../../assets/play-btn.png")} />
                </TouchableOpacity>
                {/* <Text style={{ color: PrimaryColor, fontSize: 30, textAlign: "center", fontWeight: "600" }}>Get Started</Text> */}
                <Image style={{ resizeMode: "center", width: responsiveWidth(50), height: responsiveHeight(5), }} source={require("../../../assets/Get-Started-img.png")} />
            </View>

        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
    }
})


export default PopUpStart;

