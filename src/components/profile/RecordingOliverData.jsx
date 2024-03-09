import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { Recording_oliverPierce } from '../../../dummyData/DummyData'
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { base } from '../../../services'
import { PassionOne_Regular } from '../../constants/GlobalFonts'


const RecordingOliverData = ({
    video_profile_response,
    isLoadingRecording,
    isNoDataProfile,
    setRecordingPage,
    hasMorePagesRecording
}) => {

    const navigation = useNavigation();
    const [isLoadMore, setIsLoadMore] = useState(false);

    const handleLoadMore = async () => {
        console.log("hasmorepages===", hasMorePagesRecording)
        if (hasMorePagesRecording) {
            setIsLoadMore(true);
            setRecordingPage((prevPage) => prevPage + 1);
        } else {
            console.log("no more pages");
            setIsLoadMore(false);
        }
    };

    // const handleProfile = (id) => {
    //     navigation?.navigate("profileStack", { screen: "VoiceToTextProfile", params: { storyuserId: id }, })
    // };



    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ProfileScreens", { screen: "AddUrl" })
                }} activeOpacity={0.7} style={{
                    borderWidth: 1,
                    borderStyle: "dashed",
                    paddingVertical: 10,
                    flexDirection: "row",
                    width: responsiveWidth(90),
                    borderRadius: 10,
                    alignItems: "center",
                    paddingHorizontal: 16
                }}>
                    <View style={{ flexDirection: 'row', width: responsiveWidth(50), alignItems: "center", justifyContent: "space-between" }}>
                        <Image style={{ width: 30, height: 30 }} source={require("../../assets/profileplus-icon.png")} />
                        <Text style={{ color: TextColorGreen, fontWeight: "700", fontSize: responsiveFontSize(1.9) }}>Add URL</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {
                isLoadingRecording ?
                    <View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(40), }}>
                        <ActivityIndicator size={22} color={PrimaryColor} />
                    </View>
                    :
                    isNoDataProfile && video_profile_response?.length == 0 ?
                        (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(3.5), fontFamily: PassionOne_Regular.passionOne, }}>{isNoDataProfile}</Text>
                            </View>
                        ) :
                        <FlatList
                            data={video_profile_response}
                            renderItem={({ item, index }) => (

                                <View key={index} style={{ backgroundColor: TextColorGreen, flexDirection: "row", justifyContent: "space-around", height: responsiveHeight(10), alignItems: "center", marginTop: responsiveWidth(2), }}>
                                    <View style={{ flexDirection: "row", width: responsiveWidth(71), justifyContent: "space-between", alignItems: "center", }}>
                                        <View style={{ backgroundColor: "#56B6A4", flexDirection: "row", width: 110, height: 47, justifyContent: "space-around", alignItems: "center", borderRadius: 10 }}>
                                            <Image style={{ width: 30, height: 30, resizeMode: "center" }} source={{ uri: base + item?.subCategory?.image }} />
                                            <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2) }}>{item?.subCategory?.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(37), }}>
                                            <View style={styles.first_view}>
                                                <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../../assets/456-img.png")} />
                                                <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item?.likesCount}</Text>
                                            </View>
                                            <View style={styles.second_view}>
                                                <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../../assets/1.5k-img.png")} />
                                                <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item?.dislikesCount}</Text>
                                            </View>
                                            <View style={styles.third_view}>
                                                <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../../assets/message-icon.png")} />
                                                <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item?.commentsCount}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity>
                                        <Image style={{ width: 27, height: 27, alignItems: "center", paddingVertical: moderateVerticalScale(16), resizeMode: "center" }} source={require("../../assets/profileurl_icon.png")} />
                                        <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>URL</Text>
                                    </TouchableOpacity>

                                </View>
                            )}

                            ListFooterComponent={() => {
                                if (isLoadMore) {
                                    return (
                                        <View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(8), }}>
                                            <ActivityIndicator size={22} color={PrimaryColor} />
                                        </View>
                                    );
                                }
                                return null;
                            }}

                            onEndReached={() => {
                                handleLoadMore();
                            }}
                            onEndReachedThreshold={0.3}
                        />
            }

        </>
    )
};

const styles = StyleSheet.create({
    fourth_container: {
        flexDirection: "row",
        alignItems: "center",
        width: responsiveWidth(65),
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
    },
})

export default RecordingOliverData;
