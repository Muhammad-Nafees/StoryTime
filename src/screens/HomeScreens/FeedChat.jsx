import React, { useState, useEffect } from 'react'
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native'
import { PrimaryColor, SecondaryColor, TextColorGreen, ThirdColor, pinkColor } from '../Styles/Style';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Img_Paths } from '../../assets/Imagepaths';
import NavigationsString from '../../constants/NavigationsString';
import FeedChatFrame from '../../components/FeedChatFrame';
import { useSelector } from 'react-redux';
import { addFriends_api } from '../../../services/api/add-members';



// const FlatListData = [
//     {
//         img: require("../../assets/first-img.png"),
//         text: "Alfred",
//     },
//     {
//         img: require("../../assets/second-img.png"),
//         text: "Sophia",
//     },
//     {
//         img: require("../../assets/third-img.png"),
//         text: "Ellen",
//     },
//     {
//         img: require("../../assets/fourth-img.png"),
//         text: "Chris",
//     },
//     {
//         img: require("../../assets/fifth-img.png"),
//         text: "Alma",
//     },
// ]





const FeedChat = () => {

    const likeCountRTK = useSelector((state) => state?.likedstoryfeed?.likeCount);
    const disLikedCountRTK = useSelector((state) => state?.likedstoryfeed?.disLikedCount);
    const { STORY_TIME_IMG, SPLASH_SCREEN_IMAGE } = Img_Paths
    const { PLAY_STORY_TIME, ADD_FRIENDS } = NavigationsString;
    const { width, height } = Dimensions.get('window');
    const [ResponseapiChat, setResponseapiChat] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const addFriends_api_handler = async () => {
            try {
                const responseData = await addFriends_api();
                setResponseapiChat(responseData?.data?.users);
                return responseData;
            } catch (error) {
                console.log("err", error)
            }
        };
        addFriends_api_handler();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <ImageBackground style={styles.container} source={SPLASH_SCREEN_IMAGE}>
                    <View style={{ justifyContent: "center", alignItems: "center", paddingTop: responsiveWidth(4) }}>
                        <View style={{ flexDirection: 'row', width: responsiveWidth(90), justifyContent: "space-between", alignItems: "center" }}>

                            <View>
                                <Image style={[styles.img, { width: width * 0.23, height: height * 0.075, }]} source={STORY_TIME_IMG} />
                            </View>

                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={() => navigation.navigate(ADD_FRIENDS)} style={{ paddingHorizontal: moderateVerticalScale(8) }}>
                                    <Image style={{ width: width * 0.11, height: height * 0.05, }} source={require("../../assets/plus-icon.png")} />
                                </TouchableOpacity>
                                <View>
                                    <Image style={{ width: width * 0.10, height: height * 0.05, resizeMode: "center" }} source={require("../../assets/avatar.png")} />
                                </View>

                            </View>
                        </View>
                    </View>

                    <View style={{ width: responsiveWidth(95), marginLeft: 'auto', marginVertical: responsiveWidth(1.5), paddingTop: responsiveWidth(2) }}>
                        <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(2.7), fontWeight: "700", }}>My Friend’s Story Time</Text>
                    </View>

                    <View style={styles.flatlist_container}>
                        <View style={{ width: responsiveWidth(95), marginLeft: "auto" }}>
                            <FlatList
                                data={ResponseapiChat}
                                scrollEnabled={true}
                                horizontal
                                // onRefresh={onRefresh}
                                // refreshing={isRefreshing}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ justifyContent: "center", alignItems: "center", }}>
                                            <TouchableOpacity style={{ alignItems: "center", paddingVertical: moderateVerticalScale(6), paddingHorizontal: moderateScale(12), }}>
                                                <Image style={{ width: responsiveWidth(15.2), height: responsiveHeight(7.7), resizeMode: "center" }} source={require("../../assets/first-img.png")} />
                                            </TouchableOpacity>
                                            <Text style={{ color: PrimaryColor, fontWeight: "600", fontSize: responsiveFontSize(1.8), textTransform: "capitalize", }}>{item?.firstName}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>

                    {/* Frame Content Start----------- */}
                    <View>
                        <FeedChatFrame likeCountRTK={likeCountRTK} disLikedCountRTK={disLikedCountRTK} type="lilibeth" profileImage={require("../../assets/avatar-inn.png")} />
                    </View>
                    {/* Frame Content Close----------- */}

                </ImageBackground>
            </ScrollView>
        </SafeAreaView>

    )
};

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
        paddingTop: responsiveWidth(4)
    },
    pause_img: {
        resizeMode: "center"
    }
});
