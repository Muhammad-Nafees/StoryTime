import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import { PrimaryColor, SecondaryColor, TextColorGreen } from '../../screens/Styles/Style'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { base } from '../../../services'
import { PassionOne_Regular } from '../../constants/GlobalFonts'



const ProfileOliverData = ({

    profile_response,
    setRecordingPage,
    isLoadingRecording,
    hasMorePagesRecording,
    isUserProfileData,
    isUserLoading,

}) => {

    const navigation = useNavigation();
    const SCREENHEIGHT = Dimensions.get("window").height;
    const SCREENWIDTH = Dimensions.get("window").width;
    const [isLoadMore, setIsLoadMore] = useState(false);



    const handleLoadMore = async () => {
        if (hasMorePagesRecording) {
            setIsLoadMore(true)
            setRecordingPage((prevPage) => prevPage + 1);
        } else {
            console.log("no more pages");
            setIsLoadMore(false);
        }
    };

    const handleProfile = (isHidden, id) => {
        navigation.navigate("Profile")
        // navigation.navigate("profileStack", {
        //     screen: "VoiceToTextProfile",
        //     params: { storyuserId: id, isHidden: isHidden },
        // })
    };

    return (
        <>
            {
                isUserLoading || isLoadingRecording ?
                    <View style={{ justifyContent: "center", alignItems: "center", height: responsiveHeight(40), }}>
                        <ActivityIndicator size={22} color={PrimaryColor} />
                    </View>
                    :
                    profile_response?.length == 0 || profile_response === null ?
                        (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: PrimaryColor, fontSize: responsiveFontSize(3.5), fontFamily: PassionOne_Regular.passionOne, }}>No Story Found</Text>
                            </View>
                        ) :
                        <FlatList
                            data={profile_response}
                            scrollEnabled={true}
                            renderItem={({ item, index }) => (
                                console.log("ishideen item----", item?.isHidden),
                                <View key={index} style={{ backgroundColor: TextColorGreen, flexDirection: "row", justifyContent: "space-evenly", height: responsiveHeight(10), alignItems: "center", marginTop: responsiveWidth(2), }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate("profileStack", {
                                            screen: "VoiceToTextProfile",
                                            params: { storyuserId: item?._id, isHidden: item?.isHidden },
                                        })
                                    }} style={{ backgroundColor: "#56B6A4", flexDirection: "row", paddingHorizontal: moderateScale(24), width: 175, height: 47, justifyContent: "space-evenly", alignItems: "center", borderRadius: 10 }}>
                                        <Image style={{ width: SCREENWIDTH * 0.1, height: SCREENHEIGHT * 0.1, resizeMode: "center" }} source={{ uri: base + item?.subCategory?.image }} />
                                        <Text style={{ color: "#FFF", fontWeight: "700", fontSize: responsiveFontSize(2) }}>{item?.subCategory?.name}</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(40), }}>
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

export default ProfileOliverData;
