import React from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import { PrimaryColor } from '../Styles/Style';

const PopUpStart = () => {
    const { width, height } = Dimensions.get('window');

    return (
        <ImageBackground style={{ width: "100%", height: "100%", }} source={require("../../assets/splash-screen-bg.png")}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image style={{ marginVertical: 100, width: width * 0.8, height: height * 0.3, resizeMode: "center" }} source={require("../../assets/story-time.png")} />
            </View>

            <View style={{ marginTop: 40, justifyContent: "center", alignItems: "center", }}>
                <Image style={{ marginVertical: 14, width: width * 0.3, height: height * 0.12, resizeMode: "center" }} source={require("../../assets/play-btn.png")} />
                <Text style={{ color: PrimaryColor, fontSize: 30, textAlign: "center", fontWeight: "600" }}>Get Started</Text>
            </View>

        </ImageBackground>
    )
}

export default PopUpStart
