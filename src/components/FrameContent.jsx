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
                        <View style={styles.child_bg}>

                            <View style={styles.second_childbg}>
                                <View style={styles.third_childbg}>
                                    <Image style={styles.child_bg_img} source={require("../assets/avatar-inn.png")} />
                                    <Text style={{ color: "#FFF" }}>Lilibeth</Text>
                                </View>

                                <View style={styles.text_container}>
                                    <Text style={{ fontSize: 13, color: "#FFF", lineHeight: 16 }}>
                                        Suddenly his friend saw him start to move strangely. The shark attacked Wilson so hard his entire body flew out of the water, and multiple eyewitnesses observed the whole situation. His friend and some others grabbed him when the shark attempted to drag him under.
                                    </Text>
                                </View>

                            </View>

                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.second_container}>
                    <View style={styles.sec_container_firstchild}>

                        <View style={styles.third_container}>
                            <View style={styles.fourth_container}>
                                <TouchableOpacity style={styles.first_view}>
                                    <Image style={{ width: 35, height: 30, resizeMode: "center" }} source={require("../assets/456-img.png")} />
                                    <Text style={{ fontSize: responsiveFontSize(1.9) }}>1.5k</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.second_view}>
                                    <Image style={{ width: 35, height: 30, resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                    <Text style={{ fontSize: responsiveFontSize(1.9) }}>456</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.third_view}>
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
    },
    child_bg: {
        backgroundColor: pinkColor,
        width: "88%",
        height: 185,
        marginTop: responsiveWidth(1.5),
        borderRadius: 18
    },
    second_childbg: {
        marginTop: responsiveWidth(1),
        marginLeft: "auto",
        width: "95%"
    },
    third_childbg: {
        flexDirection: "row",
        width: "40%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    child_bg_img: {
        width: 26,
        height: 26,
        resizeMode: "center"
    },
    text_container: {
        marginTop: responsiveWidth(4)
    },
    second_container: {
        position: 'relative',
        bottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    sec_container_firstchild: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 50,
        width: "92%", marginLeft: 3,
        backgroundColor: "#E44173",
        height: 55
    },
    third_container: {
        justifyContent: "center",
        alignItems: "center"
    },
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "85%"
    },
    first_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    second_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    third_view: {
        justifyContent: "center",
        alignItems: "center"
    }


})


export default FrameContent
