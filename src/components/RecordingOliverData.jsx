import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, } from 'react-native'
import React from 'react'
import { Recording_oliverPierce } from '../../dummyData/DummyData'
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { base } from '../../services'



const RecordingOliverData = ({ video_profile_response, isLoadingRecording }) => {

    const navigation = useNavigation();

    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ProfileScreens", { screen: "AddUrl" })
                }} activeOpacity={0.7} style={{ borderWidth: 1, borderStyle: "dashed", paddingVertical: 10, flexDirection: "row", width: responsiveWidth(90), borderRadius: 10, alignItems: "center", paddingHorizontal: 16 }}>
                    <View style={{ flexDirection: 'row', width: responsiveWidth(50), alignItems: "center", justifyContent: "space-between" }}>
                        <Image style={{ width: 30, height: 30 }} source={require("../assets/profileplus-icon.png")} />
                        <Text style={{ color: TextColorGreen, fontWeight: "500", fontSize: responsiveFontSize(1.9) }}>Add URL</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {
                isLoadingRecording ?
                    <View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(40), }}>
                        <ActivityIndicator size={22} color={PrimaryColor} />
                    </View>
                    :
                    <FlatList
                        data={video_profile_response}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{ backgroundColor: TextColorGreen, flexDirection: "row", justifyContent: "space-around", height: responsiveHeight(10), alignItems: "center", marginTop: responsiveWidth(2), }}>
                                <View style={{ flexDirection: "row", width: responsiveWidth(71), justifyContent: "space-between", alignItems: "center", }}>
                                    <TouchableOpacity style={{ backgroundColor: "#56B6A4", flexDirection: "row", width: 110, height: 47, justifyContent: "space-around", alignItems: "center", borderRadius: 10 }}>
                                        <Image style={{ width: 30, height: 30, resizeMode: "center" }} source={{ uri: base + item?.subCategory?.image }} />
                                        <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2) }}>{item?.subCategory?.name}</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(37), }}>
                                        <TouchableOpacity style={styles.first_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../assets/456-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item?.likesCount}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.second_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../assets/1.5k-img.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item?.dislikesCount}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.third_view}>
                                            <Image style={{ width: responsiveWidth(9), height: responsiveHeight(4.5), resizeMode: "center" }} source={require("../assets/message-icon.png")} />
                                            <Text style={{ fontSize: responsiveFontSize(1.7), color: SecondaryColor, fontWeight: "300" }}>{item?.commentsCount}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity>
                                    <Image style={{ width: 27, height: 27, alignItems: "center", paddingVertical: moderateVerticalScale(16), resizeMode: "center" }} source={require("../assets/profileurl_icon.png")} />
                                    <Text style={{ color: "#FFF", fontSize: responsiveFontSize(1.9) }}>URL</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    />
            }

        </>
    )
}

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
