import React from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FrameContent from '../../components/FrameContent';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import FeedChatFrame from '../../components/FeedChatFrame';



const FlatListData = [
    {
        img: require("../../assets/first-img.png"),
        text: "Alfred",
    },
    {
        img: require("../../assets/second-img.png"),
        text: "Sophia",
    },
    {
        img: require("../../assets/third-img.png"),
        text: "Ellen",
    },
    {
        img: require("../../assets/fourth-img.png"),
        text: "Chris",
    },
    {
        img: require("../../assets/fifth-img.png"),
        text: "Alma",
    },
]


const FeedChat = () => {

    const { width, height } = Dimensions.get('window');
    const { STORY_TIME_IMG, SPLASH_SCREEN_IMAGE } = Img_Paths
    const { PLAY_STORY_TIME } = NavigationsString
    const navigation = useNavigation()

    return (

        <ScrollView>
            <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
                <View style={styles.fisrt_row_container}>
                    <View>
                        <Image style={[styles.img, { width: width * 0.23, height: height * 0.075, }]} source={STORY_TIME_IMG} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: responsiveWidth(50), }}>
                        <TouchableOpacity>
                            <Image style={{ width: width * 0.11, height: height * 0.05, }} source={require("../../assets/plus-icon.png")} />
                        </TouchableOpacity>

                        <View>
                            <Text style={{ color: "#E44173", fontSize: responsiveFontSize(1.9), fontWeight: "700" }}> Play with Friends </Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate(PLAY_STORY_TIME)}>
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

                <View style={{ width: responsiveWidth(95), marginLeft: 'auto', marginVertical: responsiveWidth(1.5), marginTop: responsiveWidth(6) }}>
                    <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(2.7), fontWeight: "700", }}>My Friend’s Story Time</Text>
                </View>

                <View style={styles.flatlist_container}>
                    <View style={{ width: responsiveWidth(95), marginLeft: "auto" }}>

                        <FlatList
                            data={FlatListData}
                            horizontal
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                                        <TouchableOpacity style={{ alignItems: "center", paddingVertical: moderateVerticalScale(6), paddingHorizontal: moderateScale(10), }}>
                                            <Image style={{ width: responsiveWidth(15.2), height: responsiveHeight(7.7), resizeMode: "center" }} source={item.img} />
                                        </TouchableOpacity>
                                        <Text style={{ color: PrimaryColor, fontWeight: "600", fontSize: responsiveFontSize(1.8), textTransform: "capitalize" }}>{item.text}</Text>
                                    </View>
                                )
                            }}
                        />

                    </View>
                </View>

                {/* Frame Content Start----------- */}

                <FeedChatFrame type="lilibeth" profileImage={require("../../assets/avatar-inn.png")} />
                {/* Frame Content Close----------- */}

            </ImageBackground>
        </ScrollView>

    )
}


export default FeedChat;


const styles = StyleSheet.create({
    container: {
        backgroundColor: SecondaryColor,
        width: "100%",
        height: "100%",
        flex: 1,
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
