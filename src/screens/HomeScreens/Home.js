import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';



const FlatListData = [
    {
        img: require("../../assets/man-pics.png"),
        text: "Alfred",
    },
    {
        img: require("../../assets/man-pics.png"),
        text: "Sophia",
    },
    {
        img: require("../../assets/man-pics.png"),
        text: "Ellen",
    },
    {
        img: require("../../assets/man-pics.png"),
        text: "Chris",
    },
    {
        img: require("../../assets/man-pics.png"),
        text: "Alma",
    },
]



const Home = () => {

    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation()

    return (

        <ImageBackground style={styles.container} source={require("../../assets/splash-bg.png")}>
            <View style={styles.fisrt_row_container}>
                <View>
                    <Image style={[styles.img, { width: width * 0.23, height: height * 0.075, }]} source={require("../../assets/story-time.png")} />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "51%", }}>
                    <TouchableOpacity>
                        <Image style={{ width: width * 0.11, height: height * 0.05, }} source={require("../../assets/plus-icon.png")} />
                    </TouchableOpacity>

                    <View>
                        <Text style={{ color: "#E44173", fontSize: responsiveFontSize(1.9), fontWeight: "700" }}> Play with Friends </Text>
                    </View>

                    <TouchableOpacity>
                        <Image style={[styles.pause_img, {
                            width: width * 0.10,
                            height: height * 0.05,
                        }]} source={require("../../assets/pause-img.png")} />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity>
                    <Image style={{ width: width * 0.10, height: height * 0.05, resizeMode: "center" }} source={require("../../assets/avatar.png")} />
                </TouchableOpacity>

            </View>

            <View style={{ width: "95%", marginLeft: 'auto', marginVertical: responsiveWidth(1.5), marginTop: responsiveWidth(6) }}>
                <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(2.7), fontWeight: "700", }}>My Friend’s Story Time</Text>
            </View>

            <View style={styles.flatlist_container}>
                <View style={{ width: "95%", marginLeft: "auto" }}>
                    <FlatList
                        data={FlatListData}
                        horizontal
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ justifyContent: "center", alignItems: "center", }}>
                                    <TouchableOpacity style={{ alignItems: "center", paddingVertical: 6, paddingHorizontal: 10 }}>
                                        <Image style={{ width: 50, height: 50, resizeMode: "center" }} source={item.img} />
                                    </TouchableOpacity>
                                    <Text style={{ color: PrimaryColor, fontWeight: "600", fontSize: responsiveFontSize(1.8), textTransform: "capitalize" }}>{item.text}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
            {/* Frame Content Start */}
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: responsiveWidth(6) }}>
                <View style={{ width: "90%", }}>
                    <ImageBackground style={{ width: "100%", height: 220, justifyContent: "center", alignItems: "center" }} resizeMode="center" source={require("../../assets/home-frame.png")}>
                        <View style={{ backgroundColor: TextColorGreen, justifyContent: "center", alignItems: "center", width: "79.5%", height: 195, marginLeft: 4 }}>
                            <View style={{ backgroundColor: pinkColor, width: "88%", height: 185, marginTop: responsiveWidth(1.5), borderRadius: 18 }}>

                                <View style={{ marginTop: responsiveWidth(1), marginLeft: "auto", width: "95%" }}>
                                    <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", alignItems: "center" }}>
                                        <Image style={{ width: 26, height: 26, resizeMode: "center" }} source={require("../../assets/avatar-inn.png")} />
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

                    {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: "80%", backgroundColor: "#E44173", height: 55 }}>
                            {/* <Image source={require("../../assets/")}/>
                                 <Image/>
                                 <Image/> */}
                    {/* </View>
                    </View> */}

                </View>
            </View>

        </ImageBackground>
    )
}

export default Home;


const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
    },
    img: {
        resizeMode: "center"
    },
    flatlist_container: {
        justifyContent: "center",
        alignItems: "center",
    },
    fisrt_row_container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: responsiveWidth(8)
    },
    pause_img: {
        resizeMode: "center"
    }
})
