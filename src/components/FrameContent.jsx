import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions'
import { SecondaryColor, TextColorGreen, pinkColor } from '../screens/Styles/Style'

const FrameContent = () => {
    return (
        <View style={styles.container}>
            <View style={{ width: "90%", }}>
                <ImageBackground style={styles.img_backgroung_content} resizeMode="center" source={require("../assets/home-frame.png")}>
                    <View style={styles.bg_content}>
                        <View style={{ backgroundColor: pinkColor, width: "88%", height: 185, marginTop: responsiveWidth(1.5), borderRadius: 18 }}>

                            <View style={{ marginTop: responsiveWidth(1), marginLeft: "auto", width: "95%" }}>
                                <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", alignItems: "center" }}>
                                    <Image style={{ width: 26, height: 26, resizeMode: "center" }} source={require("../assets/avatar-inn.png")} />
                                    <Text style={{ color: "#FFF" }}>Lilibeth</Text>
                                </View>

                                <View style={{ marginTop: responsiveWidth(4) }}>
                                    <Text style={{ fontSize: 13, color: "#FFF", lineHeight: 16 }}>
                                        Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.
                                    </Text>
                                </View>

                            </View>

                        </View>
                    </View>
                </ImageBackground>

                <View style={{ position: 'relative', bottom: 20, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 50, width: "92%", marginLeft: 3, backgroundColor: "#E44173", height: 55 }}>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "85%" }}>
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 35, height: 30, resizeMode: "center" }} source={require("../assets/456-img.png")} />
                                    <Text style={{ fontSize: responsiveFontSize(1.9) }}>1.5k</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 35, height: 30, resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                    <Text style={{ fontSize: responsiveFontSize(1.9) }}>456</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Image style={{ width: 35, height: 30, resizeMode: "center" }} source={require("../assets/message-icon.png")} />
                                    <Text style={{ fontSize: responsiveFontSize(1.9) }}>1.1k</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ width: "22%", justifyContent: 'flex-end', alignItems: "flex-end" }}>
                            <Image style={{ width: 30, height: 30, resizeMode: "center" }} source={require("../assets/three-dots-mod.png")} />
                        </View>

                    </View>

                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: responsiveWidth(6)
    },
    img_backgroung_content: {
        width: "100%",
        height: 220,
        justifyContent: "center",
        alignItems: "center"
    },
    bg_content: {
        backgroundColor: TextColorGreen,
        justifyContent: "center",
        alignItems: "center",
        width: "79.5%",
        height: 195,
        marginLeft: 4
    }
})


export default FrameContent
